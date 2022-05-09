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
const SpotifyWebApi = require('spotify-web-api-node')

function App() {

  const [count, setCount] = useState(0)
  const [token, setToken] = useState(null)
  const [toggler, setToggler] = useState(false)

 

  const CLIENT_ID = '37edc2f56dc84f5794fd58181f66403a'
  const REDIRECT_URI = 'http://localhost:3000'
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
  const RESPONSE_TYPE = 'token'
  const CLIENT_SECRET = '055b7f9b6e4a4d8a929df8a2ce832040'


  // let spotifyApi = new SpotifyWebApi({
  //   clientId: CLIENT_ID,
  //   clientSecret: '055b7f9b6e4a4d8a929df8a2ce832040',
  //   redirectUri: 'http://localhost:4000'
  // });

  // useEffect (() => {
    
  // })

  // useEffect(() => {

  function getToken () {
    fetch('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        Authorization : 'Basic ' + 'MzdlZGMyZjU2ZGM4NGY1Nzk0ZmQ1ODE4MWY2NjQwM2E6IDA1NWI3ZjliNmU0YTRkOGE5MjlkZjhhMmNlODMyMDQw'
      },
      
        
      data: {
        grant_type: 'authorization_code',
        code: 'AQCW6hUzlKhe4j5PF43NnWUCiYWAsshBHFqAiu20m9bQFzJyySMwPQgZAzo5hZpgyiOMGCLf-A2GFdk3gwXocW_cr1EYS6lDjpAqVkqISberoxGXlRJ8k-Oi-qpHnsZ4qoYbAO0uMOCfFsoCiaBErVmV2HDR2BmqLXSchK2uIEoVQHmaYYEjMI409YlWOyZIGHE1VSl9ZpAx9cN5UX_nlJsAopqL-P7wXPOKhHONpl2S9yJQovhttYho8jeU-Xu_81kstFJOPsSQxIScA3FQ3aidD8WQwl9C5wR_Atgv7UHfT4W-5tTv2aZ36hXnUF_2ITPuOmHZdE67E_AW9aLuR6EeadM3RDiMW4iF0NnKlIxycehFeMV10O7giEqLqoPMK4OZ',
        redirect_uri: 'http://localhost:3000/access_token'
      },
      method: 'POST'
    }).then((data) => console.log(data))
  }
  //   .then(tokenResponse => {      
  //     setToken(tokenResponse.data.access_token);

  //     axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
  //       method: 'GET',
  //       headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
  //     })
  //     .then (genreResponse => {        
  //       setGenres({
  //         selectedGenre: genres.selectedGenre,
  //         listOfGenresFromAPI: genreResponse.data.categories.items
  //       })
  //     });
      
  //   });

  // }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]); 


    const spotifyApi = new SpotifyWebApi({
      clientId: CLIENT_ID,
      clientSecret: '055b7f9b6e4a4d8a929df8a2ce832040',
      redirectUri: 'http://localhost:4000'
    })


    // var authOptions = {
    //   url: 'https://accounts.spotify.com/api/token',
    //   form: {
    //     code: code,
    //     redirect_uri: redirect_uri,
    //     grant_type: 'authorization_code'
    //   },
    //   headers: {
    //     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    //   },
    //   json: true


    // useEffect (() => {
    // if (token) {
    //   fetch("https://accounts.spotify.com/api/tokens", {
    //     method: 'POST',
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //       "Authorization" : "Basic " + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    //     },
    //     form: {
    //       grant_type: "authorization_code"
    //     },
    //     json: true

    //     }).then
    //     res => console.log(res)
    //   }
    // }, [token] )



  // console.log("spot", spotifyApi)

 

  useEffect (() => {
    const hash = window.location
    console.log('hash', hash)
    console.log('clientID', CLIENT_ID)
    console.log('use effected')
    let userToken = hash.search.split('code=')[1]
    setToken(userToken)
    // Retrieve an access token and a refresh token
  // spotifyApi.authorizationCodeGrant(userToken).then(
  //   function(data) {
  //     console.log('The token expires in ' + data.body['expires_in']);
  //     console.log('The access token is ' + data.body['access_token']);
  //     console.log('The refresh token is ' + data.body['refresh_token']);

  //     // Set the access token on the API object to use it in later calls
  //     spotifyApi.setAccessToken(data.body['access_token']);
  //     spotifyApi.setRefreshToken(data.body['refresh_token']);
  //   },
  //   function(err) {
  //     console.log('Something went wrong!', err);
  //   }
  // );

    // if(!token && hash) {
    //   token = hash.substring(1).split('&').find(element => element.startsWith('access_token')).split('=')[1]
    //   console.log(userToken)
    //   window.localStorage.setItem("token", userToken)
    //   // setToken(to)
    // }
  }, [toggler])



  useEffect (() => {
    fetch('/hello')
    .then((r) => r.json())
    .then((data) => setCount(data.count))
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar className='nav-bar'/>
        <Switch>
          <Route path="/login">
            <LogIn/>
          </Route>
          <Route path="/signup">
            <SignUp />
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
        <button onClick={() => getToken()}>Token</button>
        {/* <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a> */}
        <SpotifyLogin />
      </div>
    </BrowserRouter> 
  );
}

export default App;
