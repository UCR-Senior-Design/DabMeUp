import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../firebase'; // Ensure this is the correct path
import { ref, query, orderByChild, startAt, endAt, onValue } from "firebase/database";

const Dashboard = () => {
  let navigate = useNavigate();
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
    <div className="overlay">
      <h1>Dashboard</h1>
      <button onClick={() => navigate('/Profile')}>Profile</button>
      <button onClick={() => navigate('/Settings')}>Settings</button>
      <div>
        <input
          type="text"
          placeholder="Search users by first name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={searchUsers}>Search</button>
      </div>
      {isLoading && <div>Loading...</div>}
      {noResults && <div>No users found.</div>}
      <div>
        {searchResults.map((user) => (
          <div key={user.id}>{user.first_name}</div>
        ))}
      </div>
      {/* Other dashboard content */}
    </div>
  );
};

export default Dashboard;
