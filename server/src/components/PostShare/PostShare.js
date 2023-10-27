import React, { useState, useRef } from 'react';
import './PostShare.css';
import { UilScenery } from '@iconscout/react-unicons';
import { UilPlayCircle } from '@iconscout/react-unicons';
import { UilLocationPoint } from '@iconscout/react-unicons';
import { UilSchedule } from '@iconscout/react-unicons';
import { UilTimes } from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/uploadAction';

const PostShare = props => {
  const loading = useSelector(state => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const desc = useRef();
  const { user } = useSelector(state => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const onImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];

      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = '';
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append('name', filename);
      data.append('file', image);
      newPost.image = filename;
      console.log(newPost);

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
    reset();
  };

  return (
    <div className='PostShare'>
      <img
        src={
          user.profilePicture
            ? serverPublic + user.coverPicture
            : serverPublic + 'defaultProfile.png'
        }
        alt='profileImg'
      />
      <div>
        <input ref={desc} required type='text' placeholder="What's happening" />
        <div className='postOptions'>
          <div
            className='Option'
            style={{ color: 'rgb(58, 207, 218)' }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className='Option' style={{ color: 'rgb(83, 89, 90)' }}>
            <UilPlayCircle />
            Video
          </div>
          <div className='Option' style={{ color: 'rgb(83, 89, 90)' }}>
            <UilLocationPoint />
            Location
          </div>
          <div className='Option' style={{ color: 'rgb(83, 89, 90)' }}>
            <UilSchedule />
            Schedule
          </div>
          <button
            className='button ps-button'
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? 'Uploading...' : 'Share'}
          </button>
          <div style={{ display: 'none' }}>
            <input
              type='file'
              name='myImage'
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className='previewImage'>
            <UilTimes onClick={() => setImage(null)} />

            <img src={URL.createObjectURL(image)} alt='previewImg' />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
