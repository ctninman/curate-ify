import { useEffect, useContext } from 'react';
import { AppContext } from './AppContext';


function OtherUser() {

  const {selectedOtherUser} = useContext(AppContext)
  


  useEffect (() => {
    if (selectedOtherUser) {
      setOtherUserCollection(selectedOtherUser.albums)
      setOtherUserLists(selectedOtherUser.lists)
    }
  }, [selectedOtherUser])

  return selectedOtherUser ? (
    <div>
      <h1>Other: {selectedOtherUser.username}</h1>
    </div>
  ) 
  :null
}

export default OtherUser;