import { useEffect, useState } from 'react';
import type { WeatherData } from './types';

const apiKey = import.meta.env.VITE_API_URL;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

export function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(fetchData, console.warn);

    function fetchData(data: GeolocationPosition) {
      fetch(
        `${baseUrl}&lat=${data.coords.latitude}&lon=${data.coords.longitude}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
        });
    }
  }, []);

  async function handleSearch(e: React.SubmitEvent) {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);

    const data = await fetch(`${baseUrl}&q=${formData.get('city')},${formData.get('country')}`)
      .then((res) => res.json())
    setWeatherData(data);
  }

  if (!weatherData) {
    return <strong>Loading ...</strong>;
  }

  return (
    <>
      <div>Weather in {weatherData.name}, {weatherData.sys.country}</div>

      <form onSubmit={handleSearch}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" name="city" />
        <label htmlFor="country">Country</label>
        <select name="country" id="country">
          <option value="RO">Romania</option>
          <option value="US">USA</option>
          <option value="UK">United Kingdom</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <p>Current Temp: {weatherData.main.temp}&deg; C</p>
      <img
        src={`https://openweathermap.org/payload/api/media/file/${weatherData.weather[0].icon}.png`}
        alt={`${weatherData.weather[0].description} icon`}
      />
    </>
  );
}
