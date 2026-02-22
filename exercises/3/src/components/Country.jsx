import { useState, useEffect, use } from "react";
import axios from "axios";

const Country = ({ name, capital, languages, flags }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (!capital) {
            return
        }
        const apiKey = import.meta.env.VITE_WEATHER_KEY

        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
            )
            .then(response => {
                setWeather(response.data)
            })
            .catch(err => {
                console.log("Weather fetch error:", err)
            })
    }, [capital])

    return (
        <div>
            <h1>{name}</h1>
            <ul>
                <li>{capital}</li>
            </ul>
            <h2>Languages</h2>
            <ul>
                {Object.keys(languages).map((key) => (
                <li key={key}> {languages[key]} </li>
                ))}
            </ul>
            <img src={flags.png} alt={flags.alt} />
            {weather && (
            <div>
                <h2>Weather in {capital}</h2>
                <p>Temperature: {weather.main.temp} °C</p>
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="weather icon"
                />
                <p>Wind: {weather.wind.speed} m/s</p>
            </div>
            )}
        </div>
    );
};
export default Country;
