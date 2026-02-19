import mongoose from "mongoose";

const ConnectDB = async() => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/crm_midterm_project", {});

        console.log("Successfully Connected with MongoDB!");
        console.log(`Database name: ${conn.connection.name}`);

    } catch (error) {
        console.error(`Error Connecting with DB: ${error.message}`);
        process.exit(1);
    }
};
export default ConnectDB;