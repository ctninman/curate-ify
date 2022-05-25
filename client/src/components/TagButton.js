import {useState, useEffect, useContext} from 'react';
import {AppContext} from './AppContext'

function TagButton({tag, handleAddTagClick, formTagArray}) {

  const { allUserTags} = useContext(AppContext)

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
        className={formTagArray.includes(tag) ? 'tag-in-collection' : 'tag-button'}
        value={tag}
        onClick={handleAddTagClick}
      >{tag}</button>
    </div>
  );
}

export default TagButton;