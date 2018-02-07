import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

driver = webdriver.Chrome('/Users/simonzhou/Documents/chromedriver')
driver.get('localhost:3000')

################# Toggle Overlays Flow #################

### Bars/Clubs/Restaurants

## 1. Visible Mode
driver.find_element_by_xpath("//input[@class='selection-bars']").click()
time.sleep(1)
switch = driver.find_element_by_xpath("//label[@class='switch']")
if switch.is_displayed():
    print 'switch is visible (for bars/apt/restaurants)'

all_children_by_css = switch.find_elements_by_css_selector("*")
all_children_by_css[1].click()

## 2. Invisible Mode
driver.find_element_by_xpath("//input[@class='selection-bars']").click()
try:
    driver.find_element_by_xpath("//label[@class='switch']")
except NoSuchElementException:
    print 'switch is no longer visible (for bars/apt/restaurants)'


### Apartments

## 1. Visible Mode
driver.find_element_by_xpath("//input[@class='selection-apt']").click()
time.sleep(1)
switch = driver.find_element_by_xpath("//label[@class='switch']")
if switch.is_displayed():
    print 'switch is visible (for apartments)'

all_children_by_css = switch.find_elements_by_css_selector("*")
all_children_by_css[1].click()

## 2. Invisible Mode
driver.find_element_by_xpath("//input[@class='selection-apt']").click()
try:
    driver.find_element_by_xpath("//label[@class='switch']")
except NoSuchElementException:
    print 'switch is no longer visible (for apartments)'

################# Quit Selenium on Success #################

print "successful"
driver.quit()
