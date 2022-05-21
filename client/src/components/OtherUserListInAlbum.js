import {useContext} from 'react';
import {AppContext} from './AppContext'
import SpotifyIcon from '../images/spotify.png'
import FriendIcon from '../images/FriendIcon.png'

function OtherUserListInAlbum({album}) {

  const {user, addAlbumToPlayer} = useContext(AppContext)

  function addOtherUserAlbumToQueue() {
    console.log(album)
    fetch('/queue_albums', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        
        album_title: album.album_title,
        artist_name: album.artist,
        spotify_artist_id: album.spotify_artist_id,
        spotify_album_id: album.spotify_album_id,
        spotify_uri: album.spotify_uri,
        album_cover: album.album_cover,
        user_id: user.id,
        release_date: album.release_date,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
    }

  return (
      <div className='flex-row-left other-list' style={{border: '2px solid white'}} >
            <div style={{width: '50px'}}> 
              <img style={{width: '100%', borderRadius: '3px'}}src={album.album_cover} />
            </div>
            <div>
              <h3 style={{overflow: 'scroll', height: '45%'}} className='small-margins'>{album.album_title}</h3>
              <h3 style={{overflow: 'scroll', height: '45%', fontStyle: 'italic'}} className='small-margins'>{album.artist}</h3>
            </div>

            
            <div className='flex-row'>
              <button style={{height: '25px', marginTop: '12px', marginLeft: '8px'}} onClick={addOtherUserAlbumToQueue}>+ Queue</button>
              <div className='player-icons' style={{width: '25px', marginRight: '8px', marginTop: '12px', marginBottom: '12px', marginLeft: '8px'}}>
                <a href={album.spotify_url} target="_blank"><img style={{width: '100%'}} src={SpotifyIcon} /></a>
              </div>
              <div className='player-icons' style={{width: '25px', marginRight: '8px', marginTop: '12px', marginBottom: '12px'}}>
                <span onClick={() => addAlbumToPlayer(`https://api.spotify.com/v1/albums/${album.spotify_id}`)}>
                  <img style={{width: '100%'}} src={FriendIcon} />
                </span>
              </div>
            </div>

          </div>
  );
}

export default OtherUserListInAlbum;