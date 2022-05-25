import {useEffect, useState} from 'react';
import OtherUserList from './OtherUserList';

function ListSearchThumbnail({list, setListSearchResults, componentProp, setFriendList, setShowFriendList}) {

  const [showOtherUserList, setShowOtherUserList] = useState(false)
  const [otherUserList, setOtherUserList] = useState(null)

  useEffect (() => {
    console.log(list)
  }, [] )

  function handleListClick () {
    fetch(`/lists/${list.id}`, {method: "GET"})
    .then(res => res.json())
    .then(data => {
      if (componentProp === 'friends') {
        setFriendList(data)
        setShowFriendList(true)
      } else {
      setListSearchResults([list])
      setShowOtherUserList(true)
      setOtherUserList(data)
      }
    })
  }

  return !showOtherUserList ? (
    <div className='section-header' style={{marginLeft: '8px', marginRight: '8px', marginTop: '10px', cursor: 'pointer'}} onClick={handleListClick}>
      <h2 style={{margin: '3px'}}>{list.list_name}</h2>
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