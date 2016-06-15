import sqlite3
conn = sqlite3.connect('dreams.db')
dream_database = conn.cursor()
dream_database.execute("CREATE TABLE IF NOT EXISTS dreams (id ,datetime, dream)")

conn = sqlite3.connect('accounts.db')
accounts_database = conn.cursor()
accounts_database.execute("CREATE TABLE IF NOT EXISTS accounts (username, password, user_id)")