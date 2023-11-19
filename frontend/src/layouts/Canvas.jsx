import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Question6 from '../pages/Question6'
import Navbar from '../components/Navbar'

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
                <Route path='/q6' element={<Question6 />} />
            </Routes>
        </div>
    </div>
  )
}

export default Canvas