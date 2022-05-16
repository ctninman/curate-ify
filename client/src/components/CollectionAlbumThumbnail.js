import {useContext, useEffect, useState, useRef} from 'react'
import { AppContext } from './AppContext'
import ListForm from './ListForm'

function CollectionAlbumThumbnail({album}) {

  const {user, setUser, fetchUser} = useContext(AppContext)
  const firstUpdate = useRef(true)

  const [triggerUserFetch, setTriggerUserFetch] = useState(false)
  const [showListFormInCollection, setShowListFormInCollection] = useState(false)
  const [albumListSelectInCollection, setAlbumListSelectInCollection] = useState(null)

  function handleClickAddToListInCollection (event) {
    setAlbumListSelectInCollection(event.target.value)
    setShowListFormInCollection(true)
  }

  useEffect (() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    fetchUser()
  }, [triggerUserFetch] )

  function handleAddToCollection () {
    let addCollection = {in_queue: false, in_collection: true, user_id: user.id}
    updateAlbumLocation(addCollection)
  }

  function handleRemoveFromCollectionOrQueue () {
    let removeCollection = {user_id: user.id}
    deleteAlbumFromCollection(removeCollection)
  }

  function deleteAlbumFromCollection (object) {
    fetch(`/albums/${album.id}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(object)
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      setTriggerUserFetch(!triggerUserFetch)
    })
  }

  function updateAlbumLocation (booleanObject) {
    fetch(`/albums/${album.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(booleanObject)
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      setTriggerUserFetch(!triggerUserFetch)

    })
  }

  return (
    <div className='flex-row collection-album' style={{justifyContent: 'flex-start'}}>
      <div className='flex-column-center'>
        <img className='white-background' style={{height: '200px', border: '8px solid black'}} src={album.album_cover} />
      </div>
      <div>
        <h2 className='small-margins'>{album.album_title}</h2>
        <h3 className='small-margins'>{album.artist}</h3>
        <h3 className='small-margins'>{album.release_date}</h3>
        {album.genres && album.genres.length > 0 
            ?
          <div className='flex-row-left'>
            {album.genres.map((genre) => (
            <h5 className='small-margins small-text genres-thumb'>{genre}</h5>
            ))}
          </div>
            :
          null
        }
        {album.tags && album.tags.length > 0 
            ?
          <div className='flex-row-left'>
            {album.tags.map((tag) => (
            <h5 className='small-margins small-text tags-thumb'>{tag}</h5>
            ))}
          </div>
            :
          null
        }
        <h3 className='small-margins'>{user.username}'s Rating: {album.rating}</h3>
        <a href={album.spotify_uri} target="_blank">🎧</a>
        <div className='flex-row-left'>
          
          {album.in_queue ? <button onClick={handleRemoveFromCollectionOrQueue}>Remove From My Queue</button> : null}
          {album.in_collection ? <button onClick={handleRemoveFromCollectionOrQueue}>Remove From My Collection</button> : null }
          {album.in_queue ? <button onClick={handleAddToCollection}>Add To My Collection</button> : null }
        </div>
        {showListFormInCollection ? null : <button value={album.id} onClick={handleClickAddToListInCollection}>Add to List</button>}
        {showListFormInCollection && parseInt(album.id) === parseInt(albumListSelectInCollection)
            ?
          <ListForm />
            :
          null
        }
      </div>
    </div>
  );
}

export default CollectionAlbumThumbnail;