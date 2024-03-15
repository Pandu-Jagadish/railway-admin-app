// src/AddTrainForm.js

import React, { useState } from "react";
import axios from "axios";

const AddTrainForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Goods",
    averageSpeed: "",
    departureStation: "",
    expectedArrivalTime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post("http://localhost:5000/api/trains", formData);
      alert("Train added successfully!");
      setFormData({
        name: "",
        type: "Goods",
        averageSpeed: "",
        departureStation: "",
        expectedArrivalTime: "",
      });
      // Reload the page after adding a train
      window.location.reload();
    } catch (error) {
      console.error("Failed to add train:", error);
      alert("Failed to add train!");
    }
  };

  return (
    <div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <h1>Admin Pannel</h1>
      </div>

      <div style={styles.container}>
        <h2 style={styles.heading}>Add Train</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="name">
              Train Name:
            </label>
            <input
              style={styles.input}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.type}
              onChange={handleChange}
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
              value={formData.averageSpeed}
              onChange={handleChange}
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
              value={formData.departureStation}
              onChange={handleChange}
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
              value={formData.expectedArrivalTime}
              onChange={handleChange}
              required
            />
          </div>
          <button style={styles.button} type="submit">
            Add Train
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
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

export default AddTrainForm;
