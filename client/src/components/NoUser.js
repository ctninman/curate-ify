import React from 'react';
import LoadScreen from './LoadScreen';
import FriendIcon from '../images/FriendIcon.png'
import SpotifyIcon from '../images/spotify.png'
import CollectionIcon from '../images/CollectionIcon.png'

function NoUser() {
  return (
    <div className='flex-column-center'>
      <h1 className='small-margins'>All About the Album</h1>
      <div className='flex-row-center' style={{width: '300px', margin: '20px'}}>
        <LoadScreen />
      </div>
      <div className='flex-row-center'>
          <div style={{height: '35px'}}>
            <h1 className='small-margins' style={{fontSize: 'x-large'}}>✅</h1>
          </div>
          <h2 className='small-margins'>1. Signup/Login</h2>
        </div>
        <div className='flex-row-center'>
          <div style={{width: '35px'}}>
            <img alt='Spotify logo' style={{width: '100%'}}src={SpotifyIcon}/>
          </div>
          <h2 className='small-margins'>2. Connect to Your Spotify Account</h2>
        </div>
        <div className='flex-row-center'>
          <div style={{height: '35px'}}>
            <h1 className='small-margins' style={{fontSize: 'x-large'}}>🔎</h1>
          </div>
          <h2 className='small-margins'>3. Search Spotify for Albums</h2>
        </div>
        <div className='flex-row-center'>
          <div style={{width: '35px'}}>
            <img alt='Collection icon' style={{width: '100%'}}src={CollectionIcon}/>
          </div>
          <h2 className='small-margins'>4. Add Albums To Your Collection with Genres and Tags</h2>
        </div>
        <div className='flex-row-center'>
          <div style={{height: '35px'}}>
            <h1 className='small-margins' style={{fontSize: 'x-large'}}>🆕</h1>
          </div>
          <h2 className='small-margins'>5. Place Albums You'd Like To Hear in Your Queue</h2>
        </div>
        <div className='flex-row-center'>
          <div style={{height: '35px'}}>
            <h1 className='small-margins' style={{fontSize: 'x-large'}}>🎛️</h1>
          </div>
          <h2 className='small-margins'>6. Filter Your Collection to Easily Find An Album To Fit The Mood</h2>
        </div>
        <div className='flex-row-center'>
          <div style={{height: '35px'}}>
            <h1 className='small-margins' style={{fontSize: 'x-large'}}> 🔖</h1>
          </div>
          <h2 className='small-margins'>7. Create Draggable Lists</h2>
        </div>
        <div className='flex-row-center'>
          <div style={{width: '35px'}}>
            <img alt='Friend icon' style={{width: '100%'}}src={FriendIcon}/>
          </div>
          <h2 className='small-margins'>8. Find Friends With Similar Collections</h2>
        </div>
    </div>
  );
}

export default NoUser;