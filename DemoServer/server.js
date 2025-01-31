const express = require("express");
const cors = require("cors");

const app = express();
const port = 8888;

app.use(cors());
app.use(express.json());

let temperature = 0;
let humidity = 0;
let soilMoistureValue = 0;
let reedSwitchState = 0;
let relay1State = 0;
let relay2State = 0;
let relay3State = 0;
let relay4State = 0;

let periodStart = Date.now();
let periodDuration = 10000; // 10 seconds
let highValues = true;

function randomSensorData() {
  const now = Date.now();
  if (now - periodStart >= periodDuration) {
    highValues = !highValues;
    periodStart = now;
    periodDuration += 10000; // Increase duration by 10 seconds
  }

  if (highValues) {
    temperature = Math.floor(Math.random() * 40 + 60);
    humidity = Math.floor(Math.random() * 40 + 60);
    soilMoistureValue = Math.floor(Math.random() * 40 + 60);
  } else {
    temperature = Math.floor(Math.random() * 40);
    humidity = Math.floor(Math.random() * 40);
    soilMoistureValue = Math.floor(Math.random() * 40);
  }

  reedSwitchState = Math.floor(Math.random() * 2);
}

app.get("/data", (req, res) => {
  randomSensorData();
  res.json({
    temperature,
    humidity,
    soil_moisture: soilMoistureValue,
    reed_switch_state: reedSwitchState,
    relay1_state: relay1State,
    relay2_state: relay2State,
    relay3_state: relay3State,
    relay4_state: relay4State,
  });
});

// Relay 1 control routes
app.post("/relay1/on", (req, res) => {
  relay1State = 1;
  res.send("Relay 1 turned on");
});

app.post("/relay1/off", (req, res) => {
  relay1State = 0;
  res.send("Relay 1 turned off");
});

// Relay 2 control routes
app.post("/relay2/on", (req, res) => {
  relay2State = 1;
  res.send("Relay 2 turned on");
});

app.post("/relay2/off", (req, res) => {
  relay2State = 0;
  res.send("Relay 2 turned off");
});

// Relay 3 control routes
app.post("/relay3/on", (req, res) => {
  relay3State = 1;
  res.send("Relay 3 turned on");
});

app.post("/relay3/off", (req, res) => {
  relay3State = 0;
  res.send("Relay 3 turned off");
});

// Relay 4 control routes
app.post("/relay4/on", (req, res) => {
  relay4State = 1;
  res.send("Relay 4 turned on");
});

app.post("/relay4/off", (req, res) => {
  relay4State = 0;
  res.send("Relay 4 turned off");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
