import {useContext, useEffect, useRef, useState} from 'react'
import { AppContext } from './AppContext'

function ListAlbumThumbnail({list, setShowOneList}) {

  const {user, singleListSelection, setSingleListSelection, setAllUserLists, isLoading, setIsLoading} = useContext(AppContext)

  const [fetchTrigger, setFetchTrigger] = useState(false)

  const firstUpdate = useRef(true)

  useEffect (() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    fetchUpdatedLists()
  }, [fetchTrigger] )

  function fetchUpdatedLists () {
    if (user) {
      fetch(`users/${user.id}/lists`, {method: "GET"})
      .then(res => res.json())
      .then(data => {
        setAllUserLists(data.lists)
      })
    }
  }

  function handleDeleteList (event) {
    setIsLoading(true)
    fetch(`/lists/${event.target.value}`, {method: "DELETE"})
    .then(res => res.json())
    // .then(fetchUpdatedLists())
    .then(() => setFetchTrigger(!fetchTrigger))
    setIsLoading(false)
  }

  function fetchListData () {
    fetch(`lists/${list.id}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(data => setSingleListSelection(data))
  }

  function justOneList () {
    setIsLoading(true)
    setShowOneList(true)
    fetchListData()
    setIsLoading(false)
  }

  return (
    <div className="flex-row-left list-thumb">
      <h1 style={{width: '80%'}} onClick={justOneList}className='small-margins'>{list.list_name}</h1>
      <button value={list.id} className=' delete-list generic-button' style={{ marginTop: '8px', marginBottom: '8px'}} onClick={handleDeleteList}>Delete List</button>
    </div>
  );
}

export default ListAlbumThumbnail;