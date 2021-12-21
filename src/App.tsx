import React from 'react';
import './App.css';
import { Box, Text } from '@chakra-ui/react';
import Header from '_components/Header';

function App() {
  return (
    <Box>
      <Header />
      <Box>
        <Text>hello world</Text>
      </Box>
    </Box>
  );
}

export default App;
