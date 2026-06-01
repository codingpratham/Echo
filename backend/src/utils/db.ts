import mongoose from 'mongoose';

const connectDB = async () => {
    try {

        console.log('Connecting to MongoDB...');
        console.log(`Using connection string: ${process.env.DATABASE_URL}`);

        const conn = await mongoose.connect(process.env.DATABASE_URL as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.error(`Error: ${error instanceof Error ? error.message : error}`);
        process.exit(1);
    }
};

export default connectDB;