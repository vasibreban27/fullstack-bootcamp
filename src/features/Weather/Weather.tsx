import { useEffect, useState } from "react";
import type { WeatherData } from "./types";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

export function Weather() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function fetchWeather(city: string, country: string) {
        try {
            setError(null);

            const response = await fetch(
                `${baseUrl}?q=${city},${country}&units=metric&appid=${apiKey}`
            );

            if (!response.ok) {
                throw new Error("Could not fetch weather data");
            }

            const data: WeatherData = await response.json();
            setWeatherData(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong");
            }
        }
    }

    useEffect(() => {
        fetchWeather("Cluj-Napoca", "RO");
    }, []);

    async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const city = formData.get("city");
        const country = formData.get("country");

        if (typeof city !== "string" || city.trim() === "") {
            setError("Please enter a city");
            return;
        }

        if (typeof country !== "string") {
            setError("Please select a country");
            return;
        }

        await fetchWeather(city.trim(), country);
        form.reset();
    }

    if (error) {
        return <strong>Error: {error}</strong>;
    }

    if (!weatherData) {
        return <strong>Loading...</strong>;
    }

    return (
        <>
            <div>Weather in {weatherData.name}</div>

            <form onSubmit={handleSearch}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" />

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