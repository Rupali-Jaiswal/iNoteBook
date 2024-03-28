const express = require('express')
const router = express.Router()
const Note = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')
const noteSchema = require('../middleware/note-validator')
const validate = require('../middleware/auth-validation')



// Adding newNote
router.post('/addNote', fetchuser, validate(noteSchema),
    async (req, res) => {
        try {
            const { title, description, tag } = req.body
            const check = await Note.findOne({ title: title, description: description })
            if (check) {
                return res.json({ check })
            }
            const newnote = new Note({
                title: title,
                description: description,
                user: req.user._id
            })
            await newnote.save()
            res.status(200).json(newnote)
        }
        catch (error) {
            console.error(error.msg)
            res.status(500).send('Some internal server error')
        }
    })


//   Fetching all note
router.get('/fetchNote', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id })
        res.json(notes)
    } catch (error) {
        console.error(error)
        res.status(400).send('Some internal server error')
    }
})

// Updating a note
router.put('/updateNote', fetchuser, validate(noteSchema),
    async (req, res) => {
        try {
            const id=req.header('id')
            const {  description, title } = req.body
            const newNote = await Note.findByIdAndUpdate(id,
                { $set: { description: description, title: title } }, { new: true }
            )
            // await newNote.save()
            return res.json({ newNote})
        }
        catch (error) {
            console.error(error)
            res.status(400).send('Some internal server error')
        }
    })

// Deleting a Note
router.delete('/deleteNote', fetchuser, async (req, res) => {
    try {
        const note = await Note.findById(req.body.id);
        if (!note) { return res.status(404).json({ "Error": "Not Found" }) }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ "ERRor": "Not Allowed" });
        }
        const dnote = await Note.findByIdAndDelete(req.body.id)
        res.status(200).json({ 'Success': 'note is deleted', dnote })
    } catch (error) {
        console.error(error)
        res.status(500).send('Some internal server error')
    }
})

module.exports = router
