import React, { useState } from "react";

const Profile = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [friendPreference, setFriendPreference] = useState("");
  const [interests, setInterests] = useState([]);

  const handleInterestChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setInterests(selectedOptions);
  };

  const handleSave = () => {
    // Save logic here
    console.log({ name, age, friendPreference, interests });
  };

  return (
    <div>
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
