import {useState, useEffect} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import '../index.css';
import AlbumForm from './AlbumForm';
import { AppContext } from './AppContext';
import Artists from './Artists';
import Collection from './Collection';
import Friends from './Friends';
import Home from './Home'
import Lists from './Lists';
import LogIn from './LogIn';
import NavBar from './NavBar';
import Queue from './Queue';
import Search from './Search';
import SignUp from './SignUp';
import SpotifyLogin from './SpotifyLogin';

function App() {

  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [singleSelectedAlbum, setSingleSelectedAlbum] = useState(null)
  const [singleListAlbum, setSingleListAlbum] = useState(null)
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

  
  useEffect (() => {
    fetchUser()
    refreshMe()
  }, [] )

  useEffect (() => {
    if (user) {
      fetch(`users/${user.id}/lists`, {method: "GET"})
      .then(res => res.json())
      .then(data => setAllUserLists(data.lists))
    }
  }, [user])


  useEffect (() => {
    if(user) {
      fetch(`/users/${user.id}/genres`, {
        method: "GET"
      })
      .then(res => res.json())
      .then(data => {
        setAllUserGenres(data.genres)
        setAllUserTags(data.tags)
        // let userCollectionCopy = [...userCollectionAlbums]
        // let orderedAlbums = userCollectionCopy.sort((a,b) => (a.rating > b.rating) ? -1 : 1)
        // setUserCollectionAlbums(orderedAlbums)
      })
    }
  }, [user] )


  function fetchUser () {
    fetch('/me', {method: "GET"})
    .then((res) => {
      // if (res.ok) {
        console.log(res)
        res.json()
        .then((data) => {
          console.log(data.user)
          setUser(data.user)
          setAccessToken(data.user.spotify_access_token)
        })
      // }
    })
  }



  const fiveMinutes = 300000;

  function refreshMe () {
    fetch("/refresh-token", {method: "GET"})
        .then((res) => res.json())
        .then((data) => {
          if (data.hasOwnProperty('user')) {
            setUser(data.user)
            console.log(data.user)
            setAccessToken(data.user.spotify_access_token)
          } else if (data.hasOwnProperty('message')){
            console.log("Still Good")
          }
        })
  }

  function addAlbumToPlayer (url) {
    fetch(url, {
    // fetch('https://api.spotify.com/v1/browse/categories', {
    // fetch('https://api.spotify.com/v1/search?type=album&genre=', {
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        fetch("/refresh-token", {method: "GET"})
        .then((res) => res.json())
        .then((data) => {
          if (data.hasOwnProperty('user')) {
            setUser(data.user)
          } else if (data.hasOwnProperty('message')){
            console.log("Still Good")
          }
        })
      }
    }, fiveMinutes);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

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
          accessToken
        }} >
        <NavBar className='nav-bar' setUser={setUser}/>
      {singleSelectedAlbum
          ?
        <div>
          <AlbumForm />
          <button onClick={() => console.log('selected album', singleSelectedAlbum)}>Selected Album</button>
        </div>
          :
        <div className="App">
          
          <Switch>
            <Route path="/login">
              <LogIn />
            </Route>
            <Route path="/signup">
              <SignUp user={user} setUser={setUser}/>
            </Route>
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
        
          <button onClick={() => console.log('user', user)}>U</button>
          <button onClick={refreshMe}>R</button>
          <button onClick={() => console.log('token', accessToken)}>U</button>
          <button onClick={() => console.log('playingAlbum', playingAlbum)}>PA</button>
          <button onClick={() => console.log('arrayOfTracks', arrayOfTracks)}>Arr</button>
          
          
        {/* {
        singleSelectedAlbum 
            ?
          <div>
            <AlbumForm />
          </div>
            :
          null
        } */}

        </div>
        }
      </AppContext.Provider>
    </BrowserRouter> 
  );
}

export default App;
