import { useEffect, useContext, useState } from "react";
import { AppContext } from "./AppContext";


function CollectionFilter({showGrid, setShowGrid, collectionSearchTerm, setCollectionSearchTerm, userCollectionAlbums, setUserCollectionAlbums, genreFilter, tagFilter, setGenreFilter, setTagFilter}) {

  const {user, allUserGenres, allUserTags, setAllUserGenres, setAllUserTags} = useContext(AppContext)

  // const [allUserGenres, setAllUserGenres] = useState(null)
  // const [allUserTags, setAllUserTags] = useState(null)
  const [sortValue, setSortValue] =useState('rating91')
  const [sortName, setSortName] = useState('Rating: High to Low')
  const [showAllTags, setShowAllTags] =useState(false)
  const [showAllOrderOptions, setShowAllOrderOptions] =useState(false)
  const [showAllGenreOptions, setShowAllGenreOptions] =useState(false)
  const [showAllTagOptions, setShowAllTagOptions] =useState(false)

  useEffect (() => {
    fetch(`/users/${user.id}/genres`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(data => {
      setAllUserGenres(data.genres)
      setAllUserTags(data.tags)
      // let userCollectionCopy = [...userCollectionAlbums]
      // let orderedAlbums = userCollectionCopy.sort((a,b) => (a.rating > b.rating) ? -1 : 1)
      // setUserCollectionAlbums(orderedAlbums)
    })
  }, [] )

  function handleGenreChange (event) {
    setGenreFilter(event.target.value)
    setShowAllGenreOptions(false)
  }

  function orderRatingHighToLow (event) {
    let userCollectionCopy = [...userCollectionAlbums]
    let orderedAlbums = userCollectionCopy.sort((a,b) => (a.rating > b.rating) ? 1 : -1)
    setUserCollectionAlbums(orderedAlbums.reverse())
    setSortValue(event.target.value)
    setSortName(event.target.name)
    setShowAllOrderOptions(false)
  }

  function orderRatingLowToHigh (event) {
    let userCollectionCopy = [...userCollectionAlbums]
    let orderedAlbums = userCollectionCopy.sort((a,b) => (a.rating > b.rating) ? 1 : -1)
    setUserCollectionAlbums(orderedAlbums)
    setSortValue(event.target.value)
    setSortName(event.target.name)
    setShowAllOrderOptions(false)
  }

  function orderArtistAToZ (event) {
    let userCollectionCopy = [...userCollectionAlbums]
    let orderedAlbums = userCollectionCopy.sort((a,b) => (a.artist > b.artist) ? 1 : -1)
    setUserCollectionAlbums(orderedAlbums)
    setSortValue(event.target.value)
    setSortName(event.target.name)
    setShowAllOrderOptions(false)
  }

  function orderArtistZToA (event) {
    let userCollectionCopy = [...userCollectionAlbums]
    let orderedAlbums = userCollectionCopy.sort((a,b) => (a.artist > b.artist) ? -1 : 1)
    setUserCollectionAlbums(orderedAlbums)
    setSortValue(event.target.value)
    setSortName(event.target.name)
    setShowAllOrderOptions(false)
  }

  function orderAlbumAToZ (event) {
    let userCollectionCopy = [...userCollectionAlbums]
    let orderedAlbums = userCollectionCopy.sort((a,b) => (a.album_title > b.album_title) ? 1 : -1)
    setUserCollectionAlbums(orderedAlbums)
    setSortValue(event.target.value)
    setSortName(event.target.name)
    setShowAllOrderOptions(false)
  }

  function orderAlbumZToA (event) {
    let userCollectionCopy = [...userCollectionAlbums]
    let orderedAlbums = userCollectionCopy.sort((a,b) => (a.album_title > b.album_title) ? -1 : 1)
    setUserCollectionAlbums(orderedAlbums)
    setSortValue(event.target.value)
    setSortName(event.target.name)
    setShowAllOrderOptions(false)
  }

  function orderReleaseOldToNew(event) {
    let userCollectionCopy = [...userCollectionAlbums]
    let orderedAlbums = userCollectionCopy.sort((a,b) => (parseInt(a.release_date) > parseInt(b.release_date)) ? 1 : -1)
    setUserCollectionAlbums(orderedAlbums)
    setSortValue(event.target.value)
    setSortName(event.target.name)
    setShowAllOrderOptions(false)
  }

  function orderReleaseNewToOld(event) {
    let userCollectionCopy = [...userCollectionAlbums]
    let orderedAlbums = userCollectionCopy.sort((a,b) => (parseInt(a.release_date) > parseInt(b.release_date)) ? -1 : 1)
    setUserCollectionAlbums(orderedAlbums)
    setSortValue(event.target.value)
    setSortName(event.target.name)
    setShowAllOrderOptions(false)
  }

// *** JSX *** //
  return (
  <div style={{backgroundColor: 'white', color: 'black', marginLeft: '100px', marginRight: '100px', borderRadius: '10px'}}>
 
    <div className='flex-row-left' >
      <h4 className='filter-left'>Search:</h4>
      <div style={{width: '300px'}}>
      <input 
        name='collection-search'
        type='text' 
        
        value={collectionSearchTerm}
        onChange={(e) => setCollectionSearchTerm(e.target.value)}>
      </input>
      <button onClick={() => setCollectionSearchTerm('')}>Clear</button>
      </div>
    </div>
 
    {showAllOrderOptions
      ?
    <div className='flex-row-left'>
      <h4 className=' filter-left'>Order by:</h4>
      <div>
        <button 
          value='rating91'
          name='Rating: High to Low'
          className={sortValue === 'rating91' ? 'small-margins genres highlight' : 'small-margins small-text genres'}
          onClick={orderRatingHighToLow}
        >Rating: High to Low
        </button>
      </div>
  
      <div>
        <button 
          className={sortValue === 'rating19' ? 'small-margins genres highlight' : 'small-margins small-text genres'}
          value='rating19'
          name='Rating: Low to High'
          onClick={orderRatingLowToHigh}
        >Rating: Low to High
        </button>
      </div>

      <div>
        <button 
          className={sortValue === 'artistAZ' ? 'small-margins genres highlight' : 'small-margins small-text genres'}
          value='artistAZ'
          name='Artist: A - Z'
          onClick={orderArtistAToZ}
        >Artist: A - Z
        </button>
      </div>

      <div>
        <button 
          value='artistZA'
          name='Artist: Z - A'
          className={sortValue === 'artistZA' ? 'small-margins genres highlight' : 'small-margins small-text genres'}
          onClick={orderArtistZToA}
        >Artist: Z - A
        </button>
      </div>

      <div>
        <button 
          value='albumAZ'
          name='Album: A - Z'
          className={sortValue === 'albumAZ' ? 'small-margins genres highlight' : 'small-margins small-text genres'}
          onClick={orderAlbumAToZ}
        >Album: A - Z
        </button>
      </div>
    
      <div>
        <button
          value='albumZA'
          name='Album: Z - A'
          className={sortValue === 'albumZA' ? 'small-margins genres highlight' : 'small-margins small-text genres'}
          onClick={orderAlbumZToA}
        >Album: Z - A
        </button>
      </div>

      <div>
        <button
          value='release19'
          name='Old to New'
          className={sortValue === 'release19' ? 'small-margins genres highlight' : 'small-margins small-text genres'}
          onClick={orderReleaseOldToNew}
        >Old to New
        </button>
      </div>

      <div>
        <button
          value='release91'
          name='New to Old'
          className={sortValue === 'release91' ? 'small-margins genres highlight' : 'small-margins small-text genres'}
          onClick={orderReleaseNewToOld}
        >New to Old
        </button>
      </div>
    
      <button className='collapse-button' onClick={() => setShowAllOrderOptions(false)}>➢</button>   
    
    </div>
      :
    <div className='flex-row-left'> 
      <h4 className=' filter-left'>Order By:</h4>
      <button className='small-margins'>{sortName}</button>
      <button className='expand-button' onClick={() => setShowAllOrderOptions(true)}>➢</button>   
    </div>
  }

  {showAllGenreOptions ?
    <div>
      {allUserGenres && allUserGenres.length > 0 
      ?
      <div className='flex-row-left'>
        <h4 className=' filter-left'>Genre:</h4>
        <div>
          <button 
            className={!genreFilter ? 'small-margins genres highlight':'small-margins small-text genres'} 
            onClick={() => {
              setGenreFilter(null)
              setShowAllGenreOptions(false)
            }}
          >All Genres
          </button>
          
          {allUserGenres.sort((a, b) => a.localeCompare(b)).map(genre => (
            <button 
              value={genre} 
              className={genre == genreFilter ? 'small-margins genres highlight':'small-margins small-text genres'} 
              onClick={handleGenreChange}
            >{genre}
            </button>
          ))
          }
        </div>
        <button className='collapse-button' onClick={() => setShowAllGenreOptions(false)}>➢</button>  
      </div>
          :
        null 
      }
    </div>

      :
    
      <div className='flex-row-left'> 
      <h4 className=' filter-left'>Genre:</h4>
      <button className='small-margins'>{!genreFilter ? 'All Genres' : genreFilter}</button>
      <button className='expand-button' onClick={() => setShowAllGenreOptions(true)}>➢</button>   
    </div>
    }
   
    {showAllTagOptions
        ?
    <div>
      {allUserTags && allUserTags.length > 0 
          ?
      <div className='flex-row-left'>
        <h4 className=' filter-left'>Tag:</h4>
        <div>
          <button 
            className={!tagFilter ? 'small-margins tags highlight':'small-margins small-text tags'}
            onClick={() => {
              setTagFilter(null)
              setShowAllTagOptions(false)
            }}
          >All Tags
          </button>
          
          {allUserTags.sort((a, b) => a.localeCompare(b)).map(tag => (
            <button 
              value={tag} 
              className={tag == tagFilter ? 'small-margins tags highlight':'small-margins small-text tags'}
              onClick={() => {
                setTagFilter(tag)
                setShowAllTagOptions(false)
              }}
            >{tag}
            </button>
          ))
        }
        </div>
        <button className='collapse-button' onClick={() => setShowAllTagOptions(false)}>➢</button>  
      </div>
          :
        null
      }
    </div>
        :
      <div className='flex-row-left'> 
        <h4 className=' filter-left'>Tag:</h4>
        <button className='small-margins'>{!tagFilter ? 'All Tags' : tagFilter}</button>
        <button className='expand-button' onClick={() => setShowAllTagOptions(true)}>➢</button>   
      </div>
    
    }
    <div className='flex-row-left'>
      <h4 className=' filter-left'>View:</h4>
      <button className={!showGrid? 'small-margins grid-highlight': 'small-margins grid-no-highlight'} onClick={() => setShowGrid(!showGrid)}>Full Album Details</button>
      <button className={showGrid? 'small-margins grid-highlight': 'small-margins grid-no-highlight'} onClick={() => setShowGrid(!showGrid)}>Just Album Covers</button>
    </div>
  </div>
  );
}

export default CollectionFilter;