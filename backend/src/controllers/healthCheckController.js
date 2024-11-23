exports.healthCheck = async (req, res) => {
  try {
    res.status(200).json('ok');
  } catch (err) {
    res.status(500).json({ error: 'Failed to health check' })
  }
}
