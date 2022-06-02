import {useContext, useEffect, useState} from 'react'
import { AppContext } from './AppContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DraggableListAlbum from './DraggableListAlbum';

function SingleList({setShowOneList}) {
  
  const {singleListSelection, setSingleListSelection} = useContext(AppContext)
  
  const [allDraggableAlbums, setAllDraggableAlbums] = useState(null)
   
  useEffect (() => {
    if (singleListSelection) {
      setAllDraggableAlbums(singleListSelection.list_albums)
    }
  }, [singleListSelection] )

  function updateListOrderDB (arrayOfAlbums) {
    fetch('/update-list',{
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({albums: arrayOfAlbums})
    })
    .then(res => res.json())
    .then(data => console.log(data))

  }

  function handleOnDragEnd (result) {
    // const { destination, source, draggableId } = result
    if (!result.destination) {
      return
    } else if (result.destination.droppableId === result.source.droppableId && 
      result.destination.index === result.source.index) {
      return
    } else {
      const albums = Array.from(allDraggableAlbums)
      const [reorderedAlbum] = albums.splice(result.source.index, 1);
      albums.splice(result.destination.index, 0, reorderedAlbum);
      albums.map((album) => {
        let index = albums.indexOf(album)
        album.list_order = index + 1
      })
      setAllDraggableAlbums(albums);
      updateListOrderDB(albums)
      
    }
  }

  
  return (
 
      <div>
        <div className='flex-row-center' style={{marginTop: '15px'}}>
          <button onClick={() => setShowOneList(false)}>Return to My Lists</button>
        </div>
        {allDraggableAlbums
            ?
        <div className='flex-column-center'>
          <h1 className='section-header'>{singleListSelection.list_name}</h1>
          {allDraggableAlbums.length > 0 
              ?
           // *** DRAG-DROP CONTEXT *** //
          <DragDropContext
            // onDragStart
            // onDragUpdate
            onDragEnd={handleOnDragEnd}
          >      
            <Droppable droppableId='list-of-albums'>
              {(provided) => (
                <ol 
                  className='flex-column-center list-of-albums' 
                  style={{width: 'fit-content', padding: '15px'}}
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                >
                  {allDraggableAlbums.sort((a,b) => (a.list_order > b.list_order) ? 1 : -1).map((album, index) => (
                    <Draggable 
                      key={album.id}
                      draggableId={album.id.toString()}
                      index={index}
                    >   
                      {(provided) => (
                        <li 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                          // key={album.id}
                          // album={album}
                          // index={index}
                          // ref={provided.innerRef} 
                          // {...provided.draggableProps} 
                          // {...provided.dragHandleProps}
                      >
                        <DraggableListAlbum 
                          album={album}
                          key={album.id}
                        />
                       </li>
                      
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
               </ol>
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