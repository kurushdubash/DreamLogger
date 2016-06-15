import datetime, sqlite3, init_db, random
import sys

def add_entry(dream, name="Kurush", user_id=1):
	conn = sqlite3.connect('dreams.db')
	dream_database = conn.cursor()
	current_time = str(datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y"))
	query = format_query(user_id, dream, current_time)
	dream_database.execute(query)
	conn.commit()
	conn.close()

def format_query(user_id, dream, time):
	return "INSERT INTO dreams VALUES (\'" + str(user_id) + "\', \'" + str(dream) + "\' , \'"+ str(time) + "\')"

def get_user_id_from_accountd_DB(username, password):
	conn = sqlite3.connect('accounts.db')
	accounts_database = conn.cursor()
	query = "SELECT * FROM accounts WHERE (username=\'" + str(username) + "\' AND password=\'" + str(password) + "\')"
	lookup = accounts_database.execute(query).fetchall()
	print(lookup)
	conn.commit()
	conn.close()
	if(len(lookup) == 0):
		return 0
	else:
		return lookup[0][2] 

def add_user_to_accounts_DB(username, password, name, email):
	conn = sqlite3.connect('accounts.db')
	accounts_database = conn.cursor()
	new_id = 0
	while(True):
		new_id = random.randint(1, 1048576)
		lookup = accounts_database.execute("SELECT * FROM accounts WHERE user_id=\'" + str(new_id) + "\'")
		if(len(lookup.fetchall()) == 0):
			break
	accounts_database.execute("INSERT INTO accounts VALUES (\'" + str(username) + "\', \'" + str(password) + "\', \'" + str(new_id) + "\', \'" + str(name) + "\', \'" + str(email) + "\')")
	conn.commit()
	conn.close()

def get_username(user_id):
	conn = sqlite3.connect('accounts.db')
	accounts_database = conn.cursor()
	query = "SELECT * FROM accounts WHERE (user_id=\'" + str(user_id) + "\')"
	lookup = accounts_database.execute(query).fetchall()
	if(len(lookup) > 0):
		return lookup[0][3]
	else:
		return None
