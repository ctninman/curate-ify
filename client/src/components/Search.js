import { useState, useContext, useEffect } from 'react'
import { AppContext } from './AppContext';

import SearchAlbums from './SearchAlbums';
import SearchLists from './SearchLists';
import SearchUsers from './SearchUsers';


function Search() {
  
  const [whichSearch, setWhichSearch] = useState('none')
  const [listSearchResults, setListSearchResults] = useState(null)

  const {refreshMe} = useContext(AppContext)

  useEffect(()=>{
    refreshMe()
  })

  return (
    <div>
      <div className='flex-column-center'>
        {whichSearch !== 'none' 
            ?
            <span className='back-button-outer'><button className='back-button'onClick={() => setWhichSearch('none')}>BACK</button></span>
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
              <span className='back-button-outer'><button className='back-button' onClick={() => setWhichSearch('Albums')}>ARTISTS OR ALBUMS</button></span>
              </div>
              <h3 className='medium-margins' style={{textAlign: 'center'}} >Search Spotify by:</h3>
              <h4 className='medium-margins' style={{textAlign: 'center'}}>-Album Title</h4>
              <h4 className='medium-margins' style={{textAlign: 'center'}}>-Artist Name</h4>
              <h3 className='medium-margins' style={{textAlign: 'center'}}>Click Artist Name to Search for Their Albums</h3>
            </div>
            <div className='select-search'>
              <div className='flex-row-center' style={{marginBottom: '15px'}}>
              <span className='back-button-outer'><button className='back-button' onClick={() => setWhichSearch('Lists')}>LISTS</button></span>
              </div>
              <h3 className='medium-margins' style={{textAlign: 'center'}} >Search Curate-ify for Other Users' Lists:</h3>
            </div>
            <div className='select-search' style={{borderRight: 'none'}}>
              <div className='flex-row-center' style={{marginBottom: '15px'}}>
              <span className='back-button-outer'><button className='back-button' onClick={() => setWhichSearch('Users')}>USERS</button></span>
              </div>
              <h3 className='medium-margins' style={{textAlign: 'center'}} >Search Curate-ify Users by Username</h3>
              <h3 className='medium-margins' style={{textAlign: 'center'}}>or</h3>
              <h3 className='medium-margins' style={{textAlign: 'center'}}>Search Curate-ify Users Whose Collections Contain Up To Five Selected Albums </h3>
            </div>
          </div>
            :
          null
        }
        {whichSearch === 'Albums' ? <SearchAlbums /> : null}
        {whichSearch === 'Lists' ? <SearchLists listSearchResults={listSearchResults} setListSearchResults={setListSearchResults}/> : null }
        {whichSearch === 'Users' ? <SearchUsers listSearchResults={listSearchResults} setListSearchResults={setListSearchResults}/> : null }
      </div>
    </div>
  );
}

export default Search;