const format = require("pg-format");
const db = require("../connection.js");

const seed = ({ accountBalance, accountEquity, trades }) => {
  // clear tables
  return (
    db
      .query("DROP TABLE IF EXISTS accountBalance")
      .then(() => {
        return db.query("DROP TABLE IF EXISTS accountEquity");
      })
      .then(() => {
        return db.query("DROP TABLE IF EXISTS trades");
      })
      // create tables
      .then(() => {
        return createTradesTable();
      })
      .then(() => {
        return createAccountBalanceTable();
      })
      .then(() => {
        return createAccountEquityTable();
      })
      //populate tables
      .then(() => {
        insertTrades(trades);
      })
      .then(() => {
        insertAccountBalance(accountBalance);
      })
      .then(() => {
        insertAccountEquity(accountEquity);
      })
  );
};

const createTradesTable = () => {
  return db.query(
    `
        CREATE TABLE trades (
    id SERIAL PRIMARY KEY,              
    ticket INTEGER UNIQUE NOT NULL,   
    symbol VARCHAR(6) NOT NULL,
    type VARCHAR(4) NOT NULL,     
    lots NUMERIC(4, 2) NOT NULL,        
    open_price NUMERIC(10, 5) NOT NULL,  
    close_price NUMERIC(10, 5) NOT NULL, 
    Profit NUMERIC(10, 2) NOT NULL,   
    open_time TIMESTAMP NOT NULL,
    close_time TIMESTAMP
    created_at TIMESTAMP DEFAULT NOW(),
        )
        `
  );
};

const createAccountBalanceTable = () => {
  return db.query(
    `
        id SERIAL PRIMARY KEY,              
        balance NUMERIC(10, 5) NOT NULL,
        date TIMESTAMP NOT NULL,
        `
  );
};

const createAccountEquityTable = () => {
  return db.query(
    `
        id SERIAL PRIMARY KEY,              
        balance NUMERIC(10, 5) NOT NULL,
        date TIMESTAMP NOT NULL,
        `
  );
};

const insertTrades = (trades) => {
  const nestedTrades = trades.map((singleTrade) => {
    return [
      trade.ticket,
      trade.symbol,
      trade.type,
      trade.lots,
      trade.open_price,
      trade.close_price,
      trade.profit,
      trade.open_time,
      trade.close_time,
      trade.created_at,
    ];
  });
  return db.query (format(
    `INSERT INTO trades
    (ticket, symbol, type, lots, open_price, close_price, profit, open_time, close_time, created_at) VALUES %L RETURNING *`, nestedTrades
  ))
};
