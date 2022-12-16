const URL="https://findfalcone.herokuapp.com/"
var token=""

function sortById() {
  return function (a, b) {
    if (a.id < b.id) {
      return -1;
    } else if (a.id > b.id) {
      return 1;
    } else {
      return 0;
    }
  };
}      

export const getData = async() => {
  try {
    const planetResponse= await fetch(`${URL}planets`,{ method:"GET" })
    const planets= await planetResponse.json()
    const vehiclesResponse= await fetch(`${URL}vehicles`,{ method:"GET"})
    const vehicles= await vehiclesResponse.json()
    const tokenResponse= await fetch(`${URL}token`,{ method:"POST",headers:{ 'Accept' : 'application/json' }})
    token=await tokenResponse.json()
    return {planets,vehicles,token}
  } 
  catch (error) {
    return error
  } 
}

export const findFalcone = async(planets,vehicles) => { 
  try {
    planets.sort(sortById())
    vehicles.sort(sortById())
    const planetNames=planets.map(planet=>planet.name)
    const vehicleNames=vehicles.map(vehicle=>vehicle.name) 
    const resultFetched=await fetch(`${URL}find`,{ method:"POST",headers:{ 'Accept' : 'application/json','Content-Type' :'application/json' },
                 body:JSON.stringify({"token":token.token,"planet_names":planetNames,"vehicle_names":vehicleNames})})
                 const result=resultFetched.json()
    return result  
  } 
  catch (error) {
    return error
  }
}
