

import {useState, useEffect, useContext} from "react"
import {useHistory} from 'react-router-dom'
import {AppContext} from "./AppContext"
import SpotifyLogin from './SpotifyLogin'

function LogIn () {

  let history = useHistory()

  const { user, setUser } = useContext(AppContext)

  const [loginSpotifyCode, setLoginSpotifyCode] = useState (new URLSearchParams(window.location.search).get("code"))
  const [loginErrors, setLoginErrors] = useState(null)
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

    function handleLogin (event) {
      event.preventDefault()
      setLoginPassword("")
      setLoginUsername("")
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
        })
        .then((r) => {
        if (r.ok) {
          r.json()
          .then((data) => {
            setUser(data.user)
            history.push('/collection')
          });
        } else {
          r.json()
          .then((err) => setLoginErrors(err))
        }
      })
    }
  
    return (
      <>

        <form onSubmit={handleLogin}>
          <div style={{marginLeft: '20px'}}>
            <label htmlFor="login-username">Username:</label>
            <input
              type="text"
              id="login-username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
            <label htmlFor="login-password">Password:</label>
            <input
              type="password"
              id="login-password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
  
          <button style={{margin: '20px', fontSize: '15px'}} type="submit">Login</button>
        </form>

        {user != null && user.connected_to_spotify === false ? <SpotifyLogin spotifyCode={loginSpotifyCode} setSpotifyCode={setLoginSpotifyCode}/> : null}
        {/* {errors ? <h2 className='error'>- {errors.error}</h2> : null} */}
      </>
    );
  }

export default LogIn