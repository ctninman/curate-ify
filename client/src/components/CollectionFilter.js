import { useEffect, useContext, useState } from "react";
import { AppContext } from "./AppContext";


function CollectionFilter({userCollectionAlbums, setUserCollectionAlbums, genreFilter, tagFilter, setGenreFilter, setTagFilter}) {

  const {user} = useContext(AppContext)

  const [allUserGenres, setAllUserGenres] = useState(null)
  const [allUserTags, setAllUserTags] = useState(null)
  const [sortValue, setSortValue] =useState('rating91')
  const [filterGenre, setFilterGenre] = useState(null)
  const [filterTag, setFilterTag] = useState(null)

  useEffect (() => {
    fetch(`/users/${user.id}/genres`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(data => {
      setAllUserGenres(data.genres)
      setAllUserTags(data.tags)
      let userCollectionCopy = [...userCollectionAlbums]
      let orderedAlbums = userCollectionCopy.sort((a,b) => (a.rating > b.rating) ? -1 : 1)
      setUserCollectionAlbums(orderedAlbums)
    })
  }, [] )

  function handleGenreChange (event) {
    setGenreFilter(event.target.value)
  }

  function orderRatingHighToLow (event) {
    let userCollectionCopy = [...userCollectionAlbums]
    let orderedAlbums = userCollectionCopy.sort((a,b) => (a.rating > b.rating) ? 1 : -1)
    setUserCollectionAlbums(orderedAlbums.reverse())
    setSortValue(event.target.value)
  }

  function orderRatingLowToHigh (event) {
    let userCollectionCopy = [...userCollectionAlbums]
    let orderedAlbums = userCollectionCopy.sort((a,b) => (a.rating > b.rating) ? 1 : -1)
    setUserCollectionAlbums(orderedAlbums)
    setSortValue(event.target.value)
  }

  function orderArtistAToZ (event) {
    let userCollectionCopy = [...userCollectionAlbums]
    let orderedAlbums = userCollectionCopy.sort((a,b) => (a.artist > b.artist) ? 1 : -1)
    setUserCollectionAlbums(orderedAlbums)
    setSortValue(event.target.value)
  }

  function orderArtistZToA (event) {
    let userCollectionCopy = [...userCollectionAlbums]
    let orderedAlbums = userCollectionCopy.sort((a,b) => (a.artist > b.artist) ? -1 : 1)
    setUserCollectionAlbums(orderedAlbums)
    setSortValue(event.target.value)
  }

  function orderAlbumAToZ (event) {
    let userCollectionCopy = [...userCollectionAlbums]
    let orderedAlbums = userCollectionCopy.sort((a,b) => (a.album_title > b.album_title) ? 1 : -1)
    setUserCollectionAlbums(orderedAlbums)
    setSortValue(event.target.value)
  }

  function orderAlbumZToA (event) {
    let userCollectionCopy = [...userCollectionAlbums]
    let orderedAlbums = userCollectionCopy.sort((a,b) => (a.album_title > b.album_title) ? -1 : 1)
    setUserCollectionAlbums(orderedAlbums)
    setSortValue(event.target.value)
  }

  function orderReleaseOldToNew(event) {
    let userCollectionCopy = [...userCollectionAlbums]
    let orderedAlbums = userCollectionCopy.sort((a,b) => (parseInt(a.release_date) > parseInt(b.release_date)) ? 1 : -1)
    setUserCollectionAlbums(orderedAlbums)
    setSortValue(event.target.value)
  }

  function orderReleaseNewToOld(event) {
    let userCollectionCopy = [...userCollectionAlbums]
    let orderedAlbums = userCollectionCopy.sort((a,b) => (parseInt(a.release_date) > parseInt(b.release_date)) ? -1 : 1)
    setUserCollectionAlbums(orderedAlbums)
    setSortValue(event.target.value)
  }

  return (
  <>
 
    <div className='flex-row-center'>
      <div>
        <button 
          value='rating91'
          className={sortValue === 'rating91' ? 'small-margins genres highlight' : 'small-margins small-text genres'}
          onClick={orderRatingHighToLow}
        >Rating: High to Low
        </button>
      </div>
  
      <div>
        <button 
          className={sortValue === 'rating19' ? 'small-margins genres highlight' : 'small-margins small-text genres'}
          value='rating19'
          onClick={orderRatingLowToHigh}
        >Rating: Low to High
        </button>
      </div>

      <div>
        <button 
          className={sortValue === 'artistAZ' ? 'small-margins genres highlight' : 'small-margins small-text genres'}
          value='artistAZ'
          onClick={orderArtistAToZ}
        >Artist: A - Z
        </button>
      </div>

      <div>
        <button 
          value='artistZA'
          className={sortValue === 'artistZA' ? 'small-margins genres highlight' : 'small-margins small-text genres'}
          onClick={orderArtistZToA}
        >Artist: Z - A
        </button>
      </div>

      <div>
        <button 
          value='albumAZ'
          className={sortValue === 'albumAZ' ? 'small-margins genres highlight' : 'small-margins small-text genres'}
          onClick={orderAlbumAToZ}
        >Album: A - Z
        </button>
      </div>
    
      <div>
        <button
          value='albumZA'
          className={sortValue === 'albumZA' ? 'small-margins genres highlight' : 'small-margins small-text genres'}
          onClick={orderAlbumZToA}
        >Album: Z - A
        </button>
      </div>

      <div>
        <button
          value='release19'
          className={sortValue === 'release19' ? 'small-margins genres highlight' : 'small-margins small-text genres'}
          onClick={orderReleaseOldToNew}
        >Old To New
        </button>
      </div>

      <div>
        <button
          value='release91'
          className={sortValue === 'release91' ? 'small-margins genres highlight' : 'small-margins small-text genres'}
          onClick={orderReleaseNewToOld}
        >New To Old
        </button>
      </div>
    
    
    </div>

      {allUserGenres && allUserGenres.length > 0 
      ?
      <div className='flex-row-center'>
        <div>
          <button 
            className={!genreFilter ? 'small-margins genres highlight':'small-margins small-text genres'} 
            onClick={() => setGenreFilter(null)}
          >All Genres
          </button>
          
          {allUserGenres.map(genre => (
            <button 
              value={genre} 
              className={genre == genreFilter ? 'small-margins genres highlight':'small-margins small-text genres'} 
              onClick={handleGenreChange}
            >{genre}
            </button>
          ))
          }
        </div>
      </div>
          :
        null 
      }
    
   
   
    
      {allUserTags && allUserTags.length > 0 
          ?
      <div className='flex-row-center'>
        <div>
          <button 
            className={!tagFilter ? 'small-margins tags highlight':'small-margins small-text tags'}
            onClick={() => setTagFilter(null)}
          >All Tags
          </button>
          
          {allUserTags.map(tag => (
            <button 
              value={tag} 
              className={tag == tagFilter ? 'small-margins tags highlight':'small-margins small-text tags'}
              onClick={() => setTagFilter(tag)}
            >{tag}
            </button>
          ))
        }
        </div>
      </div>
          :
        null
      }
    
    
  </>
  );
}

export default CollectionFilter;