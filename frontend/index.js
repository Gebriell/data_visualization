import React, { useState, useEffect } from 'react';

const App = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then(res => res.text())
      .then(text => setText(text));
  }, []);

  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
};

export default App;
