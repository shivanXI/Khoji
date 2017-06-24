# Crawler Only for Zomato Database like restaurants servings, locations in Delhi-NCR

from selenium import webdriver

from selenium.webdriver.common.by import By 
from selenium.webdriver.common.keys import Keys 
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC 

import signal
import time
import sys
import os
import csv


#chrome_driver = '' #chrome_driver for chrome users

def main_db_crawl_program():
	global country, city, name_of_city, link, value_of_city, driver, chrome_driver
	country = city = name_of_city = link = ''
	city_val = 0
	#driver = webdriver.Chrome(chrome_driver)
	driver = webdriver.Firefox() 		#for Firefox users

	#print "bpw"
	begin_place = open("toBeginPlaceWith.txt","r")
	begin_place_detail = begin_place.readlines()
	begin_place.close()

	for i in xrange(len(begin_place_detail)):
		begin_place_detail[i] = begin_place_detail[i].strip()
	print begin_place_detail

	facilities = ["Home Delivery", "Takeaway", "Seating", "Dine-In", "Non Veg", "Alcohol", "Air Conditioned", "Wifi"]

	#print "cl"
	country_list = open("country_list.txt","r")
	country_list_detail = country_list.readlines()
	country_list.close() 

	flag_1 = 0

	for country in country_list_detail:
		country = country.strip()
		if flag_1 == 1:
			begin_place_detail[0] = country
		if country != begin_place_detail[0]:
			continue
		else:
			flag_1 = 1






main_db_crawl_program()