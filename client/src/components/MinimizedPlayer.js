import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback'
import {useState, useContext, useEffect} from 'react'
import { AppContext } from './AppContext';
import Player from './Player';

function MinimizedPlayer(props) {

  const {user, offsetNumber, setOffsetNumber, accessToken, arrayOfTracks, setPlayingTrack, playingTrack,play,setPlay, minimized, setMinimized, refreshMe} = useContext(AppContext)

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  // const [minimized, setMinimized] = useState(true)
  const [playerClass, setPlayerClass] = useState()
  // const [ offsetNumber, setOffsetNumber ] = useState(0)
  // const [play, setPlay] = useState(false)

  useEffect (() => {
    setPlayingTrack(arrayOfTracks[currentTrackIndex])
  }, [currentTrackIndex] )

  useEffect (() => {
    setPlay(true)
  }, [playingTrack] )

  useEffect(() => {
    refreshMe()
  }, [] )

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
      <button className='player-buttons' style={{marginTop: '20px',height: '30px'}}onClick={() => setPlayingTrack(null)}>CLOSE PLAYER</button>
      <div className='small-player'>
        <SpotifyPlayer 
          token={accessToken}  
          showSaveIcon
          play={play}
          autoPlay={true}
          // magnifySliderOnHover={true}
          offset={offsetNumber}
          // callback={state => {

          // }}
          uris={arrayOfTracks ? arrayOfTracks : []}
          styles={{
            bgColor: 'white',
            color: 'black',
            trackArtistColor: 'black',
            trackNameColor: 'black',
            errorColor: 'red',
            height: '50px',
            // loaderColor: 'orange',
            // loaderSize: '30px',
            sliderColor: '#F04C24',
            sliderHandleColor: '#F04C24',
            // sliderHeight: '8px',
            sliderTrackColor: 'white',
          }}
        />
      </div>
        {/* <button onClick={previousTrack}>\</button>
        <button onClick={nextTrack}>/</button> */}
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
          // offsetNumber={offsetNumber}
          // setOffsetNumber={setOffsetNumber}
        />
      </div>
      }
    </div>
    :
    null
  );
}

export default MinimizedPlayer;