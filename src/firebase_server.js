const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const firebaseAdmin = require('firebase-admin');

const serviceAccount = require('/Users/enduser/Desktop/palz-53350-firebase-adminsdk-utx9k-311bbf4e55.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://palz-53350-default-rtdb.firebaseio.com" // Ensure you replace this with your actual Realtime Database URL
});

// Access to Realtime Database instead of Firestore
const db = firebaseAdmin.database();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

// Your existing endpoint implementations (signup, login, etc.)

// New endpoint to find matches
app.get('/find-matches', async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).send('User ID is required');
  }

  const usersRef = db.ref(`users`);
  usersRef.once('value', snapshot => {
    const users = snapshot.val();
    const requestingUser = users[userId];

    if (!requestingUser) {
      return res.status(404).send('Requesting user not found');
    }

    const matches = Object.keys(users).filter(key => {
      const user = users[key];
      // Implement your matching criteria here
      return user.genderIdentity === requestingUser.lookingForGender &&
             user.lookingForGender === requestingUser.genderIdentity;
             // Add more conditions as needed
    }).map(key => ({
      userId: key,
      ...users[key]
    }));

    res.json(matches);
  }, error => {
    console.error(error);
    res.status(500).send('Error finding matches');
  });
});

// Listen on the configured port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
