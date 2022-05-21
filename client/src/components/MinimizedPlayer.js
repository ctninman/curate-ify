import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback'
import {useState, useContext, useEffect} from 'react'
import { AppContext } from './AppContext';
import Player from './Player';

function MinimizedPlayer(props) {

  const {user, accessToken, arrayOfTracks, setPlayingTrack, playingTrack,play,setPlay, minimized, setMinimized} = useContext(AppContext)

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  // const [minimized, setMinimized] = useState(true)
  const [playerClass, setPlayerClass] = useState()
  // const [play, setPlay] = useState(false)

  useEffect (() => {
    setPlayingTrack(arrayOfTracks[currentTrackIndex])
  }, [currentTrackIndex] )

  useEffect (() => {
    setPlay(true)
  }, [playingTrack] )

  // function nextTrack () {
  //   if (currentTrackIndex < arrayOfTracks.length - 1) {
  //     setCurrentTrackIndex(currentTrackIndex + 1)
  //   }
  // }

  // function previousTrack () {
  //   if (currentTrackIndex > 0) {
  //     setCurrentTrackIndex(currentTrackIndex - 1)
  //   }
  // }

  return (
    accessToken ?
    <div className='small-player-container'style={{marginTop: '20px'}}>
      <div className='flex-row-center'>
      <button style={{height: '30px'}}onClick={() => setPlayingTrack(null)}>Close Player</button>
      <div className='small-player'>
        <SpotifyPlayer 
          token={accessToken}  
          showSaveIcon
          play={play}
          autoPlay={true}
          magnifySliderOnHover={true}
          // callback={state => {

          // }}
          uris={arrayOfTracks ? arrayOfTracks : []}
        />
      </div>
        {/* <button onClick={previousTrack}>\</button>
        <button onClick={nextTrack}>/</button> */}
        {minimized 
            ? 
          <button style={{height: '30px'}} onClick={() => setMinimized(false)}>Show Album Details</button>
            :
          <button style={{height: '30px'}} onClick={() => setMinimized(true)}>Hide Album Details</button>
        }
      </div>
      
      {minimized ? null : 
      <div className='player-class'>
        <Player 
          currentTrackIndex={currentTrackIndex} 
          setCurrentTrackIndex={setCurrentTrackIndex}
        />
      </div>
      }
    </div>
    :
    null
  );
}

export default MinimizedPlayer;