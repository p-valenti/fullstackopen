import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const App = () => {
    const [query, setQuery] = useState('');
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [weather, setWeather] = useState(null);

    const api_key = import.meta.env.VITE_SOME_KEY;

    useEffect(() => {
        if (query) {
            axios.get(`https://restcountries.com/v3.1/name/${query.toLowerCase()}`)
                .then(response => {
                    if (response.data.length > 10) {
                        setCountries([]);
                        setError('Too many matches, specify another filter');
                    } else {
                        setCountries(response.data);
                        setError('');
                        setSelectedCountry(null);
                        setWeather(null);
                    }
                })
                .catch(() => {
                    setCountries([]);
                    setError('Too many matches, specify another filter');
                    setSelectedCountry(null);
                    setWeather(null);
                });
        } else {
            setCountries([]);
            setError('');
            setSelectedCountry(null);
            setWeather(null);
        }
    }, [query]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleDetails = (country) => {
        setSelectedCountry(country);
        downloadedWeather(country.capital[0])
    };

    const downloadedWeather = (capital) => {
        console.log("API Key:", api_key);

        if (!api_key) {
            console.error('No API key found.');
            return;
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`;

        axios.get(url)
            .then(response => {
                setWeather(response.data);
            })
            .catch(error => {
                console.error('Failed data fetching',error);
            });
    };

    const countryList = () => {
        if (countries.length > 10) {
            return <div>{error}</div>;
        } else if (countries.length > 1) {
            return (
                <ul>
                    {countries.map(country => (
                        <li key={country.cca3}>
                            {country.name.common}
                            <button onClick={() => handleDetails(country)}>show</button>
                        </li>
                    ))}
                </ul>
            );
        } else if (countries.length === 1) {
            setSelectedCountry(countries[0]);
            downloadedWeather(countries[0].capital[0]);
            return null;
        } else {
            return null;
        }
    };

    const details = () => {
        if (selectedCountry) {
            const country = selectedCountry;
            return (
                <div>
                    <h1>{country.name.common}</h1>
                    <p>Capital: {country.capital}</p>
                    <p>Area: {country.area} km²</p>
                    <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
                    <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
                    {shownWeather()}
                </div>
            );
        }
        return null;
    };

    const shownWeather = () => {
        if (weather) {
            return (
                <div>
                    <h2>Weather in {weather.name}</h2>
                    <p>temperature: {weather.main.temp} Celcius</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                         alt="weather icon"/>
                    <p>wind: {weather.wind.speed} m/s</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div>
            find countries
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
            />
            {error && <div>{error}</div>}
            {selectedCountry ? details() : countryList()}
        </div>
    );
}

export default App;