import { useState } from 'react';
import './App.css';
import View from './pages/FormVideo';
import Login from './pages/Login';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  
  return (
    <>

      {isLogged ?
        (<View />)
        : (<Login props={{ setIsLogged }} />)
      }
    </>
  );
}

export default App;