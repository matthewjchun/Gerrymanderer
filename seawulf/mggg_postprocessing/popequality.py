import json
import math

with open('recombination_of_districts.json') as f:
    recomb = json.load(f)

precincts_districts = {}
precincts_pop = {}

# collect all populations of precincts to the district they belong to
for i in recomb['nodes']:
    if i['district'] not in precincts_districts:
        precincts_districts[i['district']] = 0
        precincts_districts[i['district']] += i['population']
    else:
        precincts_districts[i['district']] += i['population']

# calculate population equality for districting
district_values = precincts_districts.values()
pop_equality = (max(district_values) - min(district_values)) / \
    sum(district_values)

print(pop_equality)
