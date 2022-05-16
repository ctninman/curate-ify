import {useContext, useEffect} from 'react'
import { AppContext } from './AppContext';
import { DragDropContext } from 'react-beautiful-dnd';
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
           // *** DRAG-DROP CONTEXT *** //
  //   <DragDropContext
  //   onDragStart
  //   onDragUpdate
  //   onDragEnd
  // >      
     
          <div className='flex-column-center'>
            {singleListSelection.list_albums.map(album => (
              <DraggableListAlbum album={album} key={album.id}/>
            ))}
          </div>
          // </DragDropContext>
              :
          <h1> No Albums in List </h1>
            }
          </div>
          
            :
          null
            }
      </div>
    
  );
}

export default SingleList;