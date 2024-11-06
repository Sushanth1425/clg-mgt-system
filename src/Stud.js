import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Stud = ({user , marksDB, attDB, feesDB }) => {
  const [subID, setSubID] = useState('');
  const [marks, setMarks] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [fees, setFees] = useState(null);
  const [feeStatus, setFeeStatus] = useState(null); 

  const studentID = user?.studID;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/'); 
    }
  }, [user, navigate]);
  
  useEffect(() => {
    if (studentID) {
      const foundFee = feesDB.find((fee) => fee.studID === studentID);
      if (foundFee) {
        setFeeStatus(foundFee.status); 
        setFees(`Fee Amount: ${foundFee.feeAmt}, Status: ${foundFee.status ? "Paid" : "Pending"}`);
      }
    }
  }, [studentID, feesDB]);

  const viewMarks = () => {
    const foundMarks = marksDB.find((value) => value.studID===studentID&& value.marks.some(m => m.subID === subID));
    if (foundMarks) {
      const subjectMarks = foundMarks.marks.find(mark => mark.subID === subID);
      if (subjectMarks) {
        setMarks(subjectMarks.marks);
      } 
      else {
        alert("No marks found for this subject code.");
        setMarks(null);
      } 
    }
    else {
      alert("No marks found for this student.");
      setMarks(null);
    }
  };

  const viewAttendance = () => {
    const foundAttendance = attDB.find((value) => value.studID === studentID);
    if (foundAttendance) {
      setAttendance(`Attendance Percentage: ${foundAttendance.attPer}%`);
    } 
    else {
      alert("Attendance data not found.");
      setAttendance(null);
    }
  };

  const viewFee = () => {
    if (feeStatus !== null) {
      setFees(`Fee Amount: ${feesDB.find(fee => fee.studID === studentID).feeAmt}, Status: ${feeStatus ? "Paid" : "Pending"}`);
    }
  };

  const payFee = () => {
    const updatedFeesDB = feesDB.map(fee => 
      fee.studID === studentID ? { ...fee, status: true } : fee
    );

    setFeeStatus(true);
    setFees(`Fee Amount: ${updatedFeesDB.find(fee => fee.studID === studentID).feeAmt}, Status: Paid`);
    
    alert("Fee payment successful!");
  };

  const logout= ()=>{
    navigate('/')
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <p>Welcome, {user?.name}!</p>
      <input 
        type="text" 
        placeholder='Enter subject code' 
        value={subID} 
        onChange={e => setSubID(e.target.value)} 
      />
      <button className='border border-solid border-black mt-4' onClick={viewMarks}>View Marks</button>
      <button className='border border-solid border-black mt-4' onClick={viewAttendance}>View Attendance</button>
      <button className='border border-solid border-black mt-4' onClick={viewFee}>View Fee Status</button>
      <button className='border border-solid border-black mt-4' onClick={logout}>Logout</button>

      {marks !== null && <p>Marks: {marks}</p>}
      {attendance !== null && <p>{attendance}</p>}
      {fees !== null && <p>{fees}</p>}

      {feeStatus !== null && !feeStatus && (
        <button className='border border-solid border-black mt-4' onClick={payFee}>Pay Fee</button>
      )}
    </div>
  );
};

export default Stud;
