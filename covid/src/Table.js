import React from 'react';
import "./Table.css"
function Table({countries}) {
  return <div>


<div className='table'>

    {countries.map((country, cases)=>(
        <tr>
            <td>{country.country}</td>
            <td><strong>{country.cases}</strong></td>
            {/* Emmet */}
            {/* <td>{country}</td> */}
            {/* <td><strong>{cases}</strong></td> */}
        </tr>

    ))}
</div>


  </div>;
}

export default Table;


// https://www.youtube.com/watch?v=cF3pIMJUZxM
// 2.26