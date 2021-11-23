import json
from helpers import check_majority_minority

with open('az_demographics.json') as f:
    demographics = json.load(f)
with open('recombination_of_districts.json') as f:
    recomb = json.load(f)

precincts_districts = {}
majority_minority_districts = {}
hispanic = 0
african = 0
native = 0
asian = 0
pacific_islander = 0
majority_minority = 0

# assign precincts to districts and find total population
for i in recomb['nodes']:
    if i['district'] not in precincts_districts:
        precincts_districts[i['district']] = {
            'precincts': [i['id']],
            'tot_pop': i['population']
        }
    else:
        precincts_districts[i['district']]['precincts'].append(i['id'])
        precincts_districts[i['district']]['tot_pop'] += i['population']

with open('districts_tot_pop.json', 'w') as f:
    json.dump(precincts_districts, f, ensure_ascii=False, indent=4)

# find total population of demographic groups and calculate majority_minority
for i in precincts_districts:
    for j in range(len(precincts_districts[i]['precincts'])):
        hispanic += int(demographics[precincts_districts[i]
                        ['precincts'][j]]['hispanic'])
        african += int(demographics[precincts_districts[i]
                       ['precincts'][j]]['african'])
        native += int(demographics[precincts_districts[i]
                      ['precincts'][j]]['native'])
        asian += int(demographics[precincts_districts[i]
                     ['precincts'][j]]['asian'])
        pacific_islander += int(demographics[precincts_districts[i]
                                ['precincts'][j]]['pacificIslander'])
    if check_majority_minority(hispanic, precincts_districts[i]['tot_pop']):
        majority_minority += 1
    elif check_majority_minority(african, precincts_districts[i]['tot_pop']):
        majority_minority += 1
    elif check_majority_minority(native, precincts_districts[i]['tot_pop']):
        majority_minority += 1
    elif check_majority_minority(asian, precincts_districts[i]['tot_pop']):
        majority_minority += 1
    elif check_majority_minority(pacific_islander, precincts_districts[i]['tot_pop']):
        majority_minority += 1

    hispanic = 0
    african = 0
    native = 0
    asian = 0
    pacific_islander = 0

print(majority_minority)
