const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.DBURL,
  {
    autoIndex: true,
  }
);

