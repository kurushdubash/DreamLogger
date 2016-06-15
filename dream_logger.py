from init_db import c
from time import gmtime, strftime

def add_entry(dream_txt, name='Kurush'):
	current_date_time = strftime("%Y-%m-%d %H:%M:%S", gmtime())
	c.execute("INSERT INTO dreams VALUES (\'" + name + "\', \'" + current_date_time + "\', \'" + dream_txt + "\')")
