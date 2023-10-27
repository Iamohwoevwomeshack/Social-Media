import React from 'react';
import Logo from '../../img/logo.png';
import { UilSearch } from '@iconscout/react-unicons';
import './LogoSearch.css';
import NavIcons from '../NavIcons/NavIcons';

const LogoSearch = () => {
  return (
    <div className='LogoSearch'>
      <img src={Logo} className='logo' alt='logo' />
      <div className='LogoSearch-Icon'>
        <div className='Search'>
          <input type='text' placeholder='#Explore' />
          <div className='s-icon'>
            <UilSearch />
          </div>
        </div>
        <NavIcons />
      </div>
    </div>
  );
};

export default LogoSearch;
