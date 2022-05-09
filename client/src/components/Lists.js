import {useState} from 'react'
import SingleList from "./SingleList";
import AllLists from './AllLists';

function Lists(props) {

  const [showOneList, setShowOneList] = useState(false)
  return (
    <div>
      <button onClick={() => setShowOneList(!showOneList)}>{showOneList ? "Show All Lists" : "Select List"}</button>
      {showOneList 
        ?

      <div>
        <SingleList />
      </div>

        :
      
      <div>
        <AllLists />
      </div>}
    </div>
  );
}

export default Lists;