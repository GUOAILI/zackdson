import React from 'react';  
  
// CenteredContainer 函数组件  
const Container = ({ children }) => {  
  return (  
    <div className="centered-container">  
      {children}  
    </div>  
  );  
};  
  
export default Container;