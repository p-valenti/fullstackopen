import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const App = () => {
    const [query, setQuery] = useState('');
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);

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
                    }
                })
                .catch(() => {
                    setCountries([]);
                    setError('Too many matches, specify another filter');
                });
        } else {
            setCountries([]);
            setError('');
            setSelectedCountry(null);
        }
    }, [query]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleDetails = (country) => {
        setSelectedCountry(country);
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
            // const country = countries[0];
            setSelectedCountry(countries[0]);
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
                    <p><strong>Capital:</strong> {country.capital}</p>
                    <p><strong>Area:</strong> {country.area} km²</p>
                    <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
                    <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
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