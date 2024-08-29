import mongoose from "mongoose"


const dbConnection = async () => {
    try {
        const res = await mongoose.connect(process.env.DATABASE_API_URL)
        console.log("database is connected :", res.connection.name)
    } catch (error) {
        console.log("db connection error")
        throw new error
    }
}

export {dbConnection}