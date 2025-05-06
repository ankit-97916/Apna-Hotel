const mongoose = require("mongoose");
const initdata =  require("./data.js");

const Listing = require("../models/listing.js");

main()
.then((res)=> {console.log("successfull")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/apnahotel');

};

const initDB = async () => {
    await Listing.deleteMany({});
    initdata.data =  initdata.data.map((obj)=>({...obj, owner: "680b5defd2efb1102d5e161b" }))
    await Listing.insertMany(initdata.data);
    console.log("data was insert");
};

// initDB();
