import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('activitiesdb.db');

export const initDatabase = () => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'SELECT name FROM sqlite_master WHERE type="table" AND name="activitiessg"',
        [],
        (_, { rows }) => {
          const tableExists = rows.length > 0;

          if (!tableExists) {
            // Table doesn't exist, so create it
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS activitiessg (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, occurrenceDate TEXT, jiraLink TEXT, description TEXT, spentHours TEXT)',
              [],
              (_, error) => {
                if (error) {
                  console.error('Error creating table:', error);
                } else {
                  console.log('Table created successfully.');
                }
              }
            );
          } else {
            console.log('Table already exists.');
          }
        },
        (_, error) => {
          console.error('Error checking if table exists:', error);
        }
      );
    },
    null,
    () => console.log('Database initialization completed successfully.')
  );
};

export default db;
