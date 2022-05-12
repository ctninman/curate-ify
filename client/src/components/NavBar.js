import { NavLink, useHistory } from 'react-router-dom'
import siteLogo from '../images/curate-ify-logo.png'
import {useContext} from 'react'
import {AppContext} from './AppContext'

function NavBar() {

  const {user, setUser} = useContext(AppContext)

  let history = useHistory()

  function handleSignOut () {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        history.push('/')
        setUser(null);
      }
    });
  }

  return (
    <div>
      {/* <h1 style={{marginTop: '3px', marginBottom: '3px'}}>NavBar</h1> */}

      <div className='flex-row' style={{justifyContent: 'space-between'}}>
        <div className='flex-row-center'>
          <NavLink
            to='/'
            exact
            className='nav-bar'
            activeStyle={{color: 'gray'}}
          >
            HOME
          </NavLink>

          <NavLink
            to='/collection'
            exact
            className='nav-bar'
            activeStyle={{color: 'gray'}}
          >
            COLLECTION
          </NavLink>

          <NavLink
            to='/queue'
            exact
            className='nav-bar'
            activeStyle={{color: 'gray'}}
          >
            QUEUE
          </NavLink>

          <NavLink
            to='/lists'
            exact
            className='nav-bar'
            activeStyle={{color: 'gray'}}
          >
            LISTS
          </NavLink>

          <NavLink
            to='/search'
            exact
            className='nav-bar'
            activeStyle={{color: 'gray'}}
          >
            SEARCH
          </NavLink>

          <NavLink
            to='/friends'
            exact
            className='nav-bar'
            activeStyle={{color: 'gray'}}
          >
            FRIENDS
          </NavLink>

        </div>

        <div className='flex-row-center'>

        <NavLink
            to='/login'
            exact
            className='nav-bar'
            activeStyle={{color: 'gray'}}
          >
            LOGIN
          </NavLink>
          <NavLink
            to='/signup'
            exact
            className='nav-bar'
            activeStyle={{color: 'gray'}}
          >
            SIGNUP
          </NavLink>
          <button onClick={handleSignOut}>LOGOUT</button>
          {user && user.spotify_profile_image ? <img style={{width: '50px', height: '50px'}} src={user.spotify_profile_image} alt='Profile picture'/>: null}

        </div>

      </div>
    
      <div style={{display: 'flex', flexDirection: 'row', width: '100%',marginTop: '0px', marginBottom: '0px', flexWrap: 'wrap', justifyContent: 'center'}}>
          <img style={{width: '35%', minWidth: '350px'}}src={siteLogo}/>
        </div>

    </div>
  );
}

export default NavBar;