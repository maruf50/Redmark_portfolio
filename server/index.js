import express from 'express';
import cors from 'cors';
import { portfolioData } from './data/portfolioData.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// In-memory contact storage for demo
const messages = [];

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/profile', (req, res) => {
  res.json(portfolioData.profile);
});

app.get('/api/services', (req, res) => {
  res.json(portfolioData.services);
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message, projectType } = req.body;

  // Simple validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, and message are required fields.'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address.'
    });
  }

  const newMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: subject ? subject.trim() : 'General Inquiry',
    message: message.trim(),
    projectType: projectType || 'General',
    receivedAt: new Date().toISOString()
  };

  messages.push(newMessage);
  console.log('[API] New message received:', newMessage);

  return res.status(201).json({
    success: true,
    message: 'Your transmission has been recorded. I will respond within 24 hours.',
    referenceId: newMessage.id
  });
});

// Start Server (only if executed directly, e.g. local dev)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[Server] Portfolio Node.js API running on http://localhost:${PORT}`);
  });
}

export default app;
