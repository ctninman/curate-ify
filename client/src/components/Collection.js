import {useState, useContext, useEffect} from 'react'
import { AppContext } from './AppContext';
import CollectionFilter from "./CollectionFilter";
import CollectionAlbumThumbnail from './CollectionAlbumThumbnail';


function Collection(props) {

  const {setSingleSelectedAlbum, user, setUser} = useContext(AppContext)

  const [showCollectionAlbum, setShowCollectionAlbum] = useState(false)
  const [userCollectionAlbums, setUserCollectionAlbums] = useState(null)
  const [collectionSearchTerm, setCollectionSearchTerm] = useState('')
  const [genreFilter, setGenreFilter] = useState(null)
  const [tagFilter, setTagFilter] = useState(null)
  const [shelfFilter, setShelfFilter] = useState(null)
  

  useEffect (() => {
    if (user) {
      fetch(`/users/${user.id}`, {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        setUser(data.user)
        // if (window.location.href.includes('queue')) {
        //   setUserCollectionAlbums(user.albums.filter(album => album.in_queue === true))
        // } else
        // setUserCollectionAlbums(user.albums.filter(album => album.in_collection === true))
      })
    }
  }, [] )

  useEffect (() => {
    if (user && window.location.href.includes('queue')) {
      setUserCollectionAlbums(user.albums.filter(album => album.in_queue === true))
    } else if (user) {
      setUserCollectionAlbums(user.albums.filter(album => album.in_collection === true))
    }
  }, [user] )

  return user && userCollectionAlbums ? (
    <div>
      <h1>{user.username}'s Collection ({userCollectionAlbums.length} albums)</h1>
      <CollectionFilter 
        setGenreFilter={setGenreFilter} 
        setTagFilter={setTagFilter} 
        userCollectionAlbums={userCollectionAlbums} 
        setUserCollectionAlbums={setUserCollectionAlbums}
        genreFilter={genreFilter}
        tagFilter={tagFilter}
        setCollectionSearchTerm={setCollectionSearchTerm}
        collectionSearchTerm={collectionSearchTerm}
        shelfFilter={shelfFilter}
        setShelfFilter={setShelfFilter}/>
     
      {!genreFilter && !tagFilter
          ?
        <div>
        {user.albums && user.albums.length > 0 && userCollectionAlbums
            ? 
          userCollectionAlbums
          .filter(album => album.album_title.toLowerCase().includes(collectionSearchTerm.toLowerCase()) || album.artist.toLowerCase().includes(collectionSearchTerm.toLowerCase()))
          .map((album) => (
          <CollectionAlbumThumbnail key={album.spotify_album_id} album={album}/>
          ))
            :
          <h1>Start your collection</h1>
        }
        </div> 
          :
        null
      }

      {genreFilter && !tagFilter
          ?
        <div>
        {user.albums && user.albums.length > 0 && userCollectionAlbums
            ? 
          userCollectionAlbums
          .filter(album => album.genres.includes(genreFilter))
          .filter(album => album.album_title.toLowerCase().includes(collectionSearchTerm.toLowerCase()) || album.artist.toLowerCase().includes(collectionSearchTerm.toLowerCase()))
          .map((album) => (
            <CollectionAlbumThumbnail key={album.spotify_album_id} album={album}/>
          ))
            :
          <h1>Start your collection</h1>
        }
        </div> 
          :
        null
      }

      {!genreFilter && tagFilter
          ?
        <div>
        {user.albums && user.albums.length > 0 && userCollectionAlbums
            ? 
          userCollectionAlbums.filter(album => album.tags.includes(tagFilter))
          .filter(album => album.album_title.toLowerCase().includes(collectionSearchTerm.toLowerCase()) || album.artist.toLowerCase().includes(collectionSearchTerm.toLowerCase()))
          .map((album) => (
            <CollectionAlbumThumbnail key={album.spotify_album_id} album={album}/>
          ))
            :
          <h1>Start your collection</h1>
        }
        </div> 
          :
        null
      }

      {genreFilter && tagFilter
          ?
        <div>
        {user.albums && user.albums.length > 0 && userCollectionAlbums
            ? 
          userCollectionAlbums.filter(album => album.tags.includes(tagFilter) && album.genres.includes(genreFilter))
          .filter(album => album.album_title.toLowerCase().includes(collectionSearchTerm.toLowerCase()) || album.artist.toLowerCase().includes(collectionSearchTerm.toLowerCase()))
          .map((album) => (
          <CollectionAlbumThumbnail key={album.spotify_album_id} album={album}/>
          ))
            :
          <h1>Start your collection</h1>
        }
        </div> 
          :
        null
      }     

    </div>
  )
      :
  null
}

export default Collection;