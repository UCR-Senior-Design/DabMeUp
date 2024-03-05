import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase'; 

const MatchesDisplay = ({ currentUserID, imageWidth = 300, imageHeight = 300 }) => {
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
                            resolve({
                                ...profile,
                                userID: matchUserID,
                                url: profile.url // Ensure this is the same property used in the user profiles
                            });
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

    const imageStyle = {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    };

    return (
        <div className="matches-display">
            {matchedProfiles.map((profile) => (
                <div key={profile.userID} className="match-profile">
                    <div style={{ ...imageStyle, backgroundImage: `url(${profile.url})` }} className="match-photo"></div>
                    <div>{profile.first_name}</div>
                </div>
            ))}
        </div>
    );
};

export default MatchesDisplay;
