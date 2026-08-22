/* ============================================================
   SPACESHIP 3D PORTFOLIO — Three.js Game Engine
   Controls: Move mouse to steer · Click / Space to fire · Shift boost
   ============================================================ */
'use strict';

//PLANET CONFIGURATIONS
const PLANET_CFGS = [
  { id: 'about', label: 'ABOUT', color: 0x00CFFF, hex: '#00CFFF', emissive: 0x003355, pos: [180, 55, -520], r: 32, rings: true, tilt: 0.30 },
  { id: 'projects', label: 'PROJECTS', color: 0xB06EFF, hex: '#B06EFF', emissive: 0x220044, pos: [-270, -70, -460], r: 40, rings: false, tilt: 0.50 },
  { id: 'skills', label: 'SKILLS', color: 0x00FF9F, hex: '#00FF9F', emissive: 0x003322, pos: [110, 145, -710], r: 28, rings: true, tilt: -0.4 },
  { id: 'experience', label: 'EXPERIENCE', color: 0xFFD700, hex: '#FFD700', emissive: 0x332200, pos: [-210, -85, -790], r: 38, rings: false, tilt: 0.60 },
  { id: 'contact', label: 'CONTACT', color: 0xFF6B9D, hex: '#FF6B9D', emissive: 0x330022, pos: [55, -38, -360], r: 35, rings: true, tilt: -0.2 },
];

//CONSTANTS
const TURN_SPD = 0.026;   // radians/frame at full steer deflection
const PITCH_SPD = 0.016;
const MAX_PITCH = 1.22;    // ≈70° pitch limit
const MAX_ROLL = 0.58;
const ROLL_LERP = 0.07;
const STEER_SMO = 1;    // steering input smoothing
const SHIP_SPEED = 0.1;     // units/frame
const BOOST_SPEED = 4.2;
const BULLET_SPD = 8.0;
const BULLET_TTL = 165;     // frames
const SHOOT_CD = 28;      // frames between shots
const CAM_LERP = 0.55;
const CAM_OFFSET_Y = 2.8;
const CAM_OFFSET_Z = 16.0;
const TRAIL_MAX = 280;
const EXPL_COUNT = 80;

//GLOBALS
let W, H, scene, camera, renderer, raycaster;
let tmpVec, tmpEul;          // lazy-initialized in init()
let reticleEl, proximityEl;  // lazy-initialized in init()

let shipGroup, shipPos, shipYaw, shipPitch, shipRoll;
let smoX = 0, smoY = 0;
let isBoosting = false;
let planets = [], bullets = [], explosions = [];
let trailPositions, trailGeo, trailMesh;
let trailParticles = []; // {x,y,z,age}
let engineLights = [];
let shootCd = 0;
let gameRunning = false, soundOn = true, audioCtx = null;
let mouse = { x: 0, y: 0 };

// ─── INIT ─────────────────────────────────────────────────────────────
function init() {
  W = window.innerWidth;
  H = window.innerHeight;

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('spaceCanvas'), antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  // renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // renderer.toneMappingExposure = 1.15;

  // Scene + fog
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x030718);
  scene.fog = new THREE.FogExp2(0x030718, 0.00065);

  // Camera
  camera = new THREE.PerspectiveCamera(72, W / H, 0.5, 4000);
  camera.position.set(0, CAM_OFFSET_Y, CAM_OFFSET_Z);
  camera.lookAt(0, 0, -3);

  raycaster = new THREE.Raycaster();

  // Ship state
  shipPos = new THREE.Vector3(0, 0, 0);
  shipYaw = 0;
  shipPitch = 0;
  shipRoll = 0;

  // Lazy-init helpers
  tmpVec = new THREE.Vector3();
  tmpEul = new THREE.Euler(0, 0, 0, 'YXZ');
  reticleEl = document.getElementById('reticle');
  proximityEl = document.getElementById('proximity-hint');


  // Build world
  buildLights();
  buildStarfield();
  buildNebulae();
  buildSun();
  buildPlanets();
  buildShip();
  setupTrail();

  // Events + UI
  setupControls();
  setupUI();

  // Start render loop
  animate();
}

