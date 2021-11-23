import json

with open('recombination_of_districts.json') as f:
    recomb = json.load(f)

precincts_districts = {}
precincts_pop = {}

# collect all populations of precincts to the district they belong to
for i in recomb['nodes']:
    if i['district'] not in precincts_districts:
        precincts_districts[i['district']] = []
        precincts_districts[i['district']].append(i['population'])
    else:
        precincts_districts[i['district']].append(i['population'])

for i in precincts_districts:
    pop_ints = [int(j) for j in precincts_districts[i]]
    sum_pop = sum(pop_ints)
    min_pop = min(pop_ints)
    max_pop = max(pop_ints)

    pop_eq = (max_pop - min_pop) / sum_pop

    precincts_pop[i] = {
        "pop_eq": pop_eq
    }

with open('test.json', 'w') as f:
    json.dump(precincts_pop, f, ensure_ascii=False, indent=4)
