import { useState, useEffect } from "react";
import { useOwnerAuth } from "../utilities/OwnerAuthContext";
import axios from "axios";
import './CreateStallProfile.css'

const BACK_END_BASE_URL = import.meta.env.VITE_API_BACK_END_BASE_URL;

const CreateStallProfile = () => {
    const { authData } = useOwnerAuth();

	const [profile, setProfile] = useState({
        fullName: "",
        bio: "",
        experienceYears: 0,
        profilePhoto: null,
        restaurantName: "",
        restaurantPhoto: null,
        location: {
            address: "",
            city: "",
            state: ""
        },
        openingHours: [], // Only collects days with opening hours set
        contact: {
            email: "",
            phone: ""
        }
    });

    const handleInputChange = (field, value) => {
        setProfile((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleNestedChange = (field, nestedField, value) => {
        setProfile((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                [nestedField]: value,
            },
        }));
    };

    const handleAddOpeningHours = () => {
        setProfile((prevState) => ({
            ...prevState,
            openingHours: [...prevState.openingHours, { weekday: "", open_time: "", close_time: "" }],
        }));
    };

    const handleOpeningHoursChange = (index, key, value) => {
        const updatedHours = [...profile.openingHours];
        updatedHours[index][key] = value;
        setProfile((prevState) => ({
            ...prevState,
            openingHours: updatedHours,
        }));
    };

    const handleRemoveOpeningHours = (index) => {
        const updatedHours = [...profile.openingHours];
        updatedHours.splice(index, 1);
        setProfile((prevState) => ({
            ...prevState,
            openingHours: updatedHours,
        }));
    };

    const handleFileChange = (field, file) => {
        setProfile((prevState) => ({
            ...prevState,
            [field]: file,
        }));
    };

	const validateForm = () => {
        // Ensure at least one day is selected
        if (profile.openingHours.length === 0) {
            alert("You must enter at least one opening day.");
            return false;
        }

        // Ensure all opening hours are valid
        for (let i = 0; i < profile.openingHours.length; i++) {
            const { open_time, close_time, weekday } = profile.openingHours[i];
            if (!weekday || !open_time || !close_time) {
                alert("Please complete all fields for opening hours.");
                return false;
            }
            if (open_time >= close_time) {
                alert(`Closing time must be later than opening time on ${weekday}.`);
                return false;
            }
        }

        // Ensure proper email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(profile.contact.email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        // Ensure proper phone number format for Thailand (10 digits starting with 0)
        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(profile.contact.phone)) {
            alert("Please enter a valid Thai phone number (e.g., 0812345678).");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
		e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const data = new FormData();
        data.append("fullName", profile.fullName);
		data.append("bio", profile.bio);
		data.append("experienceYears", profile.experienceYears);
		data.append("restaurantName", profile.restaurantName);

		// Send `location` as a proper object
		data.append("location[address]", profile.location.address);
		data.append("location[city]", profile.location.city);
		data.append("location[state]", profile.location.state);

		// Send `opening_hours` as separate fields (one per item in the array)
		profile.openingHours.forEach((day, index) => {
			data.append(`openingHours[${index}][weekday]`, day.weekday);
			data.append(`openingHours[${index}][open_time]`, day.open_time);
			data.append(`openingHours[${index}][close_time]`, day.close_time);
		});

		// Send `contact` as separate fields
		data.append("contact[email]", profile.contact.email);
		data.append("contact[phone]", profile.contact.phone);

		// Append files if they exist
		if (profile.profilePhoto) {
			data.append("profilePhoto", profile.profilePhoto);
		}
		if (profile.restaurantPhoto) {
			data.append("restaurantPhoto", profile.restaurantPhoto);
		}

		// Log FormData for debugging
		for (let pair of data.entries()) {
			console.log(`${pair[0]}: ${pair[1]}`);
		}
		
        console.log("Profile data being sent:", profile);

        try {
            const response = await axios.put(`${BACK_END_BASE_URL}/dashboard/stallowner/${authData.ownerData.ownerID}/profile`, data, { 
				withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Profile created successfully:", response.data);
            alert("Profile created successfully!");
        } catch (error) {
            console.error("Error creating profile:", error);
            alert("Failed to create profile.");
        }
    };

    return (
        <div className="insert-field">
            <form onSubmit={handleSubmit}>
                <div className="head-container">
                    <p>Seller Profile Form</p>
                </div>
                <div className="fname-container">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={profile.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            required
                        />
                </div>
                <div className="bio-container">
                        <label>Bio</label>
                        <textarea
                            placeholder="Bio"
                            value={profile.bio}
                            onChange={(e) => handleInputChange("bio", e.target.value)}
                            required
                        ></textarea>
                </div>
                <div className="experience-container">
                        <label>Experience Years</label>
                        <input
                            type="number"
                            placeholder="Experience Years"
                            value={profile.experienceYears}
                            onChange={(e) => handleInputChange("experienceYears", e.target.value)}
                            required
                        />
                </div>
                <div className="resname-container">
                        <label>Restaurant Name</label>
                        <input
                            type="text"
                            placeholder="Restaurant Name"
                            value={profile.restaurantName}
                            onChange={(e) => handleInputChange("restaurantName", e.target.value)}
                            required
                        />
                </div>
                <div className="location-container">
                        <p>Location</p>
                        <input
                            type="text"
                            placeholder="Address"
                            value={profile.location.address}
                            onChange={(e) => handleNestedChange("location", "address", e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="City"
                            value={profile.location.city}
                            onChange={(e) => handleNestedChange("location", "city", e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="State"
                            value={profile.location.state}
                            onChange={(e) => handleNestedChange("location", "state", e.target.value)}
                            required
                        />
                </div>
                <div className="openHour-container">
                        <p>Opening Hours</p>
                        {profile.openingHours.map((day, index) => (
                            <div className="openHour-item" key={index}>
                                <label>Day</label>
                                <select
                                    value={day.weekday}
                                    onChange={(e) =>
                                        handleOpeningHoursChange(index, "weekday", e.target.value)
                                    }
                                    required
                                >
                                    <option value="">Select Day</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select>
                                <label>Open Time</label>
                                <input
                                    type="time"
                                    placeholder="Open Time"
                                    value={day.open_time}
                                    onChange={(e) =>
                                        handleOpeningHoursChange(index, "open_time", e.target.value)
                                    }
                                    required
                                />
                                <label>Close Time</label>
                                <input
                                    type="time"
                                    placeholder="Close Time"
                                    value={day.close_time}
                                    onChange={(e) =>
                                        handleOpeningHoursChange(index, "close_time", e.target.value)
                                    }
                                    required
                                />
                                <button id="remove" type="button" onClick={() => handleRemoveOpeningHours(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button id="add" type="button" onClick={handleAddOpeningHours}>
                            Add Opening Hours
                        </button>
                </div>
                <div className="contact-container">
                        <p>Contact</p>
                        <input
                            type="email"
                            placeholder="Email"
                            value={profile.contact.email}
                            onChange={(e) => handleNestedChange("contact", "email", e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            value={profile.contact.phone}
                            onChange={(e) => handleNestedChange("contact", "phone", e.target.value)}
                            pattern="^0\d{9}$"
                            title="Please enter a valid Thai phone number (e.g., 0812345678)."
                            required
                        />
                </div>
                <div className="photo-container">
                        <p>Photos</p>
                        <label>Profile Photo:</label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange("profilePhoto", e.target.files[0])}
                        />
                        <label>Restaurant Photo:</label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange("restaurantPhoto", e.target.files[0])}
                        />
                        <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CreateStallProfile;