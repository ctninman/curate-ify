import { useContext, useState } from 'react';
import { AppContext } from './AppContext';
import SpotifyIcon from '../images/spotify.png'
import FriendIcon from '../images/FriendIcon.png'


function SingleArtist({album, singleArtist, artistProp}) {

  const {user, addAlbumToPlayer} = useContext(AppContext)

  const [addedToQueueMessageInArtist, setAddedToQueueMessageInArtist] = useState(false)

  let uriInArtist =  `https://api.spotify.com/v1/albums/${album.spotify_album_id}`

  function addAlbumToQueueFromArtist () {
    fetch('/queue_albums', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        album_title: album.album_title,
        artist_name: singleArtist,
        spotify_artist_id: album.spotify_artist_id,
        spotify_album_id: album.spotify_album_id,
        spotify_uri: album.spotify_uri,
        album_cover: album.album_cover,
        user_id: user.id,
        release_date: album.release_date
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setAddedToQueueMessageInArtist(true)
        console.log(data)
      })
    }

  return (
    <div className='flex-column-center album-in-artist' >
      <img alt='Album cover' style={{width: '98%', borderRadius:'5px', margin: '2px'}}src={album.album_cover} />
      <h3 style={{textAlign: 'center', height: '40px', marginBottom: '5px', overflow: 'scroll'}} className='small-margins'>{album.album_title}</h3>
      <h3 style={{textAlign: 'center', height: '20px', marginBottom: '5px'}} className='small-margins'>{album.release_date}</h3>
      
      {artistProp === 'all' ?
        <div>
          {addedToQueueMessageInArtist? <button style={{backgroundColor: '#F8CB2E'}}>Added To Queue</button> : <button onClick={addAlbumToQueueFromArtist}>Add to Queue</button>}
        </div>
          :
        null
      }
      <div style={{width: '100%', borderRadiusBottom: '3px', backgroundColor: 'white'}}className='flex-row-center'>
        <div className='player-icons' style={{width: '35px', marginRight: '5%', marginTop: '5px'}}>
          <a href={album.spotify_uri} target="_blank"><img alt='Open in Spotify' style={{width: '100%'}} src={SpotifyIcon} /></a>
        </div>
        <div className='player-icons' style={{width: '35px', marginLeft: '20px'}}>
          <span onClick={() => addAlbumToPlayer(uriInArtist)}>
            <img alt='Open in player' style={{marginTop: '5px', width: '100%'}} src={FriendIcon} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default SingleArtist;