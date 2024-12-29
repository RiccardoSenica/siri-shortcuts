# Siri Shortcuts

A versatile backend service that extends Siri's capabilities through custom shortcuts, enabling AI-powered voice interactions and automated tasks. Built with TypeScript and Next.js, this project demonstrates how to create a bridge between Apple's Shortcuts app and custom backend logic.

## 🌟 Features

- **Custom Siri Commands**: Extend Siri's functionality through Apple Shortcuts integration
- **AI-Powered Responses**: Leverages Claude AI for intelligent, context-aware responses
- **Extensible Command System**: Easy-to-expand architecture for adding new commands

## 🛠️ Technology Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **AI Integration**: Anthropic's Claude API
- **Testing**: Jest
- **Deployment**: Vercel
- **Code Quality**: ESLint, Prettier, Husky

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   yarn install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Fill in:

   - `USER_KEY`: Your API authentication key
   - `ANTHROPIC_API_KEY`: Your Anthropic API key for Claude AI

3. **Run development server**

   ```bash
   yarn dev
   ```

4. **Run tests**
   ```bash
   yarn test
   ```

## 📱 Setting Up Shortcuts

1. Create a new Shortcut in the iOS Shortcuts app
2. Add "Make HTTP Request" action
3. Configure the request:
   - URL: Your deployed API endpoint
   - Method: POST
   - Headers: Content-Type: application/json
   - Body:
     ```json
     {
       "command": "your_command",
       "apiKey": "your_api_key",
       "parameters": {}
     }
     ```

## 🔍 Available Commands

- **ping**: Test the API connection
- **time**: Get the current time
- **anthropic**: Ask Claude AI a question
  - Parameters: `{"question": "Your question here"}`

## 🔒 Security

- API key authentication required for all endpoints
- Secure headers configuration via Vercel
- Rate limiting and request validation
- HTTPS-only communication

## 🔮 Future Enhancements

- [ ] Add more AI-powered commands
- [ ] Implement user preferences and data storage
- [ ] Integrate with more external services
