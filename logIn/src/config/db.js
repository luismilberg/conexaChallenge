const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
if (process.env.DBURL) {
  mongoose.connect(
    process.env.DBURL,
    {
      autoIndex: true,
    }
  );
} else {
  console.log('DB URL is not defined');
};

