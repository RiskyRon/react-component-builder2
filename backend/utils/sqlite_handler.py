# /Users/ron/Documents/projects/vite element highlighter/backend/utils/sqlite_handler.py

import sqlite3
import os

class SQLiteDBHandler:
    def __init__(self, db_path):
        self.db_path = db_path
        self._create_table()

    def _create_table(self):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS chat_history (
                    session_id TEXT,
                    user_input TEXT,
                    assistant_output TEXT,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            conn.commit()

    def get_chat_history(self, session_id):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT user_input, assistant_output FROM chat_history
                WHERE session_id = ?
                ORDER BY timestamp ASC
            ''', (session_id,))
            rows = cursor.fetchall()
            chat_history = []
            for user_input, assistant_output in rows:
                chat_history.append({"role": "user", "content": user_input})
                chat_history.append({"role": "assistant", "content": assistant_output})
            return chat_history

    def save_chat_history(self, session_id, user_input, assistant_output):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO chat_history (session_id, user_input, assistant_output)
                VALUES (?, ?, ?)
            ''', (session_id, user_input, assistant_output))
            conn.commit()

# Initialize the database handler
db_path = os.environ.get('SQLITE_DB_PATH', 'chat_history.db')
sqlite_db = SQLiteDBHandler(db_path)
