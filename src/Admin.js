import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = ({studDB, setStudDB, facDB, setFacDB, marksDB, attDB, feesDB, user }) => {
  const [view, setView] = useState(''); 
  const [userID, setUserID] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/'); 
    }
  }, [user, navigate]);

  const handleViewStud = () => {
    setView('students');
  };

  const handleViewFac = () => {
    setView('faculties');
  };

  const handleViewInd = () => {
    setView('individual');
  };

  const renderStudList=()=> {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Attendance (%)</th>
              <th>Courses & Marks</th>
              <th>Fee Status</th>
            </tr>
          </thead>
          <tbody>
            {studDB.map(student => {
              const attendance = attDB.find(att => att.studID === student.studID)?.attPer || 'N/A';
              const feeStatus = feesDB.find(fee => fee.studID === student.studID)?.status ? 'Paid' : 'Unpaid';
              const studentMarks = marksDB.find(m => m.studID === student.studID)?.marks || [];

              return (
                <tr key={student.studID}>
                  <td>{student.studID}</td>
                  <td>{student.name}</td>
                  <td>{attendance}</td>
                  <td>
                    {studentMarks.map(mark => (
                      <div key={mark.subID}>{mark.subID}: {mark.marks}</div>
                    ))}
                  </td>
                  <td>{feeStatus}</td>
                  <td>
                    <button onClick={() => deleteUser(student.studID, 'student')}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h3>Add Student</h3>
        <input 
          type="text" 
          placeholder="Student ID" 
          value={newStudent.studID} 
          onChange={e => setNewStudent({ ...newStudent, studID: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Name" 
          value={newStudent.name} 
          onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={newStudent.pwd} 
          onChange={e => setNewStudent({ ...newStudent, pwd: e.target.value })} 
        />
        <button onClick={addStudent}>Add Student</button>
      </div>
    );
  };

  const renderFacList = () => {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Faculty ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {facDB.map(faculty => (
              <tr key={faculty.facID}>
                <td>{faculty.facID}</td>
                <td>{faculty.name}</td>
                <td>
                    <button onClick={() => deleteUser(faculty.facID, 'faculty')}>Delete</button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Add Faculty</h3>
        <input 
          type="text" 
          placeholder="Faculty ID" 
          value={newFaculty.facID} 
          onChange={e => setNewFaculty({ ...newFaculty, facID: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Name" 
          value={newFaculty.name} 
          onChange={e => setNewFaculty({ ...newFaculty, name: e.target.value })} 
        />
        <input 
        type="password" 
        placeholder="Password" 
        value={newFaculty.pwd} 
        onChange={e => setNewFaculty({ ...newFaculty, pwd: e.target.value })} 
        />
        <button onClick={addFaculty}>Add Faculty</button>
      </div>
    );
  };

  const renderIndividualUser = () => {
    const student = studDB.find(s => s.studID === Number(userID));
    const faculty = facDB.find(f => f.facID === Number(userID));
    
    if (student) {
      const studentAttendance = attDB.find(att => att.studID === student.studID)?.attPer || 'N/A';
      const studentMarks = marksDB.find(m => m.studID === student.studID)?.marks;
      return (
        <div>
          <h3>Student Details:</h3>
          <p>ID: {student.studID}</p>
          <p>Name: {student.name}</p>
          <p>Attendance: {studentAttendance}</p>
          <h4>Marks:</h4>
          <ul>
            {studentMarks.map(mark => (
              <li key={mark.subID}>{mark.subID}: {mark.marks}</li>
            ))}
          </ul>
        </div>
      );
    } 
    else if (faculty) {
      return (
        <div>
          <h3>Faculty Details:</h3>
          <p>ID: {faculty.facID}</p>
          <p>Name: {faculty.name}</p>
        </div>
      );
    } 
    else {
      return <p>No user found with ID {userID}</p>;
    }
  };

  const addStudent = () => {
    setStudDB([...studDB, newStudent]);
    setNewStudent({ studID: '', name: '', pwd: '' });
    setMessage('Student added successfully');
  };

  const addFaculty = () => {
    setFacDB([...facDB, newFaculty]);
    setNewFaculty({ facID: '', name: '', pwd: '' });
    setMessage('Faculty added successfully');
  };
  const [newStudent, setNewStudent] = useState({ studID: '', name: '', pwd: '' });
  const [newFaculty, setNewFaculty] = useState({ facID: '', name: '', pwd: '' });
  const deleteUser = (id, type) => {
    if (type === 'student') {
      setStudDB(studDB.filter(student => student.studID !== id));
      setMessage('Student deleted successfully');
    } 
    else if (type === 'faculty') {
      setFacDB(facDB.filter(faculty => faculty.facID !== id));
      setMessage('Faculty deleted successfully');
    }
  };

  const logout= ()=>{
    navigate('/')
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <p>Welcome, {user?.name}!</p>
      <h2>Admin Panel</h2>
      <div>
        <button onClick={handleViewStud}>View Student List</button>
        <button onClick={handleViewFac}>View Faculty List</button>
        <button onClick={handleViewInd}>View Individual User</button>
      </div>

      {view === 'students' && renderStudList()}
      {view === 'faculties' && renderFacList()}
      {view === 'individual' && (
        <div>
          <input 
            type="text" 
            placeholder='Enter User ID' 
            value={userID} 
            onChange={e => setUserID(e.target.value)} 
          />
          <button onClick={renderIndividualUser}>Search</button>
          {renderIndividualUser()}
        </div>
      )}
      {message && <p>{message}</p>}
      <button className='border border-solid border-black mt-4' onClick={logout}>Logout</button>
    </div>
  );
};

export default Admin;