// ─── LIGHTS ───────────────────────────────────────────────────────────
function buildLights() {
  scene.add(new THREE.AmbientLight(0x0d1a33, 1.2));

  const sun = new THREE.DirectionalLight(0xFFCC88, 2.0);
  sun.position.set(-200, 300, -800);
  scene.add(sun);

  const fill = new THREE.DirectionalLight(0x224466, 0.5);
  fill.position.set(0, 0, 600);
  scene.add(fill);
}

// ─── STARFIELD ────────────────────────────────────────────────────────
function buildStarfield() {
  const N = 5000;
  const pos = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);
  const sz = new Float32Array(N);

  for (let i = 0; i < N; i++) {
    const r = 1400 + Math.random() * 700;
    const th = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(phi) * Math.cos(th);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(th);
    pos[i * 3 + 2] = r * Math.cos(phi);

    const rn = Math.random();
    if (rn < 0.06) { col[i * 3] = 0.5; col[i * 3 + 1] = 0.65; col[i * 3 + 2] = 1.0; }  // blue-white
    else if (rn < 0.12) { col[i * 3] = 1.0; col[i * 3 + 1] = 0.85; col[i * 3 + 2] = 0.5; }  // warm-yellow
    else if (rn < 0.15) { col[i * 3] = 1.0; col[i * 3 + 1] = 0.35; col[i * 3 + 2] = 0.35; } // red-giant
    else { col[i * 3] = 1.0; col[i * 3 + 1] = 1.0; col[i * 3 + 2] = 1.0; }  // white

    sz[i] = Math.random() < 0.04 ? 4.0 : Math.random() < 0.18 ? 2.2 : 1.3;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

  scene.add(new THREE.Points(geo, new THREE.PointsMaterial({
    size: 1.6, vertexColors: true, sizeAttenuation: true,
    transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false,
  })));
}

// ─── NEBULAE ──────────────────────────────────────────────────────────
function buildNebulae() {
  const data = [
    [-700, 250, -1300, 0x220055, 280, 0.055],
    [850, -350, -1600, 0x003366, 320, 0.045],
    [-100, 480, -1900, 0x003322, 240, 0.040],
    [450, 120, -2100, 0x441100, 300, 0.038],
    [-500, -200, -1000, 0x000033, 200, 0.060],
  ];
  data.forEach(([x, y, z, col, r, op]) => {
    const m = new THREE.MeshBasicMaterial({
      color: col, transparent: true, opacity: op,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.BackSide,
    });
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 10), m);
    mesh.position.set(x, y, z);
    scene.add(mesh);
  });
}

// ─── SUN ──────────────────────────────────────────────────────────────
function buildSun() {
  const SUN = new THREE.Vector3(-100, 200, -1900);

  // Core
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(95, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xFFEE88 })
  );
  core.position.copy(SUN);
  scene.add(core);

  // Glow halos
  [[130, 0xFFCC44, 0.14], [175, 0xFF9900, 0.08], [240, 0xFF5500, 0.04]].forEach(([r, c, op]) => {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(r, 16, 16),
      new THREE.MeshBasicMaterial({
        color: c, transparent: true, opacity: op,
        blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.BackSide
      })
    );
    mesh.position.copy(SUN);
    scene.add(mesh);
  });

  // Sunlight
  const sl = new THREE.PointLight(0xFFCC66, 2.5, 3000);
  sl.position.copy(SUN);
  scene.add(sl);
}

