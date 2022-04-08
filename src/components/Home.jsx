import React from 'react'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

function Home() {
  return (
 <div className="home">
     <div className="container">
         <Link to="/admin">
     <Button style={{margin:50}} variant="outlined">ADMIN LOGIN</Button>
     </Link>
     <Link to="/watch">
     <Button variant="outlined">WATCH</Button>
     </Link>
     </div>
 </div>
  )
}

export default Home