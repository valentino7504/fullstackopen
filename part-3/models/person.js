const mongoose = require('mongoose');
const dbUrl = process.env.MONGODB_URI;

console.log('connecting to the mongodb database');
mongoose.set('strictQuery', false);
mongoose.connect(dbUrl, { socketTimeoutMS: 60000 })
  .then(console.log('successfully connected to mongodb database'))
  .catch(error => console.log('error:', error.message));;

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: (phoneNo) => {
        const re = /^\d{2,3}-\d{5,}$/;
        return re.test(phoneNo);
      }
    }
  }
});

personSchema.set('toJSON', {
  transform: (document, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);
