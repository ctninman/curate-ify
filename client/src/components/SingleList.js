import {useContext, useEffect} from 'react'
import { AppContext } from './AppContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DraggableListAlbum from './DraggableListAlbum';

function SingleList({setShowOneList}) {

  function onDragEnd (result) {

  }

  const {singleListSelection} = useContext(AppContext)
  return (
 
      <div>
        <button onClick={() => setShowOneList(false)}>Return to My Lists</button>
        <button onClick={() => console.log(singleListSelection)}>SingleList</button>
        
        {singleListSelection
            ?
        <div className='flex-column-center'>
          <h1>{singleListSelection.list_name}</h1>
          {singleListSelection.list_albums.length > 0 
              ?
           // *** DRAG-DROP CONTEXT *** //
          <DragDropContext
            // onDragStart
            // onDragUpdate
            onDragEnd={onDragEnd}
          >      
            <Droppable droppableId='list-of-albums'>
              {(provided) => (
                <ul 
                  className='flex-column-center list-of-albums' 
                  style={{backgroundColor: 'gray', width: 'fit-content', padding: '15px'}}
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                >
                  {singleListSelection.list_albums.map((album, index) => (
                    <Draggable 
                      key={album.id}
                      draggableId={album.id.toString()}
                      index={index}
                    >   
                      {(provided) => (
                        <li ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                          // key={album.id}
                          // album={album}
                          // index={index}
                          // ref={provided.innerRef} 
                          // {...provided.draggableProps} 
                          // {...provided.dragHandleProps}
                      >
                        {album.album_title}
                        <DraggableListAlbum 
                          album={album}
                          key={album.id}
                        />
                       </li>
                      
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
               </ul>
              )}
            </Droppable>
           
           </DragDropContext>
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