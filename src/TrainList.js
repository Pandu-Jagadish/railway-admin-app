// src/TrainList.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const TrainList = () => {
  const [trains, setTrains] = useState([]);
  const [editTrain, setEditTrain] = useState(null);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/trains");
        setTrains(response.data);
      } catch (error) {
        console.error("Failed to fetch trains:", error);
      }
    };

    fetchTrains();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/trains/${id}`);
      setTrains(trains.filter((train) => train._id !== id));
      alert("Train deleted successfully!");

      // Refetch the updated train list
      const response = await axios.get("http://localhost:5000/api/trains");
      setTrains(response.data);
    } catch (error) {
      console.error("Failed to delete train:", error);
      alert("Failed to delete train!");
    }
  };

  const handleUpdate = (train) => {
    setEditTrain(train);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTrain({ ...editTrain, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/trains/${editTrain._id}`,
        editTrain
      );
      setEditTrain(null);
      alert("Train updated successfully!");

      // Refetch the updated train list
      const response = await axios.get("http://localhost:5000/api/trains");
      setTrains(response.data);
    } catch (error) {
      console.error("Failed to update train:", error);
      alert("Failed to update train!");
    }
  };

  return (
    <div>
      <h2
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        Train List
      </h2>
      <div style={styles.container}>
        {trains.map((train) => (
          <div key={train._id} style={styles.card}>
            {editTrain && editTrain._id === train._id ? (
              <form style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="name">
                    Train Name:
                  </label>
                  <input
                    style={styles.input}
                    type="text"
                    id="name"
                    name="name"
                    value={editTrain.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="type">
                    Train Type:
                  </label>
                  <select
                    style={styles.input}
                    id="type"
                    name="type"
                    value={editTrain.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Goods">Goods</option>
                    <option value="Express">Express</option>
                    <option value="Passenger">Passenger</option>
                    <option value="Super Fast">Super Fast</option>
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="averageSpeed">
                    Average Speed:
                  </label>
                  <input
                    style={styles.input}
                    type="number"
                    id="averageSpeed"
                    name="averageSpeed"
                    value={editTrain.averageSpeed}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="departureStation">
                    Departure Station:
                  </label>
                  <input
                    style={styles.input}
                    type="text"
                    id="departureStation"
                    name="departureStation"
                    value={editTrain.departureStation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="expectedArrivalTime">
                    Expected Arrival Time:
                  </label>
                  <input
                    style={styles.input}
                    type="datetime-local"
                    id="expectedArrivalTime"
                    name="expectedArrivalTime"
                    value={editTrain.expectedArrivalTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button
                  style={styles.button}
                  type="button"
                  onClick={handleSave}
                >
                  Save
                </button>
              </form>
            ) : (
              <>
                <h3>{train.name}</h3>
                <p>Type: {train.type}</p>
                <p>Average Speed: {train.averageSpeed}</p>
                <p>Departure Station: {train.departureStation}</p>
                <p>Expected Arrival Time: {train.expectedArrivalTime}</p>
                <div style={styles.icons}>
                  <button onClick={() => handleDelete(train._id)}>
                    Delete
                  </button>
                  <button onClick={() => handleUpdate(train)}>Update</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    width: "300px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px",
  },
  icons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  form: {
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default TrainList;
