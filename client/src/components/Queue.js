import {useState, useContext, useEffect} from 'react'
import {useHistory} from 'react-router'
import { AppContext } from './AppContext';
import CollectionFilter from "./CollectionFilter";
import CollectionAlbumThumbnail from './CollectionAlbumThumbnail';
import Collection from './Collection';
import QueueAlbumThumbnail from './QueueAlbumThumbnail';


function Queue(props) {

  let history = useHistory()

  const {setSingleSelectedAlbum, user, setUser, isLoading, setIsLoading} = useContext(AppContext)

  const [userQueueAlbums, setUserQueueAlbums] = useState(null)

  useEffect (() => {
    if (user) {
      setIsLoading(true)
      
      fetch(`users/${user.id}/queue_albums`, {method: "GET"})
      .then(res => res.json())
      .then(data => {
        setUserQueueAlbums(data.queue_albums)
        setIsLoading(false)
      })
    }
  }, [user])

  function handleRemoveFromQueue (queue_album) {
    fetch(`/queue_albums/${queue_album.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => setUserQueueAlbums(data.updated_queue))
  }

  return (
    <>
    {userQueueAlbums && userQueueAlbums.length > 0 ?
    <div className='flex-column-center'>
      <h1 className='section-header'>Queue</h1>
      {userQueueAlbums.map((album) => (
        // <h1>{album.album_title}</h1>
        <QueueAlbumThumbnail 
          key={album.id} 
          album={album} 
          handleRemoveFromQueue={handleRemoveFromQueue} 
          setUserQueueAlbums={setUserQueueAlbums} 
        />
      ))}
    </div>
      :
    <div className='flex-column-center'>
      <h1 style={{textAlign: 'center'}}>Your Queue is Empty</h1>
      <button className='generic-button' style={{backgroundColor: '#F8CB2E', marginTop: '20px'}} onClick={() => history.push('/search')}>Find Albums</button>
    </div>
    }
    </>
  )

  // return user  ? (
  //   <div>
  //     <h1>{user.username}'s Queue</h1>
  //     <CollectionFilter />
  //     <div>
  //       {user.albums && user.albums.length > 0 
  //           ? 
  //         user.albums.filter(album => album.in_queue === true).map((album) => (
  //         <CollectionAlbumThumbnail key={album.spotify_album_id} album={album}/>
  //         ))
  //           :
  //         <h1>Start your collection</h1>
  //       }
  //     </div>
  //   </div>
  // )
  //     :
  // null
}

export default Queue;