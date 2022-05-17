import { useContext, useState} from 'react'
import { AppContext } from './AppContext';
import ListForm from './ListForm';

function SearchThumbnail({album}) {

  const {singleSelectedAlbum, setSingleSelectedAlbum, setSingleListAlbum} = useContext(AppContext)

  const [showListForm, setShowListForm] = useState(false)
  const [albumListSelect, setAlbumListSelect] = useState(null)

  function handleClickAddToList (event) {
    setAlbumListSelect(event.target.value)
    setShowListForm(true)
  }

  return (
    <>
    <div className='flex-column-center search-thumb'>
      <img 
        style={{width: '150px', height: '150px'}} 
        src={album.images[1].url} 
        alt={album.name} 
      />
      <h4 className='small-margins center-text search-title'>{album.name}</h4>
      <h5 className='small-margins center-text search-artist'>{album.artists[0].name}</h5>
      {/* <button onClick={() => console.log(album)}>Album is?</button> */}
      <div className='flex-column-center'>
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