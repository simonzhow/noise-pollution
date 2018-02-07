import sys
sys.dont_write_bytecode = True

from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome('/Users/simonzhou/Documents/chromedriver')
driver.get('localhost:3000')

################# Info Button #################
infoButton = driver.find_element_by_class_name('info-button-container')
all_children_by_css = infoButton.find_elements_by_css_selector("*")
all_children_by_css[0].click()
menu = driver.find_element_by_class_name('info-menu')
if menu.is_displayed():
    print 'info menu is visible'

# we must test functionality of home button in Jest

################# Quit Selenium on Success #################

print "successful"
driver.quit()
