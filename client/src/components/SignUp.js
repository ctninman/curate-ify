import {useState, useEffect} from "react"
import {useHistory} from 'react-router-dom'
import SpotifyLogin from "./SpotifyLogin"
import LoadScreen from "./LoadScreen"

function SignUp ({user, setUser}) {

    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState(null)
    const [collectionPrivate, setCollectionPrivate] = useState(false)

  const [spotifyCode, setSpotifyCode] = useState(new URLSearchParams(window.location.search).get("code"))

  let history = useHistory()

  useEffect (() => {
    if (spotifyCode) {
      fetch("/access-token", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({code: spotifyCode})
      })
      .then(res => res.json())
      // .then(data => console.log(data))
      .then(data => {
        setUser(data.spotify_user)
        history.push('/')
      })
          // spotify_access_token: data.spotify_response.access_token}))
     } else {
      return
    }
  }, [spotifyCode])

  function resetFormData () {
    setPassword('')
    setPasswordConfirmation('')
    setUsername('')
    setEmail('')
    setCollectionPrivate(false)
  }

    function handleSubmit(e) {
      e.preventDefault();
      resetFormData()
        fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username: username,
            password: password,
            password_confirmation: passwordConfirmation,
            email: email,
            connected_to_spotify: false,
            spotify_expires_in: null,
            spotify_access_token: null,
            spotify_refresh_token: null,
            spotify_profile_image: null,
            spotify_url: null,
            spotify_username: null,
            user_tags: [],
            collection_public: !collectionPrivate,
            
          }),
        }).then((r) => {
          if (r.ok) {
            r.json()
            .then(data => {
              setUser(data.user)
              console.log(data)
            })
            // .then(history.push('/'))
          } else {
            r.json()
            
            .then((err)=>setErrors(err))
          }
        });
    } 
  
    return (
      <div>
        {/* <div className='login-container'>
         <LoadScreen />
        </div> */}
      {!user ?
        <div className='signup-form flex-column-center'>
          <form onSubmit={handleSubmit} >
            <div className='flex-column-center login-screen'>
              <label className='login-label' htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              
              <label className='login-label' htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <label className='login-label' htmlFor="password-confirmation">Confirm Password:</label>
              <input
                type="password"
                id="password-confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
        
                <label className='login-label' htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
          

              <div style={{display: 'flex', flexDirection: 'row'}}>
                <input
                type="checkbox"
                id="is-private"
                checked={collectionPrivate}
                onChange={() => setCollectionPrivate(!collectionPrivate)}
                />
                <label className='login-label' htmlFor="is-private">I do not want others to be able to browse my collection</label>
              </div>

              <button 
                className='login-button'
                style={{textAlign: 'center', margin: '20px', fontSize: '15px', backgroundColor:'#DDB20C', border: 'double 3px black'}}
                type="submit">SIGN UP</button>
            </div>
          </form>
        </div>
      : null }

      {user != null && user.connected_to_spotify === false ? 
        <div className='spotify-login'>
          <SpotifyLogin spotifyCode={spotifyCode} setSpotifyCode={setSpotifyCode}/>
        </div>
       : null}
      {/* {spotifyCode ? <h1>I have a code, nah nah poopoo</h1> : <h1>Give me the f'in code!</h1>} */}

      {/* {errors ? errors.errors.map((error) => <h2 key={error} className='error'>-{error}</h2>) : null} */}

      </div>

    );
  }

export default SignUp





// function SignUp(props) {
//   return (
//     <div>
//       <h1>SignUp</h1>
//     </div>
//   );
// }

// export default SignUp;