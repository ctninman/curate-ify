import {useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router'
import { AppContext } from './AppContext';
import GenreButton from './GenreButton';
import TagButton from './TagButton'


function AlbumForm({album, parentComponent, setShowAlbumFormInQueue}) {

  const {singleSelectedAlbum, setSingleSelectedAlbum, user, allUserTags, setAllUserTags, allUserGenres, setAllUserGenres} = useContext(AppContext)

  const [showAddGenreForm, setShowAddGenreForm] = useState(false)
  const [showAddTagForm, setShowAddTagForm] = useState(false)

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
    fetch('/albums', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(object)
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
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

  function handleAddGenre () {
    if (formSingleGenre != ''){
      setFormGenreArray([ ...formGenreArray, formSingleGenre])
      // if (formGenreArray.length > 0) {
      //   setFormGenreArray([ ...formGenreArray, formSingleGenre])
      // } else if (formGenreArray == 0 ){
      //   setFormGenreArray([formSingleGenre])
      // }
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
    // if (formGenreArray.length > 0) {
    //   setFormGenreArray([ ...formGenreArray, newAlbumGenre])
    // } else if (formGenreArray == 0 ){
    //   setFormGenreArray([newAlbumGenre])
    // }
  }

  function handleAddTag () {
    if (formSingleTag != ''){
      // if (formTagArray.length > 0) {
      //   setFormTagArray([ ...formTagArray, formSingleTag])
      // } else if (formTagArray == 0 ){
      //   setFormTagArray([formSingleTag])
      // }
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
    // if (formTagArray.length > 0) {
    //   setFormTagArray([ ...formTagArray, newAlbumTag])
    // } else if (formTagArray == 0 ){
    //   setFormTagArray([newAlbumTag])
    // }
  }

  function handleAlbumSubmit(event) {
    // let collectionBoolean;
    // let queueBoolean;
    // if (event.target.value === 'collection') {
    //   collectionBoolean = true
    //   queueBoolean = false
    // } else if (event.target.value === 'queue') {
    //   collectionBoolean = false
    //   queueBoolean = true
    // }
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
        artist_id: 2,
        artist_photo: singleSelectedAlbum.images[1].url
        // description: null,
        // in_collection: collectionBoolean,
        // in_queue: queueBoolean,
        // shelf_level: formShelfLevel,
        
      }
      console.log('na search', newAlbum)
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
        artist_id: 2,
        artist_photo: album.album_cover
        // description: null,
        // in_collection: collectionBoolean,
        // in_queue: queueBoolean,
        // shelf_level: formShelfLevel,
      }
    }

    postNewAlbum(newAlbum)
    console.log(newAlbum)
    setSingleSelectedAlbum(null)
    history.push('/collection')
  }

  return (
    <>
    {singleSelectedAlbum ? 
      <button onClick={() => setSingleSelectedAlbum(null)}>Back</button>
      :
      null
    }
        {parentComponent === 'queue' ? 
      <button onClick={() => setShowAlbumFormInQueue(false)}>X</button>
      :
      null
    }
      <div className='flex-row' style={{backgroundColor: 'paleturquoise', color: 'black', margin: '10px', borderRadius: '10px'}}>
      <div className='flex-column-center' style={{ marginLeft: '10px', width: '30%'}}>
        <img 
          className='add-collection-image' 
          src={parentComponent === 'search' ? singleSelectedAlbum.images[0].url : album.album_cover} />
        
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
              <div className='flex-row-left'>
                {allUserGenres.map((genre) => (
                  <GenreButton 
                    genre={genre}
                    formGenreArray={formGenreArray}
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
                    <button className='small-margins' type='button' style={{marginLeft: '5px', fontSize: '12px', borderRadius: '3px', backgroundColor: 'olive'}} onClick={handleAddGenre}>Add Genre</button>
                    <button className='small-margins' type='button' style={{marginLeft: '5px', fontSize: '12px', borderRadius: '3px', backgroundColor: 'olive'}} onClick={() => setShowAddGenreForm(false)}>X</button>
                  </div>
                 
                 
                </div>
                    :
                <button style={{marginLeft: '20px', marginTop: '8px',backgroundColor: 'olive', width: '80px'}} onClick={() => setShowAddGenreForm(true)}>+ Genre</button>
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
                  <button className='small-margins' type='button' style={{marginLeft: '5px', fontSize: '12px', borderRadius: '3px', backgroundColor: 'olive'}} onClick={handleAddTag}>Add Tag</button>
                  <button className='small-margins' type='button' style={{marginLeft: '5px', fontSize: '12px', borderRadius: '3px', backgroundColor: 'olive'}} onClick={() => setShowAddTagForm(false)}>X</button>
                  </div>
                </div>



                    :
                <button style={{marginLeft: '20px', marginTop: '8px',backgroundColor: 'olive', width: '80px'}} onClick={() => setShowAddTagForm(true)}>+ Tag</button>
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
                  className={formRating == 0 ? 'rating-button-select': 'rating-button'}
                  onClick={onRatingClick}
                >No Rating
                </button>
                {tenArray.map((number) => (
                  <button 
                    className={formRating == number ? 'rating-button-select': 'rating-button'}
                    value={number} 
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


            <div className='flex-row-center'>
              <button
                type='button'
                value="collection"
                style={{marginTop: '2px'}} 
                id='collection-button'
                onClick={handleAlbumSubmit}
                text='Enter'>
                  Add To My Collection
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

          </form>
        </div>
      </div>
    </div>
    </div>
  </>



  
  );
}

export default AlbumForm;