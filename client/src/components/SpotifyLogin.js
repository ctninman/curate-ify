import React from 'react';

// const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=37edc2f56dc84f5794fd58181f66403a&response_type=code&redirect_uri=http://localhost:4000&scope=streaming%20user-modify-playback-state%20user-read-playback-state"

function SpotifyLogin({spotifyCode, setSpotifyCode}) {
  return (
    <div>
      <a href={'https://curate-ify.herokuapp.com//spotify-login'}>
        <button 
          className='login-button'
          >Connect to Your Spotify Account
        </button>
      </a>
    </div>
  );
}

export default SpotifyLogin;