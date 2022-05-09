import React from 'react';

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=37edc2f56dc84f5794fd58181f66403a&response_type=code&redirect_uri=http://localhost:4000&scope=streaming%20user-modify-playback-state%20user-read-playback-state"

function SpotifyLogin(props) {
  return (
    <div>
      <h1>Spotify Login Component</h1>
      <a href={'http://localhost:3000/spotify-login'}>Connect to Your Spotify Account</a>
    </div>
  );
}

export default SpotifyLogin;