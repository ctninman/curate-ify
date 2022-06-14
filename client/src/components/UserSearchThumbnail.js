function UserSearchThumbnail({user, setSelectedOtherUser}) {

  return (
    <div className='flex-row-center' style={{marginLeft: '8px', marginRight: '8px', cursor: 'pointer'}} onClick={() => setSelectedOtherUser(user)}>
      <img alt='Profile picture' src={user.spotify_profile_image} style={{width: '30px', height: '30px', borderRadius: '50%'}}/>
      <h2 style={{margin: '3px', color: '#F04C24', textDecoration: 'underline'}}>{user.username}</h2>
    </div>
  );
}

export default UserSearchThumbnail;