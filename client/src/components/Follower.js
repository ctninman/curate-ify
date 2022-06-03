import {useContext} from 'react'
import { useHistory } from 'react-router'
import { AppContext} from './AppContext'

function Follower({follow, setSingleFollower, componentProp, setUserFollowees}) {

  const {user} = useContext(AppContext)

  let history = useHistory()

  function handleRemoveFriendship () {
    fetch(`/relationships/${follow.id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setUserFollowees(data.following)
      // history.push('/friends')
      // setUserFollowees(data.following)
      // setUserFollowers(data.followers)
    })
  }

  return (
    <div className='flex-row-center friend generic-button' style={{cursor: 'default'}} >
      <div style={{width: '40px', cursor: 'pointer'}}><img style={{width: '100%', borderRadius: '50%'}} src={follow.spotify_profile_image}/></div>
      <h2 onClick={() => setSingleFollower(user)} className='small-margins' style={{marginTop: '8px', cursor: 'pointer'}}>{follow.username}</h2>
      {componentProp === 'followee'? <button style={{height: '24px', backgroundColor: '#F8CB2E', marginTop: '10px', marginLeft: '10px'}}onClick={handleRemoveFriendship}>UNFOLLOW</button> : null}
    </div>
  );
}

export default Follower;