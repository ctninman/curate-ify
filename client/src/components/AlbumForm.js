import {useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router'
import { AppContext } from './AppContext';
import GenreButton from './GenreButton';
import TagButton from './TagButton'


function AlbumForm({ album, parentComponent, setShowAlbumFormInQueue, setUserQueueAlbums }) {

  const {singleSelectedAlbum, setSingleSelectedAlbum, user, allUserTags, setAllUserTags, 
        allUserGenres, setAllUserGenres, setUserCollectionAlbums, userCollectionAlbums} = useContext(AppContext)

  const [showAddGenreForm, setShowAddGenreForm] = useState(false)
  const [showAddTagForm, setShowAddTagForm] = useState(false)
  const [albumFormErrors, setAlbumFormErrors] = useState(null)

  // *** CONTROLLED FORM STATE *** //
  const [formAlbumTitle, setFormAlbumTitle] = useState('')
  const [formArtist, setFormArtist] = useState('')
  const [formRating, setFormRating] = useState(0)
  const [formReleaseDate, setFormReleaseDate] = useState('')
  const [formSingleGenre, setFormSingleGenre] = useState('')
  const [formGenreArray, setFormGenreArray] = useState([])
  const [formSingleTag, setFormSingleTag] = useState('')
  const [formTagArray, setFormTagArray] = useState([])

  const tenArray = [1,2,3,4,5,6,7,8,9,10]

  let history = useHistory()

  useEffect (() => {
    if (parentComponent === 'queue') {
      setFormAlbumTitle(album.album_title)
      setFormArtist(album.artist_name)
      setFormReleaseDate(album.release_date)
    } else if (parentComponent === 'search') {
      setFormAlbumTitle(singleSelectedAlbum.name)
      setFormArtist(singleSelectedAlbum.artists[0].name)
      setFormReleaseDate(singleSelectedAlbum.release_date.substring(0,4))
    }
  } , [])

      // *** FETCH REQUESTS *** //
  function postNewAlbum (object) { 
    let loggedAlbum;
    if (parentComponent !== 'queue' && user.albums && user.albums.length > 0 ) {
      user.albums.find(a => a.spotify_album_id === singleSelectedAlbum.id)
    }
    if (parentComponent === 'queue' && user.albums && user.albums.length > 0 ) {
      user.albums.find(a => a.spotify_album_id === album.id)
    }
    if (loggedAlbum) {
      alert("This album is already in your collection")
    } else {
      fetch('/albums', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(object)
      })
      .then((res) => {
        if (res.ok) {
          res.json()
          .then((data) => {
          if (userCollectionAlbums.length == 0) {
            setUserCollectionAlbums([data.album])
          } else {
            setUserCollectionAlbums([...userCollectionAlbums, data.album].sort((a,b) => (a.rating > b.rating) ? -1 : 1))
          }
          setSingleSelectedAlbum(null)
          history.push('/collection')
        })
      } else {
        res.json()
        .then(err => {
          setAlbumFormErrors(err.errors)
        })
      }
    })
  }
}

    // *** FUNCTIONS *** //
  function onAlbumTitleChange (event) {
    setFormAlbumTitle(event.target.value)
  }

  function onArtistChange (event) {
    setFormArtist(event.target.value)
  }

  function onRatingClick (event) {
    setFormRating(event.target.value)
  }

  function onReleaseDateChange (event) {
    setFormReleaseDate(event.target.value)
  }


  function handleAddGenre () {
    if (formSingleGenre != ''){
      setFormGenreArray([ ...formGenreArray, formSingleGenre])
      setAllUserGenres([...allUserGenres, formSingleGenre])
      setFormSingleGenre('')
      setShowAddGenreForm(false)
    } else {
      return
    }
  }
  

  function handleAddGenreClick (event) {
    let newAlbumGenre = event.target.value
    if (formGenreArray.includes(newAlbumGenre)) {
      setFormGenreArray(formGenreArray.filter(genre => genre != newAlbumGenre))
    } else {
    setFormGenreArray([ ...formGenreArray, newAlbumGenre])
    }
  }

  function handleAddTag () {
    if (formSingleTag != ''){
      setFormTagArray([ ...formTagArray, formSingleTag])
      setAllUserTags([...allUserTags, formSingleTag])
      setFormSingleTag('')
      setShowAddTagForm(false)
    }
  }

  function handleAddTagClick (event) {
    let newAlbumTag = event.target.value
    if (formTagArray.includes(newAlbumTag)) {
      setFormTagArray(formTagArray.filter(tag => tag != newAlbumTag))
    } else {
    setFormTagArray([ ...formTagArray, newAlbumTag])
    }
  }

  function handleGenreRemove () {
    setShowAddGenreForm(false) 
    setFormSingleGenre('')
  }

  function handleTagRemove () {
    setShowAddTagForm(false) 
    setFormSingleTag('')
  }

  function handleAlbumSubmit(event) {
    if (formSingleGenre !== '') {
      alert("You have a genre that has not been added. Please add or remove it.")
      return
    }
    if (formSingleTag !== '') {
      alert("You have a tag that has not been added. Please add or remove it.")
      return
    }
    let newAlbum = {};
    if (parentComponent === 'search') {
      newAlbum = {
        album_title: formAlbumTitle,
        artist_name: formArtist,
        spotify_artist_id: singleSelectedAlbum.artists[0].id,
        rating: formRating,
        spotify_album_id: singleSelectedAlbum.id,
        genres: formGenreArray,
        tags: formTagArray,
        spotify_uri: singleSelectedAlbum.external_urls.spotify,
        album_cover: singleSelectedAlbum.images[0].url,
        user_id: user.id,
        release_date: formReleaseDate,
        artist_id: 1,
        artist_photo: singleSelectedAlbum.images[1].url
      }
    } else if (parentComponent === 'queue') {
      newAlbum = {
        album_title: formAlbumTitle,
        artist_name: formArtist,
        spotify_artist_id: album.spotify_artist_id,
        rating: formRating,
        spotify_album_id: album.spotify_album_id,
        genres: formGenreArray,
        tags: formTagArray,
        spotify_uri: album.spotify_uri,
        album_cover: album.album_cover,
        user_id: user.id,
        release_date: formReleaseDate,
        artist_id: 1,
        artist_photo: album.album_cover
      }
      setShowAlbumFormInQueue(false)
      fetch(`/queue_albums/${album.id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(data => setUserQueueAlbums(data.updated_queue))
    }
    postNewAlbum(newAlbum)
  }

  return (
    <>
    {singleSelectedAlbum 
        ? 
      <div className='flex-row-center'><button className='generic-button' onClick={() => setSingleSelectedAlbum(null)}>CANCEL</button></div>
        :
      null
    }
    {parentComponent === 'queue' 
        ? 
      <div className='flex-row-center'><button className='generic-button' onClick={() => setShowAlbumFormInQueue(false)}>CANCEL</button></div>
       :
      null
    }
    <div className='flex-row' style={{backgroundColor: 'white', color: 'black', margin: '35px', borderRadius: '10px', border: 'double 3px #F04C24'}}>
      <div className='flex-column-center' style={{ marginLeft: '10px', width: '30%'}}>
        <img 
          className='add-collection-image' 
          src={parentComponent === 'search' ? singleSelectedAlbum.images[0].url : album.album_cover} />
    
      <div className='flex-column-center'>
        <button
          type='button'
          value="collection"
          style={{marginTop: '2px'}} 
          id='collection-button'
          className='collection-button'
          onClick={handleAlbumSubmit}
          text='Enter'>
            Add To My Collection
        </button>
              {albumFormErrors? albumFormErrors.map(e => <h3 className='small-margins' style={{color: 'red'}}>-{e.toUpperCase()}</h3>) : null}
 
            </div>
            </div>


      <div style={{width: '66%'}}>
        {/* <h1 className='small-margins'>Album Info</h1> */}
        
        <div style={{display: 'flex', justifyContent: 'center', marginLeft: '3%', marginRight: '3%', width: '100%'}}>
          <div style={{width: '100%'}}> 
            <form 
              style={{display: 'flex', flexDirection:'column', margin: '10px', padding: '20px'}}
              className='activity-form'
              id='create-user-form'
              // onSubmit={handleUserSubmit}
              >
              
              <div className='flex-row'style={{marginBottom: '8px'}}>
              <h3 style={{width: '140px'}}className='small-margins'>Album:</h3>  
                {/* <div style={{width: '30%', height: '28px', textAlign: 'right'}}>
                  <label htmlFor='form-album-title'>Album Title: </label>
                </div> */}
                <div style={{width: '55%'}}>
                  <input 
                    name='form-album-title'
                    type='text' 
                    style={{width: '100%'}}
                    value={formAlbumTitle}
                    onChange={onAlbumTitleChange}>
                  </input>
                </div>
              </div>
            
              <div className='flex-row'style={{marginBottom: '8px'}}>
              <h3 style={{width: '140px'}}className='small-margins'>Artist:</h3>  
                {/* <div style={{width: '30%', height: '28px', textAlign: 'right'}}>
                  <label htmlFor='form-artist'>Artist: </label>
                </div> */}
                <div style={{width: '55%'}}>
                  <input 
                    name='form-artist'
                    type='text' 
                    style={{width: '100%'}}
                    value={formArtist}
                    onChange={onArtistChange}>
                  </input>
                </div>
              </div>

              <div className='flex-row'style={{marginBottom: '8px'}}>
              <h3 style={{width: '140px'}}className='small-margins'>Release Date:</h3>  
              <div>
                <input 
                  name='form-release-date'
                  id='form-release-date'
                  type='text' 
                  value={formReleaseDate}
                  style={{width: '100%'}}
                  onChange={onReleaseDateChange}>
                </input>
              </div>
            </div>
{/*               
              <div style={{display: 'flex', flexDirection: 'row', marginBottom: '8px', backgroundColor: 'indianred'}}>
                <div style={{width: '30%', height: '28px', textAlign: 'right'}}>
                  <label htmlFor='form-shelf'>Shelf Level:</label>
                </div>
                <div style={{width: '30%'}}>
                  <select name={'form-shelf'} id={'form-shelf'} style={{borderRadius: '3px'}} onChange={onShelfLevelChange}>
                    <option value={'unshelved'}>Unshelved</option>
                    <option value={'top-shelf'}>Top Shelf</option>
                    <option value={'middle-shelf'}>Middle Shelf</option>
                    <option value={'lower-shelf'}>Lower Shelf</option>
                  </select>
                </div>
              </div> */}
              <div>
              <h3 className='small-margins'>Select Genres:</h3>  
              <div className='flex-row-left wrap' style={{maxHeight: '51px', overflow: 'scroll'}}>
                {allUserGenres.map((genre) => (
                  <GenreButton 
                    genre={genre}
                    formGenreArray={formGenreArray}
                    key={genre}
                    handleAddGenreClick={handleAddGenreClick}
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
              {showAddGenreForm
                  ?
                <div className='flex-row-left' style={{marginTop: '5px'}}>
                  <div style={{marginLeft: '20px'}}>
                    <label htmlFor="add-genre">+ Genre: </label>
                    <input
                      type="text"
                      id="add-genre"
                      value={formSingleGenre}
                      onChange={(e) => setFormSingleGenre(e.target.value)}
                    />
                    <button className='add-genre generic-button' type='button' onClick={handleAddGenre}>Add Genre</button>
                    <button className='add-genre generic-button' type='button' onClick={handleGenreRemove}>X</button>
                  </div>
                 
                 
                </div>
                    :
                <button className='add-genre generic-button' onClick={() => setShowAddGenreForm(true)}>+ Genre</button>
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
              <div className='flex-row-left wrap' style={{maxHeight: '51px', overflow: 'scroll'}}>
                {allUserTags.map((tag) => (
                  <TagButton 
                    tag={tag}
                    key={tag}
                    formTagArray={formTagArray}
                    handleAddTagClick={handleAddTagClick}
                  />
                     
                      
                      // <button 
                      //   type='button' 
                      //   className='genre-button' 
                      //   value={tag}
                      //   onClick={handleAddTagClick}>{tag}</button>
                ))}
              </div>    
              {showAddTagForm
                  ?
                <div className='flex-row-left' style={{marginTop: '5px'}}>
                  <div style={{marginLeft: '20px'}}>
                    <label htmlFor="add-tag">+ Tag: </label>
                    <input
                      type="text"
                      id="add-tag"
                      value={formSingleTag}
                      onChange={(e) => setFormSingleTag(e.target.value)}
                    />
                  <button className='add-genre generic-button' type='button' onClick={handleAddTag}>Add Tag</button>
                  <button className='add-genre generic-button' type='button' onClick={handleTagRemove}>X</button>
                  </div>
                </div>



                    :
                <button className='add-genre generic-button' onClick={() => setShowAddTagForm(true)}>+ Tag</button>
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
                  className={formRating == 0 ? 'genre-in-collection': 'genre-button'}
                  onClick={onRatingClick}
                >No Rating
                </button>
                {tenArray.map((number) => (
                  <button 
                    className={formRating == number ? 'genre-in-collection': 'button-button'}
                    value={number} 
                    key={number}
                    type='button' 
                    onClick={onRatingClick}
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
                <select style={{borderRadius: '3px'}} name={'kids-form'} id={'kids-form'} onChange={onUserKidsChange}>
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

export default AlbumForm;