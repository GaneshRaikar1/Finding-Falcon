import React from 'react'

const Selector = ({ planets, vehicles, selectedPlanets, selectedVehicles, selectPlanet, selectVehicle, index }) => {

  return (
    <>
        <select required onChange={selectPlanet} id={index} value={ selectedPlanets ? "value" : "default"  } >
        <option disabled value="default" key={7} hidden={selectedPlanets} > 
          { "-- select a Planet --"  }   
        </option>
        <option disabled value="value" key={8} hidden={ !selectedPlanets }> 
          { selectedPlanets?.find( (p) => p.id === index ) ?
            selectedPlanets?.find( (p) => p.id === index ).name : 
            "-- select a Planet --"  
          }     
        </option>
        {planets?.map((planet,i)=>{
          return <option value={[ planet.name, planet.distance ]} key={ i }
                         hidden={ selectedPlanets?.filter(e => e.name === planet.name).length > 0 }
                  >
                  {planet.name}
                 </option>
        }) } 
        </select>

        { selectedPlanets?.find( p => p.id === index ) && 
           <div className="radio-button-container" onChange={selectVehicle} id={index} >
             {vehicles?.map((vehicle,i)=>{
               return <div className="radio-button">
                        <label>  
                          <input  type="radio"  value={ [ vehicle.name, vehicle.total_no, vehicle.speed ] } name={index} 
                            disabled={ vehicle.total_no===0 ||
                                      vehicle.max_distance < selectedPlanets.find( p=> p.id===index ).distance
                                     }  
                            key={i} 
                          />
                          {" "}{vehicle.name} ({ vehicle.total_no })
                        </label><br/>
                      </div>
             })}      
             <label>
                <input type="radio" name={index} hidden key={5}
                  readOnly checked={ selectedVehicles?.find( vehicle=> vehicle.id === index )?.name === undefined } > 
                </input>
             </label>
           </div>
        }
    </>
  )
}

export default Selector

