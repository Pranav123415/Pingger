const mongoose = require('mongoose');

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) return; // Already connected
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const quoteSchema = new mongoose.Schema({ text: String });
let Quote; // Prevent model overwrite
try {
  Quote = mongoose.model('Quote');
} catch {
  Quote = mongoose.model('Quote', quoteSchema);
}

module.exports = async (req, res) => {
  try {
    await connectMongo();
    const quote = await Quote.findOne();
    res.status(200).json({ message: 'MongoDB Pinged!', quote: quote?.text || 'No quote found' });
  } catch (err) {
    res.status(500).json({ error: 'Ping failed', details: err.message });
  }
};

