import {useEffect, useState, useContext} from 'react';
import {AppContext} from './AppContext'
import Follower from './Follower';
import SearchUsers from './SearchUsers';

function Friends() {

  const {user, refreshMe} = useContext(AppContext)

  const [ userFollowers, setUserFollowers ] = useState ([])
  const [ userFollowees, setUserFollowees ] = useState ([])
  const [singleFollower, setSingleFollower] = useState(null)

  useEffect (() => {
    refreshMe()
    fetch(`/relationships/${user.id}`, {method: "GET"})
    .then(res => res.json())
    .then(data => {
      console.log("secretdata", data)
      setUserFollowees(data.following)
      setUserFollowers(data.followers)
    })
  } , [] )

  return !singleFollower ? (
    <>
    {userFollowers && userFollowees ?
      <div className='flex-column-center' style={{marginTop: '15px'}}>
        <div className='flex-column-center'>
          <div className='list-header'  style={{width: '280px', textAlign: 'center', marginTop:'15px', marginBottom: '15px', border: 'double 5px #F8CB2E'}}><h1 className='small-margins'>People I'm Following</h1></div>
          {userFollowees.length > 0
            ?
            userFollowees.map((f) => <div style={{width: '330px'}}><Follower componentProp='followee' follow={f} key={f.id} setSingleFollower={setSingleFollower} setUserFollowees={setUserFollowees}/></div>)
            :
            <h1>You're not following anyone</h1>
          }
        </div>
        <div className='flex-column-center'>
          {userFollowers.length > 0 ? <div style={{width: '280px', textAlign: 'center', marginTop: '15px', marginBottom: '15px', border: 'double 5px #F8CB2E'}}className='list-header'><h1 className='small-margins'>People Following Me</h1></div> : null }
          {userFollowers.length > 0
            ?
            userFollowers.map((f) => <div style={{width: '330px'}}><Follower componentProp='follower' follow={f} key={f.id} setSingleFollower={setSingleFollower}/></div>)
            :
            null
          }
        </div>
      </div>
          :
        null
      }
  </>
  )
      :
  <SearchUsers componentProp='friends' singleFollower={singleFollower} setSingleFollower={setSingleFollower}/>
}

export default Friends;<h1>Friends</h1>