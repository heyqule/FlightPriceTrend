require 'nokogiri'
require "selenium-webdriver" # load in the webdriver gem to interact with Selenium

driver = Selenium::WebDriver.for :firefox

driver.navigate.to "https://www.ca.kayak.com/flight-routes/United-States-US0/Canada-CA0"

element = driver.find_element(class: 'react-country-picker-trigger')
element.click

html_doc = Nokogiri::HTML(driver.page_source)

objs = {}
html_doc.css('a.react-country-picker-item').each do |link|
  country_code = link.css('.react-country-picker-item__flag').attribute('class').to_s.sub!('country-flag react-country-picker-item__flag','').strip.upcase
  puts "processing #{country_code}"
  attribute = link.attribute('href')
  tokens = attribute.to_s.split('/')

  objs.merge!("#{country_code}": {
    name: link.css('.react-country-picker-item__content span').first.text,
    kayakurl: "#{tokens[0]}//#{tokens[2]}/#{tokens[3]}/"
  })
end

File.write(File.join(File.dirname(__FILE__),'kayak.json'), objs.to_json)
