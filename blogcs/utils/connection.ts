import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

async function connecttodb(): Promise<typeof mongoose | void> {
    console.log("Here isd ", process.env);

    try {
        const mongoUrl = process.env.mongourl;
        if (mongoUrl) {
            const connection = await mongoose.connect(mongoUrl);
            console.log("Successful connection to the database");
            return connection;
        } else {
            console.error("MongoDB URL not provided in environment variables.");
            process.exit(1);
        }
    } catch (error) {
        console.error("Error connecting to the database: ", error);
        process.exit(1);
    }
}

export default connecttodb;
