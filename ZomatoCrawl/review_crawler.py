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
			

