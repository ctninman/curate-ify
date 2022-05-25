import {useState, useContext, useEffect, useRef} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from './AppContext';
import GridAlbum from './GridAlbum';
import CollectionFilter from "./CollectionFilter";
import CollectionAlbumThumbnail from './CollectionAlbumThumbnail';
import EditAlbumForm from './EditAlbumForm';


function Collection({collectionProp}) {

  const firstUpdate = useRef(false)

  const {setSingleSelectedAlbum, user, setUser, addAlbumToPlayer} = useContext(AppContext)

  const [showCollectionAlbum, setShowCollectionAlbum] = useState(false)
  const [userCollectionAlbums, setUserCollectionAlbums] = useState(null)
  const [collectionSearchTerm, setCollectionSearchTerm] = useState('')
  const [genreFilter, setGenreFilter] = useState(null)
  const [tagFilter, setTagFilter] = useState(null)
  const [shelfFilter, setShelfFilter] = useState(null)
  const [showGrid, setShowGrid] = useState(false)
  const [showEditAlbum, setShowEditAlbum] = useState(false)
  const [albumToEdit, setAlbumToEdit] = useState(null)
  const [getCollection, setGetCollection] = useState(false)
  

  useEffect (() => {
    if (user) {
      fetch(`/users/${user.id}`, {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        setUser(data.user)
        setGetCollection(() => !getCollection)
        // if (window.location.href.includes('queue')) {
        //   setUserCollectionAlbums(user.albums.filter(album => album.in_queue === true))
        // } else
        // setUserCollectionAlbums(user.albums.filter(album => album.in_collection === true))
      })
    }
  }, [] )

  useEffect (() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (user && user.albums && window.location.href.includes('queue')) {
      setUserCollectionAlbums(user.albums.filter(album => album.in_queue === true))
    } else if (user && user.albums) {
      setUserCollectionAlbums(user.albums)
    }
  }, [getCollection] )

  return user && userCollectionAlbums ? (
    <>
    {showEditAlbum && albumToEdit? 
      <EditAlbumForm album={albumToEdit} setAlbumToEdit={setAlbumToEdit} setShowEditAlbum={setShowEditAlbum}/> 
        :
    <div>
      {/* <button onClick={() => console.log(userCollectionAlbums)}>UserCollectionAlbums</button> */}
      <h1 className='flex-row-center small-margins'>{user.username}'s {collectionProp === 'queue' ? 'Queue' : 'Collection'}</h1>
      <h2 className='flex-row-center small-margins' style={{fontStyle: 'italic'}}>{userCollectionAlbums.length} albums</h2>
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
        setShelfFilter={setShelfFilter}
        showGrid={showGrid}
        setShowGrid={setShowGrid}/>
     
      {!genreFilter && !tagFilter && !showGrid
          ?
        <div className='flex-column-center'>
        {user.albums && user.albums.length > 0 && userCollectionAlbums
            ? 
          userCollectionAlbums
          .filter(album => album.album_title.toLowerCase().includes(collectionSearchTerm.toLowerCase()) || 
            album.artist_name.toLowerCase().includes(collectionSearchTerm.toLowerCase()) ||
            album.release_date.includes(collectionSearchTerm))
          .map((album) => (
            <CollectionAlbumThumbnail
              key={uuidv4()} 
              album={album}
              setCollectionSearchTerm={setCollectionSearchTerm}
              setShowEditAlbum={setShowEditAlbum}
              componentProp='edit'
              setAlbumToEdit={setAlbumToEdit}
            />
          ))
            :
          <h1>Start your collection</h1>
        }
        </div> 
          :
        null
      }

{!genreFilter && !tagFilter && showGrid
          ?
        <div className='flex-row-center wrap'>
        {user.albums && user.albums.length > 0 && userCollectionAlbums
            ? 
          userCollectionAlbums
          .filter(album => album.album_title.toLowerCase().includes(collectionSearchTerm.toLowerCase()) || album.artist_name.toLowerCase().includes(collectionSearchTerm.toLowerCase()))
          .map((album) => (
            <GridAlbum 
              key={uuidv4()} 
              album={album}
              // onClick={addAlbumToPlayer(`https://api.spotify.com/v1/albums/${album.spotify_album_id}`)}
              componentProp='grid'
              setCollectionSearchTerm={setCollectionSearchTerm}
            />
          ))
            :
          <h1>Start your collection</h1>
        }
        </div> 
          :
        null
      }


      {genreFilter && !tagFilter && !showGrid
          ?
        <div className='flex-column-center'>
        {user.albums && user.albums.length > 0 && userCollectionAlbums
            ? 
          userCollectionAlbums
          .filter(album => album.genres.includes(genreFilter))
          .filter(album => album.album_title.toLowerCase().includes(collectionSearchTerm.toLowerCase()) || album.artist.toLowerCase().includes(collectionSearchTerm.toLowerCase()))
          .map((album) => (
            <CollectionAlbumThumbnail 
              key={uuidv4()} 
              album={album}
              setCollectionSearchTerm={setCollectionSearchTerm}
              setShowEditAlbum={setShowEditAlbum}
              componentProp='edit'
              setAlbumToEdit={setAlbumToEdit}
            />
          ))
            :
          <h1>Start your collection</h1>
        }
        </div> 
          :
        null
      }

        {genreFilter && !tagFilter && showGrid
          ?
        <div className='flex-row-center wrap'>
        {user.albums && user.albums.length > 0 && userCollectionAlbums
            ? 
          userCollectionAlbums
          .filter(album => album.genres.includes(genreFilter))
          .filter(album => album.album_title.toLowerCase().includes(collectionSearchTerm.toLowerCase()) || album.artist.toLowerCase().includes(collectionSearchTerm.toLowerCase()))
          .map((album) => (
            <GridAlbum 
              key={uuidv4()} 
              album={album}
              componentProp='grid'
              setCollectionSearchTerm={setCollectionSearchTerm}
            />
          ))
            :
          <h1>Start your collection</h1>
        }
        </div> 
          :
        null
      }

      {!genreFilter && tagFilter && !showGrid
          ?
        <div className='flex-column-center'>
        {user.albums && user.albums.length > 0 && userCollectionAlbums
            ? 
          userCollectionAlbums.filter(album => album.tags.includes(tagFilter))
          .filter(album => album.album_title.toLowerCase().includes(collectionSearchTerm.toLowerCase()) || album.artist.toLowerCase().includes(collectionSearchTerm.toLowerCase()))
          .map((album) => (
            <CollectionAlbumThumbnail 
              key={uuidv4()} 
              album={album}
              setCollectionSearchTerm={setCollectionSearchTerm}
              setShowEditAlbum={setShowEditAlbum}
              componentProp='edit'
              setAlbumToEdit={setAlbumToEdit}
            />
          ))
            :
          <h1>Start your collection</h1>
        }
        </div> 
          :
        null
      }

      {!genreFilter && tagFilter && showGrid
          ?
        <div className='flex-row-center wrap'>
        {user.albums && user.albums.length > 0 && userCollectionAlbums
            ? 
          userCollectionAlbums.filter(album => album.tags.includes(tagFilter))
          .filter(album => album.album_title.toLowerCase().includes(collectionSearchTerm.toLowerCase()) || album.artist.toLowerCase().includes(collectionSearchTerm.toLowerCase()))
          .map((album) => (
            <GridAlbum
              key={uuidv4()} 
              album={album}
              componentProp='grid'
              setCollectionSearchTerm={setCollectionSearchTerm}
            />
          ))
            :
          <h1>Start your collection</h1>
        }
        </div> 
          :
        null
      }

      {genreFilter && tagFilter && !showGrid
          ?
        <div className='flex-column-center'>
        {user.albums && user.albums.length > 0 && userCollectionAlbums
            ? 
          userCollectionAlbums.filter(album => album.tags.includes(tagFilter) && album.genres.includes(genreFilter))
          .filter(album => album.album_title.toLowerCase().includes(collectionSearchTerm.toLowerCase()) || album.artist.toLowerCase().includes(collectionSearchTerm.toLowerCase()))
          .map((album) => (
          <CollectionAlbumThumbnail 
            key={uuidv4()} 
            album={album}
            setCollectionSearchTerm={setCollectionSearchTerm}
            setShowEditAlbum={setShowEditAlbum}
            componentProp='edit'
            setAlbumToEdit={setAlbumToEdit}
          />
          ))
            :
          <h1>Start your collection</h1>
        }

        
        </div> 
          :
        null
      }  

      {genreFilter && tagFilter && showGrid
          ?
        <div className='flex-row-center wrap'>
        {user.albums && user.albums.length > 0 && userCollectionAlbums
            ? 
          userCollectionAlbums.filter(album => album.tags.includes(tagFilter) && album.genres.includes(genreFilter))
          .filter(album => album.album_title.toLowerCase().includes(collectionSearchTerm.toLowerCase()) || album.artist.toLowerCase().includes(collectionSearchTerm.toLowerCase()))
          .map((album) => (
          <GridAlbum
            key={uuidv4()} 
            album={album}
            componentProp='grid'
            setCollectionSearchTerm={setCollectionSearchTerm}
          />
          ))
            :
          <h1>Start your collection</h1>
        }

        
        </div> 
          :
        null
      }     

    </div>
  }
  </>
  )
      :
  null
}

export default Collection;