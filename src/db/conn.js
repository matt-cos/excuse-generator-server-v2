const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let _db;

module.exports = {
  connectToServer: async function (callback) {
    try {
      await client.connect();
    } catch (e) {
      console.error(e);
    }

    _db = client.db("excuse-generator");

    return _db === undefined ? false : true;
  },

  getDb: function () {
    return _db;
  },
};
