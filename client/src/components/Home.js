import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './AppContext';
import CollectionIcon from '../images/CollectionIcon.png'
import QueueIcon from '../images/QueueIcon.png'
import ListIcon from '../images/ListIcon.png'
import ArtistIcon from '../images/ArtistIcon.png'
import SearchIcon from '../images/SearchIcon.png'
import FriendIcon from '../images/FriendIcon.png'

function Home(props) {

  const history = useHistory();

  const { user } = useContext(AppContext)

  return user ? (
    <>
    <div className='home-screen'>
      <div onClick={() => history.push('/collection')}className='home-icon-div'>
        <img className='home-icon' src={CollectionIcon} />
        <h1 className='small-margins center-text'>Collection</h1>
      </div>
      <div onClick={() => history.push('/queue')}className='home-icon-div'>
        <img className='home-icon' src={QueueIcon} />
        <h1 className='small-margins center-text'>Queue</h1>
      </div>
      <div onClick={() => history.push('/lists')} className='home-icon-div'>
        <img style={{paddingTop: '13%', paddingBottom: '13%'}} className='home-icon' src={ListIcon} />
        <h1 className='small-margins center-text'>Lists</h1>
      </div>
    </div>
    <div className='home-screen'>
      <div onClick={() => history.push('/artists')} className='home-icon-div'>
        <img style={{paddingTop: '16%', paddingBottom: '16%'}} className='home-icon' src={ArtistIcon} />
        <h1 className='small-margins center-text'>Artists</h1>
      </div>
      <div onClick={() => history.push('/search')} className='home-icon-div'>
        <img style={{paddingTop: '8%', paddingBottom: '8%'}} className='home-icon' src={SearchIcon} />
        <h1 className='small-margins center-text'>Search</h1>
      </div>
      <div onClick={() => history.push('/friends')} className='home-icon-div'>
        <img style={{paddingTop: '13%', paddingBottom: '13%'}}className='home-icon' src={FriendIcon} />
        <h1 className='small-margins center-text'>Friends</h1>
      </div>
    </div>
    </>
  ) :
  <div className='flex-column-center'>
  <h2 className='small-margins'>1. Signup/Login</h2>
  <h2 className='small-margins'>2. Connect to Your Spotify Account</h2>
  <h2 className='small-margins'>3. Search Spotify for Albums</h2>
  <h2 className='small-margins'>4. Add Album To Your Collection with Genres and Tags</h2>
  <h2 className='small-margins'>5. Filter Your Collection to Easily Find An Album To Fit The Mood</h2>
  <h2 className='small-margins'>6. Create Draggable Lists</h2>
  <h2 className='small-margins'>7. Find Friends With Similar Collections</h2>
  </div>
}

export default Home;