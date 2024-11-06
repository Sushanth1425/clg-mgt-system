import { Routes,Route } from "react-router-dom";
import Login from "./Login";
import Stud from "./Stud";
import Fac from "./Fac";
import Admin from "./Admin";
import React, { useState, useEffect } from 'react';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const loadData = () => {
    const studDB = JSON.parse(localStorage.getItem('studDB')) || [
      {
        studID: 1001,
        name: "sus",
        pwd: "def",
      },
      {
        studID: 1002,
        name: "shan",
        pwd: "def",
      },
      {
        studID: 1003,
        name: "mok",
        pwd: "def",
      },
      {
        studID: 1004,
        name: "meghna",
        pwd: "def",
      },
    ]
    const facDB = JSON.parse(localStorage.getItem('facDB')) || [
      {
        facID: 3001,
        name: 'ram',
        pwd: "def",
      },
      {
        facID: 3002,
        name: 'kaumr',
        pwd: "def",
      },
      {
        facID: 3003,
        name: 'raj',
        pwd: "def",
      },
    ]
    const adminDB = JSON.parse(localStorage.getItem('adminDB')) || [
      {
        adminID: 5001,
        name: "sunder",
        pwd: "def",
      },
      {
        adminID: 5002,
        name: "raja",
        pwd: "def",
      },
    ]
    const marksDB = JSON.parse(localStorage.getItem('marksDB')) || [
      {
        studID: 1001,
        marks: [
          {
            subID: "ENG1001",
            marks: 50,
          },
          {
            subID: "MAT1001",
            marks: 45,
          },
        ],
      },
      {
        studID: 1002,
        marks: [
          {
            subID: "ENG1001",
            marks: 41,
          },
          {
            subID: "MAT1001",
            marks: 43,
          },
        ],
      },
      {
        studID: 1003,
        marks: [
          {
            subID: "ENG1001",
            marks: 50,
          },
          {
            subID: "MAT1001",
            marks: 49,
          },
        ],
      },
      {
        studID: 1004,
        marks: [
          {
            subID: "ENG1001",
            marks: 49,
          },
          {
            subID: "MAT1001",
            marks: 50,
          },
        ],
      },
    ]
    const attDB = JSON.parse(localStorage.getItem('attDB')) || [
      {
        studID: 1001,
        attPer: 94,
      },
      {
        studID: 1002,
        attPer: 97,
      },
      {
        studID: 1003,
        attPer: 81,
      },
      {
        studID: 1004,
        attPer: 85,
      },
    ]
    const feesDB = JSON.parse(localStorage.getItem('feesDB')) || [
      {
        studID: 1001,
        feeAmt: 200000,
        status: true,
      },
      {
        studID: 1002,
        feeAmt: 200000,
        status: false,
      },
      {
        studID: 1003,
        feeAmt: 200000,
        status: false,
      },
      {
        studID: 1004,
        feeAmt: 200000,
        status: true,
      },
    ]
    return { studDB, facDB, adminDB, marksDB, attDB, feesDB };
  };

  const [studDB, setStudDB] = useState(loadData().studDB);
  const [facDB, setFacDB] = useState(loadData().facDB);
  const adminDB = loadData().adminDB
  const marksDB = loadData().marksDB
  const attDB = loadData().attDB
  const feesDB = loadData().feesDB

  useEffect(() => {
    localStorage.setItem('studDB', JSON.stringify(studDB));
    localStorage.setItem('facDB', JSON.stringify(facDB));
    localStorage.setItem('adminDB', JSON.stringify(adminDB));
    localStorage.setItem('marksDB', JSON.stringify(marksDB));
    localStorage.setItem('attDB', JSON.stringify(attDB));
    localStorage.setItem('feesDB', JSON.stringify(feesDB));
  }, [studDB, facDB, adminDB, marksDB, attDB, feesDB]);
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login setCurrentUser={setCurrentUser} studDB={studDB} facDB={facDB} adminDB={adminDB} />} />
        <Route path="/student" element={<Stud user={currentUser} marksDB={marksDB} attDB={attDB} feesDB={feesDB} />} />
        <Route path="/faculty" element={<Fac user={currentUser} marksDB={marksDB} attDB={attDB}/>} studDB={studDB}  />
        <Route path="/admin" element={<Admin user={currentUser} studDB={studDB} setStudDB={setStudDB} facDB={facDB} setFacDB={setFacDB} marksDB={marksDB} attDB={attDB} feesDB={feesDB} />} />
      </Routes>
    </div>
  );
}

export default App;
