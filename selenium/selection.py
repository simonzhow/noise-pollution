import sys
sys.dont_write_bytecode = True

import time
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome('/Users/simonzhou/Documents/chromedriver')
driver.get('localhost:3000')

################# Show Overlays Flow #################

driver.find_element_by_xpath("//input[@class='selection-bars']").click()
bars = driver.find_element_by_class_name('bars-overlay')
if bars.is_displayed():
    print 'bars overlay is visible'


driver.find_element_by_xpath("//input[@class='selection-apt']").click()
apartments = driver.find_element_by_class_name('apartments-overlay')
if apartments.is_displayed():
    print 'apartments overlay is visible'

driver.find_element_by_xpath("//input[@class='selection-marker']").click()
# TODO: we have to figure out how to detect change in mapbox style...

################# Quit Selenium on Success #################

print "successful"
driver.quit()
