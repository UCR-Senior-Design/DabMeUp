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
      name: 'Name of profile',
      url: 'https://i.imgur.com/oPj4A8u.jpg',
      gender: 'Gender: Man',
      about: 'About me: I am -- , I like to __, ____.'

    },

  ]

const[lastDirection, setLastDirection] = useState() 

  const swiped = (direction, swipedUserId) => {
    console.log('removing: ' )
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
        <TinderCard className='swipe' key = {character.name} 
                                    onSwipe = {(dir) => swiped(dir, character.name)} 
                                    onCardLeftScreen = {() => outOfFrame(character.name)}>
                                 <div   style={{backgroundImage: "url(" + character.url + ")"}}className="card">
                                    
                                   
                                    <div className='details'>
                                      <div className='info'>
                                    <h3>{character.name}</h3>
                                    <h3>{character.gender}</h3>
                                    <h3>{character.about}</h3>
                                    </div>
                                    </div>
                                </div>
        </TinderCard>
      
     )}
      </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
