import { Router } from "express";

import TransactionsRepository from "../repositories/TransactionsRepository";
import CreateTransactionService from "../services/CreateTransactionService";

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(
  transactionsRepository,
);

transactionRouter.get("/", (req, res) => {
  try {
    const transactions = transactionsRepository.all();

    const balance = transactionsRepository.getBalance();

    return res.status(200).json({ transactions, balance });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

transactionRouter.post("/", (req, res) => {
  try {
    const { title, value, type } = req.body;

    const data = {
      title,
      value,
      type,
    };

    const transaction = createTransactionService.execute(data);

    return res.status(201).json(transaction);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
