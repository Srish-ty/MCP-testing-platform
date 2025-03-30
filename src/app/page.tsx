'use client';

import { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  height: '100%',
  minHeight: '400px',
  display: 'flex',
  flexDirection: 'column',
}));

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseWithMCP, setResponseWithMCP] = useState('');
  const [responseWithoutMCP, setResponseWithoutMCP] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      // For testing purposes, we'll use a fixed userId
      const userId = 'test-user-1';

      // Make parallel requests to both endpoints
      const [mcpResponse, directResponse] = await Promise.all([
        fetch('/api/llm-mcp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, userId }),
        }),
        fetch('/api/llm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        }),
      ]);

      if (!mcpResponse.ok || !directResponse.ok) {
        throw new Error('One or more API calls failed');
      }

      const [mcpData, directData] = await Promise.all([
        mcpResponse.json(),
        directResponse.json(),
      ]);

      setResponseWithMCP(mcpData.response);
      setResponseWithoutMCP(directData.response);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to get responses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        MCP Testing Platform
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          sx={{ mb: 2 }}
        />
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          disabled={loading || !prompt}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Response with MCP Context
            </Typography>
            <Box sx={{ flexGrow: 1, whiteSpace: 'pre-wrap' }}>
              {responseWithMCP}
            </Box>
          </Item>
        </Grid>
        <Grid xs={12} md={6}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Response without MCP Context
            </Typography>
            <Box sx={{ flexGrow: 1, whiteSpace: 'pre-wrap' }}>
              {responseWithoutMCP}
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}
