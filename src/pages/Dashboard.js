import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatContainer from '../components/ChatContainer';
import TinderCard from 'react-tinder-card';
import { database } from '../firebase';
import { ref, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth'; 

const Dashboard = () => {
  let navigate = useNavigate();
  const [userProfiles, setUserProfiles] = useState([]);
  const auth = getAuth(); 
  const currentUserId = auth.currentUser?.uid; 

  useEffect(() => {
    const usersRef = ref(database, 'users');
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();
      const profiles = [];
      for (let id in users) {
        if (id !== currentUserId) {
          let user = users[id];
          profiles.push({
            id: id,
            name: user.first_name,
            gender: `Gender: ${user.genderIdentity}`,
            url: user.url,
            about: `About me: ${user.about}`, 
            Interests: `Interests: ${user.interests}`,
          });
        }
      }
      setUserProfiles(profiles);
    });
  }, [currentUserId]); 

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
        <button className='aboutusbtn' >About Us</button>
        <button className='contactusbtn' >Contact Us</button>
        <button className='logoutbtn' onClick={() => navigate('/')}>Log Out</button>
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
                   <div className = 'name'>
                   <h3>Hello I am, {userProfile.name}</h3> 
                   </div> 
                   <div className = 'gender'>
                   <h3>{userProfile.gender}</h3>
                   </div> 
                   <div className = 'about'>
                   <h3>{userProfile.about}</h3>
                   </div> 
                   <div className = 'interest'>
                   <h3>{userProfile.Interests}</h3>
                   </div> 
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