// ─── PLANETS ──────────────────────────────────────────────────────────
function buildPlanets() {
  const container = document.getElementById('planet-labels');

  PLANET_CFGS.forEach(cfg => {
    const grp = new THREE.Group();
    grp.position.set(...cfg.pos);
    grp.rotation.z = cfg.tilt;

    // Main sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(cfg.r, 48, 48),
      new THREE.MeshPhongMaterial({
        color: cfg.color, emissive: cfg.emissive, shininess: 25, specular: 0x111111,
      })
    );
    grp.add(sphere);

    // Atmosphere (inner)
    grp.add(new THREE.Mesh(
      new THREE.SphereGeometry(cfg.r * 1.08, 24, 24),
      new THREE.MeshBasicMaterial({
        color: cfg.color, transparent: true, opacity: 0.10,
        side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
      })
    ));

    // Outer glow
    grp.add(new THREE.Mesh(
      new THREE.SphereGeometry(cfg.r * 1.30, 16, 16),
      new THREE.MeshBasicMaterial({
        color: cfg.color, transparent: true, opacity: 0.045,
        side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
      })
    ));

    // Rings
    if (cfg.rings) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(cfg.r * 1.62, cfg.r * 0.065, 4, 80),
        new THREE.MeshBasicMaterial({
          color: cfg.color, transparent: true, opacity: 0.52,
          blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false,
        })
      );
      ring.rotation.x = Math.PI * 0.28;
      grp.add(ring);
    }

    // Planet ambient light
    const pLight = new THREE.PointLight(cfg.color, 0.6, cfg.r * 5);
    grp.add(pLight);

    scene.add(grp);

    // HTML label
    const el = document.createElement('div');
    el.className = 'planet-label';
    el.textContent = cfg.label;
    el.style.setProperty('--c', cfg.hex);
    container.appendChild(el);

    planets.push({
      cfg, grp, sphere, labelEl: el,
      active: true,
      spinSpd: 0.0008 + Math.random() * 0.0018,
    });
  });
}

