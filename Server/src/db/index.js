import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
}

const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const db = client.db("job-listing");
const JobCollection = db.collection("Jobs");

let connected = false;

const connectDB = async () => {
    try {
        if (!connected) {
            await client.connect();
            // Test the connection
            await client.db("admin").command({ ping: 1 });
            connected = true;
            console.log("Successfully connected to MongoDB!");
        }

        return JobCollection;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

// Handle cleanup on app termination
process.on('SIGINT', async () => {
    try {
        await client.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
    }
});

export { connectDB };