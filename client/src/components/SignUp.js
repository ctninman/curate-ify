import {useState} from "react"
import SpotifyLogin from "./SpotifyLogin"

function SignUp ({user, setUser}) {

    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [signupErrors, setSignupErrors] = useState(null)
    const [collectionPrivate, setCollectionPrivate] = useState(false)

  const [spotifyCode, setSpotifyCode] = useState(new URLSearchParams(window.location.search).get("code"))

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
            token_updated_at: '2022-05-30 13:51:09.885373 -0400'
            
          }),
        }).then((r) => {
          if (r.ok) {
            r.json()
            .then(data => {
              setUser(data.user)
            })
          } else {
            r.json()
            
            .then((err)=> {setSignupErrors(err.errors)
            })
          }
        });
    } 
  
    return (
      <div>
      {!user ?
        <div className='login-screen-outer-outer'>
        <div className='login-screen-outer'>
        <div className='login-screen' >
          <form onSubmit={handleSubmit} >
            <div className='flex-column-center' style={{marginTop: '-5px'}}>
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

              <button 
                className='login-button'
                style={{ margin: '40px', fontSize: '15px', backgroundColor:'#DDB20C', border: 'double 3px black'}}
                type="submit">SIGN UP</button>
            </div>
          </form>
          {signupErrors ? signupErrors.map((e) => 
            (<h2 className='small-margins' key={e} style={{color: 'red', textAlign: 'center'}}>-{e}</h2>))
            : null}
        </div>
        </div>
        </div>
      : null }

      {user != null && user.connected_to_spotify === false ? 
        <div className='spotify-login'>
          <SpotifyLogin spotifyCode={spotifyCode} setSpotifyCode={setSpotifyCode}/>
        </div>
       : null}
      </div>
    );
  }

export default SignUp