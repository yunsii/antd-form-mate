import React from 'react';

const Wrapper: React.FC = ({ children }) => {
  return <div style={{ margin: '0 auto', padding: '20px', width: 400, height: '100vh' }}>{children}</div>;
};

export default Wrapper;
