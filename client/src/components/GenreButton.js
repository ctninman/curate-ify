function GenreButton({genre, handleAddGenreClick, formGenreArray}) {

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