import json

with open('az_clean.json', 'r') as f:
    precincts = json.load(f)
with open('az_precincts_id.json', 'r') as pf:
    ids = json.load(pf)

for i in ids:
    precincts[i['id']] = precincts.pop(i['GEOID20'])

counter = 0
list_count = 0

for i in precincts:
    for j in precincts[i]["adjacent_nodes"]:
        while counter != i:
            if ids[int(i)]['GEOID20'] == j:
                precincts[i]["adjacent_nodes"][list_count] = ids[int(i)]['id']
                print(list_count)
                list_count = list_count+1
            counter = counter+1
    list_count = 0

with open('az_ids_final.json', 'w') as f:
    json.dump(precincts, f, ensure_ascii=False, indent=4)