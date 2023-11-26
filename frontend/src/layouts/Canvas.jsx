import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Question1 from '../pages/Question1'
import Question2 from '../pages/Question2'
import Question5 from '../pages/Question5'
import Question6 from '../pages/Question6'
import Navbar from '../components/Navbar'
import Question7 from '../pages/Question7'

/**
 * This canvas is the main container for all the pages including the navbar
 * Register all your pages here!
 */

function Canvas() {
  return (
    <div className='canvas'>
        <Navbar />

        <div className='content'>
            <Routes>
                <Route path='/' element={<h1>Home</h1>} />
                <Route path='/q1' element={<Question1 />} />
                <Route path='/q2' element={<Question2 />} />
                <Route path='/q5' element={<Question5 />} />
                <Route path='/q6' element={<Question6 />} />
                <Route path='/q7' element={<Question7 />} />
                <Route path='*' element={<h1>404!</h1>} />
            </Routes>
        </div>
    </div>
  )
}

export default Canvas