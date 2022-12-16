import React,{ useState ,useEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { getData , findFalcone } from '../utils/fetchData'
import Selector from '../components/Selector'
import logo from '../images/logo.png'
import findingFalcone from '../images/findingFalcone.png'

const SelectionScreen = () => {
  
  const [vehicles,setVehicles]=useState([])
  const [planets,setPlanets]=useState([])
  const [selectedPlanets,setselectedPlanets]=useState([])
  const [selectedVehicles,setselectedVehicles]=useState([])
  const [totalTime,setTotalTime]=useState(0)
  const [loading,setLoading]=useState(true)
  const [finding,setFinding]=useState(false)
  const [defaultVehicles,setDefaultVehicles]=useState([])
  const [error,setError]=useState("")
  const selectorsArray=[0,1,2,3]

  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {  
    const loadData = async() => { 
        const data=await getData()
        if(data.message){ 
          setError(data.message)
        }
        if(data.planets && data.vehicles){
          setPlanets(data.planets) 
          setDefaultVehicles(JSON.parse(JSON.stringify(data.vehicles)));
          setVehicles(JSON.parse(JSON.stringify(data.vehicles))) 
        }
        setLoading(false) 
      }                                       
    loadData()                             
   }, [])          

   useEffect(() => {
      setselectedPlanets([])
      setselectedVehicles([])
      setVehicles(JSON.parse(JSON.stringify(defaultVehicles)))
   }, [location,defaultVehicles])

   const submitHandler = async() => { 
      setFinding(true)
      const result=await findFalcone(selectedPlanets,selectedVehicles)
      setFinding(false)
      navigate('/result',{state:{ result , time:totalTime } } )
   }

  useEffect(() => {
     setTotalTime(selectedVehicles.reduce((total,time)=>total+time.time,0))
  }, [selectedVehicles])

  const removePreviousVehicle = (id) => { // eslint-disable-next-line
    const previousVehicle= selectedVehicles.filter(vehicle=> vehicle.id == id)
    if(previousVehicle[0]?.name!==undefined){ 
        const objIndex = vehicles.findIndex((obj => obj.name === previousVehicle[0].name))
        if(objIndex !== -1){ 
          vehicles[objIndex].total_no += 1
        } 
      }
   }

  const selectPlanet = (e) => { 
    // eslint-disable-next-line
      const otherSelectedPlanets= [...selectedPlanets].filter(planet=> planet.id != e.target.id)
      const myArray = e.target.value.split(",");
      const newlySelected={ id :parseInt(e.target.id) , name :myArray[0] , distance :parseInt(myArray[1]) }
      setselectedPlanets([...otherSelectedPlanets,newlySelected])
      removePreviousVehicle(e.target.id)
        // eslint-disable-next-line
      setselectedVehicles(selectedVehicles.filter(vehicle=> vehicle.id != e.target.id))
    }

  const selectVehicle = (e) => {  
      removePreviousVehicle(e.target.name)
        // eslint-disable-next-line
      const otherSelectedVehicles= selectedVehicles.filter(vehicle=> vehicle.id != e.target.name)
      const myArray = e.target.value.split(",");// eslint-disable-next-line
      const timeTaken= selectedPlanets.find(p=>p.id==e.target.name).distance / parseInt(myArray[2])
      const newlySelected={ id :parseInt(e.target.name) , name :myArray[0] , speed:parseInt(myArray[2]), time:timeTaken }
            
      const objIndex = vehicles.findIndex((obj => obj.name === myArray[0]))
      vehicles[objIndex].total_no = myArray[1]-1
      setselectedVehicles([...otherSelectedVehicles,newlySelected]) 
  }

  if(loading){
    return <div  className="loading">
              <h1>Loading...</h1>
              <img className="image" src={logo} alt='logo'></img>
           </div>
  } 

  if(finding){
    return <div>
              <img className="finding-image" src={findingFalcone} alt='Finding Falcon'></img>
           </div>
  } 

  if(!loading&&(!planets.length||!vehicles.length)){
    return <div className="message">
              <h1 >Error : {error} , Check Network connection...</h1>
              <button  className="find-button pad" onClick={()=>navigate(0)}>Reload</button>
           </div>
  }

  return (
    <div className="main">
    <h3>Select planets you want to search in:</h3>

    <div className="grid-container">
      {selectorsArray.map((item,i)=>
        <div className="grid-item" key={i}>
          <Selector   planets={planets}   selectedPlanets={selectedPlanets}   selectPlanet={selectPlanet}  
            index={i} vehicles={vehicles} selectedVehicles={selectedVehicles} selectVehicle={selectVehicle} />
        </div>
        )}
    </div>

    <div className="find-button">
      <button onClick={submitHandler} disabled={selectedVehicles.length < 4} className="find-button">Find Falcone!</button>
      <span className='time'> Time Taken : {totalTime} </span>
    </div>

  </div>
  )
}

export default SelectionScreen