import React, { useState } from 'react'
import "./Style.css"
import axios from 'axios'

function Home() {
  
    const [data, setData] = useState({
        celcius: 12,
        name:'London',
        humidity: 81,
        speed: 3,
        condition: 'Clouds',
    })

    const [name, setName] = useState('');

    const handleClick = () => {
        if(name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=a458def618ae41a6ac40ed4ca8ee6fc7&units=metric`;
            axios.get(apiUrl)
            .then(res => {
                setData({...data, celcius: res.data.main.temp, name: res.data.name,
                    humidity: res.data.main.humidity, speed: res.data.wind.speed, 
                    condition: res.data.weather[0].main})
            })
            .catch( err => console.log(err));
        }
    }

  return (
    <div className='container'>
        <div className="weather">
            <div className='condition'>
                <h1>{data.name}</h1>
                <p>--------------------</p>
            </div>
            <div className="search">
                <input type="text" placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
                <button><img src="/Images/search.png" onClick={handleClick} alt="" /></button>
            </div>

            <div className="winfo">
                <h1>{Math.round(data.celcius)}°c</h1>
                <h2>{data.condition}</h2>
                <div className="details">
                    <div className="col">
                        <div className='humidity'>
                            <p>{Math.round(data.humidity)}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className='wind'>
                            <p>{Math.round(data.speed)} km/h </p>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-info">
                <a href="https://github.com/">
                Weather Application
                </a>{" "}
                | Developed by{" "}
                <a href="https://github.com/">
                Suraj Kumar
                </a>{" "}
            </div>
        </div>
    </div>
  )
}

export default Home
