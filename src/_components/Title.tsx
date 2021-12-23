import { Heading } from '@chakra-ui/react';
import React from 'react';

interface titleProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size: '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
}

const Title: React.FC<titleProps> = ({ children, as, size }) => {
  return (
    <Heading as={as} size={size}>
      {children}
    </Heading>
  );
};

export default Title;
