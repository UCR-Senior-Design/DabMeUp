import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatContainer from "../components/ChatContainer";
import TinderCard from 'react-tinder-card';
import { database } from '../firebase'; // Make sure this path is correct
import { ref, onValue } from "firebase/database";

const Dashboard = () => {
  let navigate = useNavigate();
  
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    const usersRef = ref(database, 'users'); 
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();
      const profiles = [];
      for (let id in users) {
        let user = users[id];
        profiles.push({
          id: id,
          name: user.first_name,
          gender: `Gender: ${user.genderIdentity}`,
          url: user.url,
          about: `About me: ${user.about}, Interests: ${user.interests}`,
        });
      }
      setUserProfiles(profiles);
    });
  }, []);

  const [lastDirection, setLastDirection] = useState(); 

  const swiped = (direction, name) => {
    console.log('removing: ', name);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

  return (
    <div className="dashboard">
      <div className='navbar'>
        <button className='profbtn' onClick={() => navigate('/Profile')}>Profile</button>
        <button className='settbtn' onClick={() => navigate('/Settings')}>Settings</button>
      </div>
      <div className="pals"><h1>Palz</h1></div>
      <ChatContainer/>
      <div className='swipe-container'>
        <div className='cardcontainer'>
          {userProfiles.map((userProfile) => 
            <TinderCard className='swipe' key={userProfile.id} 
                        onSwipe={(dir) => swiped(dir, userProfile.name)} 
                        onCardLeftScreen={() => outOfFrame(userProfile.name)}>
              <div style={{backgroundImage: `url(${userProfile.url})`}} className="card">
                <div className='details'>
                  <div className='info'>
                    <h3>{userProfile.name}</h3>
                    <h3>{userProfile.gender}</h3>
                    <h3>{userProfile.about}</h3>
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
