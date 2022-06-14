import {useState, useContext, useEffect} from 'react'
import {useHistory} from 'react-router'
import { AppContext } from './AppContext';
import QueueAlbumThumbnail from './QueueAlbumThumbnail';

function Queue() {

  let history = useHistory()

  const {user, setIsLoading, refreshMe} = useContext(AppContext)

  const [userQueueAlbums, setUserQueueAlbums] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      refreshMe()
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
      <span className='back-button-outer'><button className='back-button' onClick={() => history.push('/search')}>FIND ALBUMS</button></span>
    </div>
    }
    </>
  )
}

export default Queue;