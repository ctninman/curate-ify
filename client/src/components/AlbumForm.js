import {useContext, useState} from 'react'
import {useHistory} from 'react-router'
import { AppContext } from './AppContext';


function AlbumForm(props) {

  const {singleSelectedAlbum, setSingleSelectedAlbum, user} = useContext(AppContext)

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

  function handleUserSubmit(event) {
    event.preventDefault()
    let newAlbum = {
      album_title: formAlbumTitle,
      artist: formArtist,
      shelf_level: formShelfLevel,
      spotify_artist_id: singleSelectedAlbum.artists[0].id,
      rating: formRating,
      spotify_album_id: singleSelectedAlbum.id,
      genres: formGenreArray,
      tags: formTagArray,
      description: null,
      in_collection: true,
      spotify_uri: singleSelectedAlbum.external_urls.spotify,
      album_cover: singleSelectedAlbum.images[0].url,
      user_id: user.id,
      release_date: formReleaseDate,
      // artist_id: find or create by in backend

    }
    postNewAlbum(newAlbum)
    console.log(newAlbum)
    setSingleSelectedAlbum(null)
    // history.push('/collection')
  }

  return (
    <>
      <div style={{backgroundColor: 'gray'}}>
        <img style={{height: '450px', width: '450px'}} src={singleSelectedAlbum.images[0].url} />
        <button onClick={() => setSingleSelectedAlbum(null)}>X</button>
      </div>
      {/* <div style={{marginTop: '10px', marginLeft: '10px'}}>
          <button 
            className='return-button' 
            onClick={() => history.goBack()}>
              Back
          </button>
        </div> */}

      <div>
        <h1>Album Info</h1>
        
        <div style={{display: 'flex', justifyContent: 'center', marginLeft: '10%', marginRight: '10%'}}>
          <div style={{width: '80%'}}> 
            <form 
              style={{display: 'flex', flexDirection:'column', margin: '10px', padding: '20px'}}
              className='activity-form'
              id='create-user-form'
              onSubmit={handleUserSubmit}>
              
              <div style={{display: 'flex', flexDirection: 'row', marginBottom: '8px', backgroundColor:'green'}}>
                <div style={{width: '30%', height: '28px', textAlign: 'right'}}>
                  <label htmlFor='form-album-title'>Album Title: </label>
                </div>
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
            
              <div style={{display: 'flex', flexDirection: 'row', marginBottom: '8px', backgroundColor: 'hotpink'}}>
                <div style={{width: '30%', height: '28px', textAlign: 'right'}}>
                  <label htmlFor='form-artist'>Artist: </label>
                </div>
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
              </div>

              {showAddGenreForm
                  ?
                <div style={{backgroundColor: 'honeydew'}}>
                  <div style={{marginLeft: '20px'}}>
                    <label htmlFor="add-genre">Genre:</label>
                    <input
                      type="text"
                      id="add-genre"
                      value={formSingleGenre}
                      onChange={(e) => setFormSingleGenre(e.target.value)}
                    />
                  </div>
                  <button style={{margin: '20px', fontSize: '15px'}} onClick={handleAddGenre}>Add Genre</button>
                </div>
                    :
                <button onClick={() => setShowAddGenreForm(true)}>+ Genre</button>
              }

              <div style={{backgroundColor: 'greenyellow'}}>
                {formGenreArray.length > 0 
                  ? 
                formGenreArray.map(genre => (
                <h3>{genre}</h3> 
                ))
                  :
                null
                }
              </div>

              {showAddTagForm
                  ?
                <div style={{backgroundColor: 'khaki'}}>
                  <div style={{marginLeft: '20px'}}>
                    <label htmlFor="add-tag">Tags:</label>
                    <input
                      type="text"
                      id="add-tag"
                      value={formSingleTag}
                      onChange={(e) => setFormSingleTag(e.target.value)}
                    />
                  </div>
                  <button style={{margin: '20px', fontSize: '15px'}} onClick={handleAddTag}>Add Tag</button>
                </div>
                    :
                <button onClick={() => setShowAddTagForm(true)}>+ Tag</button>
              }

              <div style={{backgroundColor: 'lavender'}}>
                {formTagArray.length > 0 
                  ? 
                formTagArray.map(tag => (
                <h3>{tag}</h3> 
                ))
                  :
                null
                }
              </div>
            
            <div style={{display: 'flex', flexDirection: 'row', marginTop: '10px'}}>
              <div style={{width: '40%', textAlign: 'right'}}>
                  <label htmlFor='album-rating'>Album Rating:</label>
                </div>
                <div style={{display: 'flex', width: '58%', flexDirection: 'row', justifyContent: 'right'}}>
                  {/* <input onClick={onRatingClick} name='album-rating' type='radio' value={'unrated'} /> Unrated */}
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
            
            <div style={{display: 'flex', flexDirection: 'row', marginBottom: '8px'}}>
              <div style={{width: '30%', height: '28px', textAlign: 'right'}}>
                <label htmlFor=''>Release Date: </label>
              </div>
              <div style={{width: '55%'}}>
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

            <button
              type='submit'
              value="Enter"
              style={{marginTop: '2px'}} 
              id='create-user-button'
              text='Enter'>
                Create Me!
            </button>

          </form>
          <button onClick={() => console.log(formGenreArray)}>Genres</button>
        </div>
      </div>
    </div>
  </>



  
  );
}

export default AlbumForm;