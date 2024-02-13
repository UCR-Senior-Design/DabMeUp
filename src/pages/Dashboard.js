import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatContainer from '../components/ChatContainer';
import TinderCard from 'react-tinder-card';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { database } from '../firebase'; // Ensure this is the correct path
import { ref, query, orderByChild, startAt, endAt, onValue } from "firebase/database";

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

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchUsers = () => {
    setIsLoading(true); // Start loading
    setNoResults(false); // Reset no results state
    setSearchResults([]); // Clear previous search results
  
    const usersRef = query(ref(database, 'users'), orderByChild('first_name'), startAt(searchTerm), endAt(searchTerm + "\uf8ff"));
    onValue(usersRef, snapshot => {
      console.log("Query completed");
      const users = snapshot.val();
      const searchResults = [];
      for (let id in users) {
        searchResults.push({ id, ...users[id] });
      }
      setIsLoading(false); // Stop loading
    
      if (!users || searchResults.length === 0) {
        console.log("No results found");
        setNoResults(true); // Set no results found
      } else {
        console.log("Results found", searchResults);
        setSearchResults(searchResults);
      }
    });    
  };

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
