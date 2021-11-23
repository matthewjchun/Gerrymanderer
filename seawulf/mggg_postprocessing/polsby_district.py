import json

with open('all_polsby.json') as f:
    all_polsby = json.load(f)
with open('recombination_of_districts.json') as f:
    recomb = json.load(f)

precincts_districts = {}
polsby_district = {}
district_polsby = 0

# find which precincts are in which districts
for i in recomb['nodes']:
    if i['district'] not in precincts_districts:
        precincts_districts[i['district']] = []
        precincts_districts[i['district']].append(i['id'])
    else:
        precincts_districts[i['district']].append(i['id'])

for i in precincts_districts:
    for j in range(len(precincts_districts[i])):
        district_polsby += all_polsby[precincts_districts[i][j]]['polsby']
    polsby_district[i] = {
        "polsby": district_polsby/len(precincts_districts[i])
    }
    district_polsby = 0

with open('polsby_district.json', 'w') as f:
    json.dump(polsby_district, f, ensure_ascii=False, indent=4)
