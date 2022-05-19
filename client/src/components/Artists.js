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
    <div>
      <h1>Artists</h1>
      {/* <button onClick={fetchUserArtists}>Get Artists</button> */}
      {!showSingleArtist ?
      <div className='flex-row'>    
  
        {userArtists ? 
          userArtists.map((artist) => (
            <ArtistThumbnail 
              key={artist.id} 
              artist={artist}
              setShowSingleArtist={setShowSingleArtist}
              setSingleArtist={setSingleArtist}
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
      <button onClick={() => setSingleArtistAlbums(null)}>Back to Artists</button>
      <div className='flex-row-center wrap'>
        {singleArtistAlbums.map((album) => (
          <SingleArtist key={album.id} album={album}/>
        ))}
      </div>
    </>
  )
}

export default Artists;