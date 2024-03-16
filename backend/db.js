const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/iNotebook';


const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
       connectTimeoutMS: 30000, // Increase timeout to 30 seconds (adjust as needed)
      socketTimeoutMS: 45000 // Increase socket timeout to 45 seconds (adjust as needed)
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};


module.exports = connectToMongo;
