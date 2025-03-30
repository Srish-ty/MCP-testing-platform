# MCP Testing Platform

A split-view testing platform that allows you to compare LLM responses with and without MCP (Memory Context Provider) context. This platform helps evaluate the effectiveness of context-aware responses versus direct LLM responses.

## Features

- Split-view interface showing responses side by side
- Direct LLM integration with Claude
- MCP-enhanced responses with context
- Real-time comparison of responses
- Error handling and loading states

## Prerequisites

- Node.js 18+ installed
- Anthropic API key
- MCP server running locally or accessible via URL

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with the following variables:
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   MCP_SERVER_URL=http://localhost:3001
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter your prompt in the text field
3. Click "Submit" to get responses from both the direct LLM and MCP-enhanced endpoints
4. Compare the responses in the split view

## Architecture

- Frontend: Next.js with Material UI
- LLM: Claude (via Anthropic API)
- API Routes:
  - `/api/llm`: Direct LLM calls
  - `/api/llm-mcp`: MCP-enhanced LLM calls

## Development

The project uses:
- TypeScript for type safety
- Material UI for components
- Next.js App Router
- Anthropic SDK for Claude integration

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
