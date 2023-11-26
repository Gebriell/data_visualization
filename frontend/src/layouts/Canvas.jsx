import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Question6 from '../pages/Question6'
import Navbar from '../components/Navbar'
import Question7 from '../pages/Question7'
import Question3 from '../pages/Question3'
import Question4 from '../pages/Question4'

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
                <Route path='/q3' element={<Question3 />} />
                <Route path='/q4' element={<Question4 />} />
                <Route path='/q6' element={<Question6 />} />
                <Route path='/q7' element={<Question7 />} />
                <Route path='*' element={<h1>404!</h1>} />
            </Routes>
        </div>
    </div>
  )
}

export default Canvas