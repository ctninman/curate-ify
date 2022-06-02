import {useEffect, useState, useContext} from 'react';
import { AppContext } from './AppContext';
import OtherUserList from './OtherUserList';

function ListSearchThumbnail({list, setListSearchResults, componentProp, setFriendList, setShowFriendList}) {

  const {user} = useContext(AppContext)

  const [showOtherUserList, setShowOtherUserList] = useState(false)
  const [otherUserList, setOtherUserList] = useState(null)

  function handleListClick () {
    fetch(`/lists/${list.id}`, {method: "GET"})
    .then(res => res.json())
    .then(data => {
      console.log('others list', data)
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

  function handleFollowClickInList () {
    fetch('/relationships', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        follower_id: user.id,
        followee_id: list.user.id
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  return !showOtherUserList ? (
    <div className='list-header' style={{marginLeft: '8px', marginRight: '8px', marginTop: '10px', cursor: 'pointer'}} onClick={handleListClick}>
      <h2 style={{margin: '3px'}}>{list.list_name}</h2>
      {componentProp === 'list' ? 
        <div className='flex-row-center'>
          <img style={{width: '30px', borderRadius: '50%'}} src={list.user.spotify_profile_image}/>
          <h3 className='small-margins'>{list.user.username}</h3>
          {/* <button onClick={handleFollowClickInList}>Follow</button> */}
        </div>
          :
        null
      }
    </div>
  ) 
  :
  <div> 
  {otherUserList ?
    <OtherUserList 
      username={componentProp === 'list' ? list.user.username : "Ziggy"} 
      profilePic={componentProp === 'list' ? list.user.spotify_profile_image : "https://media.istockphoto.com/photos/surprised-rubber-chicken-head-close-up-isolated-on-white-picture-id1343859143?b=1&k=20&m=1343859143&s=170667a&w=0&h=QNk6q0HVj52M4XN1cVohcl45xq4qSREKCAEYfWfRCMU="} 
      otherUserId={componentProp === 'list' ? list.user.id : 2}
      list={otherUserList} key={list.id} 
      setShowOtherUserList={setShowOtherUserList}/>
    : null}
  </div>
}

export default ListSearchThumbnail;