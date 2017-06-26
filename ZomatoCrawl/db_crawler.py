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

			print "Search clicked for ",city_name," ...................\n"
			print driver.current_url
			time.sleep(5)

			
			if not os.path.exists(r""+country+"\\"+city_name+".txt"):
				begin_place_detail[4] = '0'

			
			if begin_place_detail[4] == '0':
				city_val = 0
				city_add = open(r,""+country+"\\"+city_name+".txt","w")
				try:
					page_found = str(driver.find_element_by_xpath("//div[@class='col-l-3 mtop0 alpha tmargin pagination-number']/div").text).split()
				except:
					print "Page/Pages not determined some changes are done by the Admin of the page"
					page_found = "0"	
				page_found_quantity = int(page_found[-1])
				#print page_found_quanity	

				url = str(driver.current_url)+'?page='
				
				for i in xrange(1, page_found_quantity+1):
					city_flag =1
					try:
						city_flag = 2
						driver.get(url+str(i))
						city_flag = 1
						element = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID,"location_pretext")))
					except SystemExit:
						sys_exit()
					except:
						if city_flag == 2:
							print "\n____________Memory is wasting; Restarting the driver________________\n"
							driver.quit()
							time.sleep(1) 
							print "\n______________Starting Again_________________\n"
							driver = webdriver.Firefox()
							driver.get(url+str(i))
						elif c == 1:
							while c == 1:
								try:
									driver.get(url+str(i))
									element = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID,"location_pretext")))
									city_flag = 0
									print "\n\nReconnected Again ........\n\n"
								except:
									print "No Network Found.......Trying to Reconnect...."


					
					try:
						res_element = driver.find_element_by_class_name("result-title")
					except:
						print "Restaurant name not found"


					
					try:
						res_addr = driver.find_element_by_class_name("search-result-address")
					except:
						print "Restaurant address not found" 

					
					
					print "Crawling next page..........",i," of ",city
					for j in xrange(len(res_elem)):
						print res_elem[j].text
						print >>city_add, res_elem[j].get_attribute("href")
						print res_addr[j].text
					print '\n\n'
				city_add.close()


			city_val = 1
			print "\n Restaurant links fetched for ",city_name,".......closing the file \n\n"
			print "Using Links collected, crawling of restaurants of ",city_name," is starting......................\n\n"
			cafe_in_city = open(r""+country+"\\"city_name+".txt","r")
			cafe_in_city_details = cafe_in_city.readlines()
			cafe_in_city.close()

			
			
			for i in xrange(len(cafe_in_city_details)):
				cafe_in_city_details[i] = cafe_in_city_details[i].strip()
				single_cafe_link = cafe_in_city_details[i]
				cafe_flag = 1
				
				
				try:
					cafe_flag = 2
					driver.get(cafe_in_city_details[i])
					cafe_flag = 1
					element = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID,"location_pretext")))
				except SystemExit:
					sys_exit()
				except:
					if cafe_flag == 2:
							print "\n____________Memory is wasting; Restarting the driver________________\n"
							driver.quit()
							time.sleep(1) 
							print "\n______________Starting Again_________________\n"
							driver = webdriver.Firefox()
							driver.get(cafe_in_city_details[i])
					elif cafe_flag == 1:
						while cafe_flag == 1:
							try:
								driver.get(cafe_in_city_details[i])
								element = WebDriverWait(driver,10).until(EC.visibility_of_element_located((By.ID, "location_pretext")))
								cafe_flag = 0
								print "\n\nReconnected Again ........\n\n"
							except:
								print "No Network Found.......Trying to Reconnect...."

				
				#cafe's name and it's details 
				try:
					cafe_name = str(friver.find_element_by_xpath("//span[@itemprop='name']").text).strip()
				except:
					cafe_name = "NA"

				

				print "Crawling cafe/restaurant's details named ",cafe_name," .........\n"
				try:
					cafe_ratings  = str(driver.find_element_by_xpath("//div[@itemprop='ratingValue']").text)
				except:
					cafe_ratings = "NA"
				try:
					cafe_id = str(driver.find_element_by_xpath("//div[@itemprop='ratingValue']").get_attribute("data-res-id"))
				except:
					cafe_id = "NA"
				try:
					cafe_add = str(driver.find_element_by_xpath("//div[@class='res-main-address-text']").text) 	
				except:
					cafe_add = "NA"
				try:
					cafe_location = str(driver.find_element_by_class_name("resmap-img").get_attribute("style").split('|')[2])
					latitude = cafe_location.split(',')[0]
					longitude = cafe_location.split(',')[1]
				except:
					latitude = "NA"
					longitude = "NA"
				try:
					cafe_pop_review = driver.find_element_by_xpath("//span[@class='grey-text']")
					if len(cafe_pop_review) == 2:
						cafe_pop_review = str(cafe_pop_review[0].text.strip())
						cafe_all_review = str(driver.find_element_by_xpath("//span[@class='grey-text']"){1}.text.strip())
					else:
						cafe_all_review = str(cafe_pop_review[0].text.strip())
						cafe_pop_review = "0"				
				except:
					cafe_pop_review = "0"
					cafe_all_review = "0"		
				try:
					cafe_votes = str(driver.find_element_by_xpath("//span[@itemprop='ratingCount']")[0].text.strip())
				except:
					cafe_votes = "0"
				try:
					cafe_features = str(driver.find_element_by_xpath("//*[@id='mainframe']/div[1]/div/div[1]/div[2]/div/span[2]").text).strip()
					if cafe_features.split()[-1] == "Collections":
						cafe_features = cafe_features[12:-12]
					else:
						cafe_features = cafe_features[12:-11]
				except:
					cafe_features = "NA"
				try:
					cafe_cost = str(driver.find_element_by_xpath("//*[@id='mainframe']/div[1]/div/div[1]/div[3]/div[8]/div[2]/span[2]").text).strip()
				except:
					cafe_cost = "NA"
				try:
					cafe_estb_types = str(driver.find_element_by_xpath("//*[@id='mainframe']/div[1]/div/div[1]/div[3]/div[2]/div/div/a").text).strip()
				except:
					cafe_estb_types = "NA"
				try:
					cafe_known = str(driver.find_element_by_xpath("//*[@id='mainframe']/div[1]/div/div[1]/div[3]/div[3]/div/div[2]").text).strip()	
				except:
					cafe_known = "NA"
				try:
					cafe_shud_order = str(driver.find_element_by_xpath("//*[@id='mainframe']/div[1]/div/div[1]/div[3]/div[4]/div/div[2]").text).strip()
				except:
					cafe_shud_order = "NA"	
				try:
					cafe_cuisines = driver.find_element_by_xpath("//a[@itemprop='servesCuisine']")
				except:
					cafe_cuisines = "NA"
				try:
					cafe_highlights = driver.find_element_by_class_name("res-info-feature-text")
				except:
					cafe_highlights = "NA"
				try:
					cafe_avg_person_cost_range = driver.find_element_by_xpath("//span[@itemprop='priceRange']")[0].text.partition("for")[0].strip()		
				except:
					cafe_avg_person_cost_range = "NA"

				cafe_high_array = ['No']*7
				for i in cafe_highlights:
					i = str(i.text)
					if ("Home Delivery" in i) and (('No' not in i) and ('Not' not in i)):
						cafe_high[0] = 'Yes'
					elif ("Takeaway" in i) and (('No' not in i) and ('Not' not in i)):
						cafe_high[1] = 'Yes'
					elif (("Seating" in i) or ("Dine-In" in i)) and (('No' not in i) and ('Not' not in i)):
						cafe_high[2] = 'Yes'
					elif ("Non Veg" in i) and (('No' not in i) and ('Not' not in i)):
						cafe_high[3] = 'Yes'
					elif (("Alcohol" in i) or ("Bar" in i)) and (('No' not in i) and ('Not' not in i)):
						cafe_high[4] = 'Yes'
					elif ("Air Conditioned" in i) and (('No' not in i) and ('Not' not in i)):
						cafe_high[5] = 'Yes'
					elif ("Wifi" in i) and (('No' not in i) and ('Not' not in i)):
						cafe_high[6] = 'Yes'

				cuisine = ''

				for j in cafe_cuisines:
					cuisine = cuisine.str(i.text.strip()) + ", "
				cuisine = cuisine[:-2]
				with open("squad_cafe_db.csv",newline=" ") as new:
					obj = csv.writer(new)
					row = [cafe_name,cafe_id,cafe_add,cafe_ratings,str(city_name.strip()),str(country.strip()),latitude,longitude
					,cafe_votes,cafe_features,cafe_cost,cafe_estb_types,cafe_known,cafe_shud_order,cafe_pop_review,cafe_all_review] + cafe_high + [cuisine] 
					obj.writerow(row)
				obj = open("cafe_cuisines.txt","a")
				print >>obj,cuisine
				obj.close()

				print "\n Stored information for cafe", cafe_name," ...............\n"
	driver.quit()
	

def exit_successfully(signum, frame):
	# restoring the signal handler for the instance of control+c pressed at time of input
	signal.signal(signal.SIGINT, original_sigint)
	try:
		if raw_input("\nReally quit? (y/n) ").lower().startswith('y'):
			text_file = open("toBeginPlaceWith.txt","w")
			print >>text_file,country
			print >>text_file,city 
			print >>text_file,city_name
			print >>text_file,link
			print >>text_file, city_val
			text_file.close()
			sys.exit(1)
	except KeyboardInterrupt:
		print("Quitting forcefully............")
		text_file = open("toBeginPlaceWith.txt","w")
		print >>text_file,country
		print >>text_file,city 
		print >>text_file,city_name
		print >>text_file,link
		print >>text_file, city_val
		text_file.close()
		sys.exit(1)

	signal.signal(signal.SIGINT, exit_gracefully)


def sys_exit():
	driver.quit()
	sys.exit(1)			








main_db_crawl_program()