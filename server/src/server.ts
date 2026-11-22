import {connectDB, disconnectDB} from "./config/db.js";
import {env} from "./config/env.js";
import {app} from "./app.js";

async function startServer(){
    try {
    await connectDB();
    
    const server = app.listen(env.PORT, ()=>{
        console.log(`Server is running http://localhost:${env.PORT}`);
    })

    const shutdown = async ()=>{
        server.close();
        await disconnectDB();
        process.exit(0);
    }

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
    }
    catch(error){
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

startServer();