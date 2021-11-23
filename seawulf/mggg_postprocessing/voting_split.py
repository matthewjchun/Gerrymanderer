import json

with open('recombination_of_districts.json') as f:
    recomb = json.load(f)

precincts_districts = {}
rep_districts = 0
dem_districts = 0

# total up voting history of precincts to districts
for i in recomb['nodes']:
    if i['district'] not in precincts_districts:
        if i['voting_history'] == 'R':
            precincts_districts[i['district']] = {
                'Republican': 1,
                'Democratic': 0
            }
        else:
            precincts_districts[i['district']] = {
                'Democratic': 1,
                'Republican': 0
            }
    else:
        if i['voting_history'] == 'R':
            precincts_districts[i['district']]['Republican'] += 1
        else:
            precincts_districts[i['district']]['Democratic'] += 1

for i in precincts_districts:
    if precincts_districts[i]['Republican'] > precincts_districts[i]['Democratic']:
        rep_districts += 1
    else:
        dem_districts += 1

# store rep_districts, dem_districts in dictionary with redistricting_id
print(rep_districts, dem_districts)
