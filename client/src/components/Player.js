import {useState, useContext, useEffect} from 'react'
import { AppContext } from './AppContext';

function Player({currentTrackIndex, setCurrentTrackIndex}) {

  const {
    user, 
    accessToken, 
    arrayOfTracks, 
    setPlayingTrack, 
    playingTrack,
    play,
    setPlay,
    playingAlbum,
    setPlayingAlbum
  } = useContext(AppContext)

  useEffect (() => {
    let foundAlbum = user.albums.find(isInCollection)
    if (foundAlbum) {
      setInCollection(true)
    }
    // if ('in_collection' in playingAlbum) {
    //   console.log("you in my belly")
    // } else {
    //   console.log('what am i doing?')
    // }
  }, [playingAlbum] )

  const [inCollection, setInCollection] = useState(false)

  function isInCollection (album) {
    return album.spotify_album_id === playingAlbum.id
  }

  function nextTrack () {
    if (currentTrackIndex < arrayOfTracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1)
    }
  }

  function previousTrack () {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1)
    }
  }

  const formatTime = milliseconds => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    // const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

    return [
        // hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0")
    ].join(":");
}



  return (
    playingAlbum ?
    <div className='large-player-container'>
      <div className='flex-row-left large-player'>
        
        <div style={{width: '30%', margin: '10px'}} className='flex-column-center'>
          <img style={{maxWidth: '100%', objectFit: 'contain' }}src={playingAlbum.images[0].url} />
          {/* <h2 style={{textAlign: 'center', borderBottom: '.5px solid white'}} className='small-margins'>{playingAlbum.name}</h2>
          <h2 style={{textAlign: 'center', fontStyle: 'italic',borderBottom: '.5px solid white'}} className='small-margins'>{playingAlbum.artists[0].name}</h2>
          <h3 style={{textAlign: 'center', fontStyle: 'italic'}} className='small-margins'>{playingAlbum.release_date.substring(0,4)}</h3> */}
          <div className='flex-column-center'>
            {inCollection ? <h3 className='small-margins'>In my collection</h3> : null }
            {inCollection 
                ? 
              <button onClick={() => setInCollection(false)}>Remove from collection</button>
                :
              <button onClick={() => setInCollection(true)}>Add to collection</button>
            }
          </div>
        </div>
       
        <div style={{width: '68%', marginTop: '20px'}} className='flex-column-left'>
          <h2 style={{textAlign: 'center', borderBottom: '.5px solid white'}} className='small-margins'>{playingAlbum.name}</h2>
          <h2 style={{textAlign: 'center', fontStyle: 'italic',borderBottom: '.5px solid white'}} className='small-margins'>{playingAlbum.artists[0].name}</h2>
          <h3 style={{textAlign: 'center', fontStyle: 'italic'}} className='small-margins'>{playingAlbum.release_date.substring(0,4)}</h3>
          {playingAlbum.tracks.items.map((track) => (
            <div className='flex-row-left'>
              {/* <button style={{backgroundColor: 'white', borderRadius: '5px'}}onClick={() => {
                setCurrentTrackIndex(playingAlbum.tracks.items.indexOf(track)) 
                setPlayingTrack(track.uri)
              }}>▶</button> */}
              <h3 className='small-margins' style={{width: '7%', textAlign: 'right'}}>{track.track_number}.</h3>
              <h3 style={{width: '75%'}} className='small-margins'>{track.name}</h3>
              <h3 className='small-margins'>{formatTime(track.duration_ms)}</h3>
            </div>
          ))}
        </div>
        {/* <button onClick={previousTrack}>\</button>
        <button onClick={nextTrack}>/</button> */}
      </div>
    </div>
        :
      null
  );
}

export default Player;