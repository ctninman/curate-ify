import {useState, useContext, useEffect} from 'react'
import { AppContext } from './AppContext';
import CollectionFilter from "./CollectionFilter";
import CollectionAlbumThumbnail from './CollectionAlbumThumbnail';
import Collection from './Collection';


function Queue(props) {

  const {setSingleSelectedAlbum, user, setUser} = useContext(AppContext)

  useEffect (() => {
    if (user) {
      fetch(`/users/${user.id}`, {method: 'GET'})
      .then(res => res.json())
      .then(data => setUser(data.user))
    }
  }, [] )

  return (
    <Collection collectionProp='queue'/>
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