# Huzzlingo

A modern language learning app built with React, TypeScript, and Tailwind CSS. Features interactive lessons, drag-and-drop exercises, and an AI-powered final boss conversation challenge.

## Features

- 🎯 Interactive lessons with multiple choice and drag-and-drop questions
- 📊 Progress tracking with XP system and level progression  
- 🔥 Streak tracking to maintain learning momentum
- 🤖 AI-powered final boss conversation challenge (powered by HuggingFace)
- 📱 Responsive design for desktop and mobile
- 🎨 Beautiful UI with smooth animations

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd huzzlingo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables for AI features (optional):
   - Copy `.env.local` file and add your HuggingFace API key
   - Get a free API key from [HuggingFace](https://huggingface.co/settings/tokens)
   - Replace `your_huggingface_api_key_here` with your actual API key

```bash
# .env.local
VITE_HUGGINGFACE_API_KEY=your_actual_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## AI Features

### Final Boss AI Integration

The final boss feature uses HuggingFace's AI models to create dynamic conversations:

- **Without API key**: Uses rule-based responses (still fully functional)
- **With API key**: Uses AI-powered responses for more natural conversations

The AI integration includes:
- Personality-driven responses as "Sarah" 
- Context-aware conversation analysis
- Intelligent scoring based on conversation quality
- Fallback to original behavior if AI is unavailable

### Setting up HuggingFace API

1. Visit [HuggingFace](https://huggingface.co/)
2. Create a free account
3. Go to Settings → Access Tokens
4. Create a new token with "Read" permissions
5. Add the token to your `.env.local` file

The app will automatically detect if an API key is available and enable AI features accordingly.

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **AI Integration**: HuggingFace Inference API
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── features/           # Redux slices
├── hooks/              # Custom React hooks
├── services/           # API services (including AI service)
├── lib/               # Utility functions and types
└── data/              # Static data and lessons
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
