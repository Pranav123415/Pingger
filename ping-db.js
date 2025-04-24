const mongoose = require('mongoose');
const cron = require('node-cron');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const quoteSchema = new mongoose.Schema({ text: String });
const Quote = mongoose.model('Quote', quoteSchema);

cron.schedule('*/5 * * * *', async () => {
  try {
    const result = await Quote.findOne();
    console.log('✅ Pinged MongoDB:', new Date().toLocaleString());
  } catch (err) {
    console.error('❌ Ping failed:', err.message);
  }
});

