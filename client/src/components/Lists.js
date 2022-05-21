import {useState, useContext} from 'react'
import { AppContext } from './AppContext';
import SingleList from "./SingleList";
import AllLists from './AllLists';
import ListForm from './ListForm';
import LoadScreen from './LoadScreen';

function Lists(props) {

  const {user, isLoading, setIsLoading, allUserLists, setAllUserLists} = useContext(AppContext)

  const [showOneList, setShowOneList] = useState(false)
  const [showNewListFrom, setShowNewListForm] =useState(false)
  const [listName, setListName] = useState('')  

  function handleAddNewList (event) {
    event.preventDefault()
    setIsLoading(true)
    
    fetch('/lists', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        list_name: listName,
        is_public: true,
        user_id: user.id
      })
    })
      .then((res) => res.json())
      .then((data) => {
        let newList = data.list
        let copyOfUserLists = [...allUserLists]
        copyOfUserLists.push(newList)
        console.log('allUserLists', copyOfUserLists)
        setAllUserLists(copyOfUserLists)
        setIsLoading(false)
      })
    setShowNewListForm(false)
    setListName('')
    
  }

  return (!isLoading ?
    <div style={{marginLeft: '50px', marginRight: '50px'}}>
      {!showNewListFrom && !showOneList? <button style={{backgroundColor: 'green'}}onClick={() => setShowNewListForm(true)}>Create New List</button> : null }
      {showNewListFrom 
          ?
      <div className='flex-row-left'>
        <form onSubmit={handleAddNewList} style={{display: 'flex', flexDirection: 'row'}}>
        
          <label htmlFor="list_name">List Name:</label>
          <input
            type="text"
            id="list_name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <button type='submit'>CREATE</button>
          <button type='button' style={{backgroundColor: 'black', color: 'white'}} onClick={() => {
              setShowNewListForm(false)
              setListName('')
            }}
          >X</button>
        </form>
      </div>
          :
        null
      }
      <AllLists handleAddNewList={handleAddNewList} setShowOneList={setShowOneList} showOneList={showOneList}/>
      {/* <button onClick={testListPost}>Add to List</button> */}
      {/* <button onClick={() => setShowOneList(!showOneList)}>{showOneList ? "Show All Lists" : "Select List"}</button> */}
      {/* {showOneList 
        ?

      <div>
        <SingleList />
      </div>

        :
      
      <div>
        <AllLists />
      </div>} */}
    </div>
    :
    <LoadScreen />
  );
}

export default Lists;