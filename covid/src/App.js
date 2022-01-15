import "./App.css";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const onCountryChange = async (event) =>{
    const countryCode = event.target.value;
    console.log("countrycode ",countryCode);
    setCountry(countryCode);
  }

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID TRACKER</h1>

        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

    
  <div className="app__stats">

      {/* infobox */}
      {/* infobox */}
      {/* nfobox */}
      
  </div>


      {/* table */}
      {/* grafico */}
      {/* mapa */}
    </div>
  );
}

export default App;
