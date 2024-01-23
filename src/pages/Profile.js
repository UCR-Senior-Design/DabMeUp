import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import "./Profile.css" 

const Profile = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [friendPreference, setFriendPreference] = useState("");
  const [interests, setInterests] = useState([]);
  const navigate = useNavigate();

  const auth = getAuth();
  const database = getDatabase();

  const handleInterestChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setInterests(selectedOptions);
  };

  const handleSave = () => {
    const user = auth.currentUser;

    if (user) {
      get(ref(database, 'users/' + user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          const existingData = snapshot.val();
          const updatedProfile = {
            ...existingData,
            name: name || existingData.name,
            age: age || existingData.age,
            friendPreference: friendPreference || existingData.friendPreference,
            interests: interests.length > 0 ? interests : existingData.interests,
            email: user.email
          };
  
          set(ref(database, 'users/' + user.uid), updatedProfile)
            .then(() => {
              console.log('Profile saved!');
              alert('Profile saved successfully!');
              navigate('/Dashboard');
            })
            .catch((error) => {
              console.error('Error saving profile: ', error);
              alert('Error saving profile: ' + error.message);
            });
        } else {
          // STILL NEEDS TO BE FIXED!
          // Handle case where there is no existing data
          // (e.g., creating a new profile)
          alert('new profile created!'); 
          navigate('/Dashboard');
        }
      }).catch((error) => {
        console.error('Error fetching profile: ', error);
        alert('Error fetching profile: ' + error.message);
      });
    } else {
      console.log('No user is signed in.');
      alert('No user is signed in.');
    }
  };

  // Load user data when the component mounts
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, you can fetch their profile here if needed
      } else {
        // User is signed out
        navigate('/login'); // redirect to login page
      }
    });
  }, [auth, navigate]);

  return (
    <div className = "profile-container">
      <h2>Profile</h2>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
      <select value={friendPreference} onChange={e => setFriendPreference(e.target.value)}>
        <option value="">Select Preference</option>
        <option value="guys">Guys</option>
        <option value="girls">Girls</option>
      </select>
      <select multiple={true} value={interests} onChange={handleInterestChange}>
        <option value="a">Interest A</option>
        <option value="b">Interest B</option>
        <option value="c">Interest C</option>
        <option value="d">Interest D</option>
        <option value="e">Interest E</option>
        <option value="f">Interest F</option>
      </select>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Profile;

