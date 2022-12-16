import React from 'react'
import { useNavigate,useLocation,Navigate} from 'react-router-dom'

const ResultScreen = () => {
  const navigate=useNavigate()
  const location=useLocation()

  if(!location?.state){ return <Navigate to='/' replace />}

  const {result,time}=location?.state

  if(result.message){
    return (
      <div className="message result">
        <h2>Error : {result.message} , Check Network connection... </h2>
        <button  className="find-button pad" onClick={()=>navigate('/')}>Start Again</button>
      </div>
    )
  }

  return (
    <div className="main message result">
      {result?.status==="success" && 
      <>
        <h2>Success! Congratulations on Finding Falcone. King Shan is mighty pleased.</h2>
        <h3>Time Taken : {time}</h3>
        <h3>Planet Found : {result.planet_name}</h3>
      </>
      }
      {result?.status==="false" &&
      <>
        <h2>Could Not Find Falcone... </h2>
        <h3>Time Taken : {time} </h3>
      </>
      }
      <button  className="find-button pad" onClick={()=>navigate('/')}>Start Again</button>
    </div>
  )
}

export default ResultScreen