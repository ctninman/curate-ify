import {useContext, useState, useEffect} from 'react'
import { AppContext } from './AppContext';
import ArtistThumbnail from './ArtistThumbnail';
import SingleArtist from './SingleArtist';
import { v4 as uuidv4 } from 'uuid';

function Artists() {

  const {user, refreshMe} = useContext(AppContext)

  const [userArtists, setUserArtists] = useState(null)
  const [singleArtist, setSingleArtist] = useState(null)
  const [singleArtistAlbums, setSingleArtistAlbums] = useState(null)
  const [showSingleArtist, setShowSingleArtist] = useState(false)

  useEffect (() => {
    refreshMe()
    fetchUserArtists()
  }, [] )

  function fetchUserArtists () {
    fetch(`/users/${user.id}/artists`, {method: "GET"})
    .then(res => res.json())
    .then(data => {
      setUserArtists(data.artists)
    })
  }
 
  return !singleArtistAlbums ? (
    <div className='flex-column-center'>
      <h1 className='section-header'>Artists</h1>
      {!showSingleArtist ?
        <div className='flex-row-center wrap'>    
        {userArtists ? 
          userArtists.map((artist) => (
            <ArtistThumbnail 
              key={artist.id} 
              artist={artist}
              setShowSingleArtist={setShowSingleArtist}
              setSingleArtist={setSingleArtist}
              singleArtist={SingleArtist}
              setSingleArtistAlbums={setSingleArtistAlbums}  
            />
          ))
            :
          null
        }
        </div>
          :
        null
      } 
    </div>
  )
    :
  (  
    <>
      <div className='flex-row-center'>
        <span className='back-button-outer'><button className='back-button' onClick={() => setSingleArtistAlbums(null)}>BACK TO ARTISTS</button></span>
      </div>
      {singleArtist ? <h1 className='flex-row-center small-margins'>{singleArtist}</h1> : null}
      <div className='flex-row-center wrap'>
        {singleArtistAlbums.map((album) => (
          <SingleArtist singleArtist={singleArtist} key={uuidv4()}  album={album}/>
        ))}
      </div>
    </>
  )
}

export default Artists;