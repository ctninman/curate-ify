import {useState, useEffect} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import '../index.css';
import AlbumForm from './AlbumForm';
import { AppContext } from './AppContext';
import Artists from './Artists';
import Collection from './Collection';
import Friends from './Friends';
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
  const [toggler, setToggler] = useState(false)

  function fetchUser () {
    fetch('/me', {method: "GET"})
    .then((res) => {
      // if (res.ok) {
        console.log(res)
        res.json()
        .then((data) => setUser(data.user))
      // }
    })
  }

  useEffect (() => {
    fetchUser()
  }, [] )

  const fiveMinutes = 300000;

  function refreshMe () {
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

  function testFetch () {
    fetch("/refresh-token", {method: "GET"})
        .then((res) => res.json())
        .then((data) => console.log(data))
  }

  return (
    <BrowserRouter>
      <AppContext.Provider value={{user, setUser, isLoading, setIsLoading, singleSelectedAlbum, setSingleSelectedAlbum, fetchUser}} >
        
      {singleSelectedAlbum
          ?
        <div>
          <AlbumForm />
          <button onClick={() => console.log('selected album', singleSelectedAlbum)}>Selected Album</button>
        </div>
          :
        <div className="App">
          <NavBar className='nav-bar' setUser={setUser}/>
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
            </Route>
          </Switch>
        
          <button onClick={() => console.log('user', user)}>U</button>
          <button onClick={refreshMe}>R</button>
          
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
