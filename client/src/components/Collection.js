import {useState, useContext, useEffect} from 'react'
import { AppContext } from './AppContext';
import CollectionFilter from "./CollectionFilter";
import CollectionAlbumThumbnail from './CollectionAlbumThumbnail';


function Collection(props) {

  const {setSingleSelectedAlbum, user, setUser} = useContext(AppContext)

  const [showCollectionAlbum, setShowCollectionAlbum] = useState(false)
  const [userCollectionAlbums, setUserCollectionAlbums] = useState(null)
  // const [userFilteredCollection, setUserFilteredCollection] = 
  const [genreFilter, setGenreFilter] = useState(null)
  const [tagFilter, setTagFilter] = useState(null)

  useEffect (() => {
    if (user) {
      fetch(`/users/${user.id}`, {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        setUser(data.user)
        setUserCollectionAlbums(user.albums.filter(album => album.in_collection === true))
      })
    }
  }, [] )

  return user  ? (
    <div>
      <h1>{user.username}'s Collection</h1>
      <CollectionFilter 
        setGenreFilter={setGenreFilter} 
        setTagFilter={setTagFilter} 
        userCollectionAlbums={userCollectionAlbums} 
        setUserCollectionAlbums={setUserCollectionAlbums}
        genreFilter={genreFilter}
        tagFilter={tagFilter}/>
     
      {!genreFilter && !tagFilter
          ?
        <div>
        {user.albums && user.albums.length > 0 && userCollectionAlbums
            ? 
          userCollectionAlbums.map((album) => (
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
          userCollectionAlbums.filter(album => album.genres.includes(genreFilter)).map((album) => (
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
          userCollectionAlbums.filter(album => album.tags.includes(tagFilter)).map((album) => (
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
          userCollectionAlbums.filter(album => album.tags.includes(tagFilter) && album.genres.includes(genreFilter)).map((album) => (
          <CollectionAlbumThumbnail key={album.spotify_album_id} album={album}/>
          ))
            :
          <h1>Start your collection</h1>
        }
        </div> 
          :
        null
      }     
      




      {/* <div>
        {user.albums && user.albums.length > 0 
            ? 
          userCollectionAlbums.filter(album => album.genres.includes(genreFilter)).filter(album => album.tags.includes(tagFilter)).map((album) => (
          <CollectionAlbumThumbnail key={album.spotify_album_id} album={album}/>
          ))
            :
          <h1>Start your collection</h1>
        }
      </div>
    } */}


    </div>
  )
      :
  null
}

export default Collection;