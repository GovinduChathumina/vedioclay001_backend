const express = require('express')
const router = express.Router()
const Catergory = require('../models/catergory')

// Creating one
router.post('/create', async (req, res) => {
    const catergory = new Catergory({
      name: req.body.name
    })
    try {
      const newCatergory = await catergory.save()
      res.status(201).json(newCatergory)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  module.exports = router