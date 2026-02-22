import axios from 'axios';
import { useState, useEffect } from 'react';
import Result from './components/result';

const App = () => {
  const [allData, setAllData] = useState([]) // saving name of all countries
  const [dataCountry, setData] = useState([]) // saving name of search result
  const [value, setValue] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllData(response.data)
      })
      .catch(() => {
        console.log("Cannot load data from given API")
        setAllData([])
      })
  }, [])

  useEffect(() => {
    if (value === ''){
      setData([])
      return
    }

    const resultCountry = allData.filter(country => {
        return country.name.common.toLowerCase().includes(value.toLowerCase())
      }
    )
    setData(resultCountry)
  }, [value, allData])

  const handleSearch = (event) => {
    setValue(event.target.value)
  }

  const onClick = (country) => {
    setData([country])
  }

  return (
    <div>
      Find countries 
      <input 
        value={value}
        onChange={handleSearch}
      />
      <Result 
        dataCountry={dataCountry} 
        onClick={onClick}
      />
    </div>
  )
}

export default App