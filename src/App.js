import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import Admin from './components/Admin';
import Watch from './components/Watch';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/watch' element={<Watch />} />
    </Routes>
  );
}

export default App;
