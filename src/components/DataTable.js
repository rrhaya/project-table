import React, { useState } from 'react';

import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from "@mui/material/TablePagination";

export default function DataTable({ data, totalItems, page, setPage }) {
  
  const [rowsPerPage, setRowsPerPage] = useState(5);  

  const handleChangePage = (event, newPage) => {    
    setPage(newPage+1);       
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }; 

  return (  
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Pantone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>        
        {data && data.map(((element) => (
            <TableRow key={element.id} style={{backgroundColor: element.color}}>
              <TableCell>{element.id}</TableCell>
              <TableCell>{element.name}</TableCell>
              <TableCell>{element.year}</TableCell>
              <TableCell>{element.color}</TableCell>
              <TableCell>{element.pantone_value}</TableCell>
            </TableRow>
          )))
        }          
        </TableBody>            
      </Table>

      <TablePagination         
        component="div"
        rowsPerPageOptions={[5]}             
        count={totalItems}
        rowsPerPage={rowsPerPage}        
        page={page -1} 
        onPageChange={handleChangePage}        
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> 

      {data.length === 0 && <p>Product with searched id doesnt exist </p>}
    </TableContainer>
  )
}