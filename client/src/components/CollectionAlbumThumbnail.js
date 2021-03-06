import {useContext, useEffect, useState, useRef} from 'react'
import { AppContext } from './AppContext'
import { v4 as uuidv4 } from 'uuid';
import ListForm from './ListForm'
import SpotifyIcon from '../images/spotify.png'
import FriendIcon from '../images/FriendIcon.png'

function CollectionAlbumThumbnail({album, setGetCollection, getCollection, setShowEditAlbum, setAlbumToEdit}) {

  const {user, fetchUser, playingTrack, setPlay, addAlbumToPlayer} = useContext(AppContext)
  const firstUpdate = useRef(true)
  const secondUpdate = useRef(true)

  const [triggerUserFetch, setTriggerUserFetch] = useState(false)
  const [showListFormInCollection, setShowListFormInCollection] = useState(false)
  const [albumListSelectInCollection, setAlbumListSelectInCollection] = useState(null)
  let url = `https://api.spotify.com/v1/albums/${album.spotify_album_id}`

  function handleClickAddToListInCollection (event) {
    setAlbumListSelectInCollection(event.target.value)
    setShowListFormInCollection(true)
    // setGetCollection(!getCollection)
  }

  useEffect (() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    fetchUser()
  }, [triggerUserFetch] )

  useEffect (() => {
    if (secondUpdate.current) {
      secondUpdate.current = false;
      return;
    }
    setPlay(true)
  }, [playingTrack] )

  function handleEditInCollection () {
    setAlbumToEdit(album)
    setShowEditAlbum(true)
  }

  function handleRemoveFromCollectionOrQueue () {
    let removeCollection = {user_id: user.id}
    deleteAlbumFromCollection(removeCollection)
    setGetCollection(!getCollection)
  }

  function deleteAlbumFromCollection (object) {
    fetch(`/albums/${album.id}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(object)
    })
    .then(res => res.json())
    .then((data) => {
      console.log('album deleted', data)
    })
  }

  return (
    <div className='flex-row collection-album' style={{justifyContent: 'flex-start'}}>
      <div className='flex-column-center'>
        <img alt='Album cover' className='white-background' style={{height: '200px', border: '8px solid black'}} src={album.album_cover} />
      </div>
      <div>
        <h2 className='small-margins'>{album.album_title}</h2>
        <h3 className='small-margins'>{album.artist_name}</h3>
        <h3 className='small-margins'>{album.release_date}</h3>
        {album.genres && album.genres.length > 0 
            ?
          <div className='flex-row-left wrap'>
            {album.genres.map((genre) => (
            <h5 key={genre} className='small-margins small-text genres-thumb'>{genre}</h5>
            ))}
          </div>
            :
          null
        }
        {album.tags && album.tags.length > 0 
            ?
          <div className='flex-row-left wrap'>
            {album.tags.map((tag) => (
            <h5 key={tag} className='small-margins small-text tags-thumb'>{tag}</h5>
            ))}
          </div>
            :
          null
        }
        <h3 className='small-margins'>{user.username}'s Rating: {album.rating == 0 ? 'Unrated': album.rating}</h3>   
        <div className='flex-row'>
          <div className='player-icons' style={{width: '35px', marginRight: '5%'}}>
            <a href={album.spotify_uri} target="_blank"><img alt='Open in Spotify' style={{width: '100%'}} src={SpotifyIcon} /></a>
          </div>
          <div className='player-icons' style={{width: '35px', marginLeft: '20px'}}>
            <span onClick={() => addAlbumToPlayer(url)}>
              <img style={{width: '100%'}} alt='Open in player' src={FriendIcon} />
            </span>
          </div>
        </div>
        <div className='flex-row-left'>
          <button onClick={handleRemoveFromCollectionOrQueue}>Remove From My Collection</button>
          <button onClick={handleEditInCollection}>Edit Album Details</button>
        </div>
        {showListFormInCollection ? null : <button value={album.id} onClick={handleClickAddToListInCollection}>Add to List</button>}
        {showListFormInCollection && parseInt(album.id) === parseInt(albumListSelectInCollection)
            ?
          <ListForm 
            album={album} 
            key={uuidv4()}
            componentProp='collection'
            setShowListFormInCollection={setShowListFormInCollection}/>
            :
          null
        }
      </div>
    </div>
  );
}

export default CollectionAlbumThumbnail;