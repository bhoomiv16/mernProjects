//application logics should be in the controller

import  Todo  from "../models/TodoModel.js";

export let createTodo=async (req, res, next) => {
    let { todo,dueDate} = req.body;
    // console.log(req.body);
    try {
      if (!todo) {
        // return res.status(400).send("to do is required");
        return res.status(400).render("home",{error:error.message});
      }
      await Todo.create({ todo: todo ,dueDate:dueDate});
      // res.status(201).send(newTodo);
      res.status(201).redirect("/api/v1/todo")
      //to redirect to home page
    } catch (error) {
      // res.status(500).send(error.message);
      res.status(500).render("home",{error:error.message})
    }
  }

  export let getTodos=async (req, res, next) => {
    try {
      const todos = await Todo.find();
      console.log(todos);
      
      // res.status(201).send(todos);
      res.status(201).render("home",{todos:todos});
    } catch (error) {
      res.status(500).render("home",{error:error.message});
    }
  }

  export let getTodo= async (req, res, next) => {
    const { id } = req.params;
    try {
      const todos = await Todo.findById(id);
      if (!todos) {
        return res.sendStatus(400);
      }
      // res.status(201).send(todos);
      res.status(200).render("update",{todos})
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  export let deleteTodo= async (req, res, next) => {
    const { id } = req.params;
    try {
      let todo = await Todo.findByIdAndDelete(id);
      if (!todo) {
        return res.sendStatus(400);
      }.20
      // res.status(200).send("deleted successfully");
      res.status(200).redirect("/api/v1/todo")
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  export let updateTodo=async (req, res, next) => {
    const { id } = req.params;
    const { todo } = req.body;
    try {
      let updatedTodo = await Todo.findByIdAndUpdate(id, { todo }, { new: true });
      if (!updatedTodo) {
        return res.sendStatus(400);
      }
      // res.status(200).send(updatedTodo);
      res.status(200).redirect("/api/v1/todo")
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  export let updateStatus= async (req, res, next) => {
    const { id } = req.params;
    const { isCompleted } = req.body;
    try {
      await Todo.findByIdAndUpdate(
        id,
        { isCompleted: isCompleted },
        // { new: true }
      );
      // res.status(200).send(updatedTodo);
      res.status(200).redirect("/api/v1/todo")
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
