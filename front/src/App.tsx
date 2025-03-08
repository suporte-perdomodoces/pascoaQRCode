import { useState } from 'react';
import './App.css';
import FormVideo from './pages/FormVideo';
import Login from './pages/Login';
import View from './pages/view';

function App() {
  const [isLogged, setIsLogged] = useState(true);
  
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