import { useContext, useState } from 'react'
import { AppContext } from './AppContext'
import SearchAlbums from './SearchAlbums';
// import BrowseMusic from './BrowseMusic';


function Search() {

  const { user } =  useContext(AppContext)
  
  // const [useSearch, setUseSearch] = useState(true)

  return (
    <div>
      {/* <button className={useSearch ? 'search-type-selected' : null} onClick={() => setUseSearch(true)} >Search</button>
      <button className={!useSearch ? 'search-type-selected' : null} onClick={() => setUseSearch(false)} >Browse</button>
      {useSearch
          ? */}
        <SearchAlbums />
          {/* :
        <BrowseMusic />
      }  */}
    </div>
  );
}

export default Search;