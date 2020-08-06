const express = require('express');
const router = express.Router();
const Note = require('../models/Note.js');
const data = require('../src/data.js');

// get all information available in data for this sensor
router.get('/', async (req, res) => {
     try {
        const allInfo = data[0];
        res.json(allInfo);
     } catch (e) {
         console.log(e);
         console.log(res.status);
     }
 });

 // get all notes associated with sensor
router.get('/notes', async (req, res) => {
   try {
      const allNotes = data[0]['notes'];
      res.json(allNotes);
   } catch (e) {
      console.log(e);
      console.log(res.status);
   }
});

// get a note by number
router.get('/notes/:number(\\d+)/', async (req, res) => {
   try {
      const int_number = parseInt(req.params.number)
      const numberNote = data[0]['notes'][int_number];
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
   const postNumber = data[0]['notes'].length
   const note = new Note({
      number: postNumber.toString(),
      text: req.body.text
   });
   try {
      data[0]['notes'].push(note);
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
      const toDelete = data[0]['notes'][postNumber];
      data[0]['notes'].splice(postNumber, 1);
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
      data[0]['notes'][postNumber]['text'] = req.body.text;
      const updatedPost = data[0]['notes'][postNumber];
      res.json(updatedPost);
   } catch (e) {
      console.log(e);
      console.log(res.status);
   }
});


module.exports = router;