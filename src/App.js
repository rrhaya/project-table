import './App.css';
import React, { useEffect, useState } from 'react';
import DataTable from './components/DataTable';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSearchParams } from 'react-router-dom'

function App() {

  const [ searchParams, setSearchParams] = useSearchParams();  
  const [darkMode, setDarkMode] = useState(false);

  const url = 'https://reqres.in/api/products'

  const theme = createTheme({
    palette: {      
      mode: darkMode ? "dark" : "light"
    },
  });

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
    .then(response => response.json())    
    .then(data => setData(data.data))
  },[])

  const [query, setQuery] = useState(null); 

  const requestSearch = (searched) => { 
    setQuery(searched)  

   const id = searchParams.get('id')
    if (searched) {
    setSearchParams({id: searched})
    } else {      
      setSearchParams()
    }
  }
  
  const handleChange = () => {
    setDarkMode(!darkMode)
  }

  return (    
   <ThemeProvider theme={theme}>
      <Paper style={{height: '100vh'}}>
        <div className="App">      
          <div style={{height: '50px'}}></div>  
          <TextField id="outlined-basic" label={"Search"} variant="outlined" onInput={(e) => requestSearch(e.target.value) }/>   
          <FormGroup style={{margin: '0 auto', display: 'block', marginTop: '20px'}}>
            <FormControlLabel control={<Switch checked={darkMode} onChange={handleChange}/>} label="Dark mode switch" />
          </FormGroup>
          <div style={{height: '50px'}}></div>
          {data && !query && <DataTable data={data}/>}
          {data && query && <DataTable data={data.filter((element) => (element.id == query))} />}
        </div>   
      </Paper>
    </ThemeProvider>    
  );
}

export default App;