// ─── SPACESHIP MODEL ──────────────────────────────────────────────────
function buildShip() {
  shipGroup = new THREE.Group();

  const matHull = new THREE.MeshPhongMaterial({
    color: 0xBEDEED, emissive: 0x001122, specular: 0x55AACC, shininess: 120,
  });
  const matDark = new THREE.MeshPhongMaterial({
    color: 0x223344, emissive: 0x00080F, shininess: 40,
  });
  const matGlass = new THREE.MeshPhongMaterial({
    color: 0x00CFFF, emissive: 0x004466,
    transparent: true, opacity: 0.70, shininess: 300,
  });
  const matGlow = new THREE.MeshBasicMaterial({ color: 0x00CFFF });
  const matWing = new THREE.MeshPhongMaterial({
    color: 0x99BBCC, emissive: 0x000A11, specular: 0x44AACC, shininess: 80,
    side: THREE.DoubleSide,
  });
  const matLine = new THREE.LineBasicMaterial({
    color: 0x00CFFF, transparent: true, opacity: 0.55,
  });

  // ── Fuselage (tapered cylinder: narrow at -Z front, wide at +Z rear) ──
  const bodyGeo = new THREE.CylinderGeometry(0.22, 0.66, 5.2, 8);
  bodyGeo.rotateX(-Math.PI / 2); // radiusTop(0.22) → -Z, radiusBottom(0.66) → +Z
  const body = new THREE.Mesh(bodyGeo, matHull);
  body.position.z = 0.3;
  shipGroup.add(body);

  // ── Nose cone ──
  const noseGeo = new THREE.ConeGeometry(0.22, 1.55, 8);
  noseGeo.rotateX(-Math.PI / 2); // tip → -Z, base → +Z
  const nose = new THREE.Mesh(noseGeo, matHull);
  // Fuselage narrow end at z = 0.3 - 2.6 = -2.3; nose half-height = 0.775
  nose.position.z = -2.3 - 0.775; // base aligns with fuselage front
  shipGroup.add(nose);

  // ── Cockpit dome (half-sphere on top, forward) ──
  const domeGeo = new THREE.SphereGeometry(0.38, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.52);
  const dome = new THREE.Mesh(domeGeo, matGlass);
  dome.rotation.x = Math.PI;   // open face points down
  dome.position.set(0, 0.44, -1.3);
  shipGroup.add(dome);

  // ── Wings (swept-back quads via BufferGeometry) ──
  // Right wing — normals computed via [0,2,1, 0,3,2] → +Y facing
  const makeWing = (side) => {
    const s = side;
    const verts = new Float32Array([
      s * 0.45, 0.00, -0.55,  // 0 inner-front
      s * 2.90, -0.04, -0.05,  // 1 outer-front
      s * 3.25, 0.00, 1.90,  // 2 outer-back
      s * 0.52, 0.00, 2.10,  // 3 inner-back
    ]);
    const idx = side > 0
      ? new Uint16Array([0, 2, 1, 0, 3, 2])   // right: CCW from above → +Y normal
      : new Uint16Array([0, 1, 2, 0, 2, 3]);  // left: reversed winding

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
    geo.setIndex(new THREE.BufferAttribute(idx, 1));
    geo.computeVertexNormals();
    return new THREE.Mesh(geo, matWing);
  };
  shipGroup.add(makeWing(1));
  shipGroup.add(makeWing(-1));

  // Wing-tip fins
  [1, -1].forEach(s => {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.52, 0.95), matDark);
    fin.position.set(s * 3.1, 0.26, 1.6);
    shipGroup.add(fin);
  });

  // ── Engine pods (twin, at rear) ──
  [1.25, -1.25].forEach(xOff => {
    const engGeo = new THREE.CylinderGeometry(0.19, 0.27, 1.45, 10);
    engGeo.rotateX(-Math.PI / 2);
    const eng = new THREE.Mesh(engGeo, matDark);
    eng.position.set(xOff, -0.13, 1.75);
    shipGroup.add(eng);

    // Nozzle glow disc
    const nz = new THREE.Mesh(new THREE.CircleGeometry(0.19, 16), matGlow);
    nz.position.set(xOff, -0.13, 2.49);  // back face of engine (+Z)
    shipGroup.add(nz);

    // Engine point light (pulsed each frame)
    const eLight = new THREE.PointLight(0x00CFFF, 4.0, 8);
    eLight.position.set(xOff, -0.13, 2.7);
    shipGroup.add(eLight);
    engineLights.push(eLight);
  });

  // ── Neon accent lines ──
  const edgePts = [
    new THREE.Vector3(0, 0.58, -3.0), new THREE.Vector3(0, 0.58, 1.8),  // spine
    new THREE.Vector3(0.45, 0, -0.55), new THREE.Vector3(2.9, -0.04, -0.05), // R leading
    new THREE.Vector3(-0.45, 0, -0.55), new THREE.Vector3(-2.9, -0.04, -0.05), // L leading
  ];
  const edgeGeo = new THREE.BufferGeometry().setFromPoints(edgePts);
  shipGroup.add(new THREE.LineSegments(edgeGeo, matLine));

  scene.add(shipGroup);
}

// ─── ENGINE TRAIL ─────────────────────────────────────────────────────
function setupTrail() {
  trailPositions = new Float32Array(TRAIL_MAX * 3);
  trailGeo = new THREE.BufferGeometry();
  trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
  trailGeo.setDrawRange(0, 0);

  trailMesh = new THREE.Points(trailGeo, new THREE.PointsMaterial({
    color: 0x00CFFF, size: 0.55, transparent: true, opacity: 0.55,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
  }));
  scene.add(trailMesh);
}

function emitTrail() {
  tmpEul.set(shipPitch, shipYaw, shipRoll, 'YXZ');
  [1.25, -1.25].forEach(xOff => {
    const local = new THREE.Vector3(xOff, -0.13, 2.6);
    local.applyEuler(tmpEul);
    local.add(shipPos);
    local.x += (Math.random() - 0.5) * 0.25;
    local.y += (Math.random() - 0.5) * 0.25;
    trailParticles.push({ x: local.x, y: local.y, z: local.z, age: 0 });
  });
  while (trailParticles.length > TRAIL_MAX) trailParticles.shift();
}

