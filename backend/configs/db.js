import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('✅ Database Connected Successfully');
    });

    let mongodbURI = process.env.MONGODB_URI;
    const projectName = 'resume-builder';

    if (!mongodbURI) {
      throw new Error('❌ MONGODB_URI environment variable not set');
    }

    // Remove trailing slash if it exists
    if (mongodbURI.endsWith('/')) {
      mongodbURI = mongodbURI.slice(0, -1);
    }

    await mongoose.connect(`${mongodbURI}/${projectName}`);
  } catch (error) {
    console.error('🚨 Error connecting to MongoDB:', error);
  }
};

export default connectDB;
