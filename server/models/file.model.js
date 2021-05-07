const { Schema, model } = require('mongoose');
const fileSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  size: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const File = model('File', fileSchema);
module.exports = File;
