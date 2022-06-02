

import {useState, useEffect, useContext} from 'react'
import { AppContext } from './AppContext';
import ListAlbumThumbnail from './ListAlbumThumbnail'
import LoadScreen from './LoadScreen';
import SingleList from './SingleList';

function AllLists({handleAddNewList, showOneList, setShowOneList}) {

  const {user, allUserLists, setAllUserLists, isLoading} = useContext(AppContext)

  // const [allUserLists, setAllUserLists] = useState(null)
  
  // const [showOneList, setShowOneList] =useState(false)

  // useEffect (() => {
  //   if (user) {
  //     fetch(`users/${user.id}/lists`, {method: "GET"})
  //     .then(res => res.json())
  //     .then(data => setAllUserLists(data.lists))
  //   }
  // }, [user])

  return (
    !isLoading ?
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