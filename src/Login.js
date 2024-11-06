import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({setCurrentUser, studDB, facDB, adminDB }) => {
  const [userType, setUserType] = useState(null); 
  const [ID, setID] = useState('');
  const [pwd, setPwd] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    let user = null;

    if (userType === 'student') {
      user = studDB.find(value => value.studID === Number(ID) && value.pwd === pwd);
    } else if (userType === 'faculty') {
      user = facDB.find(value => value.facID === Number(ID) && value.pwd === pwd);
    } else if (userType === 'admin') {
      user = adminDB.find(value => value.adminID === Number(ID) && value.pwd === pwd);
    }

    if (user) {
      setCurrentUser(user);
      navigate(`/${userType}`);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className='space-x-40 flex items-center justify-center h-screen'>
      <button className='p-10 border border-solid border-black' onClick={() => { setUserType('student'); setID(''); setPwd(''); }}>Student</button>
      <button className='p-10 border border-solid border-black' onClick={() => { setUserType('faculty'); setID(''); setPwd(''); }}>Faculty</button>
      <button className='p-10 border border-solid border-black' onClick={() => { setUserType('admin'); setID(''); setPwd(''); }}>Admin</button>

      {userType && (
        <div className="login-form">
          <input 
            type="text"
            placeholder={`Enter ${userType.charAt(0).toUpperCase() + userType.slice(1)} ID`}
            value={ID}
            onChange={e => setID(e.target.value)}
          />
          <input 
            type="password" 
            placeholder='Enter Password'
            value={pwd}
            onChange={e => setPwd(e.target.value)} 
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Login;
