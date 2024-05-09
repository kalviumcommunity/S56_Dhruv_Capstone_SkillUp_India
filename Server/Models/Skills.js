const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  skillsName: {
    type: String,
    required: true,
    index: true, 
  },
  category: {
    type: String,
    required: true,
    index: true, 
  },
  image: {
    type: String,
    required: true,
  },
});

let Skills = mongoose.model('Skill', SkillSchema);

module.exports = Skills;

