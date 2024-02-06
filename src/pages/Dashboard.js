import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatContainer from '../components/ChatContainer';
import TinderCard from 'react-tinder-card';
import { useState  } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Dashboard = () => {
  let navigate = useNavigate();

  const characters = [
    {
      name: 'card 1'
    },

  ]

const[lastDirection, setLastDirection] = useState() 

  const swiped = (direction, swipedUserId) => {
    if (direction === 'right') {
        // updateMatches(swipedUserId)
    }
    setLastDirection(direction)
}

const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
}


  return (
    <div  className= "dashboard">
      <div className='navbar'>
      <button className='profbtn' onClick={() => navigate('/Profile')}>Profile</button>
     
      <button className='settbtn' onClick={() => navigate('/Settings')}>Settings</button>

      {/* Other dashboard content */}
      </div>
      <div className = "pals"><h1>Palz</h1></div>
      
      
      <ChatContainer/>
     <div className='swipe-container'>
      <div className='cardcontainer'>

      {characters.map((character) => 
        <TinderCard className='swipe' key = {character.name} onSwipe = {(dir) => swiped(dir, character.name)} onCardLeftScreen = {() => outOfFrame(character.name)}>
          <div
                                    // style={{backgroundImage: "url(" + genderedUser.url + ")"}}
                                    // style={{backgroundImage: "url"}}
                                    className="card">
                                    {/* <h3>{genderedUser.first_name}</h3> */}
                                    <h3>{"cards"}</h3>
                                </div>
        </TinderCard>
      
     )}
      </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
