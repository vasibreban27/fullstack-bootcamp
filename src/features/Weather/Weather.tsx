import { useEffect, useState } from "react";
import type { WeatherData } from "./types";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiUrl = `${baseUrl}?q=Cluj-Napoca,RO&units=metric&appid=${apiKey}`;

export function Weather() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch weather data");
                }

                return res.json();
            })
            .then((data: WeatherData) => {
                setWeatherData(data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    if (error) {
        return <strong>Error: {error}</strong>;
    }

    async function handleSearch(e:React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        const form = e.target;

        const data = new FormData(form);

        fetch(`${baseUrl}?q=${data.get('city')},${data.get('country')}&units=metric&appid=${apiKey}`)
        .then((res) => res.json())
        .then((data: WeatherData) => {
            setWeatherData(data);
        })
        .catch((err) => {
            setError(err.message);
        });
    }

    if (!weatherData) {
        return <strong>Loading...</strong>;
    }

    return (
        <>
            <div>Weather in {weatherData.name}</div>
            <form>
                <label htmlFor="city">City</label>
                <input type="text" id="city"/>
                <label htmlFor="country">Country</label>
                <select name="country" id="country">
                    <option value="RO">Romania</option>
                    <option value="US">USA</option>
                    <option value="GB">UK</option>
                </select>
                <button type="submit">Search</button>
            </form>

            <p>Current Temp: {weatherData.main.temp}°C</p>
            <p>Feels Like: {weatherData.main.feels_like}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>

            <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt={`${weatherData.weather[0].description} icon`}
            />
        </>
    );
}