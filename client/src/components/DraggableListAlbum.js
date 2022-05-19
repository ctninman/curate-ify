import {useContext} from 'react';
import { AppContext } from './AppContext';

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
        <img className='small-margins'style={{height: '50px'}} src={album.album_cover}/>
        <h3 style={{width: '300px'}}className='small-margins black-text'>{album.album_title}</h3>
        <h3 style={{width: '300px', fontStyle: 'italic'}}className='small-margins black-text'>{album.artist}</h3>
        <a style={{width: '35px'}}href={album.spotify_url} target="_blank">🎧</a>
        <button onClick={() => addAlbumToPlayer(urlInList)}>+ Player</button>
        <button className='small-margins' style={{height: '20px',width: '30px', marginTop: '16px', color: 'tomato'}} onClick={handleDeleteListAlbum}>X</button>
      </div>
    </>
  );
}

export default DraggableListAlbum;