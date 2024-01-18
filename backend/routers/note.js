const express = require('express')
const router = express.Router()
const note = require('../models/Notes')
const { body, validationResult } = require('express-validator')
const fetchuser = require('../middleware/fetchuser')
const session = require('express-session');

router.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000,  // 1 hour in milliseconds
        httpOnly: true,
    },
}));



// Adding new note 
router.post('/addnote', fetchuser, [
    body('title', 'Title should be minimum of 3 letters').isLength({ min: 3 }),
    body('description', 'description should not be empty').isLength({ min: 2 })
],
    async (req, res) => {
        try {
            const Error = validationResult(req)
            if (!Error.isEmpty()) {
                return res.status(400).json({ 'Error': Error.array() })
            }
            const { title, description, tag } = req.body
            const check = await note.findOne({ title: title, description: description })
            if (check) {
                return res.json({ check })
            }
            const newnote = await note.create({
                title: title,
                description: description,
                tag: tag,
                user: req.user.id
            })
            newnote.save()
            res.json({ newnote })
        }
        catch (error) {
            console.error(error)
            res.status(400).send('Some internal server error')
        }
    })


//   Fetching all note
router.get('/fetchNote', fetchuser, async (req, res) => {
    try {
        const notes = await note.find({ user: req.user.id })
        res.json({ notes })
    } catch (error) {
        console.error(error)
        res.status(400).send('Some internal server error')
    }
})

// Updating a note
router.put('/updateNote', fetchuser,
    async (req, res) => {
        try {
            const { id, description, title } = req.body
            const newNote = await note.findByIdAndUpdate(id,
                { $set: { description: description, title: title } }, { new: true }
            )
            newNote.save()
            return res.json({ newNote })
        }
        catch (error) {
            console.error(error)
            res.status(400).send('Some internal server error')
        }
    })

    // Deleting a Note
router.delete('/deleteNote', fetchuser, async(req,res)=>{
    try {
        await note.findByIdAndDelete(req.body.id)
        res.json({'Success':'note is deleted'})
    } catch (error) {
        console.error(error)
        res.status(400).send('Some internal server error')
    }
})

module.exports = router
