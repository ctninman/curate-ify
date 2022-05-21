import { useState, useContext } from 'react';
import { AppContext } from './AppContext';
import SpotifyIcon from '../images/spotify.png'
import FriendIcon from '../images/FriendIcon.png'
import ListForm from './ListForm';
import { v4 as uuidv4 } from 'uuid';
import AlbumForm from './AlbumForm';

function QueueAlbumThumbnail({album}) {

  const {addAlbumToPlayer} = useContext(AppContext)

  const [showListFormInQueue, setShowListFormInQueue] = useState(false)
  const [albumListSelectInQueue, setAlbumListSelectInQueue] = useState(null)
  const [showAlbumFormInQueue, setShowAlbumFormInQueue] = useState(false)

  let urlInQueue = `https://api.spotify.com/v1/albums/${album.spotify_album_id}`

  function handleClickAddToListInQueue (event) {
    setAlbumListSelectInQueue(event.target.value)
    setShowListFormInQueue(true)
  }

  return (
    <>
      {showAlbumFormInQueue ?
        <div>
          <AlbumForm 
            parentComponent='queue'
            album={album}
            setShowAlbumFormInQueue={setShowAlbumFormInQueue}
          />
        </div>
          :
      <div className='flex-row collection-album' style={{justifyContent: 'flex-start'}}>
        <div className='flex-column-center'>
          <img className='white-background' style={{height: '200px', border: '8px solid black'}} src={album.album_cover} />
        </div>
        <div>
          <h2 className='small-margins'>{album.album_title}</h2>
          <h3 className='small-margins'>{album.artist_name}</h3>
          <h3 className='small-margins'>{album.release_date}</h3>
      
          
          <div className='flex-row'>

            <div className='player-icons' style={{width: '35px', marginRight: '5%'}}>
              <a href={album.spotify_uri} target="_blank"><img style={{width: '100%'}} src={SpotifyIcon} /></a>
            </div>
            <div className='player-icons' style={{width: '35px', marginLeft: '20px'}}>
              <span onClick={() => addAlbumToPlayer(urlInQueue)}>
                <img style={{width: '100%'}} src={FriendIcon} />
              </span>
            </div>

          </div>
      
      
      
      
      
      
          <div className='flex-row-left'>
            
            {/* <button onClick={handleRemoveAlbumFromQueue}>Remove From My Queue</button> */}
          
            <button onClick={() => setShowAlbumFormInQueue(true)}>Add To My Collection</button>
          </div>
          {showListFormInQueue ? null : <button value={album.id} onClick={handleClickAddToListInQueue}>Add to List</button>}
          {showListFormInQueue
              ?
            <ListForm 
              album={album} 
              key={uuidv4()}
              componentProp='queue'
              setShowListFormInCollection={setShowListFormInQueue}/>
              :
            null
          }



        </div>
      </div>
    }
    </>
  );
}

export default QueueAlbumThumbnail;