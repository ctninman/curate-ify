import {useContext} from 'react';
import { AppContext } from './AppContext';

function GridAlbum({album, matchUserAlbums, setMatchUserAlbums, componentProp}) {

  const {addAlbumToPlayer} = useContext(AppContext)

  function handleAddMatch () {
    if (matchUserAlbums.length < 5 && !matchUserAlbums.includes(album)) {
      let newMatchArray = [...matchUserAlbums, album]
      setMatchUserAlbums(newMatchArray)
    }
  }

  return (
    <>
    {componentProp === 'grid' ?
       <div onClick={() =>addAlbumToPlayer(`https://api.spotify.com/v1/albums/${album.spotify_album_id}`)} className='grid-album'>
        <img alt='Album cover' style={{width: '94%', margin: '3%', borderRadius: '3px'}} src={album.album_cover} />
      </div>
        :
    
      <div onClick={handleAddMatch} className='grid-album'>
        <img alt='Album cover' style={{width: '94%', margin: '3%', borderRadius: '3px'}} src={album.album_cover} />
      </div>
    }
  </>
  );
}

export default GridAlbum;