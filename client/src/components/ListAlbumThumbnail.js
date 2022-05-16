import {useContext} from 'react'
import { AppContext } from './AppContext'

function ListAlbumThumbnail({list, setShowOneList}) {

  const {user, singleListSelection, setSingleListSelection, setAllUserLists, isLoading, setIsLoading} = useContext(AppContext)

  function fetchUpdatedLists () {
    if (user) {
      fetch(`users/${user.id}/lists`, {method: "GET"})
      .then(res => res.json())
      .then(data => setAllUserLists(data.lists))
    }
  }

  function handleDeleteList (event) {
    setIsLoading(true)
    fetch(`/lists/${event.target.value}`, {method: "DELETE"})
    .then(fetchUpdatedLists())
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
    <div className="flex-row-left">
      
      <h1 onClick={justOneList}className='small-margins'>{list.list_name}</h1>
      <button value={list.id} className='small-margins' style={{height: '20px', marginTop: '10px'}} onClick={handleDeleteList}>Delete List</button>
    </div>
  );
}

export default ListAlbumThumbnail;