import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StallInfo = ({ ownerID }) => {
  const BACK_END_BASE_URL = import.meta.env.VITE_API_BACK_END_BASE_URL;
  const [profile, setProfile] = useState(null);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('ownerID:', ownerID);
    const getProfile = async () => {
        try {
          const response = await axios.get(`${BACK_END_BASE_URL}/dashboard/stallowner/${ownerID}/profile`, { withCredentials: true });
          console.log(response); 
          if (response.status === 200 && response.data.profile) {
            console.log('Profile fetched:', response.data.profile);
            setProfile(response.data.profile);
            setLoading(false);
          } else {
            console.log('Profile not found or invalid response');
            setProfile(null);
            setLoading(false); 
          }          
        } catch (error) {
          console.error('Error fetching profile:', error);
          setProfile(null);
          setLoading(true);
        }
      };      
    getProfile();
  }, []);  


  const [selectedDay, setSelectedDay] = useState('Monday');

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
    console.log(selectedDay);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  
    return (
        <div className='container d-flex flex-column justify-content-center align-items-center'>
          <div className="row d-flex justify-content-center align-items-center" style={{ background: "#01040F", width: "90vw", height: "80vw", borderRadius: "5vw" }}>
          <img
            src={profile.restaurant?.photo || "default_image_url.jpg"} 
            alt="Restaurant"
            style={{ width: "50vw", borderRadius: "10vw", height: "auto" }}
        />
            <div className='d-flex justify-content-center align-items-center display-6 text-white' style={{ marginTop: "-10vw" }}>
              {profile.restaurant.name}
            </div>
          </div>
      
          <div className='d-flex flex-column'>
            <p className='text-white' style={{ fontSize: "5vw", marginTop: "3vw" }}>Address</p>
            <div className="container d-flex align-items-center" style={{ background: "#01040F", borderRadius: "3vw", padding: "1vw 3vw", height: "12vw", width: "90vw" }}>
              <p className="text-white text-start" style={{ fontSize: "4vw", margin: 0 }}>
                {profile.restaurant.location.address}
              </p>
            </div>
      
            <p className='text-white' style={{ fontSize: "5vw", marginTop: "3vw" }}>City</p>
            <div className="container d-flex align-items-center" style={{ background: "#01040F", borderRadius: "3vw", padding: "1vw 3vw", height: "12vw", width: "90vw" }}>
              <p className="text-white text-start" style={{ fontSize: "4vw", margin: 0 }}>
                {profile.restaurant.location.city}
              </p>
            </div>
      
            <p className='text-white' style={{ fontSize: "5vw", marginTop: "3vw" }}>State</p>
            <div className="container d-flex align-items-center" style={{ background: "#01040F", borderRadius: "3vw", padding: "1vw 3vw", height: "12vw", width: "90vw" }}>
              <p className="text-white text-start" style={{ fontSize: "4vw", margin: 0 }}>
                {profile.restaurant.location.state}
              </p>
            </div>
      
            <p className='text-white' style={{ fontSize: "5vw", marginTop: "3vw" }}>Email</p>
            <div className="container d-flex align-items-center" style={{ background: "#01040F", borderRadius: "3vw", padding: "1vw 3vw", height: "12vw", width: "90vw" }}>
              <p className="text-white text-start" style={{ fontSize: "4vw", margin: 0 }}>
                {profile.restaurant.contact.email}
              </p>
            </div>
      
            <p className='text-white' style={{ fontSize: "5vw", marginTop: "3vw" }}>Tel.</p>
            <div className="container d-flex align-items-center" style={{ background: "#01040F", borderRadius: "3vw", padding: "1vw 3vw", height: "12vw", width: "90vw" }}>
              <p className="text-white text-start" style={{ fontSize: "4vw", margin: 0 }}>
                {profile.restaurant.contact.phone}
              </p>
            </div>
      
            <p className='text-white' style={{ fontSize: "5vw", marginTop: "3vw" }}>Select a Day to View Hours</p>
            <select className='text-white' value={selectedDay} onChange={handleDayChange} style={{ fontSize: "4vw", padding: "2vw", margin: "10px 0", borderRadius: "3vw", background: "#01040F", border: "none" }}>
              {profile.restaurant.opening_hours.map((day, index) => (
                <option key={index} value={day.weekday}>
                  {day.weekday}
                </option>
              ))}
            </select>

            <div style={{ marginTop: "5vw", fontSize: "5vw" }}>
              <p className='text-white d-flex justify-content-start align-items-center' style={{ fontSize: "5vw" }}>
                Opening Hours for {selectedDay}
              </p>
              {profile.restaurant.opening_hours.map((day, index) => {
                if (day.weekday === selectedDay) {
                  return (
                    <div key={index}>
                      <div className="container d-flex justify-content-between align-items-center" style={{ background: "#01040F", borderRadius: "3vw", padding: "0 3vw", height: "12vw", width: "90vw", marginTop: "3vw", marginBottom: "5vw" }}>
                        <p className="text-white text-start" style={{ fontSize: "4vw", margin: 0 }}>Open</p>
                        <p className="text-white text-center" style={{ fontSize: "4vw", margin: 0 }}>
                          {day.open_time}
                        </p>
                      </div>
                      <div className="container d-flex justify-content-between align-items-center" style={{ background: "#01040F", borderRadius: "3vw", padding: "0 3vw", height: "12vw", width: "90vw", marginTop: "3vw", marginBottom: "5vw" }}>
                        <p className="text-white text-start" style={{ fontSize: "4vw", margin: 0 }}>Close</p>
                        <p className="text-white text-center" style={{ fontSize: "4vw", margin: 0 }}>
                          {day.close_time}
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>

          </div>
        </div>
      )
      
}

export default StallInfo