import {useState, useEffect, useContext} from 'react';
import {AppContext} from './AppContext'

function GenreButton({genre, handleAddGenreClick, formGenreArray}) {

  const { allUserGenres} = useContext(AppContext)

  // const [genreClassName, setGenreClassName] = useState('')

  // useEffect (() => {
  //   if ( formGenreArray.length > 0) {
  //     if (formGenreArray.includes(genre)) {
  //     setGenreClassName('genre-button genre-in-collection')
  //     } else {
  //       setGenreClassName ('genre-button')
  //     }
  //   }
  // }, [ formGenreArray ])

  return (
    <div>
       <button 
        type='button' 
        className={formGenreArray.includes(genre) ? 'genre-in-collection' : 'genre-button'}
        value={genre}
        onClick={handleAddGenreClick}
      >{genre}</button>
    </div>
  );
}

export default GenreButton;