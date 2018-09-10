var mongoose = require("mongoose");
mongoose.connect("mongodb://user22:k6244056@ds161411.mlab.com:61411/users");
console.log("mongoDB connect....");
module.exports = mongoose;