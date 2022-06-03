function TagButton({tag, handleAddTagClick, formTagArray}) {

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