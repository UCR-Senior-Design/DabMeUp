import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
 
import Nav from '../components/Nav'

const Profile = () => {
  const auth = getAuth();
  const database = getDatabase();
  const [selectedInterest, setSelectedInterest] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    url: "",
    about: "",
    matches: []

  }); 

  let navigate = useNavigate() 
  const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

  const handleSave = () => {
    const user = auth.currentUser;
    
    if (user) {
      
    
   
      get(ref(database, 'users/' + user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          const existingData = snapshot.val();
          const updatedProfile = {
            ...existingData,
            userName: formData.userName, // or use formData.first_name if you kept the original naming
            dob: `${formData.dob_day}/${formData.dob_month}/${formData.dob_year}`,
            showGender: formData.show_gender,
            genderIdentity: formData.gender_identity,
            genderInterest: formData.gender_interest,
            about: formData.about,
            url: formData.url,
            interests: formData.selectedInterest, 
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
          alert('No user is signed in.'); 
          console.log('No user is signed in.')
          navigate('/Dashboard');
        }
      })
      .catch((error) => {
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
    <>
        <Nav
            minimal={true}
            setShowModal={() => {
            }}
            showModal={false}
        />

        <div className="profile">
            <h2>CREATE ACCOUNT</h2>

            <form onSubmit={(e) => { 
              e.preventDefault(); 
              handleSave(); 
            }}>
                <section>
                    <label htmlFor="first_name">First Name</label>
                    <input
                        id="first_name"
                        type='text'
                        name="first_name"
                        placeholder="First Name"
                        required={true}
                        value={formData.first_name}
                        onChange={handleChange}
                    />

                    <label>Birthday</label>
                    <div className="multiple-input-container">
                        <input
                            id="dob_day"
                            type="number"
                            name="dob_day"
                            placeholder="DD"
                            required={true}
                            value={formData.dob_day}
                            onChange={handleChange}
                        />

                        <input
                            id="dob_month"
                            type="number"
                            name="dob_month"
                            placeholder="MM"
                            required={true}
                            value={formData.dob_month}
                            onChange={handleChange}
                        />

                        <input
                            id="dob_year"
                            type="number"
                            name="dob_year"
                            placeholder="YYYY"
                            required={true}
                            value={formData.dob_year}
                            onChange={handleChange}
                        />
                    </div>

                    <label>Gender</label>
                    <div className="multiple-input-container">
                        <input
                            id="man-gender-identity"
                            type="radio"
                            name="gender_identity"
                            value="man"
                            onChange={handleChange}
                            checked={formData.gender_identity === "man"}
                        />
                        <label htmlFor="man-gender-identity">Man</label>
                        <input
                            id="woman-gender-identity"
                            type="radio"
                            name="gender_identity"
                            value="woman"
                            onChange={handleChange}
                            checked={formData.gender_identity === "woman"}
                        />
                        <label htmlFor="woman-gender-identity">Woman</label>
                        <input
                            id="more-gender-identity"
                            type="radio"
                            name="gender_identity"
                            value="more"
                            onChange={handleChange}
                            checked={formData.gender_identity === "more"}
                        />
                        <label htmlFor="more-gender-identity">More</label>
                    </div>

                    <label htmlFor="show-gender">Show Gender on my Profile</label>

                    <input
                        id="show-gender"
                        type="checkbox"
                        name="show_gender"
                        onChange={handleChange}
                        checked={formData.show_gender}
                    />

                    <label>Show Me</label>

                    <div className="multiple-input-container">
                        <input
                            id="man-gender-interest"
                            type="radio"
                            name="gender_interest"
                            value="man"
                            onChange={handleChange}
                            checked={formData.gender_interest === "man"}
                        />
                        <label htmlFor="man-gender-interest">Man</label>
                        <input
                            id="woman-gender-interest"
                            type="radio"
                            name="gender_interest"
                            value="woman"
                            onChange={handleChange}
                            checked={formData.gender_interest === "woman"}
                        />
                        <label htmlFor="woman-gender-interest">Woman</label>
                        <input
                            id="everyone-gender-interest"
                            type="radio"
                            name="gender_interest"
                            value="everyone"
                            onChange={handleChange}
                            checked={formData.gender_interest === "everyone"}
                        />
                        <label htmlFor="everyone-gender-interest">Everyone</label>

                    </div>
                    <label htmlFor="interests">Interests</label>
                      <select
                        id="interests"
                        name="interests"
                        value={selectedInterest}
                        onChange={(e) => setSelectedInterest(e.target.value)}
                        required={true}
                      >
                        <option value="">Select an Interest</option>
                        <option value="sports">Sports</option>
                        <option value="books">Books</option>
                        <option value="exercising">Exercising</option>
                        <option value="technology">Technology</option>
                        <option value="gaming">Gaming</option>
                        <option value="music">Music</option>
                        <option value="movies">Movies</option>
                        <option value="art">Art</option>
                        <option value="traveling">Traveling</option>
                        <option value="cooking">Cooking</option>
                      </select>

                    <label htmlFor="about">About me</label>
                    <input
                        id="about"
                        type="text"
                        name="about"
                        required={true}
                        placeholder="I like long walks..."
                        value={formData.about}
                        onChange={handleChange}
                    />

                    <input type="submit"/>
                </section>

                <section>

                    <label htmlFor="url">Profile Photo</label>
                    <input
                        type="url"
                        name="url"
                        id="url"
                        onChange={handleChange}
                        required={true}
                    />
                    <div className="photo-container">
                        {formData.url && <img src={formData.url} alt="profile pic preview"/>}
                    </div>


                </section>

            </form>
        </div>
    </>
)
};

export default Profile;

