import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(hook, []);

  const searchCountry = (event) => {
    const countrytoSearch = event.target.value;
    var copyCountries = [...countries];
    copyCountries = copyCountries.filter(
      (item) =>
        item.name.common
          .toLowerCase()
          .indexOf(countrytoSearch.toLowerCase()) !== -1
    );
    setFiltered(copyCountries);
  };

  return (
    <div>
      <div>
        find countries <input onChange={searchCountry} />
      </div>
      <Check filtered={filtered} />
    </div>
  );
};

const Filter = (props) => {
  return (
    <div>
      {props.array.map((country, key) => (
        <p key={key}>{country.name.common}</p>
      ))}{" "}
    </div>
  );
};

const Check = (props) => {
  return props.filtered.length > 10 ? (
    <p>Too many search queries</p>
  ) : props.filtered.length > 1 ? (
    <Filter array={props.filtered} />
  ) : (
    // console.log(props.filtered)
    <Country country={props.filtered} />
  );
};

const Country = (props) => {
  return (
    <div>
      {props.country.map((element, key) => (
        <div key={key}>
          <h2>{element.name.common}</h2>
          <p>Capital : {element.capital}</p>
          <p>Area : {element.area}</p>
          <h3>languages : </h3>
          <p>
            {Object.entries(element.languages).map(([key, val], i) => (
              <li key={i}>{val}</li>
            ))}
          </p>
          <p>
          {Object.entries(element.flags).map(([key, val], i) => (
             <img key={i} src={val} alt="flag"/>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;
