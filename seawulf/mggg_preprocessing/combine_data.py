import json

with open('voting_history.json', 'r') as f:
    voting_history = json.load(f)

with open('neighbors_precinct.json', 'r') as neighbors_file:
    neighbors = json.load(neighbors_file)

for i in neighbors:
    for j in voting_history:
        if i['GEOCODE'] == j['GEOID']:
            i['voting_history'] = j['voting_history']

f.close()
neighbors_file.close()

with open('combined_precincts.json', 'w') as f:
    json.dump(neighbors, f, ensure_ascii=False, indent=4)