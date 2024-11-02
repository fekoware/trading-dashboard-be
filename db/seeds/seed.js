const format = require("pg-format");
const db = require("../connection.js");

const seed = ({ trades }) => {
  // clear tables

return db.query("DROP TABLE IF EXISTS trades").then(() => {
    return createTradesTable();
}).then(() => {
    return insertTrades(trades)
})

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

module.exports = seed;
