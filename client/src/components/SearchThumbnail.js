import { useContext } from 'react'
import { AppContext } from './AppContext';

function SearchThumbnail({album}) {

  const {singleSelectedAlbum, setSingleSelectedAlbum} = useContext(AppContext)

  return (
    <div className='flex-column-center' onClick={() => setSingleSelectedAlbum(album)}>
      <img style={{width: '150px'}} src={album.images[1].url} alt={album.name} />
      <h4>{album.name}</h4>
      <h5>{album.artists[0].name}</h5>
    </div>
  );
}

export default SearchThumbnail;