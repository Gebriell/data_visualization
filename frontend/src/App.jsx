import { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Question6 from './pages/Question6'
import Canvas from './layouts/Canvas'
// import ChartJSExplore from './pages/ChartJSExplore'

function App() {
  // const [count, setCount] = useState(0)

  // try fetching from the backend
  /*
  const [msg, setMsg] = useState('');
  useEffect(() => {
    fetch('http://localhost:3000/')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setMsg(data.body);})
  }, [])
  */
  
  return (
    // let's just put the page to be rendered here
    // would replace it with react router later
    <Router> 
      <div className="App">
        <Canvas />
      </div>
    </Router>
    
  )
}

export default App
