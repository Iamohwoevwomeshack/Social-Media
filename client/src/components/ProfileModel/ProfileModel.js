import { Modal, Button } from '@mantine/core';
import './ProfileModel.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../actions/uploadAction';
import { updateUser } from '../../actions/userAction';

function ProfileModel({ modalOpened, setModalOpened, data }) {
  //   const [opened, { open, close }] = useDisclosure(false);

  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector(state => state.authReducer.authData);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === 'profileImage'
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append('name', fileName);
      data.append('file', profileImage);
      UserData.profilePicture = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append('name', fileName);
      data.append('file', coverImage);
      UserData.coverPicture = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(params.id, UserData));
    setModalOpened(false);
  };

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        // title='Authentication'
        size='80%'
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <form action='' className='infoForm'>
          <h3>Your info</h3>
          <div className='infoInput1'>
            <input
              type='text'
              className='infoInput'
              name='firstname'
              placeholder='First Name'
              onChange={handleChange}
              value={formData.firstName}
            />
            <input
              type='text'
              className='infoInput'
              name='lastname'
              placeholder='Last Name'
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>
          <div>
            <input
              type='text'
              className='infoInput'
              name='worksAt'
              placeholder='Works at'
              onChange={handleChange}
              value={formData.worksAt}
            />
          </div>
          <div className='infoInput2'>
            <input
              type='text'
              className='infoInput'
              name='livesin'
              placeholder='Lives in'
              onChange={handleChange}
              value={formData.livesin}
            />
            <input
              type='text'
              className='infoInput'
              name='country'
              placeholder='Country'
              onChange={handleChange}
              value={formData.country}
            />
          </div>
          <div>
            <input
              type='text'
              className='infoInput'
              name='relationship'
              placeholder='Relationship Status'
              onChange={handleChange}
              value={formData.relationship}
            />
          </div>
          <div className='imageUpload'>
            <div>
              Profile Image
              <input type='file' name='profileImage' onChange={onImageChange} />
            </div>
            <div>
              Cover Image
              <input type='file' name='coverImage' onChange={onImageChange} />
            </div>
          </div>
          <button
            className='button infoButton pushButton'
            onClick={handleSubmit}
          >
            Update
          </button>
        </form>
      </Modal>

      {/* <Button onClick={open}>Open modal</Button> */}
    </>
  );
}

export default ProfileModel;
