# AI Features Setup Guide

This guide explains how to enable the AI-powered final boss feature in Huzzlingo.

## Quick Start (Optional)

The app works perfectly without any API keys - you'll get rule-based responses in the final boss challenge. To enable AI-powered responses, follow the steps below.

## HuggingFace API Setup

### Step 1: Get a Free API Key

1. Visit [HuggingFace](https://huggingface.co/)
2. Create a free account (if you don't have one)
3. Go to your [Settings > Access Tokens](https://huggingface.co/settings/tokens)
4. Click "New token"
5. Give it a name (e.g., "Huzzlingo")
6. Select "Read" permissions
7. Click "Generate a token"
8. Copy the token (starts with `hf_...`)

### Step 2: Configure Your Environment

1. Create a file named `.env.local` in the project root
2. Add your API key:

```bash
VITE_HUGGINGFACE_API_KEY=hf_your_actual_token_here
```

### Step 3: Restart the Development Server

```bash
npm run dev
```

## How It Works

### With AI Enabled:
- Sarah responds using HuggingFace's DialoGPT model
- Conversation analysis uses sentiment analysis AI
- More natural, context-aware responses
- Green indicator shows "AI-Powered Sarah"

### Without AI (Fallback):
- Rule-based responses (original behavior)
- Pattern matching for conversation analysis
- Still fully functional and engaging
- Yellow indicator shows "Basic Sarah"

## AI Models Used

- **Conversation**: `microsoft/DialoGPT-large` - Generates natural dialogue
- **Analysis**: `cardiffnlp/twitter-roberta-base-sentiment-latest` - Sentiment analysis

## Privacy & Security

- API key is stored locally in `.env.local` (never committed to git)
- Conversations are sent to HuggingFace for processing
- No personal data is stored or logged by the app
- You can toggle AI on/off at any time in the final boss interface

## Troubleshooting

### "AI-Powered Sarah" not showing?
- Check your `.env.local` file exists in the project root
- Verify your API key starts with `hf_`
- Restart the development server

### Getting error responses?
- Check your HuggingFace account has API access
- Verify token has "Read" permissions
- Check browser console for detailed error messages

### Want to disable AI temporarily?
- Click "Toggle AI" button in the final boss interface
- Or remove/comment out the API key in `.env.local`

## Rate Limits & Pricing

HuggingFace Inference API (Free Tier):
- **Free Users**: 1,000 requests per day
- **PRO Users**: 20,000 requests per day ($9/month)
- Perfect for testing and personal use
- Rate limiting is enforced but generous for learning apps

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API key is correctly formatted
3. Try the toggle to switch between AI and basic modes
4. The app is designed to gracefully fallback to basic mode if AI fails 