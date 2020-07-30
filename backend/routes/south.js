const express = require('express');
const router = express.Router();
const Note = require('../models/Note.js');
const data = require('../src/data.js');

// get all information available in data for this sensor
router.get('/', async (req, res) => {
     try {
        const allInfo = data['sensors'][1];
        res.json(allInfo);
     } catch (e) {
         console.log(e);
         console.log(res.status);
     }
 });

 // get all notes associated with sensor
router.get('/notes', async (req, res) => {
   try {
      const allNotes = data['sensors'][1]['notes'];
      if (allNotes.length == 0) {
         res.json("No notes have been added for this sensor. Please post some notes!")
      } else {
         for (let i = 0; i < allNotes.length; i++) {
            res.json(allNotes[i]);
         }
      }
   } catch (e) {
      console.log(e);
      console.log(res.status);
   }
});

// get a note by id
router.get('/notes/:number(\\d+)/', async (req, res) => {
   try {
      const int_number = parseInt(req.params.number)
      const numberNote = data['sensors'][1]['notes'][int_number - 1];
      if (numberNote == null) {
         res.json(`Your specified Note with ID ${req.params.number} was not found!`);
      } else {
         res.json(numberNote);
      }
   } catch (e) {
      console.log(e);
      console.log(res.status);
   }
});

// post a note
router.post('/notes', async (req, res) => {
   console.log(req.body)
   console.log(req.body)
   const postNumber = data['sensors'][1]['notes'].length + 1
   const note = new Note({
      number: postNumber,
      text: req.body.text
   });
   try {
      data['sensors'][1]['notes'].push(note);
      res.json(note);
      console.log("post worked")
   } catch (e) {
      console.log(e);
      console.log(res.status);
   }
});

// delete a note by note number
router.delete('/notes/:postNumber(\\d+)/', async(req, res) => {
   try {
      const postNumber = parseInt(req.params.postNumber);
      const toDelete = data['sensors'][1]['notes'][postNumber - 1];
      data['sensors'][1]['notes'].splice(postNumber - 1, 1);
      res.json(toDelete);
   } catch (e) {
      console.log(e);
      console.log(res.status);
   }
})

// patch the text of a note by note number
router.patch('/notes/:postNumber(\\d+)/', async (req, res) => {
   try {
      const postNumber = parseInt(req.params.postNumber);
      data['sensors'][1]['notes'][postNumber - 1]['text'] = req.body.text;
      const updatedPost = data['sensors'][1]['notes'][postNumber - 1];
      res.json(updatedPost);
   } catch (e) {
      console.log(e);
      console.log(res.status);
   }
});


module.exports = router;