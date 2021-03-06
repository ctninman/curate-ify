import {useContext} from 'react';
import { AppContext } from './AppContext';

function ArtistThumbnail({artist, setSingleArtistAlbums, setSingleArtist, setArtistProp}) {

  const {accessToken} = useContext(AppContext)

  function fetchAllArtistAlbums () {
    setArtistProp('all')
    fetch(`https://api.spotify.com/v1/artists/${artist.spotify_artist_id}/albums?limit=50`, {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken}
    })
    .then(res => res.json())
    .then(data => {
      let newArray = data.items.map(item => (
      {
        album_cover: item.images[1].url, 
        album_title: item.name,
        spotify_album_id: item.uri.split('album:')[1],
        spotify_uri: item.external_urls.spotify,
        release_date: item.release_date.substring(0,4),
        spotify_artist_id: item.artists[0].id,
      }))
      setSingleArtistAlbums(newArray)
      setSingleArtist(artist.artist_name)
    })
  }

  function fetchCollectionArtistAlbums () {
    setArtistProp('in-collection')
    fetch(`/artists/${artist.id}/albums`, {method: "GET"})
    .then(res => res.json())
    .then(data => {
      setSingleArtistAlbums(data.artist_albums)
      setSingleArtist(artist.artist_name)
    })
  }
  
  return (
    <div 
      className='flex-column-center' 
      style={{border: '3px solid white', borderStyle: 'ridge', width: '17%', minWidth: '150px', margin: '5px', borderRadius: '5px'}}
    >
      <img alt='Artist photo' style={{width: '90%', border: '1px solid white', borderRadius: '3px', marginTop: '5px'}} src={artist.artist_photo} />
      <h3 style={{height: '45px', textAlign: 'center', overflow: 'scroll'}} className='small-margins'>{artist.artist_name}</h3>
      <button className='small-margins' onClick={fetchAllArtistAlbums}>All Albums</button>
      <button style={{marginBottom: '5px'}} className='small-margins' onClick={fetchCollectionArtistAlbums}>Albums in My Collection</button>
    </div>
  );
}

export default ArtistThumbnail;