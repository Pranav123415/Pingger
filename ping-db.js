require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

const quoteSchema = new mongoose.Schema({ text: String });
const Quote = mongoose.model('Quote', quoteSchema);

app.get('/ping', async (req, res) => {
  try {
    const quote = await Quote.findOne();
    console.log('✅ Pinged MongoDB at', new Date().toLocaleTimeString());
    res.status(200).send(`Pinged MongoDB! Quote: ${quote?.text || 'N/A'}`);
  } catch (err) {
    console.error('❌ Error during ping:', err.message);
    res.status(500).send('MongoDB Ping Failed');
  }
});

app.get('/', (req, res) => {
  res.send('MongoDB Pinger is alive 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

