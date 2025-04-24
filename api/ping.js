const mongoose = require('mongoose');

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('✅ Mongo already connected');
    return;
  }
  console.log('🔌 Connecting to Mongo...');
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('✅ Connected to Mongo');
};

const quoteSchema = new mongoose.Schema({ text: String });
let Quote;
try {
  Quote = mongoose.model('Quote');
} catch {
  Quote = mongoose.model('Quote', quoteSchema);
}

module.exports = async (req, res) => {
  try {
    console.log('🚀 Ping function triggered');
    await connectMongo();

    const quote = await Quote.findOne();
    console.log('✅ Fetched quote:', quote?.text);

    res.status(200).json({ message: 'MongoDB Pinged!', quote: quote?.text || 'No quote found' });
  } catch (err) {
    console.error('❌ Ping failed:', err);
    res.status(500).json({ error: 'Ping failed', details: err.message });
  }
};
