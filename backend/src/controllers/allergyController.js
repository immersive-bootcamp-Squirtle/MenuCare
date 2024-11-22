const allergyModel = require('../models/allergyModel')

exports.getAllAllergies = async (req, res) => {
  try {
    const allergies = await allergyModel.findAllAllergies()
    res.status(200).json(allergies)
  } catch (err) {
    res.status(500).json({ error: 'Failed to get allergy' })
  }
}
