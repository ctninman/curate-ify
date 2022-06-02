import { useState, useContext } from 'react';
import { AppContext } from './AppContext';
import OtherUserListInAlbum from './OtherUserListInAlbum';

function OtherUserList({list, setShowOtherUserList, username, profilePic, otherUserId}) {

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
        {/* <button onClick={() => setShowOtherUserList(false)}>BACK</button> */}
        <div className='list-header flex-column-center' style={{textDecoration: 'none'}}>
          <h1 className='small-margins'>{list.list_name}</h1>
          <div className='flex-row-center'>
            <h3 className='small-margins'>-by {username}</h3>
            <img style={{width: '30px', height: '30px', borderRadius: '50%'}} src={profilePic} />
          </div>
          <button onClick={followFromListSearch} style={{textDecoration: 'none'}}>{isFollowingInList ? `FOLLOWING ${username}` :`FOLLOW ${username}`}</button>
        </div>
        {list.list_albums.sort((a,b) => (a.list_order > b.list_order) ? 1 : -1).map(album => (
          <OtherUserListInAlbum album={album} key={album.id}/>
          // <div className='flex-row-left other-list' style={{border: '2px solid white'}} >
          //   <div style={{width: '50px'}}> 
          //     <img style={{width: '100%'}}src={album.album_cover} />
          //   </div>
          //   <div>
          //     <h3 style={{overflow: 'scroll', height: '45%'}} className='small-margins'>{album.album_title}</h3>
          //     <h3 style={{overflow: 'scroll', height: '45%', fontStyle: 'italic'}} className='small-margins'>{album.artist}</h3>
          //   </div>

            
          //   <div className='flex-row'>
          //     <div className='player-icons' style={{width: '25px', marginRight: '8px', marginTop: '12px', marginLeft: '8px'}}>
          //       <a href={album.spotify_url} target="_blank"><img style={{width: '100%'}} src={SpotifyIcon} /></a>
          //     </div>
          //     <div className='player-icons' style={{width: '25px', marginRight: '8px', marginTop: '12px'}}>
          //       <span onClick={() => addAlbumToPlayer(`https://api.spotify.com/v1/albums/${album.spotify_id}`)}>
          //         <img style={{width: '100%'}} src={FriendIcon} />
          //       </span>
          //     </div>
          //   </div>

          // </div>
        ))}
      </div>
  );
}

export default OtherUserList;