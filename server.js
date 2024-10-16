import http from "http"
import app from "./app.js";

let PORT=8080;

let server=http.createServer(app)
server.listen(PORT,(err)=>{
    if (err) {
        console.log(err);        
    }
    console.log(`server is running on port ${PORT}`);
})