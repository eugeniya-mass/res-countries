import React, {useState, useEffect} from 'react';
import Card from './components/cards/Card';
import Header from './components/header/Header';
import Filter from './components/filters/Filter';
import Info from './components/info/Info';
import Back from './back.svg';
import BackWhite from './back-white.svg';
import AppTheme from './AppTheme';

import './App.scss';

const App = () => {
  const regions = ['Filter by region', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']; // regions
  const [arrayCountries, setArrayCountries] = useState([]); // list of countries
  const [allCountries, setAllCountries] = useState([]);
  const [infoShow, setInfoShow] = useState({modal: false, countryInfo: []}); // show about country
  const [filterRegion, setFilterRegion] = useState({dropdown: false, filterName: ''}); // filter for regions
  const [filterCountry, setFilterCountry] = useState(''); // filter name country
  const [hasError, setError] = useState({error: 'not error', show: false});
  const [themeSelect, setThemeSelect] = useState('theme-light');

  const toggleTheme = () => {
    setThemeSelect(themeSelect === "theme-light" ? "theme-dark" : "theme-light");
  };

  // all list countries
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/data.json`);
      const data = await res.json();
      setArrayCountries(data);
      setAllCountries(data);
      setError({error: 'not error', show: false});
    }
    fetchData();
  }, []);

  // filter country name
  const changeSearch = async(e) => {
      const value = e.target.value.toLowerCase();
      setFilterCountry(value);
      setFilterRegion({filterName: '', dropdown: false});

      if (!value) {
          setArrayCountries(allCountries);
          return;
      }

      const filtered = allCountries.filter(c =>
          c.name.toLowerCase().includes(value)
      );

      setArrayCountries(filtered);
      setError(filtered.length ? {error: 'not error', show: false} : {error: 'Not found', show: true});
  }


  const changeFilter = (name) => {
    setFilterRegion({filterName: name, dropdown: false});
    setFilterCountry('');

    if (name === 'Filter by region') {
      setArrayCountries(allCountries);
      return;
    }

      const filtered = allCountries.filter(c => c.region === name);
      setArrayCountries(filtered);
    };

  const openCard = async(name) => {
      const country = allCountries.filter(c => c.name === name);
      setInfoShow({countryInfo: country, modal: true});
  }

  const openDropdown = () => {
    if(filterRegion.dropdown === false) {
      setFilterRegion({filterName: filterRegion.filterName, dropdown: true})
    } else {
      setFilterRegion({filterName: filterRegion.filterName, dropdown: false})
    }
  }

  const openInfo = () => {
    if(infoShow.modal === true) {
      setInfoShow({countryInfo: [], modal: false})
    }
  }

  const currentTheme = AppTheme[themeSelect];

  return (
    <div className="wrapper" style={{backgroundColor: `${currentTheme.backgroundBody}`}}>

      <Header theme={themeSelect} toggleTheme={toggleTheme} />
      
      <div className="wrapper__box">

        {
          infoShow.modal === true ?
           <div> 
            <div className="btn">
              <button
                style={{
                  backgroundColor: `${currentTheme.backgroundColor}`,
                  color: `${currentTheme.textColor}`,
                  boxShadow: `${currentTheme.boxShadow}`
                }}
                className="back" onClick={openInfo}><img className="arrow"
                src={themeSelect === 'theme-dark' ? BackWhite : Back} alt="" />Back</button>
            </div>
            <main className="content-info">
                {
                infoShow.countryInfo ? infoShow.countryInfo.map((name, index) => 
                <Info theme={themeSelect} key={index} data={name} />) : ''
              }
            </main>
          </div>
          :

          <div>
            <Filter
              theme={themeSelect}
              changeSearch={changeSearch}
              filterCountry={filterCountry}
              openDropdown={openDropdown}
              filter={filterRegion}
              changeFilter={changeFilter}
              regions={regions} />

            <main className="content">
              {
                hasError.show  === true ? <div>{hasError.error}</div> :
                arrayCountries.map((country, index) => (
                  <Card theme={themeSelect} key={index} country={country} openCard={openCard} />
                ))
              }
            </main>

          </div>
        }
       
      </div>
    </div>
  );
}

export default App;
