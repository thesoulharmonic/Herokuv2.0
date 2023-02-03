import React, { useState } from "react";
import { Container } from "react-bootstrap";
// https://bootsnipp.com/forms bootstrap form builder


const UserForm = () => {
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("../img/profilePic2.jpg");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

//const formData = [];

const handleSubmit = (event) => {
  event.preventDefault();
  const data = { username, profilePic, title, email, description, link };
  fetch("http://localhost:3001/api", { // fetch API
    method: "POST", // uses POST method to add a new entry
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((response) => alert("Success:", response))
    .catch((error) => console.error("Error:", error))
    setUsername('') // sets inputs to empty stirng on submit
    setTitle('')
    setEmail('')
    setDescription('')
    setLink('')
};


  return (

    <Container>
    <form className="form-horizontal projectSubmitBox">
      <fieldset>
        <legend>Add a new project</legend>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="username">
            Username
          </label>
          <div className="col-md-4">
            <input
              id="username"
              name="username"
              type="text"
              placeholder="username"
              className="form-control input-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              ></input>
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="title">
            Profile Picture
          </label>
          <div className="col-md-4">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="placeholder"
              className="form-control input-md"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="title">
            Project Title
          </label>
          <div className="col-md-4">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="placeholder"
              className="form-control input-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="email">
            Email
          </label>
          <div className="col-md-4">
            <input
              id="email"
              name="email"
              type="text"
              placeholder="email"
              className="form-control input-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="description">
            Description
          </label>
          <div className="col-md-4">
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="link">
            Repository Link
          </label>
          <div className="col-md-4">
            <input
              id="link"
              name="link"
              type="text"
              placeholder="link"
              className="form-control input"
              value={link}
              onChange={(e) => setLink(e.target.value)}

            ></input>
             <div className="col-md-4">
             <button name="submit" type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
    </Container>

  );
};

export default UserForm