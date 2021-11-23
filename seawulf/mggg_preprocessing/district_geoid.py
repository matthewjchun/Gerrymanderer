import json

with open('combined_precincts.json', 'r') as f:
    combined = json.load(f)
with open('precincts_with_districts.json', 'r') as pf:
    districts = json.load(pf)

for i in combined:
    for j in districts:
        if i['GEOCODE'] == j['GEOID20']:
            i['DISTRICT'] = j['DISTRICT']
            
f.close()
pf.close()

with open('precincts_geoid.json', 'w') as f:
    json.dump(combined, f, ensure_ascii=False, indent=4)