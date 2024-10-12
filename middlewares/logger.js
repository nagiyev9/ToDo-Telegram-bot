import { transports, createLogger, format } from "winston";
import "winston-mongodb";
import dotenv from "dotenv";
dotenv.config();

const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
    format: combine(
        timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        prettyPrint()
    ),
    transports: [
        new transports.Console(),
        new transports.MongoDB({
            level: "error", 
            db: process.env.MONGO_URI,
            collection: "server_logs"
        })
    ]
});

export default logger;
