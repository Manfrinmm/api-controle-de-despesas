import Transaction from "../models/Transaction";

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulator, transaction) => {
        accumulator[transaction.type] =
          accumulator[transaction.type] + transaction.value ||
          transaction.value;

        return accumulator;
      },
      { income: 0, outcome: 0 },
    );

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ id, title, value, type }: Transaction): Transaction {
    const transaction = { id, title, value, type };

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
