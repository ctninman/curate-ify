import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '../index.css';
import AlbumForm from './AlbumForm';
import { AppContext } from './AppContext';
import Artists from './Artists';
import Collection from './Collection';
import Friends from './Friends';
import Home from './Home'
import Lists from './Lists';
import LoadScreen from './LoadScreen';
import LogIn from './LogIn';
import NavBar from './NavBar';
import NoUser from './NoUser';
import Queue from './Queue';
import Search from './Search';
import SignUp from './SignUp';
import SpotifyLogin from './SpotifyLogin';

function App() {
  
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [singleSelectedAlbum, setSingleSelectedAlbum] = useState(null)
  const [singleListSelection, setSingleListSelection] = useState(null)
  const [toggler, setToggler] = useState(false)
  const [allUserLists, setAllUserLists] = useState(null)
  const [allUserGenres, setAllUserGenres] = useState(null)
  const [allUserTags, setAllUserTags] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [arrayOfTracks, setArrayOfTracks] = useState('')
  const [playingTrack, setPlayingTrack] = useState(null)
  const [playingAlbum, setPlayingAlbum] = useState(null)
  const [play, setPlay] = useState(false)
  const [minimized, setMinimized] = useState(true)
  const [showComponentLinks, setShowComponentLinks] = useState(false)
  const [userCollectionAlbums, setUserCollectionAlbums] = useState([])
  const [offsetNumber, setOffsetNumber] = useState(0)
  const [spotifyCode, setSpotifyCode] = useState(new URLSearchParams(window.location.search).get("code"))
  
  useEffect (() => {
    if(!spotifyCode) {
      fetchUser()
    }
  }, [] )

  useEffect (() => {
    if (user) {
      setIsLoading(true)
      fetch(`users/${user.id}/lists`, {method: "GET"})
      .then(res => res.json())
      .then(data => setAllUserLists(data.lists))
      fetch(`/users/${user.id}/genres`, {
        method: "GET"
      })
      .then(res => res.json())
      .then(data => {
        setAllUserGenres(data.genres)
        setAllUserTags(data.tags)
        setIsLoading(false)
      })
    }
  }, [user])

  const fiveMinutes = 300000;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (user && user.spotify_access_token) {
  //       fetch("/refresh-token", {method: "GET"})
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.hasOwnProperty('user')) {
  //           setUser(data.user)
  //           console.log('data.refreshed_token', data.refreshed_token)
  //           setAccessToken(data.refreshed_token)
  //         } else if (data.hasOwnProperty('message')){
  //           console.log("Still Good")
  //         }
  //       })
  //     }
  //   }, [fiveMinutes]);
  //   return () => clearInterval(interval);
  // }, [])

  useEffect (() => {
    if (spotifyCode) {
      fetch("/access-token", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({code: spotifyCode})
      })
      .then(res => res.json())
      .then(data => {
        setUser(data.spotify_user)
        setAccessToken(data.spotify_user.spotify_access_token)
      })
     } else {
      return
    }
  }, [spotifyCode])

  function fetchUser () {
    fetch('/me', {method: "GET"})
    .then((res) => {
      if (res.ok) {
        res.json()
        .then((data) => {
          setUser(data.user)
          if (data.user.spotify_access_token) {
            setAccessToken(data.user.spotify_access_token)
          }
          setToggler(!toggler)
          if (data.user.albums && data.user.albums.length > 0) {
            setUserCollectionAlbums(data.user.albums)
          }  
        })
      } else {
        console.log('please login')
      }
    })
  }

  function refreshMe () {
    fetch("/refresh-token", {method: "GET"})
        .then((res) => res.json())
        .then((data) => {
          if (data.hasOwnProperty('user')) {
            setUser(data.user)
            setAccessToken(data.user.spotify_access_token)
          } else if (data.hasOwnProperty('message')){
            console.log("Still Good")
          }
        })
  }

  function addAlbumToPlayer (url) {
    setOffsetNumber(0)
    setPlayingTrack(null)
    fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken}
    })
    .then(res => res.json())
    .then((data) => {
      
      setPlayingAlbum(data)
      let trackArray = []
      data.tracks.items.forEach(track => trackArray.push(track.uri))
      setArrayOfTracks(trackArray)
      setPlayingTrack(trackArray[0])
      setMinimized(false)
    })
  }

//*** JSX ***//
  return (
    <BrowserRouter>
      <AppContext.Provider 
        value={{
          user, 
          setUser, 
          isLoading, 
          setIsLoading, 
          singleSelectedAlbum, 
          setSingleSelectedAlbum, 
          fetchUser,
          allUserLists,
          setAllUserLists,
          singleListSelection,
          setSingleListSelection,
          allUserGenres,
          allUserTags,
          setAllUserTags,
          setAllUserGenres,
          arrayOfTracks,
          setArrayOfTracks,
          playingTrack,
          setPlayingTrack,
          playingAlbum,
          setPlayingAlbum,
          play,
          setPlay,
          minimized,
          setMinimized,
          addAlbumToPlayer,
          userCollectionAlbums,
          setUserCollectionAlbums,
          refreshMe,
          accessToken,
          setAccessToken,
          offsetNumber,
          setOffsetNumber
        }} >
        <NavBar 
          className='nav-bar'  
          setUser={setUser}
          showComponentLinks={showComponentLinks}
          setShowComponentLinks={setShowComponentLinks}/>

          {user
              ?
            <>
              {user && user.connected_to_spotify === false ?
                <div style={{marginBottom: '10px'}}>
                  <div className='spotify-login'>
                    <SpotifyLogin />
                  </div>
                </div>
                  : 
                null
              }
              {singleSelectedAlbum
                  ?
                <div>
                  <AlbumForm parentComponent='search'/>
                </div>
                  : 
                <div className="App">  
                  <Switch>
                    <Route path="/collection">
                      <Collection />
                    </Route>
                    <Route path="/queue">
                      <Queue />
                    </Route>
                    <Route path="/friends">
                      <Friends />
                    </Route>
                    <Route path="/lists">
                      <Lists />
                    </Route>
                    <Route path="/artists">
                      <Artists />
                    </Route>
                    <Route path="/search">
                      <Search />
                    </Route>
                    <Route path="/#access_token">
                      <h1>Successfully rerouted</h1>
                    </Route>
                    <Route path="/">
                      <Home />
                    </Route>
                  </Switch>
                  {/*** TEST BUTTONS ***/}
                  {/* <div style={{position: 'fixed', bottom: '0'}}>
                    <button onClick={refreshMe}>R</button>
                  </div>  */}
                </div>
              }
            </>
              :
              <div className="App">  
              <Switch>
                <Route path="/collection">
                  <NoUser />
                </Route>
                <Route path="/queue">
                  <NoUser />
                </Route>
                <Route path="/friends">
                  <NoUser />
                </Route>
                <Route path="/lists">
                  <NoUser />
                </Route>
                 <Route path="/lists">
                  <NoUser />
                </Route>
                <Route path="/artists">
                  <NoUser />
                </Route>
                <Route path="/search">
                  <NoUser />
                </Route>
                <Route path="/#access_token">
                  <h1>Successfully rerouted</h1>
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          } 
         <Switch>
            <Route path="/login">
              <LogIn />
            </Route>
            <Route path="/signup">
              <SignUp user={user} setUser={setUser}/>
            </Route>
          </Switch>
      </AppContext.Provider>
    </BrowserRouter> 
  );
}

export default App;
