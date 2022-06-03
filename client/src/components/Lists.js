import { useState, useContext, useEffect } from 'react'
import { AppContext } from './AppContext';
import AllLists from './AllLists';
import LoadScreen from './LoadScreen';

function Lists() {

  const {user, isLoading, setIsLoading, allUserLists, setAllUserLists, refreshMe} = useContext(AppContext)

  const [showOneList, setShowOneList] = useState(false)
  const [showNewListFrom, setShowNewListForm] =useState(false)
  const [listName, setListName] = useState('')  

  useEffect (() => {
    refreshMe()
  })

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
        setAllUserLists(copyOfUserLists)
        setIsLoading(false)
      })
    setShowNewListForm(false)
    setListName('')
    
  }

  return (!isLoading ?
    <div style={{marginLeft: '50px', marginRight: '50px'}}>
      <div className='flex-row-center'>
        <h1 className='section-header'>Lists</h1>
      </div>
      {!showNewListFrom && !showOneList? <div className='flex-row-center' style={{marginTop: '5px'}} ><span className='back-button-outer'><button className='back-button' onClick={() => setShowNewListForm(true)}>CREATE NEW LIST</button></span></div> : null }
      {showNewListFrom 
          ?
      <div className='flex-column-center' style={{margin: '20px'}}>
        <form onSubmit={handleAddNewList} className='flex-column-center'>
        
          <label style={{fontWeight: 'bold', margin: '5px'}} htmlFor="list_name">List Name:</label>
          <div className='flex-row-center'>
          <input
            style={{width: '220px', textAlign: 'center'}}
            type="text"
            id="list_name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />   
          <button style={{margin: '10px', color: '#F04C24'}} type='button' style={{backgroundColor: 'black', color: '#F04C24',boxShadow: '0 0 5px 2px #F04C24', marginLeft: '8px'}} onClick={() => {
            setShowNewListForm(false)
            setListName('')
          }}
        >X</button>
        </div>
          <span className='back-button-outer' ><button className='back-button' type='submit'>CREATE</button></span>
          {/* <button style={{margin: '10px'}} type='button' style={{backgroundColor: 'black', color: 'white'}} onClick={() => {
              setShowNewListForm(false)
              setListName('')
            }}
          >X</button> */}
        </form>
      </div>
          :
        null
      }
      <AllLists handleAddNewList={handleAddNewList} setShowOneList={setShowOneList} showOneList={showOneList}/>
    </div>
    :
    <LoadScreen />
  );
}

export default Lists;