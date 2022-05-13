import { useContext } from 'react'
import { AppContext } from './AppContext';

function SearchThumbnail({album}) {

  const {singleSelectedAlbum, setSingleSelectedAlbum} = useContext(AppContext)

  return (
    <div style={{width: '150px'}}className='flex-column-left small-margins' onClick={() => setSingleSelectedAlbum(album)}>
      <img style={{width: '150px', height: '150px'}} src={album.images[1].url} alt={album.name} />
      <h4 className='small-margins center-text'>{album.name}</h4>
      <h5 className='small-margins center-text'>{album.artists[0].name}</h5>
    </div>
  );
}

export default SearchThumbnail;