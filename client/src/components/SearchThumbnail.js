import { useContext, useState} from 'react'
import { AppContext } from './AppContext';
import ListForm from './ListForm';
import SpotifyIcon from '../images/spotify.png'
import FriendIcon from '../images/FriendIcon.png'

function SearchThumbnail({album,setAlbumSearchResults, setSearchHeader, searchHeader}) {

  const {user, setIsLoading, singleSelectedAlbum, setSingleSelectedAlbum, setSingleListAlbum, addAlbumToPlayer, accessToken} = useContext(AppContext)

  const [showListForm, setShowListForm] = useState(false)
  const [albumListSelect, setAlbumListSelect] = useState(null)
  const [addedToQueueMessage, setAddedToQueueMessage] = useState(false)
  

  let urlInSearch = `https://api.spotify.com/v1/albums/${album.id}`

  function handleClickAddToList (event) {
    setAlbumListSelect(event.target.value)
    setShowListForm(true)
  }

  function addAlbumToQueueDB () {
    fetch('/queue_albums', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        
        album_title: album.name,
        artist_name: album.artists[0].name,
        spotify_artist_id: album.artists[0].id,
        spotify_album_id: album.id,
        spotify_uri: album.external_urls.spotify,
        album_cover: album.images[0].url,
        user_id: user.id,
        release_date: album.release_date.substring(0,4),
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setAddedToQueueMessage(true)
        console.log(data)
      })
    }

      // t.string "album_title"
      // t.string "artist_name"
      // t.string "spotify_artist_id"
      // t.string "spotify_album_id"
      // t.string "spotify_uri"
      // t.string "album_cover"
      // t.integer "user_id"
      // t.string "release_date"

  function fetchArtistFromSpotify () {
    setIsLoading(true)
    let spotifyArtistID = album.artists[0].uri.split('artist:')[1]
    fetch(`https://api.spotify.com/v1/artists/${spotifyArtistID}/albums?limit=50`, {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken}
    })
    .then(res => res.json())
    .then(data => {
      setAlbumSearchResults(data.items)
      setSearchHeader(album.artists[0].name)
      setIsLoading(false)
    })
  }

  return (
    <>
   
    <div style={{width: '16%'}}className='flex-column-center search-thumb'>
      <img 
        style={{width: '100%', marginTop: '3px', borderRadius: '3px'}} 
        src={album.images[1].url} 
        alt={album.name} 
      />
      <h3 className='center-text search-title'>{album.name}</h3>
      <h4 onClick={fetchArtistFromSpotify} className='small-margins center-text search-artist'>{album.artists[0].name}</h4>
      <div className='flex-column-center'>
        <div className='flex-row-center'>
          <div className='player-icons' style={{width: '30%', marginRight: '5%'}}>
            <a href={album.external_urls.spotify} target="_blank"><img style={{width: '100%'}} src={SpotifyIcon} /></a>
          </div>
          <div className='player-icons' style={{width: '30%', marginLeft: '5%'}}>
            <span onClick={() => addAlbumToPlayer(urlInSearch)}>
              <img style={{width: '100%'}} src={FriendIcon} />
            </span>
          </div>
        </div>
        <button onClick={() => setSingleSelectedAlbum(album)}>Add to Collection</button>
        {addedToQueueMessage? <button style={{backgroundColor: '#F8CB2E'}}>Added To Queue</button> : <button onClick={addAlbumToQueueDB}>Add to Queue</button>}
        {showListForm ? null : <button value={album.id} onClick={handleClickAddToList}>Add to List</button>}
        {showListForm && album.id === albumListSelect
          ?
        <ListForm componentProp='search' setShowListForm={setShowListForm} album={album}/>
          :
         null
       }
      </div>
    </div>
    
    </>
  );
}

export default SearchThumbnail;