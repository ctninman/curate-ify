import {useEffect, useState} from 'react';
import OtherUserList from './OtherUserList';

function ListSearchThumbnail({list, setListSearchResults}) {

  const [showOtherUserList, setShowOtherUserList] = useState(false)
  const [otherUserList, setOtherUserList] = useState(null)

  useEffect (() => {
    console.log(list)
  }, [] )

  function handleListClick () {
    fetch(`/lists/${list.id}`, {method: "GET"})
    .then(res => res.json())
    .then(data => {
      setListSearchResults([list])
      setShowOtherUserList(true)
      setOtherUserList(data)
    })
  }

  return !showOtherUserList ? (
    <div style={{border: '5px solid white', margin: '20px'}}onClick={handleListClick}>
      <h1>{list.list_name}</h1>
    </div>
  ) 
  :
  <div> 
  {otherUserList ?
    <OtherUserList list={otherUserList} key={list.id} setShowOtherUserList={setShowOtherUserList}/>
    : null}
  </div>
}

export default ListSearchThumbnail;