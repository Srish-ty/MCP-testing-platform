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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // TODO: Implement API calls to both endpoints
      // For now, we'll just simulate the responses
      setResponseWithMCP('Response with MCP context will appear here...');
      setResponseWithoutMCP('Response without MCP context will appear here...');
    } catch (error) {
      console.error('Error:', error);
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
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Response with MCP Context
            </Typography>
            <Box sx={{ flexGrow: 1, whiteSpace: 'pre-wrap' }}>
              {responseWithMCP}
            </Box>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
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