function tickTrail() {
  for (let i = trailParticles.length - 1; i >= 0; i--) {
    trailParticles[i].age++;
    if (trailParticles[i].age > 32) { trailParticles.splice(i, 1); }
  }
  const cnt = Math.min(trailParticles.length, TRAIL_MAX);
  for (let i = 0; i < cnt; i++) {
    trailPositions[i * 3] = trailParticles[i].x;
    trailPositions[i * 3 + 1] = trailParticles[i].y;
    trailPositions[i * 3 + 2] = trailParticles[i].z;
  }
  trailGeo.setDrawRange(0, cnt);
  trailGeo.attributes.position.needsUpdate = true;
}

// ─── SHIP UPDATE ──────────────────────────────────────────────────────
function tickShip() {
  // Pause ship speed and steering when a section panel window is open
  const isPaused = !!document.querySelector('.section-panel.active');
  if (isPaused) {
    const fill = document.getElementById('sbFill');
    if (fill) fill.style.width = '0%';
    return;
  }

  // Raw steer (-1 to 1)
  const DZ = 0.06;
  const rawX = Math.abs((mouse.x - W / 2) / (W / 2)) > DZ ? (mouse.x - W / 2) / (W / 2) : 0;
  const rawY = Math.abs((mouse.y - H / 2) / (H / 2)) > DZ ? (mouse.y - H / 2) / (H / 2) : 0;

  // Smooth
  smoX += (rawX - smoX) * STEER_SMO;
  smoY += (rawY - smoY) * STEER_SMO;

  // Accumulate rotation
  shipYaw -= smoX * TURN_SPD;
  shipPitch -= smoY * PITCH_SPD;
  shipPitch = Math.max(-MAX_PITCH, Math.min(MAX_PITCH, shipPitch));

  // Banking roll
  const targetRoll = -smoX * MAX_ROLL;
  shipRoll += (targetRoll - shipRoll) * ROLL_LERP;

  // Apply to ship mesh
  shipGroup.rotation.set(shipPitch, shipYaw, shipRoll, 'YXZ');

  // Move forward in ship's facing direction
  const fwd = new THREE.Vector3(0, 0, -1);
  tmpEul.set(shipPitch, shipYaw, 0, 'YXZ');
  fwd.applyEuler(tmpEul);
  const spd = isBoosting ? BOOST_SPEED : SHIP_SPEED;
  shipPos.addScaledVector(fwd, spd);
  shipGroup.position.copy(shipPos);

  // Engine light pulse
  const t = performance.now() * 0.006;
  engineLights.forEach((l, i) => {
    l.intensity = 3.5 + Math.sin(t + i * Math.PI) * 2.0;
  });

  // Speed indicator
  const pct = isBoosting ? 100 : Math.min(100, 60 + Math.abs(smoX) * 40);
  const fill = document.getElementById('sbFill');
  if (fill) fill.style.width = pct + '%';
  const boostLabel = document.getElementById('sbBoost');
  if (boostLabel) boostLabel.style.opacity = isBoosting ? '1' : '0.2';

  emitTrail();
  if (shootCd > 0) shootCd--;
}

// ─── CAMERA ───────────────────────────────────────────────────────────
function tickCamera() {
  // Offset behind and above ship, partially rotated with ship yaw+pitch
  tmpEul.set(shipPitch * 0.65, shipYaw, 0, 'YXZ');
  const offset = new THREE.Vector3(0, CAM_OFFSET_Y, CAM_OFFSET_Z);
  offset.applyEuler(tmpEul);
  const targetPos = shipPos.clone().add(offset);

  camera.position.lerp(targetPos, CAM_LERP);

  // Camera up (yaw-only prevents gimbal lock during steep pitches)
  const up = new THREE.Vector3(0, 1, 0);
  up.applyEuler(new THREE.Euler(0, shipYaw, 0, 'YXZ'));
  camera.up.copy(up);

  // LookAt: ship position + small forward offset
  tmpEul.set(shipPitch, shipYaw, 0, 'YXZ');
  const fwdLook = new THREE.Vector3(0, 0, -4).applyEuler(tmpEul);
  const lookAt = shipPos.clone().add(fwdLook);
  lookAt.y += 0.5;
  camera.lookAt(lookAt);
}

