import json

with open('az_precincts_orig.json', 'r') as f:
    orig = json.load(f)
with open('az_precincts_id.json', 'r') as pf:
    ids = json.load(pf)

counter = 0

for i in orig['features']:
    i['properties']['ORIGID'] = i['properties']['GEOID20']
    i['properties']['GEOID20'] = ids[counter]['id']
    print(i['properties']['ORIGID'])
    counter = counter + 1

f.close()
pf.close()

with open('az_precincts_ids_orig.json', 'w') as f:
    json.dump(orig, f, ensure_ascii=False, indent=4)
