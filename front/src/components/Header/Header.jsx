import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
const Header = () => {
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>GoalSetter</Link>
      </div>
      <ul>
        {user ? (
            <>
             <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
           <li>
           <Link to='/profile'>
             <FaUser /> Profile
           </Link>
            </li>
            </>
         
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
