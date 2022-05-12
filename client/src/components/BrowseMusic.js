import {useEffect, useContext, useState} from 'react'
import { AppContext } from './AppContext';

function BrowseMusic () {

  const { user } = useContext(AppContext)

  const [mySpotifyAlbums, setMySpotifyAlbums] = useState(null)

  useEffect (() => {
    fetch('https://api.spotify.com/v1/me/albums', {
    // fetch('https://api.spotify.com/v1/browse/categories', {
    // fetch('https://api.spotify.com/v1/search?type=album&genre=', {
      method: "GET",
      headers: { Authorization: "Bearer " + user.spotify_access_token}
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }, [])

  return (
    <div>
      <h1>Browse My Saved Albums from Spotify</h1>


      {/* {albumSearchResults 
        ?
        albumSearchResults.map((album) => (
          <SearchThumbnail album={album} key={album.id} />
          // <img src={album.images[2].url} />
        ))
          :
          null

      } */}
      {/* <button onClick={() => console.log(albumSearchResults)}>Search Results</button> */}
    </div>
  );
};

export default BrowseMusic;