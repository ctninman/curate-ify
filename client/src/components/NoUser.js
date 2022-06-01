import React from 'react';
import LoadScreen from './LoadScreen';

function NoUser(props) {
  return (
    <div className='flex-column-center'>
      <h1 className='small-margins'>For Lovers of the Album</h1>
      <div className='flex-row-center' style={{width: '300px', margin: '20px'}}>
        <LoadScreen />
      </div>

      <h2 className='small-margins'>1. Signup/Login</h2>
      <h2 className='small-margins'>2. Connect to Your Spotify Account</h2>
      <h2 className='small-margins'>3. Search Spotify for Albums</h2>
      <h2 className='small-margins'>4. Add Albums To Your Collection with Genres and Tags</h2>
      <h2 className='small-margins'>5. Place Albums You'd Like To Hear in Your Queue</h2>
      <h2 className='small-margins'>6. Filter Your Collection to Easily Find An Album To Fit The Mood</h2>
      <h2 className='small-margins'>7. Create Draggable Lists</h2>
      <h2 className='small-margins'>8. Find Friends With Similar Collections</h2>

    </div>
  );
}

export default NoUser;