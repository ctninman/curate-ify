import { useState, useContext } from 'react';
import { AppContext } from './AppContext';
import OtherUserListInAlbum from './OtherUserListInAlbum';

function OtherUserList({list, username, profilePic, otherUserId}) {

  const {user} = useContext(AppContext)

  const [isFollowingInList, setIsFollowingInList] = useState(false)

  function followFromListSearch () {
    fetch('/relationships', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        follower_id: user.id,
        followee_id: otherUserId
      })
    })
    .then(res => res.json())
    .then(data => {
      setIsFollowingInList(true)
      console.log(data)
    })
  }

  return (
      <div className='flex-column-center'>
        <div className='list-header flex-column-center' style={{textDecoration: 'none'}}>
          <h1 className='small-margins'>{list.list_name}</h1>
          <div className='flex-row-center'>
            <h3 className='small-margins'>-by {username}</h3>
            <img alt='Profile picture' style={{width: '30px', height: '30px', borderRadius: '50%'}} src={profilePic} />
          </div>
          <button onClick={followFromListSearch} style={{textDecoration: 'none'}}>{isFollowingInList ? `FOLLOWING ${username}` :`FOLLOW ${username}`}</button>
        </div>
        {list.list_albums.sort((a,b) => (a.list_order > b.list_order) ? 1 : -1).map(album => (
          <OtherUserListInAlbum album={album} key={album.id}/>
        ))}
      </div>
  );
}

export default OtherUserList;