import "./App.css";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("countrycode ", countryCode);
    setCountry(countryCode);

    const url= countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
    })
  };

  console.log("Country info ",countryInfo);

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
      <div className="app__left">
        <div className="app__header">
          <h1>COVID TRACKER</h1>

          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="COVID Cases" cases={123} total={2000} />
          <InfoBox title="Recovered" cases={123} total={21000} />
          <InfoBox title="Deaths" cases={123} total={201100} />
        </div>

        <Map />
      </div>

      
        <Card className="app__right">
          <CardContent>
            <h3>live cases per country</h3>
            <h3>worldwide new cses</h3>
          </CardContent>
        </Card>
      
    </div>
  );
}

export default App;
