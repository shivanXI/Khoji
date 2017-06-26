# Review crawler for cafe's by freinds being there on weekends
# Author: Shivan Trivedi

from selenium import webdriver

from selenium.webdriver.common.by import By 
from selenium.webdriver.common.keys import Keys 
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC 

import time
import os

selected_place_text_file = (r"","r")
cafe_in_selected_city_details = selected_place_text_file.readlines()
selected_place_text_file.close()

for i in xrange(len(cafe_in_selected_city_details)):
	cafe_in_selected_city_details[i] = cafe_in_selected_city_details[i].strip()

driver = webdriver.Firefox()
'''chromedriver = ""
os.environ["webdriver.chrome.driver"] = chromedriver
driver = webdriver.Chrome(chromedriver)'''


for j in xrange(12, len(cafe_in_selected_city_details)):
	driver.get(cafe_in_selected_city_details[j])
	
	try:
		cafe_name = str(driver.find_element_by_xpath("//span[@itemprop = 'name']").text).strip()
	except:
		continue

	try:
		load_element = driver.find_element_by_xpath("//div[@class='load-more']")
	except:
		continue

	try:
		cafe_ratings = driver.find_element_by_xpath("//div[@itemprop='ratingValue']")
		cafe_ratings = cafe_ratings.text
	except:
		continue

	try:
		location = driver.find_element_by_class_name("resmap-img")
		loc = location.get_attribute("style")
		loc = loc.split('|')
		loc = loc[2]
	except:
		continue		

	try:
		review_type = driver.find_element_by_xpath("//span[@class='grey-text']")
		#print 'All',review_type[1].text
	except:
		continue

	items = int(str(load_element.text.split()[-1]))
	loaded = items

	while load_element.is_displayed:
		load_element.click()
		print "Data Loaded ",loaded
		try:
			load_element  = driver.find_element_by_xpath("//div[@class='load-more']")
		except:
			break

		loaded = loaded - 5	

	print "Reviews fetching in progress............\n\n"
	for i in xrange(items+5):
		try:
			user_id = driver.find_element_by_xpath("//*[@id="reviews-container"]/div[1]/div[3]/div[1]/div['+str(i+1)+']/div[2]/div[1]/div[1]/div/div[2]/div[1]/a")
			with open(user_id+".csv","ab") as k:
				text_file = csv.writer(k)
				follow = driver.find_element_by_xpath("//div[@class='zs-following-list']/div["+str(i+1)+"]")
				ratings = driver.find_element_by_xpath("//div[@class='zs-following-list']/div['+str(i+1)+']/div[3]/div/div/div/div/div")

		print >>text_file,"Review",i
		print "Reviews given by users ",i, " .........\n\n"
		print >>f,'\n'
		print >>f,"Rate = ",((int(rate.get_attribute("class")[-1:])+1)/2.0)
		print >>f,follow.text.encode('utf-8')
		print >>f,'\n'
	text_file.close()

driver.close()

























