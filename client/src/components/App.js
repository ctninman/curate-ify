import {useState, useEffect} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import '../index.css';
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

  // const [spotifyCode, setSpotifyCode] = useState(null)
  const [count, setCount] = useState(0)
  const [user, setUser] = useState(null)
  const [toggler, setToggler] = useState(false)


  useEffect (() => {
    fetch('/me', {method: "GET"})
    .then((res) => {
      // if (res.ok) {
        console.log(res)
        res.json()
        .then((data) => setUser(data.user))
      // }
    })
    
  }, [] )

  useEffect (() => {
    fetch('/hello')
    .then((r) => r.json())
    .then((data) => setCount(data.count))
  }, [])

  function testFetch () {
    fetch('/me',
    {method: 'GET'})
    .then((r) => {
      r.json()
      .then(data => console.log('test fetch', data))
    })
    
  }

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar className='nav-bar' setUser={setUser}/>
        <Switch>
          <Route path="/login">
            <LogIn user={user} setUser={setUser}/>
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
            <div>
              <h1>Welcome to Curate-ify</h1>
              <h2>Page Count: {count}</h2>
            </div>
          </Route>
        </Switch>
      
        <button onClick={() => console.log('user', user)}>User</button>
        <button onClick={() => console.log('user_id', user.id)}>UserID</button>
        <button onClick={testFetch}>Test Fetch</button>
      </div>
    </BrowserRouter> 
  );
}

export default App;
