import sys
sys.dont_write_bytecode = True

from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome('/Users/simonzhou/Documents/chromedriver')
driver.get('localhost:3000')

################# Check if All Components Render on DOM #################

driver.find_element_by_class_name('selection-container') # checks for selection window
driver.find_element_by_class_name('home-button-container') # checks for home button
driver.find_element_by_class_name('info-button-container') # checks for info button

driver.find_element_by_class_name('mapboxgl-map') # checks if map initially renders


################# Quit Selenium on Success #################

print "successful"
driver.quit()
