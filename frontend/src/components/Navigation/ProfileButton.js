import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './profileButton.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState(null);
	const [modals, setModals] = useState({ login: false, signup: false });

	const handleModal = (type, value) => {
		setModals((prev) => ({ ...prev, [type]: value }));
	};

	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const handleLogout = (e) => {
    e.preventDefault();
    handleModal('login', false);
    handleModal('signup', false);

    dispatch(logout());
    history.push('/');
    handleClose();
};

	return (
  <section>
    <IconButton onClick={handleClick}>
      <AccountBoxIcon id='userIcon' />
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {user ? (
        [
          <MenuItem key="username">{user?.username || 'Guest'}</MenuItem>,
          <MenuItem key="email">{user?.email}</MenuItem>,
          <MenuItem key="logout" onClick={handleLogout}>Log Out</MenuItem>,
        ]
      ) : (
        [
          <MenuItem key="login">
            <Button variant='contained' color='primary' onClick={() => handleModal('login', true)}>
              Log In
            </Button>
            <Modal open={modals.login} onClose={() => handleModal('login', false)}>
              <section className='modalContent'>
                <LoginFormModal open={modals.login} onClose={() => handleModal('login', false)} />
              </section>
            </Modal>
          </MenuItem>,
          <MenuItem key="signup">
            <Button variant='contained' color='secondary' onClick={() => handleModal('signup', true)}>
              Sign Up
            </Button>
            <Modal open={modals.signup} onClose={() => handleModal('signup', false)}>
              <section className='modalContent'>
                <SignupFormModal open={modals.signup} onClose={() => handleModal('signup', false)} />
              </section>
            </Modal>
          </MenuItem>
        ]
      )}
    </Menu>
  </section>
);

}

export default ProfileButton;
