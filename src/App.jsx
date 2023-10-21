import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CheckboxGroup from './CheckBox'


function App() {  

  return (
    <>
      <div className = "App"> 
      <CheckboxGroup numChildrenPerFamily={[2, 3, 1,500]} />
      </div>
    </>
  ) //since each family only has one parent just pass in the number of children you want in each family as an array makes it easier to generate 
}

export default App
