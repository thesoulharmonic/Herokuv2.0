import React, { useEffect, useState } from "react";
import "./App.css";
import { Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [backendData, setbackEndData] = useState([{}]); // set useStates
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch("/api")
      .then(
        // fetches the api - added proxy to server in package.json
        (response) => response.json()
      ) // gets json data
      .then((data) => {
        setbackEndData(data); // sets json data to setbackEndData
      });
  }, []); // set to an empty array so it only runs on the first render of the data

  const handleDelete = (title) => {
    fetch(`http://localhost:3001/api/${title}`, {
      // gets the JSON item by title set in server
      method: "DELETE", // method
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          setbackEndData(
            backendData.filter((item) => item.user.title !== title) // filter to get item title
          );
          window.location.reload(); // refreshes app to reload data
        }
        return res.json();
      })
      .then((response) => alert("Success:", response))
      .catch((error) => console.error("Error:", error));
  };

  ////
  const handleUpdateState = () => {
    setIsEditing(!isEditing);
    if (editButton === "Save") {
      window.location.reload(); // reload on Save
    }
  };

  const editButton = !isEditing ? "Edit" : "Save"; // sets butotn text to Save once pressed
  // const refreshEdit = () => {
  //   if (isEditing === "Save") {
  //     window.location.reload();
  //   }
  // };

  const handleUpdate = (event, updatedData) => {
    event.preventDefault();
    fetch(`http://localhost:3001/api/${updatedData.title}`, {
      // PUT method
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Success:", response);
        if (isEditing === "Save") {
          window.location.reload();
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <Container>
        <h1>Latest Projects </h1>
        {typeof backendData[0].user === "undefined" ? (
          <p>Loading</p>
        ) : (
          backendData[0].user.map((user, i) => (
            <Row key={i}>
              <div className="userBox d-flex justify-content-between">
                <div className="profile col-4">
                  <span className="profilePic">
                    <img src={user.profilePic} alt={`${user.name} profile`} />
                  </span>
                  <span className="userInfoHead"> Username:</span>
                  <span className="userInfo">{user.username}</span>
                  <span className="userInfoHead"> Email:</span>{" "}
                  <span className="userInfo">
                    <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                  </span>
                </div>
                <div className="col-8">
                  <span className="userInfoHead"> Project Name: </span>
                  <span className="userInfo">{user.title}</span>
                  <span className="userInfoHead"> Description:</span>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={user.description}
                      onBlur={(event) =>
                        handleUpdate(event, {
                          ...user,
                          description: event.target.value,
                        })
                      }
                    />
                  ) : (
                    <span className="userInfo">{user.description}</span>
                  )}
                  <span className="userInfoHead"> Link:</span>{" "}
                  <span className="userInfo">
                    <a href={user.link}>{user.link}</a>
                  </span>
                  <button
                    name="delete"
                    type="delete"
                    className="btn btn-primary"
                    onClick={() => handleDelete(user.title)}
                  >
                    Delete
                  </button>
                  <button
                    name="edit"
                    type="edit"
                    className="btn btn-primary editButton"
                    onClick={() => handleUpdateState()}
                  >
                    {editButton}
                  </button>
                </div>
              </div>
            </Row>
          ))
        )}
      </Container>
    </>
  );
}

export default App;
