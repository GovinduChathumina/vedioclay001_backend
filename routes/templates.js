const express = require('express')
const catergory = require('../models/catergory')
const Catergory = require('../models/catergory')
const router = express.Router()
const Templates = require('../models/template')

/**
 * Getting all templates
 */ 
router.get('/get_all', async (req, res) => {
    try {
      const templates = await Templates.find()
      res.json(templates)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
  /**
   * Filter templates by "category"
   */
  router.get('/:id', getByCatergory, (req, res) => {
    res.json(res.catergory)
  })
  

  /**
   * Creating new template
   */
  router.post('/create', async (req, res) => {
    const template = new Templates({
      id: req.body.id,
      name:req.body.name,
      catergory:req.body.catergory,
      duration:req.body.duration
      
    })
    try {
      const newTemplate = await template.save()
      const catergoryUpdate= Catergory.updateOne({ _id: template.catergory }, { $push: { templates: {Template_id: template._id} } },)
      Promise.all([catergoryUpdate])
      res.status(201).json(newTemplate)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  
  
  /**
   * Updating template
   */
  router.patch('/:id', getTemplate, async (req, res) => {
    if (req.body.name != null) {
      res.template.name = req.body.name
    }
    if (req.body.catergory != null) {
      res.template.catergory = req.body.catergory
    }
    if (req.body.duration != null) {
      res.template.duration = req.body.duration
    }
    try {
      const updatedTemplate = await res.template.save()
      res.json(updatedTemplate)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  
  /**
   * Deleting template
   */
  router.delete('/:id', getTemplate, async (req, res) => {
    try {
      await res.template.remove()
      res.json({ message: 'Template has been deleted !' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
  async function getTemplate(req, res, next) {
    let template
    try {
        template = await Templates.findById(req.params.id)
      if (template == null) {
        return res.status(404).json({ message: 'Cannot find template' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.template = template
    next()
  }

  async function getByCatergory(req, res, next) {
    let catergory
    try {
      catergory = await Catergory.findById(req.params.id)
      if (catergory == null) {
        return res.status(404).json({ message: 'Cannot find template' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.catergory = catergory
    next()
  }
  
  module.exports = router