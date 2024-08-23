import { useState } from 'react';
import reactLogo from 'src/assets/react.svg';
import viteLogo from 'public/vite.svg';
import './Popup.css';

function Popup() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>This sucks</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/Popup.tsx</code> and save to test HMR 2
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default Popup;
