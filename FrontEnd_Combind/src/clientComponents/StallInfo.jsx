import React from 'react'
import { useState } from 'react';

const StallInfo = ({ ownerID } ) => {
    const [profile, setProfile] = useState({
        StallOwnerID: "67286dca2df6852ad96840b5", 
        restaurant: {
            name: "Thai Delight Restaurant", 
            photo: "https://imageawsmenubucket.s3.ap-southeast-1.amazonaws.com/1731931846839-thai_restaurant.avif", 
        },
        location: {
            address: "1234 Food Street",
            city: "Bangkok", 
            state: "Bangkok", 
        },
        opening_hours: [
            { weekday: "Monday", open_time: "09:00", close_time: "21:00" },
            { weekday: "Tuesday", open_time: "09:00", close_time: "21:00" },
            { weekday: "Wednesday", open_time: "09:00", close_time: "21:00" },
            { weekday: "Thursday", open_time: "09:00", close_time: "21:00" },
            { weekday: "Friday", open_time: "09:00", close_time: "21:00" },
            { weekday: "Saturday", open_time: "09:00", close_time: "17:00" },
            { weekday: "Sunday", open_time: "09:00", close_time: "17:00" },
        ],
        contact: {
            email: "stallMate@gmail.com", 
            phone: "1234567890", 
        },
    });
    const [selectedDay, setSelectedDay] = useState(profile.opening_hours[0].weekday);

    const handleDayChange = (e) => {
        setSelectedDay(e.target.value);
    }
    const selectedDayHours = profile.opening_hours.find(day => day.weekday === selectedDay);
  
    return (
    <div className='container d-flex flex-column justify-content-center align-items-center'>
        <div className="row d-flex justify-content-center align-items-center" style={{background:"#01040F", width:"90vw", height:"80vw", borderRadius:"5vw"}}>
            <img src={profile.restaurant.photo} alt="" style={{width:"50vw", borderRadius:"10vw", height:"auto"}}/>
            <div className='d-flex justify-content-center align-items-center display-6 text-white' style={{marginTop:"-10vw"}}>{profile.restaurant.name}</div>
        </div>
        <div className='d-flex flex-column'>
            <p className='text-white' style={{fontSize:"5vw", marginTop:"3vw"}}>Address</p>
            <div
                className="container d-flex align-items-center"
                style={{
                    background: "#01040F",
                    borderRadius: "3vw",
                    padding: "1vw 3vw", 
                    height: "12vw",
                    width: "90vw",
                }}
                >
                <p
                    className="text-white text-start"
                    style={{
                    fontSize: "4vw",
                    margin: 0, 
                    }}
                >
                    {profile.location.address}
                </p>
            </div>

            <p className='text-white' style={{fontSize:"5vw", marginTop:"3vw"}}>City</p>
            <div
                className="container d-flex align-items-center"
                style={{
                    background: "#01040F",
                    borderRadius: "3vw",
                    padding: "1vw 3vw", 
                    height: "12vw",
                    width: "90vw",
                }}
                >
                <p
                    className="text-white text-start"
                    style={{
                    fontSize: "4vw",
                    margin: 0, 
                    }}
                >
                    {profile.location.city}
                </p>
            </div>
            <p className='text-white' style={{fontSize:"5vw", marginTop:"3vw"}}>State</p>
            <div
                className="container d-flex align-items-center"
                style={{
                    background: "#01040F",
                    borderRadius: "3vw",
                    padding: "1vw 3vw", 
                    height: "12vw",
                    width: "90vw",
                }}
                >
                <p
                    className="text-white text-start"
                    style={{
                    fontSize: "4vw",
                    margin: 0, 
                    }}
                >
                    {profile.location.state}
                </p>
            </div>
            <p className='text-white' style={{fontSize:"5vw", marginTop:"3vw"}}>Email</p>
            <div
                className="container d-flex align-items-center"
                style={{
                    background: "#01040F",
                    borderRadius: "3vw",
                    padding: "1vw 3vw", 
                    height: "12vw",
                    width: "90vw",
                }}
                >
                <p
                    className="text-white text-start"
                    style={{
                    fontSize: "4vw",
                    margin: 0, 
                    }}
                >
                    {profile.contact.email}
                </p>
            </div>
            <p className='text-white' style={{fontSize:"5vw", marginTop:"3vw"}}>Tel.</p>
            <div
                className="container d-flex align-items-center"
                style={{
                    background: "#01040F",
                    borderRadius: "3vw",
                    padding: "1vw 3vw", 
                    height: "12vw",
                    width: "90vw",
                }}
                >
                <p
                    className="text-white text-start"
                    style={{
                    fontSize: "4vw",
                    margin: 0, 
                    }}
                >
                    {profile.contact.phone}
                </p>
            </div>
            <p className='text-white' style={{fontSize:"5vw", marginTop:"3vw"}}>Select a Day to View Hours</p>
            <select className='text-white' value={selectedDay} onChange={handleDayChange} style={{ fontSize: "4vw", padding: "2vw", margin: "10px 0" , borderRadius:"3vw", background:"#01040F", border:"none"}}>
                {profile.opening_hours.map((day, index) => (
                    <option key={index} value={day.weekday}>
                        {day.weekday}
                    </option>
                ))}
            </select>
            <div style={{ marginTop: "5vw", fontSize: "5vw" }}>
                <p className='text-white d-flex justify-content-start align-items-center' style={{fontSize:"5vw"}}>Opening Hours for {selectedDay}</p>
                <div
                    className="container d-flex justify-content-between align-items-center"
                    style={{
                        background: "#01040F",
                        borderRadius: "3vw",
                        padding: "0 3vw", 
                        height: "12vw",
                        width: "90vw",
                        marginTop: "3vw",
                        marginBottom: "5vw",
                    }}
                    >
                    <p
                        className="text-white text-start"
                        style={{
                        fontSize: "4vw",
                        margin: 0, 
                        }}
                    >
                        Open
                    </p>
                    <p
                        className="text-white text-center"
                        style={{
                        fontSize: "4vw",
                        margin: 0, 
                        }}
                    >
                        {selectedDayHours.open_time}
                    </p>
                </div>
                <div
                    className="container d-flex justify-content-between align-items-center"
                    style={{
                        background: "#01040F",
                        borderRadius: "3vw",
                        padding: "0 3vw", 
                        height: "12vw",
                        width: "90vw",
                        marginTop: "3vw",
                        marginBottom: "5vw",
                    }}
                    >
                    <p
                        className="text-white text-start"
                        style={{
                        fontSize: "4vw",
                        margin: 0, 
                        }}
                    >
                        Close
                    </p>
                    <p
                        className="text-white text-center"
                        style={{
                        fontSize: "4vw",
                        margin: 0, 
                        }}
                    >
                        {selectedDayHours.close_time}
                    </p>
                </div>

            </div>
        </div>


        
    </div>
  )
}

export default StallInfo