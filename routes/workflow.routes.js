import { Router } from "express";

const workflowRouter = Router();

workflowRouter.get("/", (req, res) => {
  res.send("Welcome to the workflow routes");
});

export default workflowRouter;
