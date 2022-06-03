function UserSearchThumbnail({user, setSelectedOtherUser}) {

  return (
    <div className='section-header flex-column-center' style={{marginLeft: '8px', marginRight: '8px', cursor: 'pointer'}} onClick={() => setSelectedOtherUser(user)}>
      <h2 style={{margin: '3px'}}>{user.username}</h2>
    </div>
  );
}

export default UserSearchThumbnail;