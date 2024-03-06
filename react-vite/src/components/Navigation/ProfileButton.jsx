import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as sessionActions from '../../redux/session';
import LoginFormModal from '../Modals/LoginFormModal/LoginFormModal';
import SignupFormModal from '../Modals/SignupFormModal/SignupFormModal';
import OpenModalMenuItem from './OpenModalMenuItem';
import { actionClearUser } from '../../redux/users';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user)
  const ulRef = useRef();

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.querySelector("nav").addEventListener('click', closeMenu);
    document.addEventListener('click', closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
      document.removeEventListener("click", closeMenu);
    }
  }, [showMenu]);

  // Named function to use as a callback to close the menu
  const closeMenu = () => setShowMenu(false);


  // Logout from current user and navigate to home page
  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.thunkLogout());
    await dispatch(actionClearUser());
    closeMenu();
    navigate('/');
  };

  // Go to user's profile
  const goToProfile = () => {
    navigate(`/users/${user.id}`);
    closeMenu();
  }

  // Go to user's profile
  const goToBeerForm = () => {
    navigate(`/beers/new`);
    closeMenu();
  }

  // Go to user's profile
  const goToBreweryForm = () => {
    navigate(`/breweries/new`);
    closeMenu();
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <button id='profile-button' onClick={toggleMenu}>
        <i id='profile-icon' className="fas fa-user-circle fa-lg" />
      </button>

      <div id='dropdown-menu' className={ulClassName} ref={ulRef}>
        {sessionUser ? (
          <>
          <div id="greeting">Hello, {user.username.length < 20 ? user.username : user.username.slice(0,20) + "..."}!</div>
            <div className='separator'></div>
            <div className='user-menu-option' onClick={goToProfile}>My Profile</div>
            <div className='separator'></div>
            <div className='user-menu-option' onClick={goToBeerForm}>Add a Beer</div>
            <div className='separator'></div>
            <div className='user-menu-option' onClick={goToBreweryForm}>Add a Brewery</div>
            <div className='separator'></div>
            <div className='user-menu-option'><button className="logout-button" onClick={logout}>Log Out</button></div>

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
