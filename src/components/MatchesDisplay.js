import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase'; // Ensure this path correctly points to your Firebase setup file

const MatchesDisplay = ({ currentUserID }) => {
    const [matchedProfiles, setMatchedProfiles] = useState([]);

    useEffect(() => {
        if (!currentUserID) {
            console.log("No current user ID provided.");
            return;
        }

        const matchesRef = ref(database, `matches/${currentUserID}`);
        onValue(matchesRef, snapshot => {
            const matchesData = snapshot.val();
            if (!matchesData) {
                setMatchedProfiles([]);
                return;
            }

            const matchIDs = Object.keys(matchesData);
            const profilesPromises = matchIDs.map(matchUserID => (
                new Promise(resolve => {
                    const userRef = ref(database, `users/${matchUserID}`);
                    onValue(userRef, snap => {
                        const profile = snap.val();
                        if (profile) {
                            resolve({ ...profile, userID: matchUserID });
                        } else {
                            resolve(null); // Handle case where user data might not exist or be accessible
                        }
                    }, { onlyOnce: true });
                })
            ));

            Promise.all(profilesPromises).then(profiles => {
                const validProfiles = profiles.filter(profile => profile !== null);
                setMatchedProfiles(validProfiles);
            });
        }, { onlyOnce: true });
    }, [currentUserID]);

    return (
        <div className="matches-display">
            {matchedProfiles.map((profile) => {
                // Log the photoURL to the console
                console.log(profile.photoURL); 

                return (
                    <div key={profile.userID} className="match-profile">
                        <img 
                            src={profile.photoURL || 'path/to/default/image.jpg'} 
                            alt={profile.first_name || "Match's photo"} 
                            className="match-photo" 
                        />
                        <div>{profile.first_name}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default MatchesDisplay;














