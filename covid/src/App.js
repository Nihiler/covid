import "./App.css";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import {sortData} from "./util.js";
import LineGraph from "./LineGraph";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

useEffect(() => {
  fetch('https://disease.sh/v3/covid-19/all')
  .then((response) => response.json())
  .then((data => {
  setCountryInfo(data);
}));

},[]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("countrycode ", countryCode);
    setCountry(countryCode);

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

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
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1> COVID-19 Information Panel</h1>

          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">All</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="New COVID-19 Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <Map />
      </div>

      
        <Card className="app__right">
          <CardContent>
            <h3>Total cases per country</h3>
            <Table countries={tableData}/>
           <h3>ME CAGO EN REACT Y EN SU PUTA MADRE</h3>
            <h3>New cases (Worldwide)</h3>
            <LineGraph/>
          </CardContent>
        </Card>
      
    </div>
  );
}

export default App;
