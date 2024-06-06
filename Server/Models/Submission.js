const mongoose = require('mongoose');

const FormSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  file: { type: String },
  files: { type: Map, of: String },
  certainFile: { type: String }
}, { timestamps: true });

const FormSubmission = mongoose.model('FormSubmission', FormSubmissionSchema);

module.exports = FormSubmission;
