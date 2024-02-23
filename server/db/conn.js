const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let _db;


module.exports = {
    connectToServer: async function (callback) {
  
      try {
        console.log("Connecting to MongoDB Atlas...");
        conn = await client.connect();
        _db = conn.db("employees");
      } catch(e) {
        console.error(e);
      }
  
      return (_db === undefined ? false : true);
    },
    getDb: function () {
      return _db;
    },
  };