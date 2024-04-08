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
let Skills = mongoose.model('Skills', SkillSchema);
module.exports = Skills;
