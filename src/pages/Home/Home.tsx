import React from 'react';
import { Box } from '@chakra-ui/react';
import Title from '_components/Title';

const Home = () => {
  return (
    <>
      <Box>
        <Title as="h2" size="sm">
          ToDoリスト
        </Title>
      </Box>
    </>
  );
};

export default Home;
