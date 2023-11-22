import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [schoolYear, setSchoolYear] = useState('');
    const [interest, setInterest] = useState('');
    const navigate = useNavigate();

    const handleSave = (event) => {
        event.preventDefault();
        // Logic to save profile information goes here
        navigate('/landing');
    };

    return (
        <div>
            <form onSubmit={handleSave}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <input type="text" placeholder="School Year" value={schoolYear} onChange={(e) => setSchoolYear(e.target.value)} />
                <select value={interest} onChange={(e) => setInterest(e.target.value)}>
                    <option value="">Select Interest</option>
                    <option value="optionA">Option A</option>
                    <option value="optionB">Option B</option>
                    <option value="optionC">Option C</option>
                </select>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default ProfilePage;
