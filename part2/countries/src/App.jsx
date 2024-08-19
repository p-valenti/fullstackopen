import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const App = () => {
    const [query, setQuery] = useState('');
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (query) {
            axios.get(`https://restcountries.com/v3.1/name/${query.toLowerCase()}`)
                .then(response => {
                    setCountries(response.data);
                    setError('');
                })
                .catch(() => {
                    setCountries([]);
                    setError('Too many matches, specify another filter');
                });
        } else {
            setCountries([]);
            setError('');
        }
    }, [query]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const countryList = () => {
        if (countries.length > 10) {
            return <div>Too many matches, specify another filter</div>;
        } else if (countries.length > 1) {
            return (
                <ul>
                    {countries.map(country => (
                        <li key={country.cca3}>{country.name.common}</li>
                    ))}
                </ul>
            );
        } else if (countries.length === 1) {
            const country = countries[0];
            return (
                <div>
                    <h1>{country.name.common}</h1>
                    <p><strong>Capital:</strong> {country.capital}</p>
                    <p><strong>Area:</strong> {country.area} km²</p>
                    <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
                    <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
                </div>
            );
        } else {
            return null;
        }
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
            {countryList()}
        </div>
    );
}

export default App;