import { useContext, useState } from 'react'
import { AppContext } from './AppContext'
import SearchAlbums from './SearchAlbums';
import SearchLists from './SearchLists';
import SearchUsers from './SearchUsers';
// import BrowseMusic from './BrowseMusic';


function Search() {

  const { user, setSingleListAlbum } =  useContext(AppContext)
  
  const [whichSearch, setWhichSearch] = useState('none')
  const [listSearchResults, setListSearchResults] = useState(null)

  return (
    <div>
      <div className='flex-column-center'>
        {whichSearch !== 'none' 
            ?
          <button onClick={() => setWhichSearch('none')}>BACK</button>
            :
          null
        }
        <h1 style={{textAlign: 'center'}}className='medium-margins section-header'>Search {whichSearch !== 'none'? whichSearch: null}</h1>
      </div>
          
      
      <div className='flex-row-center'>
  
        {whichSearch === 'none' ?
          <div className='flex-row-center' style={{width: '100%', marginLeft: '30px', marginRight: '30px'}}>
            <div className='select-search'>
              <div className='flex-row-center' style={{marginBottom: '15px'}}>
                <button className='generic-button' style={{width: '60%'}} onClick={() => setWhichSearch('Albums')}>ARTISTS / ALBUMS</button>
              </div>
              <h3 className='medium-margins' style={{textAlign: 'center'}} >Search Spotify by:</h3>
              <h4 className='medium-margins' style={{textAlign: 'center'}}>-Album Title</h4>
              <h4 className='medium-margins' style={{textAlign: 'center'}}>-Artist Name</h4>
              <h3 className='medium-margins' style={{textAlign: 'center'}}>Click Artist Name to Search for Their Albums</h3>
            </div>
            <div className='select-search'>
              <div className='flex-row-center' style={{marginBottom: '15px'}}>
                <button className='generic-button' style={{width: '60%'}} onClick={() => setWhichSearch('Lists')}>LISTS</button>
              </div>
              <h3 className='medium-margins' style={{textAlign: 'center'}} >Search Curate-ify for Other Users' Lists:</h3>
            </div>
            <div className='select-search' style={{borderRight: 'none'}}>
              <div className='flex-row-center' style={{marginBottom: '15px'}}>
                <button className='generic-button' style={{width: '60%'}} onClick={() => setWhichSearch('Users')}>USERS</button>
              </div>
              <h3 className='medium-margins' style={{textAlign: 'center'}} >Search Curate-ify Users by Username</h3>
              <h3 className='medium-margins' style={{textAlign: 'center'}}>or</h3>
              <h3 className='medium-margins' style={{textAlign: 'center'}}>Search Curate-ify Users Whose Collections Contain Up To Five Selected Albums </h3>
            </div>
          </div>
            :
          null
        }
        {/* <button className={useSearch ? 'search-type-selected' : null} onClick={() => setUseSearch(true)} >Search</button>
        <button className={!useSearch ? 'search-type-selected' : null} onClick={() => setUseSearch(false)} >Browse</button>
        {useSearch
            ? */}
        {whichSearch === 'Albums' ? <SearchAlbums /> : null}
        {whichSearch === 'Lists' ? <SearchLists listSearchResults={listSearchResults} setListSearchResults={setListSearchResults}/> : null }
        {whichSearch === 'Users' ? <SearchUsers listSearchResults={listSearchResults} setListSearchResults={setListSearchResults}/> : null }
            {/* :
          <BrowseMusic />
        }  */}
      </div>
    </div>
  );
}

export default Search;