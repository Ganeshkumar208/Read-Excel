// import logo from './logo.svg';
import './App.css';
// import xlsx from './xlsx'
import * as XLSX from "xlsx"
import React, {useState} from 'react'



function App() {

  const [data,setData] = useState([]);

  const handleread = (e) => {
    const reader= new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data= e.target.result;
      const workbook = XLSX.read(data,{type:'binary'});
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parseData = XLSX.utils.sheet_to_json(sheet);
      setData(parseData);
    }
  }


  return (
    <div style={{backgroundImage:'linear-gradient(#355C7D,#A280)',marginLeft:"0px",justifyContent:'center'}} >
      <header ><br/><br/>
        <label>Enter your file here</label><br/><br/>
        <input type="file" accept=".xlsx,.xls" onChange={handleread} /><br/><br/>

        {data.length > 0 && (
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th> 
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row,index) => (
                <tr key={index}>
                  {Object.values(row).map((value,index)=>(
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </header>
    </div>
  );
}

export default App;
