const Note = require("../models/Note");

// In-memory 'database' object
const db = {
    sensors: [
      {
        id: 1,
        name: "North Sensor",
        description: "The sensor in the north",
        notes: []
      },
      {
        id: 2,
        name: "South Sensor",
        description: "The south field sensor",
        notes: []
      },
      {
        id: 3,
        name: "East Sensor",
        description: "The sensor on the east side",
        notes: []
      },
      {
        id: 4,
        name: "West Sensor",
        description: "The western most sensor",
        notes: []
      }
    ]
  };

// chose to create seperate data storage for notes because this is an existing system. In an existing system, reshaping the entire database structure wouldn't be wise.
module.exports = db.sensors;