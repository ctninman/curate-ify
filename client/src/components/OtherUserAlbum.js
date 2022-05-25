import { useContext, useState } from 'react';
import { AppContext } from './AppContext';
import { v4 as uuidv4 } from 'uuid';
import SpotifyIcon from '../images/spotify.png'
import FriendIcon from '../images/FriendIcon.png'
import ListForm from './ListForm';

function OtherUserAlbum({album, singleArtist, singleArtistAlbums}) {

  const {addAlbumToPlayer} = useContext(AppContext)

  const [showListFormInOtherUser, setShowListFormInOtherUser] = useState(false)

  let uriInOther =  `https://api.spotify.com/v1/albums/${album.spotify_album_id}`

  function handleClickAddToListInOtherUser () {
    // setAlbumListSelectInOtherUser(event.target.value)
    setShowListFormInOtherUser(true)
  }

  return (
    <div className='flex-column-center other-album' >
      <img style={{width: '98%', borderRadius:'5px', margin: '2px'}}src={album.album_cover} />
      <h3 style={{textAlign: 'center', height: '40px', marginBottom: '5px', overflow: 'scroll'}} className='small-margins'>{album.album_title}</h3>
      <h3 style={{textAlign: 'center', height: '20px', marginBottom: '5px', fontStyle: 'italic', overflow: 'scroll'}} className='small-margins'>{album.artist_name}</h3>
      <h3 style={{textAlign: 'center', height: '15px', marginBottom: '5px'}} className='small-margins'>{album.release_date}</h3>
      <h3 style={{textAlign: 'center', height: '15px', marginBottom: '5px'}} className='small-margins'>Rating: {album.rating}</h3>
      
      {showListFormInOtherUser ? null : <button value={album.id} onClick={handleClickAddToListInOtherUser}>Add to List</button>}
          {showListFormInOtherUser
              ?
            <ListForm 
              album={album} 
              key={uuidv4()}
              componentProp='other-user'
              setShowListFormInCollection={setShowListFormInOtherUser}/>
              :
            null
          }

      <div style={{width: '100%', borderRadiusBottom: '3px', backgroundColor: 'white'}}className='flex-row-center'>
        <div className='player-icons' style={{width: '35px', marginRight: '5%', marginTop: '5px'}}>
          <a href={album.spotify_uri} target="_blank"><img style={{width: '100%'}} src={SpotifyIcon} /></a>
        </div>
        <div className='player-icons' style={{width: '35px', marginLeft: '20px'}}>
          <span onClick={() => addAlbumToPlayer(uriInOther)}>
            <img style={{marginTop: '5px', width: '100%'}} src={FriendIcon} />
          </span>
        </div>
      </div>


      {/* <a href={album.spotify_uri} target='_blank'>🎧</a> */}
    </div>
  );
}

export default OtherUserAlbum;