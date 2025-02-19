import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'UserDatabase.db', location: 'default' },
  () => console.log('Database opened successfully'),
  (error) => console.error('Error opening database:', error)
);

const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)',
      [],
      () => console.log('Users table created successfully'),
      (error) => console.error('Error creating Users table:', error)
    );
  });
};

const insertUser = (username, password, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO Users (username, password) VALUES (?, ?)',
      [username, password],
      (_, result) => {
        console.log('User inserted:', result.insertId);
        callback(true);
      },
      (error) => {
        console.error('Error inserting user:', error);
        callback(false);
      }
    );
  });
};

const getUser = (username, password, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM Users WHERE username = ? AND password = ?',
      [username, password],
      (_, result) => {
        console.log('User fetched:', result.rows.raw());
        if (result.rows.length > 0) {
          callback(true, result.rows.item(0).id);
        } else {
          callback(false);
        }
      },
      (error) => {
        console.error('Error fetching user:', error);
        callback(false);
      }
    );
  });
};

export const createTabletodo = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, user_id INTEGER, FOREIGN KEY(user_id) REFERENCES Users(id))',
      [],
      () => console.log('Todos table created successfully'),
      (error) => console.error('Error creating Todos table:', error)
    );
  });
};

export const insertTask = (task, userId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO todo (task, user_id) VALUES (?, ?)',
      [task, userId],
      (_, result) => {
        console.log('Task inserted:', result);
        callback(result.insertId);
      },
      (error) => console.error('Error inserting task:', error)
    );
  });
};

export const getTasks = (userId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM todo WHERE user_id = ?',
      [userId],
      (_, { rows }) => {
        console.log('Fetched tasks:', rows.raw());
        callback(rows.raw()); // Ensure correct format
      },
      (error) => console.error('Error fetching tasks:', error)
    );
  });
};

export const updateTask = (id, newTask, userId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE todo SET task = ? WHERE id = ? AND user_id = ?',
      [newTask, id, userId],
      (_, result) => {
        console.log('Task updated:', result.rowsAffected);
        callback(result.rowsAffected);
      },
      (error) => console.error('Error updating task:', error)
    );
  });
};

export const deleteTask = (id, userId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM todo WHERE id = ? AND user_id = ?',
      [id, userId],
      (_, result) => {
        console.log('Task deleted:', result.rowsAffected);
        callback(result.rowsAffected);
      },
      (error) => console.error('Error deleting task:', error)
    );
  });
};

export { createTable, insertUser, getUser };