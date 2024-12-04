import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
   
  <section className='parent'>
    
    <div className='home'>
    <h1>Task Management <br />Dashboard</h1>
    <Link to='/tasks'><button>Get Started</button></Link>
    </div>
    </section>
    </>
  )
}

export default Home