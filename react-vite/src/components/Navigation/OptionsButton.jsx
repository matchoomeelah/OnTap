import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../Modals/LoginFormModal/LoginFormModal';
import SignupFormModal from '../Modals/SignupFormModal/SignupFormModal';


function OptionsButton() {
  const navigate = useNavigate();
  const ulOptionsRef = useRef();
  const sessionUser = useSelector(state => state.session.user);

  const [showOptionsMenu, setshowOptionsMenu] = useState(false);

  const toggleOptionsMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeOptionsMenu
    setshowOptionsMenu(!showOptionsMenu);
  };

  // Named function to use as a callback to close the menu
  const closeOptionsMenu = () => setshowOptionsMenu(false);

  useEffect(() => {
    if (!showOptionsMenu) return;

    // Closes menu when you click outside it
    const closeOptionsMenu = (e) => {
      if (!ulOptionsRef.current.contains(e.target)) {
        setshowOptionsMenu(false);
      }
    };

    document.querySelector("nav").addEventListener('click', closeOptionsMenu);
    document.addEventListener('click', closeOptionsMenu);

    return () => {
      document.removeEventListener("click", closeOptionsMenu);
      document.querySelector("nav").removeEventListener("click", closeOptionsMenu);

    }
  }, [showOptionsMenu]);

  const ulOptionsClassName = "options-dropdown" + (showOptionsMenu ? "" : " hidden");

  function goToBeers() {
    navigate("/beers");
    closeOptionsMenu();
  }

  function goToBreweries() {
    navigate("/breweries");
    closeOptionsMenu();
  }

  return (
    <div id="options-button-container">
      <div id='options-button' onClick={toggleOptionsMenu}>
        <i id='options-menu-bars' className="fas fa-bars"></i>
      </div>

      <div id='options-menu' className={ulOptionsClassName} ref={ulOptionsRef}>
        <div className='options-menu-option' onClick={goToBeers}>Beers</div>
        <div className='separator'></div>
        <div className='options-menu-option' onClick={goToBreweries}>Breweries</div>
        {!sessionUser &&
          <>
            <div className='separator'></div>
            <OpenModalMenuItem
              itemClass="options-menu-option"
              itemText={'Log In'}
              onItemClick={closeOptionsMenu}
              modalComponent={<LoginFormModal />}
            />
            <div className='separator'></div>
            <OpenModalMenuItem
              itemClass="options-menu-option"
              itemText={'Sign Up'}
              onItemClick={closeOptionsMenu}
              modalComponent={<SignupFormModal />}
            />
            </>
        }
      </div>
    </div>
  );
}

export default OptionsButton;
