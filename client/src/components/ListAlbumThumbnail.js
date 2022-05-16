import {useContext} from 'react'
import { AppContext } from './AppContext'

function ListAlbumThumbnail({list, setShowOneList}) {

  const {singleListSelection, setSingleListSelection} = useContext(AppContext)

  function handleDeleteList (event) {
    fetch(`/lists/${event.target.value}`, {method: "DELETE"})
    .then(console.log('deleted, i think'))
  }

  function fetchListData () {
    fetch(`lists/${list.id}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(data => setSingleListSelection(data))
  }

  function justOneList () {
    setShowOneList(true)
    fetchListData()
  }

  return (
    <div className="flex-row-left">
      
      <h1 onClick={justOneList}className='small-margins'>{list.list_name}</h1>
      <button value={list.id} className='small-margins' style={{height: '20px', marginTop: '10px'}} onClick={handleDeleteList}>Delete List</button>
    </div>
  );
}

export default ListAlbumThumbnail;