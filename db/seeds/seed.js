const format = require("pg-format");
const db = require("../connection.js");

const seed = ({ trades, accounts }) => {
  // clear tables

  return db
    .query("DROP TABLE IF EXISTS trades")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS accounts");
    })
    .then(() => {
      return createTradesTable();
    })
    .then(() => {
      return createAccounts();
    })
    .then(() => {
      return insertTrades(trades);
    })
    .then(() => {
      return insertAccounts(accounts);
    });
};

const createTradesTable = () => {
  return db.query(
    `
        CREATE TABLE trades (
    ticket INTEGER UNIQUE NOT NULL,   
    symbol VARCHAR(6) NOT NULL,
    type VARCHAR(4) NOT NULL,     
    lots NUMERIC(4, 2) NOT NULL,        
    open_price NUMERIC(10, 5) NOT NULL,  
    close_price NUMERIC(10, 5) NOT NULL, 
    profit NUMERIC(10, 2) NOT NULL,   
    open_time TIMESTAMP NOT NULL,
    close_time TIMESTAMP
        )
        `
  );
};

const createAccounts = () => {
  return db.query(
    `
        CREATE TABLE accounts (
        date TIMESTAMP,
        account_balance NUMERIC(10, 2) NOT NULL,
        account_equity NUMERIC(10, 2) NOT NULL
        )`
  );
};

const insertTrades = (trades) => {
  const nestedTrades = trades.map((singleTrade) => {
    return [
      singleTrade.Ticket,
      singleTrade.Symbol,
      singleTrade.Type,
      singleTrade.Lots,
      singleTrade.OpenPrice,
      singleTrade.ClosePrice,
      singleTrade.Profit,
      singleTrade.OpenTime,
      singleTrade.CloseTime,
    ];
  });

  return db.query(
    format(
      `INSERT INTO trades (ticket, symbol, type, Lots, open_price, close_price, profit, open_time, close_time)
VALUES %L RETURNING *;`,
      nestedTrades
    )
  );
};

const insertAccounts = (accounts) => {
  const nestedAccount = accounts.map((accountDay) => {
    return [
      accountDay.date,
      accountDay.account_balance,
      accountDay.account_equity,
    ];
  });
  return db.query(
    format(
      `
    INSERT INTO accounts (
        date,
        account_balance,
        account_equity) VALUES %L RETURNING *;`,
      nestedAccount
    )
  );
};

module.exports = seed;
