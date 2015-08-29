var mongoose = require('mongoose');

var houseSchema = mongoose.Schema({
  userID: {type: String },
  location: { type: String },
  squareFoot: { type: Number },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  image: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  conditions         : {
    pets          : Boolean,
    plants        : Boolean,
    updates       : Boolean,
    smoking       : Boolean,
    other         : Boolean
  }
});

module.exports = mongoose.model('House', houseSchema);