// ─── SHOOT ────────────────────────────────────────────────────────────
function shoot() {
  if (!gameRunning || shootCd > 0) return;
  if (document.querySelector('.section-panel.active')) return;
  shootCd = SHOOT_CD;

  tmpEul.set(shipPitch, shipYaw, shipRoll, 'YXZ');
  const fwd = new THREE.Vector3(0, 0, -1).applyEuler(
    new THREE.Euler(shipPitch, shipYaw, 0, 'YXZ')
  );

  // Start from ship nose in world space
  const nose = new THREE.Vector3(0, 0, -4.1).applyEuler(tmpEul).add(shipPos);

  // Bullet mesh
  const bMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 6, 6),
    new THREE.MeshBasicMaterial({ color: 0x00CFFF, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  bMesh.position.copy(nose);

  // Glow halo around bullet
  bMesh.add(new THREE.Mesh(
    new THREE.SphereGeometry(0.58, 6, 6),
    new THREE.MeshBasicMaterial({
      color: 0x0088CC, transparent: true, opacity: 0.35,
      blending: THREE.AdditiveBlending, depthWrite: false
    })
  ));
  // Bullet point light
  const bLight = new THREE.PointLight(0x00CFFF, 3.0, 8);
  bMesh.add(bLight);

  scene.add(bMesh);
  bullets.push({ mesh: bMesh, vel: fwd.multiplyScalar(BULLET_SPD), age: 0 });

  sfxShoot();

  // Muzzle flash
  const flash = new THREE.PointLight(0x00FFFF, 18, 14);
  flash.position.copy(nose);
  scene.add(flash);
  setTimeout(() => scene.remove(flash), 90);
}

function tickBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.mesh.position.add(b.vel);
    b.age++;
    if (b.age > BULLET_TTL) {
      scene.remove(b.mesh);
      bullets.splice(i, 1);
    }
  }
}

// ─── COLLISION DETECTION ──────────────────────────────────────────────
function checkHits() {
  for (let bi = bullets.length - 1; bi >= 0; bi--) {
    const b = bullets[bi];
    for (const p of planets) {
      if (!p.active) continue;
      if (b.mesh.position.distanceTo(p.grp.position) < p.cfg.r + 5) {
        explodePlanet(p);
        scene.remove(b.mesh);
        bullets.splice(bi, 1);
        break;
      }
    }
  }
}

// ─── EXPLOSION ────────────────────────────────────────────────────────
function explodePlanet(planet) {
  planet.active = false;
  planet.grp.visible = false;
  planet.labelEl.style.display = 'none';

  const pos = planet.grp.position;
  const color = planet.cfg.color;

  // ── Particle burst ──
  const exPositions = new Float32Array(EXPL_COUNT * 3);
  const exGeo = new THREE.BufferGeometry();
  exGeo.setAttribute('position', new THREE.BufferAttribute(exPositions, 3));
  const exMat = new THREE.PointsMaterial({
    color, size: 3.0, transparent: true, opacity: 1.0,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
  });
  const exMesh = new THREE.Points(exGeo, exMat);
  scene.add(exMesh);

  // ── Shockwave ring ──
  const ringMat = new THREE.MeshBasicMaterial({
    color, transparent: true, opacity: 1.0,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1, 0.6, 4, 64), ringMat);
  ring.position.copy(pos);
  ring.lookAt(camera.position);
  scene.add(ring);

  // ── Secondary flash ──
  const flash = new THREE.PointLight(color, 20, planet.cfg.r * 5);
  flash.position.copy(pos);
  scene.add(flash);
  setTimeout(() => scene.remove(flash), 300);

  // Generate particle velocities
  const vels = [];
  for (let i = 0; i < EXPL_COUNT; i++) {
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    const sp = Math.random() * 7 + 2;
    exPositions[i * 3] = pos.x;
    exPositions[i * 3 + 1] = pos.y;
    exPositions[i * 3 + 2] = pos.z;
    vels.push({
      x: Math.sin(ph) * Math.cos(th) * sp,
      y: Math.sin(ph) * Math.sin(th) * sp,
      z: Math.cos(ph) * sp,
    });
  }

  explosions.push({
    positions: exPositions, geo: exGeo, mesh: exMesh,
    ring, ringMat, vels, mat: exMat,
    age: 0, maxAge: 85, planet,
  });

  sfxExplosion();
  setTimeout(() => openSection(planet.cfg.id), 650);
  // Respawn planet
  setTimeout(() => {
    planet.active = true;
    planet.grp.visible = true;
    planet.labelEl.style.display = '';
  }, 9000);
}

