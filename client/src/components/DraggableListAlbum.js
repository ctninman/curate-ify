import {useContext} from 'react';
import { AppContext } from './AppContext';
import FriendIcon from '../images/FriendIcon.png'
import SpotifyIcon from '../images/spotify.png'

function DraggableListAlbum({album}) {

  const {singleListSelection, setSingleListSelection, addAlbumToPlayer} = useContext(AppContext)

  let urlInList = `https://api.spotify.com/v1/albums/${album.spotify_id}`

  function refreshList () {
    fetch(`lists/${singleListSelection.id}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(data => setSingleListSelection(data))
  }

  function handleDeleteListAlbum () {
    fetch(`/list_albums/${album.id}`, {method: "DELETE"})
    .then(res => res.json())
    .then(data => {
      refreshList()
    })
  }

  return (
    // *** DROPPABLE *** // 
    <>
      <div className='flex-row-center' style={{margin: '5px',marginLeft: '10px',width: 'fit-content', backgroundColor: 'white', borderRadius: '5px'}}>
        <img alt='Album cover' className='small-margins'style={{height: '50px'}} src={album.album_cover}/>
        <h3 style={{width: '200px', height: '45px', overflow: 'scroll'}}className='small-margins black-text'>{album.album_title}</h3>
        <h3 style={{width: '200px', height: '45px', overflow: 'scroll', fontStyle: 'italic'}}className='small-margins black-text'>{album.artist}</h3>

        <div className='player-icons' style={{width: '35px', marginTop: '8px', marginBottom: '8px',marginRight: '10px'}}>
            <a href={album.spotify_url} target="_blank"><img alt='Open in Spotify' style={{width: '100%'}} src={SpotifyIcon} /></a>
          </div>
          <div className='player-icons' style={{width: '35px', marginRight: '15px', marginLeft: '15px', marginTop: '7px', marginBottom: '7px'}}>
            <span onClick={() => addAlbumToPlayer(urlInList)}>
              <img alt='Open in player'style={{width: '100%'}} src={FriendIcon} />
            </span>
          </div>
        <button className='delete-list' onClick={handleDeleteListAlbum}>X</button>
      </div>
    </>
  );
}

export default DraggableListAlbum;