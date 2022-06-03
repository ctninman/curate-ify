import { useContext } from 'react';
import { AppContext } from './AppContext';
import SpotifyIcon from '../images/spotify.png'
import FriendIcon from '../images/FriendIcon.png'


function SingleArtist({album}) {

  const {addAlbumToPlayer} = useContext(AppContext)

  let uriInArtist =  `https://api.spotify.com/v1/albums/${album.spotify_album_id}`

  return (
    <div className='flex-column-center album-in-artist' >
      <img style={{width: '98%', borderRadius:'5px', margin: '2px'}}src={album.album_cover} />
      <h3 style={{textAlign: 'center', height: '40px', marginBottom: '5px', overflow: 'scroll'}} className='small-margins'>{album.album_title}</h3>
      <h3 style={{textAlign: 'center', height: '20px', marginBottom: '5px'}} className='small-margins'>{album.release_date}</h3>
      
      <div style={{width: '100%', borderRadiusBottom: '3px', backgroundColor: 'white'}}className='flex-row-center'>
        <div className='player-icons' style={{width: '35px', marginRight: '5%', marginTop: '5px'}}>
          <a href={album.spotify_uri} target="_blank"><img style={{width: '100%'}} src={SpotifyIcon} /></a>
        </div>
        <div className='player-icons' style={{width: '35px', marginLeft: '20px'}}>
          <span onClick={() => addAlbumToPlayer(uriInArtist)}>
            <img style={{marginTop: '5px', width: '100%'}} src={FriendIcon} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default SingleArtist;