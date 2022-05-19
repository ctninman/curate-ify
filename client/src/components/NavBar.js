import { NavLink, useHistory } from 'react-router-dom'
import siteLogo from '../images/curate-ify-logo.png'
import {useContext} from 'react'
import {AppContext} from './AppContext'
import MinimizedPlayer from './MinimizedPlayer'
import Player from './Player'

function NavBar() {

  const {user, setUser, accessToken, minimized, setMinimized, playingTrack} = useContext(AppContext)

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

      <div className='flex-row' style={{justifyContent: 'center'}}>
        <div className='flex-row-left' style={{width: '37%', flexWrap: 'wrap'}}>
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
            to='/artists'
            exact
            className='nav-bar'
            activeStyle={{color: 'gray'}}
          >
            ARTISTS
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
            // activeStyle={{color: 'gray'}}
          >
            FRIENDS
          </NavLink>

        </div>

        <div style={{display: 'flex', flexDirection: 'row', width: '25%',marginTop: '0px', marginBottom: '0px', justifyContent: 'center'}}>
          <img style={{width: '100%', objectFit: 'contain'}}src={siteLogo}/>
        </div>
        

        <div className='flex-row' style={{width: '37%', justifyContent: 'flex-end'}}>

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
          <button style={{height: 'fit-content'}} className='small-margins' onClick={handleSignOut}>LOGOUT</button>
          {user && user.spotify_profile_image ? <img style={{width: '35px', height: '35px', borderRadius: '50%', border: '2px solid white'}} src={user.spotify_profile_image} alt='Profile picture'/>: null}

        </div>

      </div>
    
      {playingTrack ? <MinimizedPlayer /> : null }

    </div>
  );
}

export default NavBar;