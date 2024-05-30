import React from 'react'
import Navbar from './Component/Navbar/Navbar';
import { Sidebar } from 'phosphor-react';
import Admin from './Pages/Admin/Admin';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Admin/>
    </div>
  )
}

export default App;