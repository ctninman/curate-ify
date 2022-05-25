import {useState} from 'react';

function Follower({user, setSingleFollower}) {

  
  
  return (
    <div className='flex-row-left friend' onClick={() => setSingleFollower(user)}>
      <div style={{width: '60px'}}><img style={{width: '100%', borderRadius: '50%'}} src={user.spotify_profile_image}/></div>
      <h1 className='small-margins' style={{marginTop: '15px'}}>{user.username}</h1>
    </div>
  );
}

export default Follower;