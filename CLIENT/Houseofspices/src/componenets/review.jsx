import React, { useState, useEffect } from "react";
import axios from "axios";

function ReviewData() {
    const [users, setUsers] = useState([]);
    const [experience, setexperience] = useState("");
    const [file, setFile] = useState(null);
    const [needToUpdate, setNeedToUpdate] = useState(false);
    const [updateexperience, setUpdateexperience] = useState("");
    const [updateFile, setUpdateFile] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const dataOfUsers = await axios.get("http://localhost:5000/getfile");
                setUsers(dataOfUsers.data.listexp);
                console.log(dataOfUsers.data)
            } catch (err) {
                console.log("Error fetching experiences:", err);
            }
        };
        getUsers();
    }, []);

    const updateRequest = async () => {
        if (!id) return;
        const userToUpdate = users.find(user => user._id === id);
        if (!userToUpdate) return;

        try {
            let image = updateFile;
            if (updateFile && updateFile !== userToUpdate.image) {
                const formData = new FormData();
                formData.append("file", updateFile);
                formData.append("upload_preset", "x31quij6");
                const response = await axios.post("https://api.cloudinary.com/v1_1/dg6izvre4/image/upload", formData);
                image = response.data.secure_url;
            }
            const updatedData = await axios.put(`http://localhost:5000/updateExp/${id}`, {
                experience: updateexperience,
                image
            });
            setUsers(users.map(user => user._id === id ? { ...user, experience: updatedData.data.experience, image: updatedData.data.image } : user));
            setNeedToUpdate(false);
            setUpdateexperience("");
            setUpdateFile(null);
            setId(null);
        } catch (err) {
            console.log("Error updating experience:", err);
        }
    };

    const handleInput = (event) => {
        setexperience(event.target.value);
    };

    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const postexperience = async (event) => {
        event.preventDefault();
        try {
            let image = "";
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "x31quij6");
                const response = await axios.post("https://api.cloudinary.com/v1_1/dg6izvre4/image/upload", formData);
                image = response.data.secure_url;
            }
            const newData = await axios.post("http://localhost:5000/postfile", {
                experience,
                image
            });
            setexperience("");
            setFile(null);
            setUsers([...users, newData.data]);
        } catch (err) {
            console.log("Error posting experience:", err);
        }
    };

    const deleteRequest = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/deletefile/${id}`);
            setUsers(users.filter(user => user._id !== id));
        } catch (err) {
            console.log("Error deleting experience:", err);
        }
    };
    return (
        <div>
            <div>
                {users.map((user) => {
                    console.log(user._id)
                    if (!user) return null;
                    return (
                        <div key={user._id} className="experience-card">
                            <p>{user.experience}</p>
                            <img src={user.image} alt="" className="experience-image" />
                            <div>
                                <button onClick={() => {
                                    setNeedToUpdate(true);
                                    setUpdateexperience(user.experience);
                                    setUpdateFile(user.image);
                                    setId(user._id);
                                }}>Update</button>
                                <button onClick={() => deleteRequest(user._id)}>Delete</button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="input-container">
                <label htmlFor="inputFiles">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRxjZhawty_IUsjt2xke_qk2AIZCpVd7luGJrTo-emag&s" alt="" className="input-image" />
                    <input type="file" onChange={needToUpdate ? (e) => setUpdateFile(e.target.files[0]) : handleFileUpload} id="inputFiles" accept="image/*" />
                </label>
                <input type="text" className="input-field" onChange={needToUpdate ? (e) => setUpdateexperience(e.target.value) : handleInput} placeholder="WRITE YOUR experience" value={needToUpdate ? updateexperience : experience} />
                <img src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-squares-01/3/89-512.png" alt="" className="submit-icon" onClick={needToUpdate ? updateRequest : postexperience} />
            </div>
        </div>
    );
}

export default ReviewData;
