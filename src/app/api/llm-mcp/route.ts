import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// TODO: Replace with actual MCP server URL
const MCP_SERVER_URL = process.env.MCP_SERVER_URL || 'http://localhost:3001';

export async function POST(req: Request) {
  try {
    const { prompt, userId } = await req.json();

    if (!prompt || !userId) {
      return NextResponse.json(
        { error: 'Prompt and userId are required' },
        { status: 400 }
      );
    }

    // Get context from MCP server
    const mcpResponse = await fetch(`${MCP_SERVER_URL}/context/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!mcpResponse.ok) {
      throw new Error('Failed to get context from MCP server');
    }

    const { context } = await mcpResponse.json();

    // Combine context with user prompt
    const enhancedPrompt = `Context: ${context}\n\nUser Question: ${prompt}`;

    const message = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages: [{ role: 'user', content: enhancedPrompt }],
    });

    const response = message.content[0].type === 'text' ? message.content[0].text : '';
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 