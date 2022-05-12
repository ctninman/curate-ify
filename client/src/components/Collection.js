import {useState, useContext, useEffect} from 'react'
import { AppContext } from './AppContext';
import CollectionFilter from "./CollectionFilter";
import CollectionAlbumThumbnail from './CollectionAlbumThumbnail';


function Collection(props) {

  const {setSingleSelectedAlbum, user, setUser} = useContext(AppContext)

  const [showCollectionAlbum, setShowCollectionAlbum] = useState(false)

  useEffect (() => {
    if (user) {
      fetch(`/users/${user.id}`, {method: 'GET'})
      .then(res => res.json())
      .then(data => setUser(data.user))
    }
  }, [] )

  return user  ? (
    <div>
      <h1>{user.username}'s Collection</h1>
      <CollectionFilter />
      <div>
        {user.albums && user.albums.length > 0 
            ? 
          user.albums.map((album) => (
          <CollectionAlbumThumbnail key={album.spotify_album_id} album={album}/>
          ))
            :
          <h1>Start your collection</h1>
        }
      </div>
    </div>
  )
      :
  null
}

export default Collection;