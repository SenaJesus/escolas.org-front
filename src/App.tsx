import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import { Box } from '@mui/material';
import { DataProvider } from './contexts/DataContext';

const App: React.FC = () => {
  return (
    <DataProvider>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh'
        }}
      >
        <NavBar />
        
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Box>

        <Box sx={{ bgcolor: '#A2845E', height: '10px' }} />
      </main>
    </DataProvider>
  );
};

export default App;