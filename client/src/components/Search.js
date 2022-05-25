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
        <h1 style={{textAlign: 'center'}}className='small-margins'>Search {whichSearch !== 'none'? whichSearch: null}</h1>
      </div>
          
      
      <div className='flex-row-center'>
  
        {whichSearch === 'none' ?
          <div>
            <button onClick={() => setWhichSearch('Albums')}>Artists/Albums</button>
            <button onClick={() => setWhichSearch('Lists')}>Lists</button>
            <button onClick={() => setWhichSearch('Users')}>Users</button>
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