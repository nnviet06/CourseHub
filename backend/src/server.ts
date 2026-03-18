// import app from './app' and start the server

import { Request, Response, NextFunction } from 'express';
import app from './app';



const PORT = process.env.PORT || 5000;


// Status check 
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: '404 not found' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
