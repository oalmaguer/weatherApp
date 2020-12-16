import './App.css';
import React, {useState} from 'react';

const api = {
  key: "332a53fbe81740907e4694971ff1680f",
  base: "https://api.openweathermap.org/data/2.5/",
  imagekey: "j81nbzUzeUYH5JQ_fJ6Ir8b2BW-FHTfLCFL67-42iCE",
  secretkey: "wTUBXSiJ-uFopJxmCnQqwvB1LH3fYPF_MG1ACdGDs10",
  baseimg: "https://api.unsplash.com/search/photos?query="
}


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [img, setImage] = useState('');
  const [icon, setIcon] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
        .then(result => {
          setWeather(result);
          if (result.weather[0].main == "Clouds") {
            setIcon('https://img.icons8.com/clouds/100/000000/clouds.png');
          } else if (result.weather[0].main == "Fog") {
            setIcon('https://img.icons8.com/ultraviolet/80/000000/fog-day--v2.png');
            }
            else if (result.weather[0].main == "Clear") {
              setIcon('https://img.icons8.com/office/80/000000/sun--v2.png');
              }
              else if (result.weather[0].main == "Smoke") {
                setIcon('https://img.icons8.com/ultraviolet/80/000000/smoke-explosion.png');
                }
                else if (result.weather[0].main == "Snow") {
                  setIcon('https://img.icons8.com/cute-clipart/80/000000/snow.png');
                  }
                  else if (result.weather[0].main == "Mist") {
                    setIcon('https://img.icons8.com/carbon-copy/100/000000/foggy-night-1.png');
                    }
          
          console.log(result);
          evt.preventDefault();
         
        });
        fetch(`${api.baseimg}${query}&client_id=${api.imagekey}`)
        .then(res2 => res2.json())
        .then(result2 => {
          console.log(result2);
          setImage(result2.results[Math.floor(Math.random() * 9+1 )].urls.regular);
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className="bgimage" style={{backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "bottom"
    }}>
      <main>
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
          {/* <form onSubmit={search}>
           <input type="submit" value="submit" className="btn btn-primary" />Submit
           </form> */}
        </div>
       
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">
            {dateBuilder(new Date())}
            </div>
        </div>
        <div className="weather-box">
          <div className="temp">
          <div className="weather">{(weather.weather[0].main != "undefined") ? <span><img src={icon}/><br />{weather.weather[0].main}</span> : (weather.weather[0].main) }</div>
            {Math.round(weather.main.temp)}°C
          </div>
          
        </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
