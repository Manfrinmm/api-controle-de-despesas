import Transaction from "../models/Transaction";
import TransactionsRepository from "../repositories/TransactionsRepository";

interface Request {
  title: string;
  value: number;
  type: "income" | "outcome";
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type === "outcome") {
      const { total } = this.transactionsRepository.getBalance();

      if (total < value) {
        throw Error(
          `Transaction not allowed. You need more ${(
            value - total
          ).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })} to make this transaction`,
        );
      }
    }
    const transactionObject = new Transaction({ title, value, type });

    const transaction = this.transactionsRepository.create(transactionObject);

    return transaction;
  }
}

export default CreateTransactionService;
