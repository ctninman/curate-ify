import { useState, useContext } from "react"
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
            console.log('post/sessionlogin', data.user)
            history.push('/collection')
          });
        } else {
          r.json()
          .then((err) => {
            setLoginErrors(err.errors)
            alert(err.error)
          })
        }
      })
    }
  
    return (
      <div >
        <div className='login-screen-outer-outer'>
        <div className='login-screen-outer'>
        <div className='login-screen' >
          <form onSubmit={handleLogin}>
            <div className='flex-column-center'>
              <label style={{marginTop: '30px'}} className='login-label' htmlFor="login-username">Username:</label>
              <input
                type="text"
                id="login-username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
              />
              <label className='login-label'htmlFor="login-password">Password:</label>
              <input
                type="password"
                id="login-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <div className='flex-row-center'>
              <button className='login-button' 
              style={{ margin: '20px', fontSize: '15px', backgroundColor:'#DDB20C', border: 'double 3px black'}}
                type="submit">LOGIN</button>
            </div>
          </form>
        </div>
        </div>
        </div>
        {user != null && user.connected_to_spotify === false ? <SpotifyLogin spotifyCode={loginSpotifyCode} setSpotifyCode={setLoginSpotifyCode}/> : null}
      </div>
    );
  }

export default LogIn