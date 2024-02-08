import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


function OptionsButton() {
  const navigate = useNavigate();
  const ulOptionsRef = useRef();

  const [showOptionsMenu, setshowOptionsMenu] = useState(false);

  const toggleOptionsMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeOptionsMenu
    setshowOptionsMenu(!showOptionsMenu);
  };

// Named function to use as a callback to close the menu
const closeOptionsMenu = () => setshowOptionsMenu(false);

  useEffect(() => {
    if (!showOptionsMenu) return;

    const closeOptionsMenu = (e) => {
      if (!ulOptionsRef.current.contains(e.target)) {
        setshowOptionsMenu(false);
      }
    };
    document.getElementById("profile-button")?.addEventListener('click', closeOptionsMenu);
    document.addEventListener('click', closeOptionsMenu);

    return () => document.removeEventListener("click", closeOptionsMenu);
  }, [showOptionsMenu]);

  const ulOptionsClassName = "options-dropdown" + (showOptionsMenu ? "" : " hidden");


  function gotToBeers() {
    navigate("/beers");
    closeOptionsMenu();
  }

  function gotToBreweries() {
    navigate("/breweries");
    closeOptionsMenu();
  }

  return (
    <div id="options-button-container">
      <div id='options-button' onClick={toggleOptionsMenu}>
        <i id='options-menu-bars' className="fas fa-bars"></i>
      </div>

      <div id='options-menu' className={ulOptionsClassName} ref={ulOptionsRef}>
            <div className='options-menu-option' onClick={gotToBeers}>Beers</div>
            <div className='separator'></div>
            <div className='options-menu-option' onClick={gotToBreweries}>Breweries</div>
      </div>
    </div>
  );
}

export default OptionsButton;
