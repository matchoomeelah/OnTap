import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as sessionActions from '../../redux/session';
import LoginFormModal from '../Modals/LoginFormModal/LoginFormModal';
import SignupFormModal from '../Modals/SignupFormModal/SignupFormModal';
import OpenModalMenuItem from './OpenModalMenuItem';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ulRef = useRef();

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // Named function to use as a callback to close the menu
  const closeMenu = () => setShowMenu(false);


  // Logout from current user and navigate to home page
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.thunkLogout());
    closeMenu();
    navigate('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <button id='profile-button' onClick={toggleMenu}>
        <i id='menu-bars' className="fas fa-bars"></i>
        <i id='profile-icon' className="fas fa-user-circle fa-lg" />
      </button>

      <div id='dropdown-menu' className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>Hello, {user.username}!</div>
            <div>{user.email}</div>
            <div className='separator'></div>
            <div onClick={() => navigate(`/users/${user.id}`)}>My Profile</div>
            {/* <div id='manage-spots-div' onClick={onClickManageSpots}>Manage Spots</div> */}
            {/* <div id='manage-reviews-div' onClick={onClickManageReviews}>Manage Reviews</div> */}
            {/* <div className='separator'></div> */}
            <div>
              <button id="logout-button" onClick={logout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <div className='signup-menu-item'>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
            <div className='login-menu-item'>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
