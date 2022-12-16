import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'

const Header = () => {

const navigate=useNavigate()

  return (
    <>
      <div className='parent'>
        <div className='child'>
            <img className="logo" src={logo} alt='logo'></img>
        </div>
        <div className='child'>
            <h1 className='main-heading'>Finding Falcone!</h1>
        </div>
        <div className='child'  >
          <div align="right">
              <button className='reset-button' onClick={()=>navigate('/')}>Reset</button>
              <button className='geektrust-button' >
                <a className='no-underline' href="https://www.geektrust.in">Geek Trust Home</a>
              </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header