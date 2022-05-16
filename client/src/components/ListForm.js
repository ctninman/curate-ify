import {useContext} from 'react';
import { AppContext } from './AppContext';

function ListForm({album}) {


  function handleListSelect (event) {
    let listID = event.target.value
    // let listID = selectedList.id
    // let listLength =
    console.log(listID)


  //   create_table "list_albums", force: :cascade do |t|
  //   t.string "album_title"
  //   t.string "artist"
  //   t.string "album_cover"
  //   t.integer "list_id"
  //   t.integer "list_order"
  //   t.string "spotify_id"
  //   t.string "spotify_url"
  //   t.datetime "created_at", null: false
  //   t.datetime "updated_at", null: false
  // end

    fetch(`/list_albums`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        
          album_title: album.name,
          artist: album.artists[0].name,
          album_cover: album.images[1].url,
          spotify_id: album.id,
          spotify_url: album.external_urls.spotify,
          list_id: listID
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
  }

  const {allUserLists} = useContext(AppContext)
  return (
    <div>
      {/* <button></button> */}
      <select onChange={handleListSelect} id="lists" name="lists">
        <option value={null}> --- </option>
        {allUserLists
            ?
          allUserLists.map((list) => (
            <option key={list.id} value={list.id}>{list.list_name}</option>
          ))
            :
          <h1>Finding Lists</h1>
        }
      </select>
    </div>
  );
}

export default ListForm;