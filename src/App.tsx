import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import SchoolPage from './components/SchoolPage';
import { Box } from '@mui/material';
import { AppProvider } from './contexts/AppContext';

const App: React.FC = () => {
  return (
    <AppProvider>
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
            <Route path="/escola/:id" element={<SchoolPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Box>

        <Box sx={{ bgcolor: '#A2845E', height: '10px' }} />
      </main>
    </AppProvider>
  );
};

export default App;