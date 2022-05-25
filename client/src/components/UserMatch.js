import React from 'react';

function UserMatch({matched_user, setSelectedOtherUser}) {
  return (
    <div 
      className='section-header' 
      onClick={() => setSelectedOtherUser(matched_user)}
      style={{border: '1px solid white', cursor: 'pointer'}}
    >
      <h1 className='small-margins'>{matched_user.username}</h1>
    </div>
  );
}

export default UserMatch;