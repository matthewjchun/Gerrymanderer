import json

elec_history = open('election_history.json',)
elec_data = json.load(elec_history)

for i in elec_data:
    if i['Democrat'] > i['Republican']:
        i['voting_history'] = 'D'
    else:
        i['voting_history'] = 'R'
    
    i.pop('Democrat', None)
    i.pop('Republican', None)

elec_history.close()

with open('voting_history.json', 'w', encoding='utf-8') as f:
    json.dump(elec_data, f, ensure_ascii=False, indent=4)