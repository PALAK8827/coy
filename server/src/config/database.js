const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbDir = path.resolve(__dirname, '../../data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbFilePath = process.env.DB_FILE_PATH || path.join(dbDir, 'coy.sqlite');

let dbInstance = null;

function getDatabase() {
  if (!dbInstance) {
    dbInstance = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.error('Failed to connect to SQLite database:', err.message);
      } else {
        console.log(`Connected to SQLite database at: ${dbFilePath}`);
      }
    });

    // Enable foreign keys and WAL mode for better concurrency & durability
    dbInstance.run('PRAGMA foreign_keys = ON;');
    dbInstance.run('PRAGMA journal_mode = WAL;');
  }
  return dbInstance;
}

/**
 * Promisified database helpers
 */
const db = {
  getRawDb: () => getDatabase(),

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      const database = getDatabase();
      database.run(sql, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ lastID: this.lastID, changes: this.changes });
      });
    });
  },

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      const database = getDatabase();
      database.get(sql, params, (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  },

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      const database = getDatabase();
      database.all(sql, params, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows || []);
      });
    });
  },

  exec(sql) {
    return new Promise((resolve, reject) => {
      const database = getDatabase();
      database.exec(sql, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  },

  close() {
    return new Promise((resolve, reject) => {
      if (dbInstance) {
        dbInstance.close((err) => {
          if (err) return reject(err);
          dbInstance = null;
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
};

module.exports = {
  db,
  dbFilePath
};
