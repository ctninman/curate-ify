import {useState} from 'react';

function Follower({user, setSingleFollower}) {

  
  
  return (
    <div className='flex-row-center friend generic-button' onClick={() => setSingleFollower(user)}>
      <div style={{width: '40px'}}><img style={{width: '100%', borderRadius: '50%'}} src={user.spotify_profile_image}/></div>
      <h2 className='small-margins' style={{marginTop: '8px'}}>{user.username}</h2>
    </div>
  );
}

export default Follower;