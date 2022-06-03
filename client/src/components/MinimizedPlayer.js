import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback'
import {useState, useContext, useEffect} from 'react'
import { AppContext } from './AppContext';
import Player from './Player';

function MinimizedPlayer() {

  const { offsetNumber, accessToken, arrayOfTracks, setPlayingTrack, playingTrack,play,setPlay, minimized, setMinimized, refreshMe} = useContext(AppContext)

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)

  useEffect (() => {
    setPlayingTrack(arrayOfTracks[currentTrackIndex])
  }, [currentTrackIndex] )

  useEffect (() => {
    setPlay(true)
  }, [playingTrack] )

  useEffect(() => {
    refreshMe()
  }, [] )


  return (
    accessToken ?
    <div className='small-player-container'style={{marginTop: '20px'}}>
      <div className='flex-row-center'>
      <button className='player-buttons' style={{marginTop: '20px',height: '30px'}}onClick={() => setPlayingTrack(null)}>CLOSE PLAYER</button>
      <div className='small-player'>
        <SpotifyPlayer 
          token={accessToken}  
          showSaveIcon
          play={play}
          autoPlay={true}
          offset={offsetNumber}
          uris={arrayOfTracks ? arrayOfTracks : []}
          styles={{
            bgColor: 'white',
            color: 'black',
            trackArtistColor: 'black',
            trackNameColor: 'black',
            errorColor: 'red',
            height: '50px',
            sliderColor: '#F04C24',
            sliderHandleColor: '#F04C24',
            sliderTrackColor: 'white',
          }}
        />
      </div>
        {minimized 
            ? 
          <button className='player-buttons' style={{height: '30px', marginTop: '20px'}} onClick={() => setMinimized(false)}>SHOW ALBUM DETAILS</button>
            :
          <button className='player-buttons' style={{height: '30px', marginTop: '20px'}} onClick={() => setMinimized(true)}>HIDE ALBUM DETAILS</button>
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