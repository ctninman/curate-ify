import React from 'react';

function SpotifyLogin({spotifyCode, setSpotifyCode}) {
  return (
    <div>
      <a href={'https://curate-ify.herokuapp.com/spotify-login'}>
        <button 
          className='spotify-account-login'
          >Connect to Your Spotify Account
        </button>
      </a>
    </div>
  );
}

export default SpotifyLogin;