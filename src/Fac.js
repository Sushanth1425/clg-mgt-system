import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Fac = ({marksDB, attDB, user }) => {
  const [studID, setStudID] = useState('');
  const [subID, setSubID] = useState('');
  const [newMarks, setNewMarks] = useState('');
  const [newAttendance, setNewAttendance] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/'); 
    }
  }, [user, navigate]);

  const viewMarks = () => {
    const foundMarks = marksDB.find(markEntry => markEntry.studID === Number(studID));
    if (foundMarks) {
      const subjectMarks = foundMarks.marks.find(mark => mark.subID === subID);
      if (subjectMarks) {
        setMessage(`Current Marks for ${subID}: ${subjectMarks.marks}`);
      } 
      else {
        setMessage("No marks found for this subject ID.");
      }
    } 
    else {
      setMessage("No marks found for this student ID.");
    }
  };

  const viewAttendance = () => {
    const foundAttendance = attDB.find(value => value.studID === Number(studID));
    if (foundAttendance) {
      setMessage(`Current Attendance Percentage: ${foundAttendance.attPer}%`);
    } 
    else {
      setMessage("No attendance data found for this student ID.");
    }
  };

  const updateMarks = () => {
    const markIndex = marksDB.findIndex(entry => entry.studID === Number(studID));
    if (markIndex !== -1) {
      const subjectIndex = marksDB[markIndex].marks.findIndex(mark => mark.subID === subID);
      if (subjectIndex !== -1) {
        marksDB[markIndex].marks[subjectIndex].marks = newMarks;
        setMessage(`Marks for ${subID} updated to: ${newMarks}`);
      } 
      else {
        setMessage("No subject found to update marks.");
      }
    } 
    else {
      setMessage("No student found to update marks.");
    }
  };

  const updateAttendance=()=> {
    const attIndex = attDB.findIndex(value => value.studID === Number(studID));
    if (attIndex!== -1) {
      attDB[attIndex].attPer = newAttendance;
      setMessage(`Attendance updated to: ${newAttendance}%`);
    } 
    else {
      setMessage("No student found to update attendance.");
    }
  };

  const logout= ()=>{
    navigate('/')
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <p>Welcome, {user?.name}!</p>
      <input 
        type="text" 
        placeholder='Enter Student ID' 
        value={studID} 
        onChange={e=> setStudID(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder='Enter Subject ID' 
        value={subID} 
        onChange={e=> setSubID(e.target.value)} 
      />
      <button className='border border-solid border-black mt-4' onClick={viewMarks}>View Marks</button>
      <button className='border border-solid border-black mt-4' onClick={viewAttendance}>View Attendance</button>

      <div className='mt-4'>
        <input 
          type="text" 
          placeholder='Enter new marks' 
          value={newMarks} 
          onChange={e => setNewMarks(e.target.value)} 
        />
        <button className='border border-solid border-black mt-2' onClick={updateMarks}>Update Marks</button>
      </div>

      <div className='mt-4'>
        <input 
          type="text" 
          placeholder='Enter new attendance percentage' 
          value={newAttendance} 
          onChange={e=> setNewAttendance(e.target.value)} 
        />
        <button className='border border-solid border-black mt-2' onClick={updateAttendance}>Update Attendance</button>
      </div>
      <button className='border border-solid border-black mt-4' onClick={logout}>Logout</button>

      {message &&<p className='mt-4'>{message}</p>}
    </div>
  );
};

export default Fac;