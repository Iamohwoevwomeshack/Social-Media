import React, { useState } from 'react';
import './Auth.css';
import Logo from '../../img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction';

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.authReducer.loading);
  const [isSignUp, setIsSignUp] = useState(false);
  console.log(loading);

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmpass: '',
  });

  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      confirmpass: '',
    });
  };
  return (
    <div className='Auth'>
      <div className='a-left'>
        <img src={Logo} alt='logo' />
        <div className='Webname'>
          <h1>DevDemy</h1>
          <h6>Development Academy Application</h6>
        </div>
      </div>

      {/* <SignUp /> */}
      <div className='a-right'>
        <form action='' className='infoForm authForm' onSubmit={handleSubmit}>
          <h3>{isSignUp ? 'Sign up' : 'Login'} </h3>

          {isSignUp && (
            <div className='input-div'>
              <input
                type='text'
                placeholder='First Name'
                className='infoInput'
                name='firstname'
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                type='text'
                placeholder='Last Name'
                className='infoInput'
                name='lastname'
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <input
              type='text'
              className='infoInput'
              placeholder='Username'
              id='username'
              name='username'
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div className='input-div'>
            <input
              type='password'
              className='infoInput'
              placeholder='Password'
              id='password'
              name='password'
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                type='password'
                className='infoInput'
                placeholder='Confirm Password'
                name='confirmpass'
                value={data.confirmpass}
                onChange={handleChange}
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? 'none' : 'block',
              color: 'red',
              fontSize: '12px',
              alignSelf: 'flex-end',
              marginRight: '5px',
            }}
          >
            * Password does not match!
          </span>
          <div className='have-an-account'>
            <span
              style={{
                fontSize: '12px',
                cursor: 'pointer',
                textAlign: 'center',
                alignSelf: 'center',
              }}
              onClick={() => {
                setIsSignUp(prev => !prev);
                resetForm();
              }}
            >
              {isSignUp
                ? 'Already have an account? Login!'
                : "Don't have and account? Sign up!"}
            </span>
          </div>
          <button
            className='button infoButton'
            type='submit'
            disabled={loading}
            id='authButton'
          >
            {loading ? 'Loading...' : isSignUp ? 'Signup' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
