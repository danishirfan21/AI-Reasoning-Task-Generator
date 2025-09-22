require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route to generate puzzle
app.post('/api/generate-puzzle', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are a creative puzzle generator. Generate interesting logic puzzles, riddles, or trick questions. Always respond with valid JSON in this exact format: {"question": "the puzzle question", "answer": "the correct answer", "explanation": "brief explanation of the solution"}',
        },
        {
          role: 'user',
          content:
            'Generate a new logic puzzle or trick question with its answer and explanation.',
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    const responseText = completion.choices[0].message.content;

    // Parse the JSON response
    const puzzleData = JSON.parse(responseText);

    res.json(puzzleData);
  } catch (error) {
    console.error('Error generating puzzle:', error);
    res.status(500).json({
      error: 'Failed to generate puzzle',
      message: error.message,
    });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
