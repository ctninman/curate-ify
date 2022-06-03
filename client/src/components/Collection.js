import { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from './AppContext';
import GridAlbum from './GridAlbum';
import CollectionFilter from "./CollectionFilter";
import CollectionAlbumThumbnail from './CollectionAlbumThumbnail';
import EditAlbumForm from './EditAlbumForm';


function Collection({collectionProp}) {

  let history = useHistory()

  const {user, setUser, userCollectionAlbums, setUserCollectionAlbums, refreshMe} = useContext(AppContext)

  const [collectionSearchTerm, setCollectionSearchTerm] = useState('')
  const [genreFilter, setGenreFilter] = useState(null)
  const [tagFilter, setTagFilter] = useState(null)
  const [shelfFilter, setShelfFilter] = useState(null)
  const [showGrid, setShowGrid] = useState(false)
  const [showEditAlbum, setShowEditAlbum] = useState(false)
  const [albumToEdit, setAlbumToEdit] = useState(null)
  const [getCollection, setGetCollection] = useState(false)

  // useEffect (() => {
  //   refreshMe()
  // })

  useEffect(() => {
    const timer = setTimeout(() => {
      refreshMe()
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect (() => {
    if (user) {
      fetch(`/users/${user.id}`, {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        setUser(data.user)
        setUserCollectionAlbums(data.user.albums.sort((a,b) => (a.rating > b.rating) ? -1 : 1))
      })
    }
  }, [getCollection] )

  return user && userCollectionAlbums ? (
    <>
{/*** SHOW EDIT ABLUM FORM OR FULL COLLECTION ***/}
    {showEditAlbum && albumToEdit? 
      <EditAlbumForm album={albumToEdit} setAlbumToEdit={setAlbumToEdit} showEditAlbum={showEditAlbum} setShowEditAlbum={setShowEditAlbum} userCollectionAlbums={userCollectionAlbums} setUserCollectionAlbums={setUserCollectionAlbums}/> 
        :
    <div>
      <div className='flex-column-center' style={{marginTop: '20px'}}>
        <h1 className='flex-row-center small-margins section-header' style={{padding: '8px'}} >{user.username}'s {collectionProp === 'queue' ? 'Queue' : 'Collection'}</h1>
        <h2 className='flex-row-center small-margins' style={{fontStyle: 'italic'}}>{userCollectionAlbums.length} albums</h2>
      </div>
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
     
{/*** NO GENRE FILTER, NO TAG FILTER, FULL ALBUM DETAILS ***/}
      {!genreFilter && !tagFilter && !showGrid
          ?
        <div className='flex-column-center'>
        { userCollectionAlbums && userCollectionAlbums.length > 0 
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
              setGetCollection={setGetCollection}
              getCollection={getCollection}
            />
          ))
            :
          <button className='generic-button' style={{backgroundColor: '#F8CB2E', marginTop: '20px'}} onClick={() => history.push('/search')}>Start your collection</button>
        }
        </div> 
          :
        null
      }
{/*** NO GENRE FILTER, NO TAG FILTER, SHOW ALBUM COVERS ONLY ***/}
      {!genreFilter && !tagFilter && showGrid
          ?
        <div className='flex-row-center wrap'>
        { userCollectionAlbums && userCollectionAlbums.length > 0 
            ? 
          userCollectionAlbums
          .filter(album => album.album_title.toLowerCase().includes(collectionSearchTerm.toLowerCase()) || album.artist_name.toLowerCase().includes(collectionSearchTerm.toLowerCase()))
          .map((album) => (
            <GridAlbum 
              key={uuidv4()} 
              album={album}
              componentProp='grid'
              setCollectionSearchTerm={setCollectionSearchTerm}
            />
          ))
            :
          <button className='generic-button' style={{backgroundColor: '#F8CB2E', marginTop: '20px'}} onClick={() => history.push('/search')}>Start your collection</button>
        }
        </div> 
          :
        null
      }

{/*** HAS GENRE FILTER, NO TAG FILTER, FULL ALBUM DETAILS ***/}
      {genreFilter && !tagFilter && !showGrid
          ?
        <div className='flex-column-center'>
        { userCollectionAlbums && userCollectionAlbums.length > 0 
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
          <button className='generic-button' style={{backgroundColor: '#F8CB2E', marginTop: '20px'}} onClick={() => history.push('/search')}>Start your collection</button>
        }
        </div> 
          :
        null
      }
{/*** HAS GENRE FILTER, NO TAG FILTER, SHOW ALBUM COVERS ONLY ***/}
      {genreFilter && !tagFilter && showGrid
          ?
        <div className='flex-row-center wrap'>
        { userCollectionAlbums && userCollectionAlbums.length > 0 
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
          <button className='generic-button' style={{backgroundColor: '#F8CB2E', marginTop: '20px'}} onClick={() => history.push('/search')}>Start your collection</button>
        }
        </div> 
          :
        null
      }
{/*** NO GENRE FILTER, HAS TAG FILTER, FULL ALBUM DETAILS ***/}
      {!genreFilter && tagFilter && !showGrid
          ?
        <div className='flex-column-center'>
        { userCollectionAlbums && userCollectionAlbums.length > 0 
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
          <button className='generic-button' style={{backgroundColor: '#F8CB2E', marginTop: '20px'}} onClick={() => history.push('/search')}>Start your collection</button>
        }
        </div> 
          :
        null
      }
{/*** NO GENRE FILTER, HAS TAG FILTER, ALBUM COVERS ONLY ***/}
      {!genreFilter && tagFilter && showGrid
          ?
        <div className='flex-row-center wrap'>
        { userCollectionAlbums && userCollectionAlbums.length > 0 
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
          <button className='generic-button' style={{backgroundColor: '#F8CB2E', marginTop: '20px'}} onClick={() => history.push('/search')}>Start your collection</button>
        }
        </div> 
          :
        null
      }
{/*** HAS GENRE FILTER, HAS TAG FILTER, FULL ALBUM DETAILS ***/}
      {genreFilter && tagFilter && !showGrid
          ?
        <div className='flex-column-center'>
        { userCollectionAlbums && userCollectionAlbums.length > 0 
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
          <button className='generic-button' style={{backgroundColor: '#F8CB2E', marginTop: '20px'}} onClick={() => history.push('/search')}>Start your collection</button>
        }  
        </div> 
          :
        null
      }  
{/*** HAS GENRE FILTER, HAS TAG FILTER, SHOW ALBUM COVERS ONLY ***/}
      {genreFilter && tagFilter && showGrid
          ?
        <div className='flex-row-center wrap'>
        { userCollectionAlbums && userCollectionAlbums.length > 0 
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
          <button className='generic-button' style={{backgroundColor: '#F8CB2E', marginTop: '20px'}} onClick={() => history.push('/search')}>Start your collection</button>
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