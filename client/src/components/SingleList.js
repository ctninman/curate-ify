import {useContext, useEffect} from 'react'
import { AppContext } from './AppContext';
import DraggableListAlbum from './DraggableListAlbum';

function SingleList({setShowOneList}) {

  const {singleListSelection} = useContext(AppContext)
  return (
    <div>
      <button onClick={() => setShowOneList(false)}>Return to My Lists</button>
      <button onClick={() => console.log(singleListSelection)}>SingleList</button>
      
      {singleListSelection
          ?
      <div>
        <h1>{singleListSelection.list_name}</h1>
        {singleListSelection.list_albums.length > 0 
            ?
        <div className='flex-column-center'>
          {singleListSelection.list_albums.map(album => (
            <DraggableListAlbum album={album} key={album.id}/>
            // <div className='flex-row-center' style={{margin: '5px',width: 'fit-content', backgroundColor: 'white'}}>
            //   <img style={{height: '50px'}} src={album.album_cover}/>
            //   <h3 style={{width: '300px'}}className='small-margins black-text'>{album.album_title}</h3>
            //   <h3 style={{width: '300px'}}className='small-margins black-text'>{album.artist}</h3>
            //   <a style={{width: '35px'}}href={album.spotify_url} target="_blank">🎧</a>
            // </div>
          ))}
        </div>
            :
       <h1> Now where he at?</h1>
        }
      </div>
          :
        null
          }
    </div>
  );
}

export default SingleList;