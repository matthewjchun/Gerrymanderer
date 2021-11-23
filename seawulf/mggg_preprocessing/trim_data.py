import json

with open('precincts_geoid.json', 'r') as f:
    data = json.load(f)

precincts = {}

for i in data:
    if 'voting_history' not in i:
        i['voting_history'] = "R"
    precincts[i['GEOID20']] = {
        "adjacent_nodes": i['NEIGHBORS'].split(', '),
        "population": i['POP100'],
        "voting_history": i['voting_history'],
        "district": str(i['DISTRICT'])
    }

f.close()

with open('az_clean.json', 'w') as f:
    json.dump(precincts, f, ensure_ascii=False, indent=4)