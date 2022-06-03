import React from 'react';

function SpotifyLogin({spotifyCode, setSpotifyCode}) {
  return (
    <div>
      <a href={'http://localhost:3000/spotify-login'}>
        <button 
          className='spotify-account-login'
          >Connect to Your Spotify Account
        </button>
      </a>
    </div>
  );
}

export default SpotifyLogin;