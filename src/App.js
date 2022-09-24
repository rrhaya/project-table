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

  const [ searchParams, setSearchParams] = useSearchParams({page: 1});    
  const [darkMode, setDarkMode] = useState(false);
  const url = 'https://reqres.in/api/products'  
  const [page, setPage] = useState(1);  
  const pageItems = 5;
  const [totalItems, setTotalItems] = useState(0);   
  const [query, setQuery] = useState(null);   

  const theme = createTheme({
    palette: {      
      mode: darkMode ? "dark" : "light"
    },
  });

  const [data, setData] = useState(null);

  const requestSearch = (searched) => { 
    setQuery(searched)
  }

  useEffect(() => {  
    query && fetch(`${url}?id=${query}`)    
    .then(response => response.json())    
    .then(data => (setData(data.data), setTotalItems(data.total), setSearchParams({id: query})))       
        
    !query && fetch(`${url}?page=${page}&per_page=${pageItems}`)
    .then(response => response.json())    
    .then(data => (setData(data.data), setTotalItems(data.total), setSearchParams({page: page})))      
  },[page, query])
  
  const handleChange = () => {
    setDarkMode(!darkMode)
  }

  return (    
   <ThemeProvider theme={theme}>
      <Paper style={{height: '100vh'}}>
        <div className="App"> 
          <div style={{height: '50px'}}></div>  
          <TextField type="number" id="outlined-basic" label={"Search"} variant="outlined" onInput={(e) => requestSearch(e.target.value) }/>   
          <FormGroup style={{margin: '0 auto', display: 'block', marginTop: '20px'}}>
            <FormControlLabel control={<Switch checked={darkMode} onChange={handleChange}/>} label="Dark mode switch" />
          </FormGroup>
          <div style={{height: '50px'}}></div> 
          {data ? <DataTable data={data} totalItems={totalItems} page={page} setPage={setPage} /> : <p>Item with searched id doesnt exist</p>}          
        </div>         
      </Paper>
    </ThemeProvider>    
  );
}

export default App;