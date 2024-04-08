const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  skillsName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Skill', SkillSchema);