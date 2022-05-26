import {useContext, useState, useEffect} from 'react'
import { AppContext } from './AppContext';
import ArtistThumbnail from './ArtistThumbnail';
import SingleArtist from './SingleArtist';

function Artists(props) {

  const {user} = useContext(AppContext)

  const [userArtists, setUserArtists] = useState(null)
  const [singleArtist, setSingleArtist] = useState(null)
  const [singleArtistAlbums, setSingleArtistAlbums] = useState(null)
  const [showSingleArtist, setShowSingleArtist] = useState(false)

  useEffect (() => {
    fetchUserArtists()
  }, [] )

  function fetchUserArtists () {
    fetch(`/users/${user.id}/artists`, {method: "GET"})
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setUserArtists(data.artists)
    })
  }

  return !singleArtistAlbums ? (
    <div className='flex-column-center'>
      <h1 className='section-header'>Artists</h1>
      {/* <button onClick={fetchUserArtists}>Get Artists</button> */}
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
        :null}
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
        <button onClick={() => setSingleArtistAlbums(null)}>Back to Artists</button>
      </div>
      {singleArtist ? <h1 className='flex-row-center small-margins'>{singleArtist}</h1> : null}
      <div className='flex-row-center wrap'>
        {singleArtistAlbums.map((album) => (
          <SingleArtist singleArtist={singleArtist} key={album.id} album={album}/>
        ))}
      </div>
    </>
  )
}

export default Artists;