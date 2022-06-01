import React, {useState} from 'react'
// usestate as hook to track state in the function
import './App.css'
import Footer from './components/Footer.js'
import weatherPicture from './asset/city1.jpg'
// import an image to show I can do this as well and src it below




// use API key from openweatherapi website

function App() {

const myApiKey = 'f44afc04701b5f1f5f03b05d831cde2c'

// create state variable
const [myData, setMyData] = useState(0)

// use this variable to fetch city -set intially to an empty string
const [city, setCity] = useState("")

// Changed to metric since in Canada
const showWeather = (event) => {
  if(event.key === "Enter") {
    // if statement
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${myApiKey}`).then(
      response => response.json()
      // put the response in json
    ).then(
      myData => {
        setMyData(myData)
        setCity('')
        // resets to empty string after search
      }
    )
  }
}
// above is the GET weather function

  return (
    <div className='container'>

      {/* using an input box here */}
      <input
      className='search'
      placeholder='Search here for city Ensemble...'
      onChange={e => setCity(e.target.value)}
      // whatever searched, it is set to the city with target.value
      value={city}
      onKeyPress={showWeather}
      />


      {typeof myData.main === 'undefined' ? (
      <div className='middle'>
        <h3>Thanks for checking out my test. Search a city!</h3>
      </div>
      ) : (
        
        // these indexes are pulled from the API - 
        <div className='searchArea'>
          <div><img src={weatherPicture} width="140" height="80" /></div>
          <p className='nameCity'>{myData.name}</p>
          <p className='temp'>{(myData.main.temp)} degrees C</p>
          <p className='weather'>{myData.weather[0].main}</p>
          <p className='feelsLike'>Feels like: {myData.main.feels_like}</p>
          {/* index 0 as it's the first index */}
        </div>
      )}


{/* error handling - 404 */}
<div className='error'>
      {myData.cod === "404" ? (
        <h4>Please spell your city properly</h4>
      ) : (
<></>
      )}
</div>
<Footer />
{/* added component here */}


    </div>

  
    
  )
}


export default App