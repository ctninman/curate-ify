import {useEffect, useState, useContext} from 'react';
import {AppContext} from './AppContext'
import Follower from './Follower';
import SearchUsers from './SearchUsers';

function Friends(props) {

  const {user} = useContext(AppContext)

  const [ userFollowers, setUserFollowers ] = useState ([])
  const [ userFollowees, setUserFollowees ] = useState ([])
  const [singleFollower, setSingleFollower] = useState(null)

  useEffect (() => {
    fetch(`/relationships/${user.id}`, {method: "GET"})
    .then(res => res.json())
    .then(data => {
      setUserFollowees(data.following)
      setUserFollowers(data.followers)
      console.log(data)
    })
  } , [] )




  return !singleFollower ? (
    <>
    {userFollowers && userFollowees ?
      <div className='flex-column-center' style={{marginTop: '15px'}}>
        <div className='section-header'><h1 className='small-margins'>People I'm Following</h1></div>
      
        <div>
          {userFollowees.length > 0
            ?
            userFollowees.map((f) => <Follower user={f} key={f.id} setSingleFollower={setSingleFollower}/>)
            :
            null
          }
        </div>

        <div>
          {userFollowers.length > 0
            ?
            userFollowers.map((f) => <Follower user={f} key={f.id} setSingleFollower={setSingleFollower}/>)
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