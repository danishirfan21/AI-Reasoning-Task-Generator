# 🧩 AI Logic Puzzle Generator

A simple web application that generates logic puzzles, riddles, and trick questions using OpenAI's GPT-4 API.

## 📁 Project Structure

```
ai-puzzle-generator/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .env.example
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone or download the project**

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example env file
   cp .env.example .env
   
   # Edit .env and add your OpenAI API key
   # OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

4. **Start the backend server**
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

5. **Access the application**
   - Open your browser and navigate to: `http://localhost:3000`

## 🎮 Usage

1. Click the **"Generate Logic Puzzle"** button
2. Wait for GPT-4 to generate a new puzzle
3. Read the question, answer, and explanation
4. Click again to generate a new puzzle!

## 🔧 API Endpoints

- **POST** `/api/generate-puzzle` - Generates a new logic puzzle
- **GET** `/api/health` - Health check endpoint

## 📦 Dependencies

### Backend
- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management
- `openai` - OpenAI API client

### Frontend
- Pure HTML/CSS/JavaScript (no framework required)

## 🛠️ Development

The app uses a simple client-server architecture:

- **Backend**: Express.js server that handles API requests to OpenAI
- **Frontend**: Static HTML/CSS/JS that makes fetch requests to the backend
- **Security**: API key is stored server-side, never exposed to the client

## 🔐 Security Notes

- Never commit your `.env` file
- Keep your OpenAI API key secure
- The backend serves as a proxy to keep your API key private

## 📝 License

MIT

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Enjoy solving AI-generated puzzles! 🧠✨**