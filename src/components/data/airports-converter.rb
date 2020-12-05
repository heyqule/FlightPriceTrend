require 'csv'
require 'json'

objs = []
CSV.foreach(File.join(File.dirname(__FILE__),'airports.csv'), encoding: "bom|utf-8", headers: :first_row, header_converters: :symbol) do |row|
  puts row[:name]
  if row[:scheduled_service] == 'yes' && !row[:iata_code].nil?
    objs.append({
      "label": "#{row[:iata_code]} - #{row[:name]}",
      "value": row[:iata_code],
      "c2": row[:iso_country]
    })
  end
end

objs.sort! {|a,b| a[:label] <=> b[:label]}

File.write(File.join(File.dirname(__FILE__),'airports.json'), objs.to_json)
