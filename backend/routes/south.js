const express = require('express');
const router = express.Router();
const Note = require('../models/Note.js');
const data = require('../src/data.js');

// get all information available in data for this sensor
router.get('/', async (req, res) => {
     try {
        const allInfo = data[1];
        res.json(allInfo);
     } catch (e) {
         console.log(e);
         console.log(res.status);
     }
 });

 // get all notes associated with sensor
router.get('/notes', async (req, res) => {
   try {
      const allNotes = data[1]['notes'];
      res.json(allNotes);
   } catch (e) {
      console.log(e);
      console.log(res.status);
   }
});

// get a note by number
router.get('/notes/:id', async (req, res) => {
   try {
      for (let i = 0; i < data[1]['notes'].length; i++) {
         if (data[1]['notes'][i]['_id'] == req.params.id) {
            const idNote = data[1]['notes'][i];
            res.json(idNote);
            break;
         }
      }
      res.json(`Your specified Note with ID ${req.params.id} was not found!`);
   } catch (e) {
      console.log(e);
      console.log(res.status);
   }
});

// post a note
router.post('/notes', async (req, res) => {
   const note = new Note({
      text: req.body.text
   });
   try {
      data[1]['notes'].push(note);
      res.json(note);
      console.log("post worked")
   } catch (e) {
      console.log(e);
      console.log(res.status);
   }
});

// delete a note by note number
router.delete('/notes/:id', async(req, res) => {
   try {
      for (let i = 0; i < data[1]['notes'].length; i++) {
         if (data[1]['notes'][i]['_id'] == req.params.id) {
            const toDelete = data[1]['notes'][i];
            data[1]['notes'].splice(i, 1)
            res.json(toDelete);
            break;
         }
      }
   } catch (e) {
      console.log(e);
      console.log(res.status);
   }
})

// patch the text of a note by note number
router.patch('/notes/:id', async (req, res) => {
   try {
      for (let i = 0; i < data[1]['notes'].length; i++) {
         if (data[1]['notes'][i]['_id'] == req.params.id) {
            data[1]['notes'][i]['text'] = req.body.text;
            const updatedPost = data[1]['notes'][i];
            res.json(updatedPost);
            break;
         }
      }
   } catch (e) {
      console.log(e);
      console.log(res.status);
   }
});


module.exports = router;