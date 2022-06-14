import {useContext, useState, useEffect} from 'react'
import { AppContext } from './AppContext';
import GenreButton from './GenreButton';
import TagButton from './TagButton'


function EditAlbumForm({album, userCollectionAlbums, setUserCollectionAlbums, setAlbumToEdit, showEditAlbum, setShowEditAlbum}) {

  const {setSingleSelectedAlbum, allUserTags, setAllUserTags, allUserGenres, setAllUserGenres} = useContext(AppContext)

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

  function handleEditAddGenre () {
    if (editSingleGenre != ''){
      setEditGenreArray([ ...editGenreArray, editSingleGenre])
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
  }

  function handleEditAddTag () {
    if (editSingleTag != ''){
      setEditTagArray([ ...editTagArray, editSingleTag])
      setAllUserTags([...allUserTags, editSingleTag])
      setEditSingleTag('')
      setEditShowAddTag(false)
    }
  }

  function handleGenreRemoveEdit () {
    setEditShowAddGenre(false)
    setEditSingleGenre('')
  }

  function handleTagRemoveEdit () {
    setEditShowAddTag(false) 
    setEditSingleTag('')
  }

  function handleEditAddTagClick (event) {
    let newAlbumTag = event.target.value
    if (editTagArray.includes(newAlbumTag)) {
      setEditTagArray(editTagArray.filter(tag => tag != newAlbumTag))
    } else {
    setEditTagArray([ ...editTagArray, newAlbumTag])
    }
  }

  function handleEditAlbumSubmit(event) {
    if (editSingleGenre !== '') {
      alert("You have a genre that has not been added. Please add or remove it.")
      return
    }
    if (editSingleTag !== '') {
      alert("You have a tag that has not been added. Please add or remove it.")
      return
    }
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
      setUserCollectionAlbums(userCollectionAlbums.map(a => (a.id === data.album.id) ? data.album : a))
      setShowEditAlbum(false)
      setAlbumToEdit(null)
      setSingleSelectedAlbum(null)
    })
  }



  return (
    <>
       {showEditAlbum 
        ? 
      <div className='flex-row-center'><span className='back-button-outer'><button className='back-button' onClick={() => setShowEditAlbum(false)}>CANCEL</button></span></div>
        :
      null
    }
    <div className='flex-row' style={{backgroundColor: 'white', color: 'black', margin: '10px', borderRadius: '10px', border: 'double 3px #F04C24', marginLeft: '35px', marginRight: '35px'}}>
      <div className='flex-column-center' style={{ marginLeft: '10px', width: '30%'}}>
        <img 
          className='add-collection-image' 
          alt='Album cover'
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
      </div>
    </div>

    <div style={{width: '66%'}}> 
        <div style={{display: 'flex', justifyContent: 'center', marginLeft: '3%', marginRight: '3%', width: '100%'}}>
          <div style={{width: '100%'}}> 
            <form 
              style={{display: 'flex', flexDirection:'column', margin: '10px', padding: '20px'}}
              className='activity-edit'
              id='create-user-edit'
            >
              <div className='flex-row'style={{marginBottom: '8px'}}>
              <h3 style={{width: '140px'}}className='small-margins'>Album:</h3>  
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

            <div>
              <h3 className='small-margins'>Select Genres:</h3>  
              <div className='flex-row-left'>
                {allUserGenres.map((genre) => (
                  <GenreButton 
                    genre={genre}
                    key={genre}
                    formGenreArray={editGenreArray}
                    handleAddGenreClick={handleEditAddGenreClick}
                  />
                ))}
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
                    <button className='add-genre' type='button' onClick={handleGenreRemoveEdit}>X</button>
                  </div>
                 
                 
                </div>
                    :
                <button className='add-genre' onClick={() => setEditShowAddGenre(true)}>+ Genre</button>
              }
              </div>
              <div>
              <h3 className='small-margins'>Select Tags:</h3>  
              <div className='flex-row-left'>
                {allUserTags.map((tag) => (
                  <TagButton 
                    tag={tag}
                    key={tag}
                    formTagArray={editTagArray}
                    handleAddTagClick={handleEditAddTagClick}
                  />
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
                  <button className='add-genre' type='button' onClick={handleTagRemoveEdit}>X</button>
                  </div>
                </div>
                    :
                <button className='add-genre' onClick={() => setEditShowAddTag(true)}>+ Tag</button>
              }
            </div>
  
            <div className='flex-column'style={{marginBottom: '8px'}}>
              <h3 style={{width: '140px'}}className='small-margins'>Rating:</h3>  
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
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  </>
  );
}

export default EditAlbumForm;