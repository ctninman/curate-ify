import {useContext, useState} from 'react'
import {useHistory} from 'react-router'
import { AppContext } from './AppContext';


function AlbumForm() {

  const {singleSelectedAlbum, setSingleSelectedAlbum, user, allUserTags, allUserGenres} = useContext(AppContext)

  const [showAddGenreForm, setShowAddGenreForm] = useState(false)
  const [showAddTagForm, setShowAddTagForm] = useState(false)

  // *** CONTROLLED FORM STATE *** //
  const [formAlbumTitle, setFormAlbumTitle] = useState(singleSelectedAlbum.name)
  const [formArtist, setFormArtist] = useState(singleSelectedAlbum.artists[0].name)
  const [formShelfLevel, setFormShelfLevel] = useState(null)
  const [formRating, setFormRating] = useState('unrated')
  const [formReleaseDate, setFormReleaseDate] = useState(singleSelectedAlbum.release_date.substring(0,4))
  const [formSingleGenre, setFormSingleGenre] = useState('')
  const [formGenreArray, setFormGenreArray] = useState([])
  const [formSingleTag, setFormSingleTag] = useState('')
  const [formTagArray, setFormTagArray] = useState([])

  const tenArray = [1,2,3,4,5,6,7,8,9,10]

  let history = useHistory()

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

  function onShelfLevelChange (event) {
    setFormShelfLevel(event.target.value)
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
      if (formGenreArray.length > 0) {
        setFormGenreArray([ ...formGenreArray, formSingleGenre])
      } else if (formGenreArray == 0 ){
        setFormGenreArray([formSingleGenre])
      }
      setFormSingleGenre('')
      setShowAddGenreForm(false)
    } else {
      return
    }
  }

  function handleAddGenreClick (event) {
    let newAlbumGenre = event.target.value
    if (formGenreArray.length > 0) {
      setFormGenreArray([ ...formGenreArray, newAlbumGenre])
    } else if (formGenreArray == 0 ){
      setFormGenreArray([newAlbumGenre])
    }
  }

  function handleAddTag () {
    if (formSingleTag != ''){
      if (formTagArray.length > 0) {
        setFormTagArray([ ...formTagArray, formSingleTag])
      } else if (formTagArray == 0 ){
        setFormTagArray([formSingleTag])
      }
      setFormSingleTag('')
      setShowAddTagForm(false)
    }
  }

  function handleAddTagClick (event) {
    let newAlbumTag = event.target.value
    if (formTagArray.length > 0) {
      setFormTagArray([ ...formTagArray, newAlbumTag])
    } else if (formTagArray == 0 ){
      setFormTagArray([newAlbumTag])
    }
  }

  function handleAlbumSubmit(event) {
    let collectionBoolean;
    let queueBoolean;
    if (event.target.value === 'collection') {
      collectionBoolean = true
      queueBoolean = false
    } else if (event.target.value === 'queue') {
      collectionBoolean = false
      queueBoolean = true
    }
    let newAlbum = {
      album_title: formAlbumTitle,
      artist_name: formArtist,
      shelf_level: formShelfLevel,
      spotify_artist_id: singleSelectedAlbum.artists[0].id,
      rating: formRating,
      spotify_album_id: singleSelectedAlbum.id,
      genres: formGenreArray,
      tags: formTagArray,
      description: null,
      in_collection: collectionBoolean,
      in_queue: queueBoolean,
      spotify_uri: singleSelectedAlbum.external_urls.spotify,
      album_cover: singleSelectedAlbum.images[0].url,
      user_id: user.id,
      release_date: formReleaseDate,
      artist_id: 1,
      artist_photo: singleSelectedAlbum.images[1].url
      // artist_id: find or create by in backend

    }
    postNewAlbum(newAlbum)
    console.log(newAlbum)
    setSingleSelectedAlbum(null)
    // history.push('/collection')
  }

  return (
    <>
    <button onClick={() => console.log(singleSelectedAlbum)}>ssa</button>
      <button onClick={() => setSingleSelectedAlbum(null)}>Back</button>
    <div className='flex-row'>
      <div className='flex-column-center' style={{width: '30%'}}>
        <img style={{width: '100%'}}src={singleSelectedAlbum.images[0].url} />
        
      </div>
      {/* <div style={{marginTop: '10px', marginLeft: '10px'}}>
          <button 
            className='return-button' 
            onClick={() => history.goBack()}>
              Back
          </button>
        </div> */}

      <div style={{width: '68%'}}>
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
              <h3 className='small-margins'>Genre(s):</h3>  
              {allUserGenres.map((genre) => (
                    <button 
                      type='button' 
                      className='genre-button' 
                      value={genre}
                      onClick={handleAddGenreClick}
                    >{genre}</button>
                  ))}
              {showAddGenreForm
                  ?
                <div className='flex-row-center'>
                  <div style={{marginLeft: '20px'}}>
                    <label htmlFor="add-genre">Genre:</label>
                    <input
                      type="text"
                      id="add-genre"
                      value={formSingleGenre}
                      onChange={(e) => setFormSingleGenre(e.target.value)}
                    />
                  </div>
                 
                  <button type='button' style={{margin: '20px', fontSize: '15px'}} onClick={handleAddGenre}>Add Genre</button>
                  <button type='button' style={{margin: '20px', fontSize: '15px'}} onClick={() => setShowAddGenreForm(false)}>X</button>
                </div>
                    :
                <button onClick={() => setShowAddGenreForm(true)}>+ Genre</button>
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
              <h3 className='small-margins'>Tag(s):</h3>  
              {allUserTags.map((tag) => (
                    <button 
                      type='button' 
                      className='genre-button' 
                      value={tag}
                      onClick={handleAddTagClick}>{tag}</button>
                  ))}
              {showAddTagForm
                  ?
                <div className='flex-row-center'>
                  <div style={{marginLeft: '20px'}}>
                    <label htmlFor="add-tag">Tags:</label>
                    <input
                      type="text"
                      id="add-tag"
                      value={formSingleTag}
                      onChange={(e) => setFormSingleTag(e.target.value)}
                    />
                  </div>
                  <button type='button' style={{margin: '20px', fontSize: '15px'}} onClick={handleAddTag}>Add Tag</button>
                  <button type='button' style={{margin: '20px', fontSize: '15px'}} onClick={() => setShowAddTagForm(false)}>X</button>
                </div>
                    :
                <button onClick={() => setShowAddTagForm(true)}>+ Tag</button>
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
               
               {tenArray.map((number) => (
                  <button 
                    value={number} 
                    type='button' 
                    onClick={onRatingClick}
                  >{number}</button>
                )) 
               }
               
               
               
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
              <button
                type='button'
                value="queue"
                style={{marginTop: '2px'}} 
                id='queue-button'
                onClick={handleAlbumSubmit}
                text='Enter'>
                  Add To My Queue
              </button>
            </div>

          </form>
          <button onClick={() => console.log(formGenreArray)}>Genres</button>
        </div>
      </div>
    </div>
    </div>
  </>



  
  );
}

export default AlbumForm;