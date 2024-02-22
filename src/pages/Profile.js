import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import Nav from '../components/Nav';

const Profile = () => {
  const auth = getAuth();
  const database = getDatabase();
  const navigate = useNavigate();
  
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
    matches: [],
    interests: "",
  });

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const user = auth.currentUser;

    if (user) {
      const userProfileRef = ref(database, 'users/' + user.uid);
      const updatedProfile = {
        first_name: formData.first_name,
        dob: `${formData.dob_day}/${formData.dob_month}/${formData.dob_year}`,
        showGender: formData.show_gender,
        genderIdentity: formData.gender_identity,
        genderInterest: formData.gender_interest,
        about: formData.about,
        url: formData.url,
        interests: formData.interests,
      };

      set(userProfileRef, updatedProfile)
        .then(() => {
          alert('Profile saved successfully!');
          navigate('/Dashboard');
        })
        .catch((error) => {
          console.error('Error saving profile: ', error);
          alert('Error saving profile: ' + error.message);
        });
    } else {
      alert('No user is signed in.');
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });
  }, [auth, navigate]);

  return (
    <>
      <Nav
        minimal={true}
        setShowModal={() => {}}
        showModal={false}
      />
      <div className="profile">
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <section style={{ flex: 1, marginRight: "20px" }}>
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                type="text"
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
                  checked={formData.gender_identity === "man"}
                  onChange={handleChange}
                />
                <label htmlFor="man-gender-identity">Man</label>

                <input
                  id="woman-gender-identity"
                  type="radio"
                  name="gender_identity"
                  value="woman"
                  checked={formData.gender_identity === "woman"}
                  onChange={handleChange}
                />
                <label htmlFor="woman-gender-identity">Woman</label>

                <input
                  id="more-gender-identity"
                  type="radio"
                  name="gender_identity"
                  value="more"
                  checked={formData.gender_identity === "more"}
                  onChange={handleChange}
                />
                <label htmlFor="more-gender-identity">More</label>
              </div>

              <label htmlFor="show_gender">Show Gender on my Profile</label>
              <input
                id="show_gender"
                type="checkbox"
                name="show_gender"
                checked={formData.show_gender}
                onChange={handleChange}
              />

              <label>Show Me</label>
              <div className="multiple-input-container">
                <input
                  id="man-gender-interest"
                  type="radio"
                  name="gender_interest"
                  value="man"
                  checked={formData.gender_interest === "man"}
                  onChange={handleChange}
                />
                <label htmlFor="man-gender-interest">Man</label>

                <input
                  id="woman-gender-interest"
                  type="radio"
                  name="gender_interest"
                  value="woman"
                  checked={formData.gender_interest === "woman"}
                  onChange={handleChange}
                />
                <label htmlFor="woman-gender-interest">Woman</label>

                <input
                  id="everyone-gender-interest"
                  type="radio"
                  name="gender_interest"
                  value="everyone"
                  checked={formData.gender_interest === "everyone"}
                  onChange={handleChange}
                />
                <label htmlFor="everyone-gender-interest">Everyone</label>
              </div>
              <label htmlFor="interests">Interests</label>
              <select
                id="interests"
                name="interests"
                value={formData.interests|| ''}
                onChange={handleChange}
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

              <label htmlFor="about">About Me</label>
              <input
                id="about"
                type="text"
                name="about"
                placeholder="I like long walks..."
                required={true}
                value={formData.about}
                onChange={handleChange}
              />

              <input type="submit" value="Save Profile" style={{ marginTop: "20px" }} />
            </section>

            <section style={{ maxWidth: "300px" }}>
              <label htmlFor="url">Profile Photo</label>
              <input
                type="url"
                name="url"
                id="url"
                required={true}
                onChange={handleChange}
              />
              <div className="photo-container" style={{ marginTop: "20px" }}>
                {formData.url && <img src={formData.url} alt="profile preview" style={{ width: "100%", height: "auto" }} />}
              </div>
            </section>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;