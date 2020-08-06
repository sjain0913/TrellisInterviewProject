const Note = require("../models/Note");

// In-memory 'database' object
const db = {
    sensors: [
      {
        id: 1,
        name: "North Sensor",
        description: "The sensor in the north",
        notes: [new Note({
          number: 0,
          text: "This is a sample note!"
        })]
      },
      {
        id: 2,
        name: "South Sensor",
        description: "The south field sensor",
        notes: [new Note({
          number: 0,
          text: "This is a sample note!"
        })]
      },
      {
        id: 3,
        name: "East Sensor",
        description: "The sensor on the east side",
        notes: [new Note({
          number: 0,
          text: "This is a sample note!"
        })]
      },
      {
        id: 4,
        name: "West Sensor",
        description: "The western most sensor",
        notes: [new Note({
          number: 0,
          text: "This is a sample note!"
        })]
      }
    ]
  };

// chose to create seperate data storage for notes because this is an existing system. In an existing system, reshaping the entire database structure wouldn't be wise.
module.exports = db.sensors;