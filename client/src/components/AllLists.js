import { useContext } from 'react'
import { AppContext } from './AppContext';
import ListAlbumThumbnail from './ListAlbumThumbnail'
import LoadScreen from './LoadScreen';
import SingleList from './SingleList';

function AllLists({showOneList, setShowOneList}) {

  const {user, allUserLists, isLoading} = useContext(AppContext)

//*** JSX ***/
  return (
    !isLoading 
        ?
      <>
        {!showOneList
            ?
          <>  
            <div className='flex-column-center'>
              {user && allUserLists === null 
                  ?
                <h1>No Lists Found</h1>
                  :
                <div className='list-of-lists' style={{width: '80%', minWidth: '480px'}}>
                  {allUserLists.map(list => (
                    <ListAlbumThumbnail setShowOneList={setShowOneList} list={list} key={list.id}/>
                  ))}
                </div>
              }
            </div>   
          </>
            :
          <SingleList setShowOneList={setShowOneList}/>
        }
      </>
        :
      <LoadScreen />
  );
}

export default AllLists