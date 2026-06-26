import mongoose from 'mongoose';

const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'string') {
        return error;
    }

    try {
        return JSON.stringify(error);
    } catch {
        return 'Unknown error';
    }
};

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.error(`Error: ${getErrorMessage(error)}`);
        process.exit(1);
    }
};

export default connectDB;
