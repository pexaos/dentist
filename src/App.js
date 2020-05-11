import React, { useState } from "react";
import "./App.css";
import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "5px solid #ccc",
    borderRadius: "15px",
  },
};

function App() {
  const [availability, setAvailability] = useState({
    doctor: [],
    hygienist: [],
    assistant: [],
  });
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedColumn, setSelectColumn] = React.useState();
  const [selectedStartTime, setSelectedStartTime] = React.useState();
  const [selectedEndTime, setSelectedEndTime] = React.useState();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    if (selectedColumn && selectedEndTime && selectedStartTime) {
      availability[selectedColumn].push({
        startTime: selectedStartTime,
        endTime: selectedEndTime,
      });
      setAvailability(availability);
      setSelectColumn();
      setSelectedStartTime();
      setSelectedEndTime();
      setIsOpen(false);
    }
  }

  // const hoursOfOperation = Array.from(new Array(6), (x, i) => i + 9);
  const hoursOfOperation = [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
  ];
  const headers = [];
  const rows = [];
  const availabilityTimes = [];

  console.log(JSON.stringify(availability));

  var i = 0;
  for (const person in availability) {
    for (const index in availability[person]) {
      const entry = availability[person][index];
      const hours = entry["endTime"] - entry["startTime"];
      const startTime = entry["startTime"] - 9;
      availabilityTimes.push(
        <div
          className="AvailableTime"
          key={`${person}${entry}`}
          style={{
            height: `${hours * 100}px`,
            top: 258 + 44 + 100 * startTime,
            left: 260 + 220 * i,
          }}
        >
          Available
        </div>
      );
    }
    i++;
  }

  const employeeRows = [];

  for (const person in availability) {
    employeeRows.push(<td key={person}></td>);
  }

  headers.push(<th key="empty"></th>);

  for (const person in availability) {
    headers.push(
      <th className="Table-header" key={`header:${person}`}>
        {person}
      </th>
    );
  }

  for (i = 0; i < hoursOfOperation.length; i++) {
    rows.push(
      <tr key={i}>
        <td className="Row-time">{hoursOfOperation[i]}</td>
        {employeeRows}
      </tr>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Container">
          <div className="Button-container">
            <div className="App-button" onClick={openModal}>
              Add availability
            </div>
          </div>
          <table>
            <thead className="Table-header">
              <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
            {availabilityTimes}
          </table>
        </div>
      </header>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form>
          <div>Select a Column</div>
          <select
            value={selectedColumn}
            onChange={(e) => setSelectColumn(e.target.value)}
            id="cars"
            name="column"
          >
            <option value=""></option>
            <option value="doctor">Doctor</option>
            <option value="hygienist">Hygienist</option>
            <option value="assistant">Assistant</option>
          </select>
          <div>Select a start sime</div>
          <select
            value={selectedStartTime}
            onChange={(e) => setSelectedStartTime(e.target.value)}
            id="cars"
            name="startTime"
          >
            <option value=""></option>
            <option value="9">9 AM</option>
            <option value="10">10 AM</option>
            <option value="11">11 AM</option>
            <option value="12">12 AM</option>
            <option value="13">1 Pm</option>
            <option value="14">2 PM</option>
            <option value="15">3 PM</option>
          </select>
          <div>Select an end time</div>
          <select
            value={selectedEndTime}
            onChange={(e) => setSelectedEndTime(e.target.value)}
            id="cars"
            name="endTime"
          >
            <option value=""></option>
            <option value="9">9 AM</option>
            <option value="10">10 AM</option>
            <option value="11">11 AM</option>
            <option value="12">12 AM</option>
            <option value="13">1 Pm</option>
            <option value="14">2 PM</option>
            <option value="15">3 PM</option>
          </select>
        </form>
        <button onClick={closeModal}>Save</button>
      </ReactModal>
    </div>
  );
}

export default App;
