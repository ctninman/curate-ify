import OtherUserListInAlbum from './OtherUserListInAlbum';

function OtherUserList({list, setShowOtherUserList}) {

  return (
      <div className='flex-column-center'>
        {/* <button onClick={() => setShowOtherUserList(false)}>BACK</button> */}
        <h1>{list.list_name}</h1>
        {list.list_albums.map(album => (
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