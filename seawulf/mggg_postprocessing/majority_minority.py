import json

with open('az_demographics.json') as f:
    demographics = json.load(f)
with open('recombination_of_districts.json') as f:
    recomb = json.load(f)
