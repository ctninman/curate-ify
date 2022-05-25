import { NavLink, useHistory} from 'react-router-dom'
import {useState} from 'react'
import siteLogo from '../images/curate-ify-logo.png'
import {useContext} from 'react'
import {AppContext} from './AppContext'
import MinimizedPlayer from './MinimizedPlayer'
import Player from './Player'

function NavBar({showComponentLinks, setShowComponentLinks}) {

  const {user, setUser, accessToken, minimized, setMinimized, playingTrack} = useContext(AppContext)
  // const [showComponentLinks, setShowComponentLinks] = useState(false)
  const [showAccountLinks, setShowAccountLinks] = useState(false)

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

      <div onClick={() => setMinimized(true)} className='flex-row' style={{justifyContent: 'center'}}>

        <div className='flex-row-left' style={{width: '37%'}}></div>
        <div className='flex-column-left nav-bar-container'>
          
          <NavLink
            to='/'
            exact
            className='nav-bar'
            activeStyle={{writingMode: 'vertical-lr',backgroundColor: '#F04C24', color: 'black',paddingBottom: '3px', paddingTop: '3px', borderTopRightRadius: '3px', borderBottomRightRadius: '3px', marginTop: '4px', marginBottom: '4px'}}
          >
            HOME
          </NavLink>

          <NavLink
            to='/collection'
            exact
            className='nav-bar'
            activeStyle={{writingMode: 'vertical-lr',backgroundColor: '#F04C24', color: 'black',paddingBottom: '3px', paddingTop: '3px', borderTopRightRadius: '3px', borderBottomRightRadius: '3px', marginTop: '4px', marginBottom: '4px'}}
          >
            COLLECTION
          </NavLink>

          <NavLink
            to='/queue'
            exact
            className='nav-bar'
            activeStyle={{writingMode: 'vertical-lr',backgroundColor: '#F04C24', color: 'black',paddingBottom: '3px', paddingTop: '3px', borderTopRightRadius: '3px', borderBottomRightRadius: '3px', marginTop: '4px', marginBottom: '4px'}}
          >
            QUEUE
          </NavLink>

          <NavLink
            to='/artists'
            exact
            className='nav-bar'
            activeStyle={{writingMode: 'vertical-lr',backgroundColor: '#F04C24', color: 'black',paddingBottom: '3px', paddingTop: '3px', borderTopRightRadius: '3px', borderBottomRightRadius: '3px', marginTop: '4px', marginBottom: '4px'}}
          >
            ARTISTS
          </NavLink>

          <NavLink
            to='/lists'
            exact
            className='nav-bar'
            activeStyle={{writingMode: 'vertical-lr',backgroundColor: '#F04C24', color: 'black',paddingBottom: '3px', paddingTop: '3px', borderTopRightRadius: '3px', borderBottomRightRadius: '3px', marginTop: '4px', marginBottom: '4px'}}
          >
            LISTS
          </NavLink>

          <NavLink
            to='/search'
            exact
            className='nav-bar'
            activeStyle={{writingMode: 'vertical-lr',backgroundColor: '#F04C24', color: 'black',paddingBottom: '3px', paddingTop: '3px', borderTopRightRadius: '3px', borderBottomRightRadius: '3px', marginTop: '4px', marginBottom: '4px'}}
          >
            SEARCH
          </NavLink>

          <NavLink
            to='/friends'
            exact
            className='nav-bar'
            activeStyle={{writingMode: 'vertical-lr',backgroundColor: '#F04C24', color: 'black',paddingBottom: '3px', paddingTop: '3px', borderTopRightRadius: '3px', borderBottomRightRadius: '3px', marginTop: '4px', marginBottom: '4px'}}
          >
            FRIENDS
          </NavLink>
        </div>
      { user ?
        <div style={{display: 'flex', flexDirection: 'row', width: '25%',marginTop: '0px', marginBottom: '0px', justifyContent: 'center'}}>
          <img style={{width: '100%', objectFit: 'contain'}}src={siteLogo}/>
        </div>
          :
        <div style={{display: 'flex', flexDirection: 'row', width: '25%',marginTop: '0px', marginBottom: '0px', justifyContent: 'center'}}></div>
      }
        

        <div className='flex-row' style={{width: '32%', justifyContent: 'flex-end'}}>
        {!user ?
          <>
          <NavLink
            to='/login'
            exact
            className='nav-bar-login'
            activeStyle={{backgroundColor: 'white', color: 'black', height: '20px', paddingLeft: '3px', paddingRight: '2px', borderBottomLeftRadius: '3px', borderBottomRightRadius: '3px'}}
          >
            LOGIN
          </NavLink>
       
          <NavLink
            to='/signup'
            exact
            className='nav-bar-login'
            activeStyle={{backgroundColor: 'white', color: 'black', height: '20px', paddingLeft: '3px', paddingRight: '2px', borderBottomLeftRadius: '3px', borderBottomRightRadius: '3px'}}
          >
            SIGNUP
          </NavLink>
          </>
           : null}

          {user ?
            <button style={{height: 'fit-content'}} className='small-margins' onClick={handleSignOut}>LOGOUT</button>
          : null}
          </div>
      
        <div style={{width: '5%'}}>
          {user && user.spotify_profile_image 
              ? 
            <img style={{width: '35px', height: '35px', borderRadius: '50%', border: '2px solid white'}} 
              src={user.spotify_profile_image} 
              alt='Profile picture'
              onClick={() => setShowAccountLinks(!showAccountLinks)}
            />
              : 
            null
          }
          </div>

        </div>

      
    
      {playingTrack ? <MinimizedPlayer /> : null }

    </div>
  );
}

export default NavBar;