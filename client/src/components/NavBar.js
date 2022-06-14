import { NavLink, useHistory} from 'react-router-dom'
import {useState} from 'react'
import siteLogo from '../images/curate-ify-logo.png'
import {useContext} from 'react'
import {AppContext} from './AppContext'
import MinimizedPlayer from './MinimizedPlayer'

function NavBar() {

  const {user, setUser, accessToken, minimized, setMinimized, playingTrack, setPlayingTrack} = useContext(AppContext)
  const [showAccountLinks, setShowAccountLinks] = useState(false)

  let history = useHistory()

  function handleSignOut () {
    setPlayingTrack(null)
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        history.push('/')
        setUser(null);
      }
    });
  }

  return (
    <div>

      <div onClick={() => setMinimized(true)} className='flex-row' style={{justifyContent: 'center'}}>

        <div className='flex-row-left' style={{width: '32%'}}></div>
        <div className='flex-column-left nav-bar-container'>
          
          <NavLink
            to='/'
            exact
            className='nav-bar'
            activeStyle={{writingMode: 'vertical-lr',backgroundColor: '#F04C24', color: 'black',paddingBottom: '3px', paddingTop: '3px', borderTopRightRadius: '3px', borderBottomRightRadius: '3px', paddingLeft: '3px'}}
          >
            HOME
          </NavLink>

          <NavLink
            to='/collection'
            exact
            className='nav-bar'
            activeStyle={{writingMode: 'vertical-lr',backgroundColor: '#F04C24', color: 'black',paddingBottom: '3px', paddingTop: '3px', borderTopRightRadius: '3px', borderBottomRightRadius: '3px', paddingLeft: '3px'}}
          >
            COLLECTION
          </NavLink>

          <NavLink
            to='/queue'
            exact
            className='nav-bar'
            activeStyle={{writingMode: 'vertical-lr',backgroundColor: '#F04C24', color: 'black',paddingBottom: '3px', paddingTop: '3px', borderTopRightRadius: '3px', borderBottomRightRadius: '3px', paddingLeft: '3px'}}
          >
            QUEUE
          </NavLink>

          <NavLink
            to='/artists'
            exact
            className='nav-bar'
            activeStyle={{writingMode: 'vertical-lr',backgroundColor: '#F04C24', color: 'black',paddingBottom: '3px', paddingTop: '3px', borderTopRightRadius: '3px', borderBottomRightRadius: '3px', paddingLeft: '3px'}}
          >
            ARTISTS
          </NavLink>

          <NavLink
            to='/lists'
            exact
            className='nav-bar'
            activeStyle={{writingMode: 'vertical-lr',backgroundColor: '#F04C24', color: 'black',paddingBottom: '3px', paddingTop: '3px', borderTopRightRadius: '3px', borderBottomRightRadius: '3px', paddingLeft: '3px'}}
          >
            LISTS
          </NavLink>

          <NavLink
            to='/search'
            exact
            className='nav-bar'
            activeStyle={{writingMode: 'vertical-lr',backgroundColor: '#F04C24', color: 'black',paddingBottom: '3px', paddingTop: '3px', borderTopRightRadius: '3px', borderBottomRightRadius: '3px', paddingLeft: '3px'}}
          >
            SEARCH
          </NavLink>

          <NavLink
            to='/friends'
            exact
            className='nav-bar'
            activeStyle={{writingMode: 'vertical-lr',backgroundColor: '#F04C24', color: 'black',paddingBottom: '3px', paddingTop: '3px', borderTopRightRadius: '3px', borderBottomRightRadius: '3px', paddingLeft: '3px'}}
          >
            FRIENDS
          </NavLink>
        </div>
    
        <div style={{display: 'flex', flexDirection: 'row', width: '35%',minWidth: '300px', marginTop: '0px', marginBottom: '0px', justifyContent: 'center'}}>
          <img alt='Site logo' onClick={() => history.push('/')} style={{width: '100%', objectFit: 'contain'}}src={siteLogo}/>
        </div>
  
        

        <div className='flex-row' style={{width: '27%', justifyContent: 'flex-end'}}>
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