function tickExplosions() {
  for (let ei = explosions.length - 1; ei >= 0; ei--) {
    const ex = explosions[ei];
    ex.age++;
    const t = ex.age / ex.maxAge;

    // Shockwave
    const rs = ex.age * 3.0;
    ex.ring.scale.set(rs, rs, rs);
    ex.ringMat.opacity = Math.max(0, 1.0 - t * 1.6);
    ex.ring.lookAt(camera.position);

    // Particles
    for (let i = 0; i < EXPL_COUNT; i++) {
      ex.vels[i].x *= 0.965; ex.vels[i].y *= 0.965; ex.vels[i].z *= 0.965;
      ex.positions[i * 3] += ex.vels[i].x;
      ex.positions[i * 3 + 1] += ex.vels[i].y;
      ex.positions[i * 3 + 2] += ex.vels[i].z;
    }
    ex.geo.setDrawRange(0, EXPL_COUNT);
    ex.geo.attributes.position.needsUpdate = true;
    ex.mat.opacity = Math.max(0, 1.0 - t * 1.3);

    if (ex.age >= ex.maxAge) {
      scene.remove(ex.mesh);
      scene.remove(ex.ring);
      explosions.splice(ei, 1);
    }
  }
}

// ─── PLANET SELF-ROTATION ─────────────────────────────────────────────
function tickPlanets() {
  planets.forEach(p => {
    if (p.grp.visible) p.sphere.rotation.y += p.spinSpd;
  });
}

// ─── PLANET HTML LABELS ───────────────────────────────────────────────
function tickLabels() {
  planets.forEach(p => {
    if (!p.active || !p.grp.visible) { p.labelEl.style.display = 'none'; return; }

    tmpVec.copy(p.grp.position).project(camera);

    // Behind camera?
    if (tmpVec.z > 1.0) { p.labelEl.style.display = 'none'; return; }

    const sx = (tmpVec.x * 0.5 + 0.5) * W;
    const sy = (-tmpVec.y * 0.5 + 0.5) * H;
    const d = shipPos.distanceTo(p.grp.position);
    const sc = Math.max(0.85, Math.min(2.2, 480 / d));

    p.labelEl.style.display = '';
    p.labelEl.style.left = sx + 'px';
    p.labelEl.style.top = (sy - p.cfg.r * 0.85) + 'px';
    p.labelEl.style.transform = `translate(-50%, -100%) scale(${sc})`;
    p.labelEl.classList.toggle('near', d < p.cfg.r + 200);
  });
}

// ─── TARGETING RETICLE ────────────────────────────────────────────────
function tickReticle() {
  // Raycast from screen center
  raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
  const spheres = planets.filter(p => p.active).map(p => p.sphere);
  const hits = raycaster.intersectObjects(spheres, false);

  if (hits.length > 0) {
    reticleEl.classList.add('locked');
  } else {
    reticleEl.classList.remove('locked');
  }

  // Proximity hint (nearest planet within range)
  let nearPlanet = null, nearDist = Infinity;
  planets.forEach(p => {
    if (!p.active) return;
    const d = shipPos.distanceTo(p.grp.position);
    if (d < p.cfg.r + 200 && d < nearDist) { nearDist = d; nearPlanet = p; }
  });

  if (nearPlanet && !document.querySelector('.section-panel.active')) {
    proximityEl.innerHTML = `◉ &nbsp;<strong>${nearPlanet.cfg.label}</strong>&nbsp; — FIRE TO ENTER`;
    proximityEl.style.color = nearPlanet.cfg.hex;
    proximityEl.style.borderColor = nearPlanet.cfg.hex + '44';
    proximityEl.style.opacity = '1';
  } else {
    proximityEl.style.opacity = '0';
  }
}

