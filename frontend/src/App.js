import './App.css';
import * as XLSX from "xlsx";
import React, { useState } from 'react';

function App() {

  const [data, setData] = useState([]);

  const handleRead = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const fileData = e.target.result;
      const workbook = XLSX.read(fileData, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        raw: false,
        dateNF: "yyyy-mm-dd"
      });

      setData(parsedData);
    };
  };

  return (
    <div style={{ background: 'linear-gradient(#355C7D, #A280)', justifyContent: 'center', padding: '20px', maxWidth: '100%' }}>
      <header>
        <label style={{ color: '#6fffe9', fontWeight: 'bold', fontSize: '16px', marginLeft: '600px' }}>
          Upload your file here to see the data:
        </label>
        <br /><br />
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleRead}
          style={{ marginTop: '10px', padding: '8px', cursor: 'pointer', marginLeft: '640px', color: '#fbff12' }}
        />
        <br /><br />

        {data.length > 0 && (
          <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '40px', borderColor: 'red' }}>
            <thead>
              <tr style={{ backgroundColor: '#8a817c', color: '#001d3d' }}>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {value}
                    </td>
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