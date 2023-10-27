import React from 'react';
import './Profile.css';
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import PostSide from '../../components/PostSide/PostSide';
import RightSide from '../../components/RightSide/RightSide';

const Profile = () => {
  return (
    <div>
      <div className='Profile-center' id='profileCard2'>
        <ProfileCard location='profilePage' />
      </div>

      <div className='Profile'>
        <ProfileLeft />

        <div className='Profile-center' id='profileCard1'>
          <ProfileCard location='profilePage' />
          <PostSide />
        </div>

        <div className='Profile-center' id='profileCard3'>
          <PostSide />
        </div>
        <RightSide />
      </div>
    </div>
  );
};

export default Profile;