// ─── AUDIO ────────────────────────────────────────────────────────────
function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function sfxShoot() {
  if (!soundOn) return;
  try {
    const ac = getAudio();
    const o = ac.createOscillator(), g = ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type = 'sine';
    o.frequency.setValueAtTime(700, ac.currentTime);
    o.frequency.exponentialRampToValueAtTime(140, ac.currentTime + 0.18);
    g.gain.setValueAtTime(0.22, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.20);
    o.start(); o.stop(ac.currentTime + 0.22);
  } catch (_) { }
}

function sfxExplosion() {
  if (!soundOn) return;
  try {
    const ac = getAudio();
    const dur = 0.8;
    const buf = ac.createBuffer(1, ac.sampleRate * dur, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 1.8);
    const src = ac.createBufferSource();
    src.buffer = buf;
    const flt = ac.createBiquadFilter();
    flt.type = 'lowpass'; flt.frequency.value = 320;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.9, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
    src.connect(flt); flt.connect(g); g.connect(ac.destination);
    src.start(); src.stop(ac.currentTime + dur);
  } catch (_) { }
}

// ─── SECTION PANELS ───────────────────────────────────────────────────
function openSection(id) {
  closeAll();
  const panel = document.getElementById('panel-' + id);
  if (!panel) return;
  panel.classList.add('active');
  // Animate skill bars on open
  if (id === 'skills') {
    panel.querySelectorAll('.skill-fill').forEach(b => (b.style.width = '0%'));
    requestAnimationFrame(() => requestAnimationFrame(() => {
      panel.querySelectorAll('.skill-fill').forEach(b => {
        b.style.width = (b.dataset.width || '80') + '%';
      });
    }));
  }
}

function closeAll() {
  document.querySelectorAll('.section-panel.active').forEach(p => p.classList.remove('active'));
}

// ─── CONTROLS ─────────────────────────────────────────────────────────
function setupControls() {
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  window.addEventListener('click', e => {
    if (!gameRunning) return;
    if (e.target.closest('.section-panel, .sound-btn, .launch-btn')) return;
    shoot();
  });

  window.addEventListener('keydown', e => {
    if (e.code === 'Space') { e.preventDefault(); if (gameRunning) shoot(); }
    if (e.code === 'Escape') closeAll();
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') isBoosting = true;
  });
  window.addEventListener('keyup', e => {
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') isBoosting = false;
  });

  window.addEventListener('resize', () => {
    W = window.innerWidth; H = window.innerHeight;
    renderer.setSize(W, H);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
  });
}

// ─── UI ───────────────────────────────────────────────────────────────
function setupUI() {
  document.getElementById('launchBtn').addEventListener('click', () => {
    const intro = document.getElementById('introScreen');
    intro.classList.add('fade-out');
    setTimeout(() => { intro.style.display = 'none'; }, 950);
    document.getElementById('hud').classList.add('visible');
    gameRunning = true;
  });

  document.getElementById('soundBtn').addEventListener('click', () => {
    soundOn = !soundOn;
    document.getElementById('soundIcon').textContent = soundOn ? '🔊' : '🔇';
  });

  document.querySelectorAll('.panel-close').forEach(btn => {
    btn.addEventListener('click', closeAll);
  });

  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const ok = document.getElementById('formSuccess');
    ok.classList.add('show');
    setTimeout(() => ok.classList.remove('show'), 4000);
    e.target.reset();
  });
}

// ─── MAIN LOOP ────────────────────────────────────────────────────────
function animate() {
  requestAnimationFrame(animate);

  if (gameRunning) {
    tickShip();
    tickCamera();
    tickTrail();
    tickBullets();
    checkHits();
    tickExplosions();
    tickPlanets();
    tickLabels();
    tickReticle();
  }

  renderer.render(scene, camera);
}

// ─── BOOT ─────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', init);
