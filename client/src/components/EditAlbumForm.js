import {useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router'
import { AppContext } from './AppContext';
import GenreButton from './GenreButton';
import TagButton from './TagButton'


function EditAlbumForm({album, userCollectionAlbums, setUserCollectionAlbums, parentComponent, setShowAlbumFormInQueue, setUserQueueAlbums,setAlbumToEdit, setShowEditAlbum}) {

  const {singleSelectedAlbum, setSingleSelectedAlbum, user, allUserTags, setAllUserTags, allUserGenres, setAllUserGenres} = useContext(AppContext)

  const [showEditAddGenre, setEditShowAddGenre] = useState(false)
  const [showEditAddTag, setEditShowAddTag] = useState(false)

  // *** CONTROLLED Edit STATE *** //
  const [editAlbumTitle, setEditAlbumTitle] = useState('')
  const [editArtist, setEditArtist] = useState('')
  const [editRating, setEditRating] = useState(0)
  const [editReleaseDate, setEditReleaseDate] = useState('')
  const [editSingleGenre, setEditSingleGenre] = useState('')
  const [editGenreArray, setEditGenreArray] = useState([])
  const [editSingleTag, setEditSingleTag] = useState('')
  const [editTagArray, setEditTagArray] = useState([])

  const tenArray = [1,2,3,4,5,6,7,8,9,10]

  let history = useHistory()

  useEffect (() => {
    setEditAlbumTitle(album.album_title)
    setEditArtist(album.artist_name)
    setEditReleaseDate(album.release_date)
    setEditRating(album.rating)
    setEditGenreArray(album.genres)
    setEditTagArray(album.tags)
  } , [])


    // *** FUNCTIONS *** //
  function onEditAlbumTitleChange (event) {
    setEditAlbumTitle(event.target.value)
  }

  function onEditArtistChange (event) {
    setEditArtist(event.target.value)
  }

  function onEditRatingClick (event) {
    setEditRating(event.target.value)
  }

  function onEditReleaseDateChange (event) {
    setEditReleaseDate(event.target.value)
  }

  // t.string "album_title"
  // t.string "artist"
  // t.string "spotify_artist_id"
  // t.integer "rating"
  // t.string "spotify_album_id"
  // t.string "genres"
  // t.string "tags"
  // t.text "description"
  // t.boolean "in_collection"
  // t.text "spotify_uri"
  // t.string "shelf_level"
  // t.text "album_cover"
  // t.integer "user_id"
  // t.integer "artist_id"
  // t.string "release_date"

  function handleEditAddGenre () {
    if (editSingleGenre != ''){
      setEditGenreArray([ ...editGenreArray, editSingleGenre])
      // if (EditGenreArray.length > 0) {
      //   setEditGenreArray([ ...EditGenreArray, EditSingleGenre])
      // } else if (EditGenreArray == 0 ){
      //   setEditGenreArray([EditSingleGenre])
      // }
      setAllUserGenres([...allUserGenres, editSingleGenre])
      setEditSingleGenre('')
      setEditShowAddGenre(false)
    } else {
      return
    }
  }
  

  function handleEditAddGenreClick (event) {
    let newAlbumGenre = event.target.value
    if (editGenreArray.includes(newAlbumGenre)) {
      setEditGenreArray(editGenreArray.filter(genre => genre != newAlbumGenre))
    } else {
    setEditGenreArray([ ...editGenreArray, newAlbumGenre])
    }
    // if (EditGenreArray.length > 0) {
    //   setEditGenreArray([ ...EditGenreArray, newAlbumGenre])
    // } else if (EditGenreArray == 0 ){
    //   setEditGenreArray([newAlbumGenre])
    // }
  }

  function handleEditAddTag () {
    if (editSingleTag != ''){
      // if (EditTagArray.length > 0) {
      //   setEditTagArray([ ...EditTagArray, EditSingleTag])
      // } else if (EditTagArray == 0 ){
      //   setEditTagArray([EditSingleTag])
      // }
      setEditTagArray([ ...editTagArray, editSingleTag])
      setAllUserTags([...allUserTags, editSingleTag])
      setEditSingleTag('')
      setEditShowAddTag(false)
    }
  }

  function handleEditAddTagClick (event) {
    let newAlbumTag = event.target.value
    if (editTagArray.includes(newAlbumTag)) {
      setEditTagArray(editTagArray.filter(tag => tag != newAlbumTag))
    } else {
    setEditTagArray([ ...editTagArray, newAlbumTag])
    }
    // if (EditTagArray.length > 0) {
    //   setEditTagArray([ ...EditTagArray, newAlbumTag])
    // } else if (EditTagArray == 0 ){
    //   setEditTagArray([newAlbumTag])
    // }
  }

  function handleEditAlbumSubmit(event) {
    let editAlbum = {
      album_title: editAlbumTitle,
      artist_name: editArtist,
      rating: editRating,
      genres: editGenreArray,
      tags: editTagArray,
      release_date: editReleaseDate
    }
    fetch(`/albums/${album.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(editAlbum)
    })
    .then(res => res.json())
    .then((data) => {
      // console.log(data)

      // console.log(editAlbum)
      // let collectionCopy = [...userCollectionAlbums]
      // console.log(collectionCopy, 'cop')
      // let albumToUpdate = collection?
      // console.log(albumToUpdate, 'up')
      setUserCollectionAlbums(userCollectionAlbums.map(a => (a.id === data.album.id) ? data.album : a))
      // console.log("???", userCollectionAlbums.map(a => (a.id === data.album.id) ? data.album : a))
      // albumToUpdate.album_title = editAlbumTitle
      // albumToUpdate.artist_name = editArtist,
      // albumToUpdate.rating = editRating,
      // albumToUpdate.genres = editGenreArray,
      // albumToUpdate.tags = editTagArray,
      // albumToUpdate.release_date = editReleaseDate
      // }
      
      // if (albumToUpdate)
      // setUserCollectionAlbums(collectionCopy)
      setShowEditAlbum(false)
      setAlbumToEdit(null)
      setSingleSelectedAlbum(null)
    // setShowAlbumEditInQueue(false)
    // history.push('/collection')
    })
  }



  return (
    <>
    {/* {singleSelectedAlbum ? 
      <button onClick={() => setSingleSelectedAlbum(null)}>Back</button>
      :
      null
    } */}
        {/* {parentComponent === 'queue' ? 
      <button onClick={() => setShowAlbumEditInQueue(false)}>X</button>
      :
      null
    } */}
      <div className='flex-row' style={{backgroundColor: 'white', color: 'black', margin: '10px', borderRadius: '10px', border: 'double 3px #F04C24'}}>
      <div className='flex-column-center' style={{ marginLeft: '10px', width: '30%'}}>
        <img 
          className='add-collection-image' 
          src={album.album_cover}/>
        
    
      <div className='flex-row-center'>
              <button
                type='button'
                value="collection"
                style={{marginTop: '2px'}} 
                id='collection-button'
                className='collection-button'
                onClick={handleEditAlbumSubmit}
                text='Enter'>
                  Update Album
              </button>
              {/* <button
                type='button'
                value="queue"
                style={{marginTop: '2px'}} 
                id='queue-button'
                onClick={handleAlbumSubmit}
                text='Enter'>
                  Add To My Queue
              </button> */}
            </div>
            </div>
      {/* <div style={{marginTop: '10px', marginLeft: '10px'}}>
          <button 
            className='return-button' 
            onClick={() => history.goBack()}>
              Back
          </button>
        </div> */}

      <div style={{width: '66%'}}>
        {/* <h1 className='small-margins'>Album Info</h1> */}
        
        <div style={{display: 'flex', justifyContent: 'center', marginLeft: '3%', marginRight: '3%', width: '100%'}}>
          <div style={{width: '100%'}}> 
            <form 
              style={{display: 'flex', flexDirection:'column', margin: '10px', padding: '20px'}}
              className='activity-edit'
              id='create-user-edit'
              // onSubmit={handleUserSubmit}
              >
              
              <div className='flex-row'style={{marginBottom: '8px'}}>
              <h3 style={{width: '140px'}}className='small-margins'>Album:</h3>  
                {/* <div style={{width: '30%', height: '28px', textAlign: 'right'}}>
                  <label htmlFor='edit-album-title'>Album Title: </label>
                </div> */}
                <div style={{width: '55%'}}>
                  <input 
                    name='edit-album-title'
                    type='text' 
                    style={{width: '100%'}}
                    value={editAlbumTitle}
                    onChange={onEditAlbumTitleChange}>
                  </input>
                </div>
              </div>
            
              <div className='flex-row'style={{marginBottom: '8px'}}>
              <h3 style={{width: '140px'}}className='small-margins'>Artist:</h3>  
                {/* <div style={{width: '30%', height: '28px', textAlign: 'right'}}>
                  <label htmlFor='edit-artist'>Artist: </label>
                </div> */}
                <div style={{width: '55%'}}>
                  <input 
                    name='edit-artist'
                    type='text' 
                    style={{width: '100%'}}
                    value={editArtist}
                    onChange={onEditArtistChange}>
                  </input>
                </div>
              </div>

              <div className='flex-row'style={{marginBottom: '8px'}}>
              <h3 style={{width: '140px'}}className='small-margins'>Release Date:</h3>  
              <div>
                <input 
                  name='edit-release-date'
                  id='edit-release-date'
                  type='text' 
                  value={editReleaseDate}
                  style={{width: '100%'}}
                  onChange={onEditReleaseDateChange}>
                </input>
              </div>
            </div>
{/*               
              <div style={{display: 'flex', flexDirection: 'row', marginBottom: '8px', backgroundColor: 'indianred'}}>
                <div style={{width: '30%', height: '28px', textAlign: 'right'}}>
                  <label htmlFor='edit-shelf'>Shelf Level:</label>
                </div>
                <div style={{width: '30%'}}>
                  <select name={'edit-shelf'} id={'edit-shelf'} style={{borderRadius: '3px'}} onChange={onShelfLevelChange}>
                    <option value={'unshelved'}>Unshelved</option>
                    <option value={'top-shelf'}>Top Shelf</option>
                    <option value={'middle-shelf'}>Middle Shelf</option>
                    <option value={'lower-shelf'}>Lower Shelf</option>
                  </select>
                </div>
              </div> */}
              <div>
              <h3 className='small-margins'>Select Genres:</h3>  
              <div className='flex-row-left'>
                {allUserGenres.map((genre) => (
                  <GenreButton 
                    genre={genre}
                    formGenreArray={editGenreArray}
                    handleAddGenreClick={handleEditAddGenreClick}
                  />
                      
                      // <button 
                      //   type='button' 
                      //   className='genre-button' 
                      //   value={genre}
                      //   onClick={handleAddGenreClick}
                      // >{genre}</button> 
                    ))
                }
              </div>
              {showEditAddGenre
                  ?
                <div className='flex-row-left' style={{marginTop: '5px'}}>
                  <div style={{marginLeft: '20px'}}>
                    <label htmlFor="add-genre">+ Genre: </label>
                    <input
                      type="text"
                      id="add-genre"
                      value={editSingleGenre}
                      onChange={(e) => setEditSingleGenre(e.target.value)}
                    />
                    <button className='add-genre' type='button' onClick={handleEditAddGenre}>Add Genre</button>
                    <button className='add-genre' type='button' onClick={() => setEditShowAddGenre(false)}>X</button>
                  </div>
                 
                 
                </div>
                    :
                <button className='add-genre' onClick={() => setEditShowAddGenre(true)}>+ Genre</button>
              }
              </div>

              {/* <div style={{backgroundColor: 'greenyellow'}}>
                {formGenreArray.length > 0 
                  ? 
                formGenreArray.map(genre => (
                <h3>{genre}</h3> 
                ))
                  :
                null
                }
              </div> */}
              <div>
              <h3 className='small-margins'>Select Tags:</h3>  
              <div className='flex-row-left'>
                {allUserTags.map((tag) => (
                  <TagButton 
                    tag={tag}
                    formTagArray={editTagArray}
                    handleAddTagClick={handleEditAddTagClick}
                  />
                     
                      
                      // <button 
                      //   type='button' 
                      //   className='genre-button' 
                      //   value={tag}
                      //   onClick={handleAddTagClick}>{tag}</button>
                ))}
              </div>    
              {showEditAddTag
                  ?
                <div className='flex-row-left' style={{marginTop: '5px'}}>
                  <div style={{marginLeft: '20px'}}>
                    <label htmlFor="add-tag">+ Tag: </label>
                    <input
                      type="text"
                      id="add-tag"
                      value={editSingleTag}
                      onChange={(e) => setEditSingleTag(e.target.value)}
                    />
                  <button className='add-genre' type='button' onClick={handleEditAddTag}>Add Tag</button>
                  <button className='add-genre' type='button' onClick={() => setEditShowAddTag(false)}>X</button>
                  </div>
                </div>



                    :
                <button className='add-genre' onClick={() => setEditShowAddTag(true)}>+ Tag</button>
              }
              </div>

              {/* <div style={{backgroundColor: 'lavender'}}>
                {formTagArray.length > 0 
                  ? 
                formTagArray.map(tag => (
                <h3>{tag}</h3> 
                ))
                  :
                null
                }
              </div> */}
            
            {/* <div style={{display: 'flex', flexDirection: 'row', marginTop: '10px'}}> */}
  
            <div className='flex-column'style={{marginBottom: '8px'}}>
              <h3 style={{width: '140px'}}className='small-margins'>Rating:</h3>  
              {/* <div style={{width: '40%', textAlign: 'right'}}>
                  <label htmlFor='album-rating'>Album Rating:</label>
                </div> */}
               <div>
                <button 
                  value={0} 
                  type='button' 
                  className={editRating == 0 ? 'genre-in-collection': 'genre-button'}
                  onClick={onEditRatingClick}
                >No Rating
                </button>
                {tenArray.map((number) => (
                  <button 
                    className={editRating == number ? 'genre-in-collection': 'button-button'}
                    value={number} 
                    type='button' 
                    onClick={onEditRatingClick}
                  >{number}</button>
                ))}
              </div>
               
               
               
                {/* <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left'}}> */}
                  {/* <input onClick={onRatingClick} name='album-rating' type='radio' value={'unrated'} /> Unrated */}
{/*                   
                  <input onClick={onRatingClick} name='album-rating' type='radio' value={null} /> No Rating
                  <input onClick={onRatingClick} name='album-rating' type='radio' value={1} /> 1
                  <input onClick={onRatingClick} name='album-rating' type='radio' value={2} /> 2
                  <input onClick={onRatingClick} name='album-rating' type='radio' value={3} /> 3
                  <input onClick={onRatingClick} name='album-rating' type='radio' value={4} /> 4
                  <input onClick={onRatingClick} name='album-rating' type='radio' value={5} /> 5
                  <input onClick={onRatingClick} name='album-rating' type='radio' value={6} /> 6
                  <input onClick={onRatingClick} name='album-rating' type='radio' value={7} /> 7
                  <input onClick={onRatingClick} name='album-rating' type='radio' value={8} /> 8
                  <input onClick={onRatingClick} name='album-rating' type='radio' value={9} /> 9
                  <input onClick={onRatingClick} name='album-rating' type='radio' value={10} /> 10
                </div>
              </div> */}
              </div>
            {/* <div style={{display: 'flex', flexDirection: 'row', marginBottom: '8px'}}>
              <div style={{width: '30%', height: '28px', textAlign: 'right'}}>
                <label>Number of Children</label>
              </div>
              <div>
                <select style={{borderRadius: '3px'}} name={'kids-edit'} id={'kids-edit'} onChange={onUserKidsChange}>
                  <option value={'unrated'}>Unrated</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                </select>
              </div>
            </div> */}
            
            {/* <div style={{display: 'flex', flexDirection: 'row', marginBottom: '8px'}}> */}
              {/* <div style={{width: '30%', height: '28px', textAlign: 'right'}}>
                <label htmlFor=''>Release Date: </label>
              </div> */}


         

          </form>
        </div>
      </div>
    </div>
    </div>
  </>



  
  );
}

export default EditAlbumForm;