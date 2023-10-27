import React from 'react';
import { UilSetting } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import Comment from '../../img/comment.png';
import './NavIcons.css';

const NavIcons = () => {
  return (
    <div className='navIcons-2'>
      <Link to='../home'>
        <img src={Home} alt='HomeImg' />
      </Link>
      <UilSetting className='style-icon' />
      <img src={Noti} alt='NotiImg' />
      <Link to='../chat'>
        <img src={Comment} alt='CommentImg' />
      </Link>
    </div>
  );
};

export default NavIcons;
