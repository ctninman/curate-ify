import {useState, useContext, useEffect} from 'react'
import { AppContext } from './AppContext';
import CollectionFilter from "./CollectionFilter";
import CollectionAlbumThumbnail from './CollectionAlbumThumbnail';
import Collection from './Collection';
import QueueAlbumThumbnail from './QueueAlbumThumbnail';


function Queue(props) {

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

  return (
    <>
    {userQueueAlbums ?
    <div className='flex-column-center'>
      {userQueueAlbums.map((album) => (
        // <h1>{album.album_title}</h1>
        <QueueAlbumThumbnail key={album.id} album={album} />
      ))}
    </div>
    :<h1>Your Queue is Empty</h1>
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