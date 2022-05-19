import { useContext, useState} from 'react'
import { AppContext } from './AppContext';
import ListForm from './ListForm';

function SearchThumbnail({album}) {

  const {singleSelectedAlbum, setSingleSelectedAlbum, setSingleListAlbum, addAlbumToPlayer} = useContext(AppContext)

  const [showListForm, setShowListForm] = useState(false)
  const [albumListSelect, setAlbumListSelect] = useState(null)

  let urlInSearch = `https://api.spotify.com/v1/albums/${album.id}`

  function handleClickAddToList (event) {
    setAlbumListSelect(event.target.value)
    setShowListForm(true)
  }

  return (
    <>
    <div style={{width: '16%'}}className='flex-column-center search-thumb'>
      <img 
        style={{width: '90%'}} 
        src={album.images[1].url} 
        alt={album.name} 
      />
      <h4 className='small-margins center-text search-title'>{album.name}</h4>
      <h5 className='small-margins center-text search-artist'>{album.artists[0].name}</h5>
      {/* <button onClick={() => console.log(album)}>Album is?</button> */}
      <div className='flex-column-center'>
        <button onClick={() => addAlbumToPlayer(urlInSearch)}>+ Player</button>
        <button onClick={() => setSingleSelectedAlbum(album)}>Add to Collection</button>
        {showListForm ? null : <button value={album.id} onClick={handleClickAddToList}>Add to List</button>}
        {showListForm && album.id === albumListSelect
          ?
        <ListForm componentProp='search' setShowListForm={setShowListForm} album={album}/>
          :
         null
       }
      </div>
    </div>
    
    </>
  );
}

export default SearchThumbnail;