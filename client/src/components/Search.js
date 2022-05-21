import { useContext, useState } from 'react'
import { AppContext } from './AppContext'
import SearchAlbums from './SearchAlbums';
import SearchLists from './SearchLists';
import SearchUsers from './SearchUsers';
// import BrowseMusic from './BrowseMusic';


function Search() {

  const { user, setSingleListAlbum } =  useContext(AppContext)
  
  const [whichSearch, setWhichSearch] = useState('none')

  return (
    <div>
      <div className='flex-column-center'>
        <h1 style={{textAlign: 'center'}}className='small-margins'>Search</h1>
        {whichSearch !== 'none' 
            ?
          <button onClick={() => setWhichSearch('none')}>Back</button>
            :
          null
        }
      </div>
          
      
      <div className='flex-row-center'>
  
        {whichSearch === 'none' ?
          <div>
            <button onClick={() => setWhichSearch('albums')}>Artists/Albums</button>
            <button onClick={() => setWhichSearch('lists')}>Lists</button>
            <button onClick={() => setWhichSearch('users')}>Users</button>
          </div>
            :
          null
        }
        {/* <button className={useSearch ? 'search-type-selected' : null} onClick={() => setUseSearch(true)} >Search</button>
        <button className={!useSearch ? 'search-type-selected' : null} onClick={() => setUseSearch(false)} >Browse</button>
        {useSearch
            ? */}
        {whichSearch === 'albums' ? <SearchAlbums /> : null}
        {whichSearch === 'lists' ? <SearchLists /> : null }
        {whichSearch === 'users' ? <SearchUsers /> : null }
            {/* :
          <BrowseMusic />
        }  */}
      </div>
    </div>
  );
}

export default Search;