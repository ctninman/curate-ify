import {useState, useContext, useEffect} from 'react'
import { AppContext } from './AppContext'
import LoadScreen from './LoadScreen'
import UserSearchThumbnail from './UserSearchThumbnail'
import OtherUserAlbum from './OtherUserAlbum'
import OtherUserList from './OtherUserList'
import ListSearchThumbnail from './ListSearchThumbnail'
import FindSimilarUsers from './FindSimilarUsers'

function SearchUsers({componentProp, singleFollower, setSingleFollower, listSearchResults, setListSearchResults}) {

  const { user, isLoading, setIsLoading } =  useContext(AppContext)

  const [selectedOtherUser, setSelectedOtherUser] = useState(null)
  const [userTitleSearch, setUserTitleSearch] = useState('')
  const [userSearchResults, setUserSearchResults] = useState(null)
  const [otherUserCollection, setOtherUserCollection] = useState([])
  const [otherUserLists, setOtherUserLists] = useState([])
  const [showMatchGrid, setShowMatchGrid] = useState(true)
  const [showFriendList, setShowFriendList] = useState(false)
  const [friendList, setFriendList] =useState(null)

  function handleUserSearch (event) {

    event.preventDefault()
    if (userTitleSearch != "") {
      setIsLoading(true)
      fetch(`/users/search/${userTitleSearch}`, {method: "GET"})
      .then(res => res.json())
      .then((data)  =>  {
        console.log(data)
        setUserSearchResults(data.users)
        setUserTitleSearch('')
        setIsLoading(false)
      })
    } else {
      return
    }
  }

  useEffect (() => {
    if (componentProp === 'friends') {
      setSelectedOtherUser(singleFollower)
    }
  }, [] )

  useEffect (() => {
    if (selectedOtherUser) {
      fetch(`/users/other/${selectedOtherUser.id}`, {method: "GET"})
      .then(res => res.json())
      .then(data => {
        setOtherUserCollection(data.user.albums)
        setOtherUserLists(data.user.lists)
        console.log(data.user.lists)
      })
    }
  }, [selectedOtherUser] )

  function handleFollowClick () {
    fetch('/relationships', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        follower_id: user.id,
        followee_id: selectedOtherUser.id
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  return !isLoading ? (
    <>
    {componentProp==='friends' && showFriendList
        ?
      <div className='flex-column-center'>
        <button onClick={() => setShowFriendList(false)}>BACK</button>
        <OtherUserList list={friendList} key={friendList.id}/>
      </div>
        
      :
    <>
    {otherUserCollection.length >0 || otherUserLists.length > 0 ?
      <div>
        {componentProp === "friends" ? 
          <div className='flex-row-center'>
            <button onClick={() => setSingleFollower(null)}>BACK TO FRIENDS</button> 
          </div>
        : null}
        <div className='flex-row-center' style={{backgroundColor: 'white', color: 'black', paddingTop: '5px', paddingBottom: '5px', marginLeft: '15%', marginRight: '15%', borderRadius: '10px', marginTop: '10px'}}>
          <h1 className='small-margins'>{selectedOtherUser.username}'s Collection</h1>
          {componentProp === "friends" ? null : <button onClick={handleFollowClick}>Follow</button>}
        </div>
      <div className='flex-row-center wrap'>
        {otherUserCollection.map(album => (
          <OtherUserAlbum album={album} key={album.spotify_id} />
        ))}
      </div>
      <div style={{backgroundColor: 'white', color: 'black', paddingTop: '5px', paddingBottom: '5px', marginLeft: '15%', marginRight: '15%', borderRadius: '10px'}}>
        <h1 className='small-margins' style={{textAlign: 'center'}} >{selectedOtherUser.username}'s Lists</h1>
      </div>
      <div className='flex-column-center'>
        {otherUserLists.map(list => (
          <ListSearchThumbnail 
            list={list} 
            key={list.id} 
            componentProp={componentProp=== 'friends'? 'friends' : ''}
            setListSearchResults={setListSearchResults}
            setFriendList={setFriendList}
            setShowFriendList={setShowFriendList}/>
        ))}
      </div>
      </div>
    :
    <div style={{margin: '20px', marginTop: '5px'}} className='flex-column-center'>
      <form onSubmit={handleUserSearch}>
        <div className='flex-column-center'>
          {/* <label htmlFor="user-title" style={{fontWeight: 'bold'}}>User:</label> */}
          <input
            type="text"
            id="user-title"
            value={userTitleSearch}
            onChange={(e) => setUserTitleSearch(e.target.value)}
          />
        </div>
        <div className='flex-row-center'>
          <button style={{margin: '5px', fontSize: '15px'}} type="submit">ENTER</button>
        </div>
      </form>
      <>{userSearchResults 
        ?
      <div className='flex-row-center wrap'>  
        {userSearchResults.map((user) => (
          
          <UserSearchThumbnail  
            user={user} 
            key={user.id} 
            selectedOtherUser={selectedOtherUser}
            setSelectedOtherUser={setSelectedOtherUser}
          />
          // <img src={album.images[2].url} />
        ))}
      </div>
          :
        null

      }</>
      <>
      {showMatchGrid ? 
        <FindSimilarUsers setSelectedOtherUser={setSelectedOtherUser}/>
      : null}
      </>

    </div>
    }
    </>
  }
  </>
  )
      :
  <LoadScreen />
}

export default SearchUsers;