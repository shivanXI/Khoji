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

		cities = open(r"\\"+country+".txt","r") #fetching cities from countries
		cities_detail = cities.readlines()
		cities.close()

		if not os.path.exists(r"\\"+country):
			os.makedirs(r"\\"+country)

		#print "cities crawling from country..........\n\n"
		flag_2 = 0
		for city in cities_detail:
			city = city.strip()
			if flag_2 == 1:
				begin_place_detail[1] = city
			if city != begin_place_detail[1]:
				continue
			else:
				flag_2 = 1

			print "*************** Getting Info of ",city," in ",country," ***************"
			try:
				city_flag = 2
				driver.get(city)
				city_flag = 1
				element  = WebDriverWait(driver,10).until(EC.visibility_of_element_located((By.ID, "location_pretext")))
			except SystemExit:
				sys_exit()	
			except:
				if city_flag == 2:
					print "\n____________Memory is wasting; Restarting the driver________________\n"
					driver.quit()
					time.sleep(1) 
					print "\n______________Starting Again_________________\n"
					driver = webdriver.Firefox()
					driver.get(city)
				elif city_flag == 1:
					while city_flag == 1:
						try:
							driver.get(city)
							element  = WebDriverWait(driver,10).until(EC.visibility_of_element_located((By.ID, "location_pretext")))
							city_flag = 0
							print "\n\nReconnected Again ........\n\n"
						except:
							print "No Network Found.......Trying to Reconnect...."
			print "***************** City in db is ",city," *************************"
			try:
				city_name = str(driver.find_element_by_xpath("//span[@class='location_input_sp']").text).strip()
			except:
				city_name = "NA"

			print "\n\nFetching Restaurants for",city_name,"......................\n\n"
			city_flag = 1
			try:
				driver.find_element_by_id("search_button").click()
				print "cnrl"
				element  =WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID,"search_button")))
				city_flag = 2
			except SystemExit:
				sys_exit()
			except:
				while city_flag == 1:
					try:
						driver.get(city)
					except:
						print "\n____________Memory is wasting; Restarting the driver________________\n"
						driver.quit()
						time.sleep(1) 
						print "\n______________Starting Again_________________\n"
						driver = webdriver.Firefox()
					try:
						element = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "search_button")))
						city_flag = 0
					except:
						print "Search and try for restaurants by clicking search_button in ",city_name,".........\n"

			if city_flag != 2:
				driver.find_element_by_id("search_button").click()
			print driver.current_url

main_db_crawl_program()