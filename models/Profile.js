const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  type: {
    type: String,
  },
  describe: {
    type: String,
  },
  incode: {
    type: String,
    require: true,
  },
  expend: {
    type: String,
    require: true,
  },
  cash: {
    type: String,
    require: true,
  },
  remark: {
    type: String,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
