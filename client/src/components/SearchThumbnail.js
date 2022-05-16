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
    <div style={{width: '150px'}}className='flex-column-left small-margins'>
      <img 
        style={{width: '150px', height: '150px'}} 
        src={album.images[1].url} 
        alt={album.name} 
      />
      <h4 className='small-margins center-text'>{album.name}</h4>
      <h5 className='small-margins center-text'>{album.artists[0].name}</h5>
      <button onClick={() => console.log(album)}>Album is?</button>
      <button onClick={() => setSingleSelectedAlbum(album)}>Add to Collection</button>
      {showListForm ? null : <button value={album.id} onClick={handleClickAddToList}>Add to List</button>}
      {showListForm && album.id === albumListSelect
        ?
      <ListForm album={album}/>
        :
      null
    }
    </div>
    
    </>
  );
}

export default SearchThumbnail;