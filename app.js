import express from "express";
const app = express();
import { dbConnection } from "./config/dbConnection.js";
import todoRouter from "./routes/todoRoutes.js";
import methodOverride from "method-override";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";



dbConnection()



// register template engine
app.set("view engine","ejs")
//app.set("view engine", "ejs");
//app.set("views", "./views"); // Assuming your EJS files are in the 'views' folder



app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
app.use(cookieParser())

// app.get("/set-cookie",(req,res,next)=>{
// res.cookie("name","tony",{
//     maxAge:60*60*24*1000,
//     //setting the maxAge for the cookies
//     httpOnly:true
//     //secure:true
// })
// res.send("cookie-set")
// })
// app.get("/get-cookie",(req,res,next)=>{
//     console.log(req.cookies);
//   res.send(req.cookies.name)   
// })
// app.get("/update-cookie",(req,res,next)=>{
// res.cookie("name","stark",{
//     maxAge:60*60*24*1000,
//     httpOnly:true
// })
// res.send("cookie-updated")
// })

// app.get("/delete-cookie",(req,res,next)=>{
//     // res.cookie("name","",{
//     //     maxAge:5,
//     //     httpOnly:true,
//     //     secure:true
//     // })
//     res.clearCookie("name")
//     res.send("cookie-deleted")
// })

// app.get("/",(req,res,next)=>{
//     res.render("home",{name:"Bhoomika"})

// })
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);



export default app;
// import mongoose from "mongoose";
//creating express app instance

//creating connection to the database

//dbConnection: An asynchronous function is defined to connect to the MongoDB database.
// mongoose.connect(): Connects to the local MongoDB instance (mongodb://127.0.0.1/todoDb). This function returns a promise.
//   On a successful connection, it logs the host to the console.
//   In case of an error (e.g., connection failure), it logs the error message.
// async function dbConnection() {
//   try {
//     let connectionToDb = await mongoose.connect("mongodb://127.0.0.1/todoDb");
//     console.log(
//       `MongoDb is connected successfully on ${connectionToDb.connection.host}`
//     );
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// dbConnection();

//to create schema(structure) to the database
// //todoSchema: Defines the structure of a document (data) that will be stored in MongoDB. The schema contains:
// todo: A required string field representing the task.
// isCompleted: A boolean field that defaults to false to indicate whether the task is completed.

// const todoSchema = new mongoose.Schema({
//   todo: {
//     type: String,
//     required: true,
//   },
//   isCompleted: {
//     type: Boolean,
//     default: false,
//   },
// });

//to create model i.e., Collections
//The Todo model is created from the todoSchema, which will interact with the "todo" collection in MongoDB. This model provides methods to query and manipulate the data.
// let Todo = mongoose.model("todo", todoSchema);
// export default app;

//middlewares
//to process incoming json data
//express.json(): This middleware is used to parse incoming JSON requests. Without this, req.body would be undefined when a JSON payload is sent in HTTP requests.


//routes
//POST /api/v1/todo: A route to create a new todo item.
// Extracts the todo from the request body.
// If todo is missing, it returns a 400 Bad Request error.
// Otherwise, it creates a new Todo item in the database and returns it with a 201 status (indicating successful creation).
// app.post("/api/v1/todo", async (req, res, next) => {
//   let { todo } = req.body;
//   try {
//     if (!todo) {
//       return res.status(400).send("to do is required");
//     }
//     const newTodo = await Todo.create({ todo: todo });
//     res.status(201).send(newTodo);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

//GET /api/v1/todo: Fetches all todos from the database using Todo.find().
// Returns the list of todos with a 201 status code.
// app.get("/api/v1/todo", async (req, res, next) => {
//   try {
//     const todos = await Todo.find();
//     res.status(201).send(todos);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

//GET /api/v1/todo/
// : Fetches a specific todo by its ID.
// Extracts the id parameter from the URL.
// Searches for the todo by its ID and returns it with a 200 status code.
// If no todo is found, a 400 error is returned.
// app.get("/api/v1/todo/:id", async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     let todo = await Todo.findById(id);
//     if (!todo) {
//       res.status(400).send("error");
//     }
//     res.status(200).send(todo);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

//DELETE /api/v1/todo/
// : Deletes a todo by its ID.
// Deletes the todo from the database using Todo.findByIdAndDelete().
// If the todo doesn't exist, it returns a 400 error.
// Otherwise, it returns a success message.

// app.delete("/api/v1/todo/:id", async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     let todo = await Todo.findByIdAndDelete(id);
//     if (!todo) {
//       return res.sendStatus(400);
//     }
//     res.status(200).send("deleted successfully");
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

//PUT /api/v1/todo/updateTodo/
// : Updates the content (todo) of an existing todo.
// Extracts the id from the URL and the new todo from the request body.
// Updates the todo and returns the updated document.
// If the update fails, a 400 error is returned.

// app.put("/api/v1/todo/:id", async (req, res, next) => {
//   const { id } = req.params;
//   const { todo } = req.body;
//   try {
//     let updatedTodo = await Todo.findByIdAndUpdate(id, { todo }, { new: true });
//     if (!updatedTodo) {
//       return res.sendStatus(400);
//     }
//     res.status(200).send(updatedTodo);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

//PATCH /api/v1/todo/updatestatus/
// : Updates the isCompleted status of a specific todo.
// Extracts the id and isCompleted status from the URL and request body respectively.
// Updates the isCompleted field of the todo.
// app.patch("/api/v1/todo/status/:id", async (req, res, next) => {
//   const { id } = req.params;
//   const { isCompleted } = req.body;
//   try {
//     let updatedTodo = await Todo.findByIdAndUpdate(
//       id,
//       { isCompleted: isCompleted },
//       { new: true }
//     );
//     res.status(200).send(updatedTodo);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });



// app.get("/api/v1/todo", async (req, res, next) => {
//   try {
//     const todos = await Todo.find();
//     res.status(201).send(todos);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

