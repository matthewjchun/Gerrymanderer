import json
from helpers import check_majority_minority, sort_minorities

# only keep the nodes of the districtings
# add in demographic information for districts
# condense everything into district level

# id, districts, total population
districting = {}
# id, precincts, total pop, demographic pops
districts = {}

boxandwhisker = {'d1aa': [], 'd2aa': [], 'd3aa': [], 'd4aa': [], 'd5aa': [], 'd6aa': [], 'd7aa': [], 'd8aa': [], 'd9aa': [], 'd10aa': [], 'd11aa': [],
                 'd12aa': [], 'd13aa': [], 'd14aa': [],
                 'd1a': [], 'd2a': [], 'd3a': [], 'd4a': [], 'd5a': [], 'd6a': [], 'd7a': [], 'd8a': [], 'd9a': [], 'd10a': [], 'd11a': [],
                 'd12a': [], 'd13a': [], 'd14a': [],
                 'd1p': [], 'd2p': [], 'd3p': [], 'd4p': [], 'd5p': [], 'd6p': [], 'd7p': [], 'd8p': [], 'd9p': [], 'd10p': [], 'd11p': [],
                 'd12p': [], 'd13p': [], 'd14p': [],
                 'd1n': [], 'd2n': [], 'd3n': [], 'd4n': [], 'd5n': [], 'd6n': [], 'd7n': [], 'd8n': [], 'd9n': [], 'd10n': [], 'd11n': [],
                 'd12n': [], 'd13n': [], 'd14n': [],
                 'd1h': [], 'd2h': [], 'd3h': [], 'd4h': [], 'd5h': [], 'd6h': [], 'd7h': [], 'd8h': [], 'd9h': [], 'd10h': [], 'd11h': [],
                 'd12h': [], 'd13h': [], 'd14h': []
                 }
boxandwhisker_vap = {'d1aa': [], 'd2aa': [], 'd3aa': [], 'd4aa': [], 'd5aa': [], 'd6aa': [], 'd7aa': [], 'd8aa': [], 'd9aa': [], 'd10aa': [], 'd11aa': [],
                     'd12aa': [], 'd13aa': [], 'd14aa': [],
                     'd1a': [], 'd2a': [], 'd3a': [], 'd4a': [], 'd5a': [], 'd6a': [], 'd7a': [], 'd8a': [], 'd9a': [], 'd10a': [], 'd11a': [],
                     'd12a': [], 'd13a': [], 'd14a': [],
                     'd1p': [], 'd2p': [], 'd3p': [], 'd4p': [], 'd5p': [], 'd6p': [], 'd7p': [], 'd8p': [], 'd9p': [], 'd10p': [], 'd11p': [],
                     'd12p': [], 'd13p': [], 'd14p': [],
                     'd1n': [], 'd2n': [], 'd3n': [], 'd4n': [], 'd5n': [], 'd6n': [], 'd7n': [], 'd8n': [], 'd9n': [], 'd10n': [], 'd11n': [],
                     'd12n': [], 'd13n': [], 'd14n': [],
                     'd1h': [], 'd2h': [], 'd3h': [], 'd4h': [], 'd5h': [], 'd6h': [], 'd7h': [], 'd8h': [], 'd9h': [], 'd10h': [], 'd11h': [],
                     'd12h': [], 'd13h': [], 'd14h': []
                     }
boxandwhisker_cvap = {'d1aa': [], 'd2aa': [], 'd3aa': [], 'd4aa': [], 'd5aa': [], 'd6aa': [], 'd7aa': [], 'd8aa': [], 'd9aa': [], 'd10aa': [], 'd11aa': [],
                      'd12aa': [], 'd13aa': [], 'd14aa': [],
                      'd1a': [], 'd2a': [], 'd3a': [], 'd4a': [], 'd5a': [], 'd6a': [], 'd7a': [], 'd8a': [], 'd9a': [], 'd10a': [], 'd11a': [],
                      'd12a': [], 'd13a': [], 'd14a': [],
                      'd1p': [], 'd2p': [], 'd3p': [], 'd4p': [], 'd5p': [], 'd6p': [], 'd7p': [], 'd8p': [], 'd9p': [], 'd10p': [], 'd11p': [],
                      'd12p': [], 'd13p': [], 'd14p': [],
                      'd1n': [], 'd2n': [], 'd3n': [], 'd4n': [], 'd5n': [], 'd6n': [], 'd7n': [], 'd8n': [], 'd9n': [], 'd10n': [], 'd11n': [],
                      'd12n': [], 'd13n': [], 'd14n': [],
                      'd1h': [], 'd2h': [], 'd3h': [], 'd4h': [], 'd5h': [], 'd6h': [], 'd7h': [], 'd8h': [], 'd9h': [], 'd10h': [], 'd11h': [],
                      'd12h': [], 'd13h': [], 'd14h': []
                      }
boxandwhisker_dem = {'d1d': [], 'd2d': [], 'd3d': [], 'd4d': [
], 'd5d': [], 'd6d': [], 'd7d': [], 'd8d': [], 'd9d': [], 'd10d': [], 'd11d': [],  'd12d': [], 'd13d': [], 'd14d': []}
boxandwhisker_rep = {'d1r': [], 'd2r': [], 'd3r': [], 'd4r': [
], 'd5r': [], 'd6r': [], 'd7r': [], 'd8r': [], 'd9r': [], 'd10r': [], 'd11r': [], 'd12r': [], 'd13r': [], 'd14r': []}

with open('mirecombs.json') as f:
    recomb = json.load(f)

with open('mi_precinct_population.json') as t:
    pop_types = json.load(t)
with open('mi_precinct_election.json') as t:
    election = json.load(t)

# each districting
for i in recomb:
    if i == '1540':
        print("second graph")
    # precincts in the districting
    precincts = recomb[i]['nodes']

    # init districting object with id
    districting[i] = {
        'id': i,
        'districts': [],
        'tot_pop': 0,
        'tot_vap': 0,
        'tot_cvap': 0,
        'majority_minority_tot': 0,
        'majority_minority_cvap': 0,
        'majority_minority_vap': 0,
        'pop_eq': 0,
        'pop_eq_cvap': 0,
        'pop_eq_vap': 0,
        'polsby_avg': 0,
        'district10': {},
        'district11': {},
        'district12': {},
        'district13': {},
        'district14': {},
        'district15': {},
        'district16': {},
        'district17': {},
        'district18': {},
        'district19': {},
        'district20': {},
        'district21': {},
        'district22': {},
        'district23': {}
    }

    for precinct in precincts:
        if precinct['district'] not in districting[i]['districts']:
            districting[i]['districts'].append(precinct['district'])
            districts[precinct['district']] = {
                'precincts': [precinct['id']],
                'tot_pop': int(precinct['population']),
                'tot_vap': int(pop_types[precinct['id']][1]['Total']),
                'tot_cvap': int(pop_types[precinct['id']][2]['Total']),
                'african': int(pop_types[precinct['id']][0]['Black']),
                'asian': int(pop_types[precinct['id']][0]['Asian']),
                'native': int(pop_types[precinct['id']][0]['Native']),
                'pacific': int(pop_types[precinct['id']][0]['Islander']),
                'hispanic': int(pop_types[precinct['id']][0]['Hispanic']),
                'white': int(pop_types[precinct['id']][0]['White']),
                'african_vap': int(pop_types[precinct['id']][1]['Black']),
                'asian_vap': int(pop_types[precinct['id']][1]['Asian']),
                'native_vap': int(pop_types[precinct['id']][1]['Native']),
                'pacific_vap': int(pop_types[precinct['id']][1]['Islander']),
                'hispanic_vap': int(pop_types[precinct['id']][1]['Hispanic']),
                'white_vap': int(pop_types[precinct['id']][1]['White']),
                'african_cvap': int(pop_types[precinct['id']][2]['Black']),
                'asian_cvap': int(pop_types[precinct['id']][2]['Asian']),
                'native_cvap': int(pop_types[precinct['id']][2]['Native']),
                'pacific_cvap': int(pop_types[precinct['id']][2]['Islander']),
                'hispanic_cvap': int(pop_types[precinct['id']][2]['Hispanic']),
                'white_cvap': int(pop_types[precinct['id']][2]['White']),
                'polsby': 0
            }
            precinct_key = str(precinct['district'])
            district_key = 'district' + precinct_key
            districting[i][district_key] = districts[precinct['district']]
            districting[i]['tot_pop'] += int(precinct['population'])
            districting[i]['tot_vap'] += int(
                pop_types[precinct['id']][1]['Total'])
            districting[i]['tot_cvap'] += int(
                pop_types[precinct['id']][2]['Total'])
        else:
            districts[precinct['district']]['precincts'].append(precinct['id'])
            districts[precinct['district']
                      ]['tot_pop'] += int(precinct['population'])
            districts[precinct['district']
                      ]['tot_vap'] += int(pop_types[precinct['id']][1]['Total'])
            districts[precinct['district']
                      ]['tot_cvap'] += int(pop_types[precinct['id']][2]['Total'])
            districts[precinct['district']
                      ]['african'] += int(pop_types[precinct['id']][0]['Black'])
            districts[precinct['district']
                      ]['asian'] += int(pop_types[precinct['id']][0]['Asian'])
            districts[precinct['district']
                      ]['native'] += int(pop_types[precinct['id']][0]['Native'])
            districts[precinct['district']]['pacific'] += int(
                pop_types[precinct['id']][0]['Islander'])
            districts[precinct['district']]['hispanic'] += int(
                pop_types[precinct['id']][0]['Hispanic'])
            districts[precinct['district']]['white'] += int(
                pop_types[precinct['id']][0]['White'])
            districts[precinct['district']
                      ]['african_vap'] += int(pop_types[precinct['id']][1]['Black'])
            districts[precinct['district']
                      ]['asian_vap'] += int(pop_types[precinct['id']][1]['Asian'])
            districts[precinct['district']
                      ]['native_vap'] += int(pop_types[precinct['id']][1]['Native'])
            districts[precinct['district']
                      ]['pacific_vap'] += int(pop_types[precinct['id']][1]['Islander'])
            districts[precinct['district']
                      ]['hispanic_vap'] += int(pop_types[precinct['id']][1]['Hispanic'])
            districts[precinct['district']
                      ]['white_vap'] += int(pop_types[precinct['id']][1]['White'])
            districts[precinct['district']
                      ]['african_cvap'] += int(pop_types[precinct['id']][2]['Black'])
            districts[precinct['district']
                      ]['asian_cvap'] += int(pop_types[precinct['id']][2]['Asian'])
            districts[precinct['district']
                      ]['native_cvap'] += int(pop_types[precinct['id']][2]['Native'])
            districts[precinct['district']
                      ]['pacific_cvap'] += int(pop_types[precinct['id']][2]['Islander'])
            districts[precinct['district']
                      ]['hispanic_cvap'] += int(pop_types[precinct['id']][2]['Hispanic'])
            districts[precinct['district']
                      ]['white_cvap'] += int(pop_types[precinct['id']][2]['White'])
            precinct_key = str(precinct['district'])
            district_key = 'district' + precinct_key
            districting[i][district_key] = districts[precinct['district']]
            districting[i]['tot_pop'] += int(precinct['population'])
            districting[i]['tot_vap'] += int(
                pop_types[precinct['id']][1]['Total'])
            districting[i]['tot_cvap'] += int(
                pop_types[precinct['id']][2]['Total'])
        if precinct['id'] in election:
            districts[precinct['district']]['democratic'] = int(
                election[precinct['id']]['dem'])
            districts[precinct['district']]['republican'] = int(
                election[precinct['id']]['rep'])
    # update measure values for districting
    # list of district pop values
    pops = []
    pops_vap = []
    pops_cvap = []
    for district in districts:
        pops.append(districts[district]['tot_pop'])
        pops_vap.append(districts[district]['tot_vap'])
        pops_cvap.append(districts[district]['tot_cvap'])
    districting[i]['pop_eq'] = (max(
        pops) - min(pops)) / districting[i]['tot_pop']
    districting[i]['pop_eq_vap'] = (max(
        pops_vap) - min(pops_vap)) / districting[i]['tot_vap']
    districting[i]['pop_eq_cvap'] = (max(
        pops_cvap) - min(pops_cvap)) / districting[i]['tot_cvap']

    # majority minority
    for district in districts:
        if check_majority_minority(districts[district]['african'], districts[district]['tot_pop']):
            districting[i]['majority_minority_tot'] += 1
        elif check_majority_minority(districts[district]['asian'], districts[district]['tot_pop']):
            districting[i]['majority_minority_tot'] += 1
        elif check_majority_minority(districts[district]['native'], districts[district]['tot_pop']):
            districting[i]['majority_minority_tot'] += 1
        elif check_majority_minority(districts[district]['pacific'], districts[district]['tot_pop']):
            districting[i]['majority_minority_tot'] += 1
        elif check_majority_minority(districts[district]['hispanic'], districts[district]['tot_pop']):
            districting[i]['majority_minority_tot'] += 1

        if check_majority_minority(districts[district]['african_vap'], districts[district]['tot_vap']):
            districting[i]['majority_minority_vap'] += 1
        elif check_majority_minority(districts[district]['asian_vap'], districts[district]['tot_vap']):
            districting[i]['majority_minority_vap'] += 1
        elif check_majority_minority(districts[district]['native_vap'], districts[district]['tot_vap']):
            districting[i]['majority_minority_vap'] += 1
        elif check_majority_minority(districts[district]['pacific_vap'], districts[district]['tot_vap']):
            districting[i]['majority_minority_vap'] += 1
        elif check_majority_minority(districts[district]['hispanic_vap'], districts[district]['tot_vap']):
            districting[i]['majority_minority_vap'] += 1

        if check_majority_minority(districts[district]['african_cvap'], districts[district]['tot_cvap']):
            districting[i]['majority_minority_cvap'] += 1
        elif check_majority_minority(districts[district]['asian_cvap'], districts[district]['tot_cvap']):
            districting[i]['majority_minority_cvap'] += 1
        elif check_majority_minority(districts[district]['native_cvap'], districts[district]['tot_cvap']):
            districting[i]['majority_minority_cvap'] += 1
        elif check_majority_minority(districts[district]['pacific_cvap'], districts[district]['tot_cvap']):
            districting[i]['majority_minority_cvap'] += 1
        elif check_majority_minority(districts[district]['hispanic_cvap'], districts[district]['tot_cvap']):
            districting[i]['majority_minority_cvap'] += 1

    # box and whisker
    # order all districts in order by minority group
    # put the population number into the appropriate dictionary
    # save box and whisker dictionaries in their own file
    sort_minorities(
        districts, 'asian', 'tot_pop', boxandwhisker['d1a'], boxandwhisker['d2a'], boxandwhisker['d3a'], boxandwhisker['d4a'], boxandwhisker['d5a'], boxandwhisker['d6a'], boxandwhisker['d7a'], boxandwhisker['d8a'], boxandwhisker['d9a'], boxandwhisker['d10a'], boxandwhisker['d11a'], boxandwhisker['d12a'], boxandwhisker['d13a'], boxandwhisker['d14a'])
    sort_minorities(
        districts, 'african', 'tot_pop', boxandwhisker['d1aa'], boxandwhisker['d2aa'], boxandwhisker['d3aa'], boxandwhisker['d4aa'], boxandwhisker['d5aa'], boxandwhisker['d6aa'], boxandwhisker['d7aa'], boxandwhisker['d8aa'], boxandwhisker['d9aa'], boxandwhisker['d10aa'], boxandwhisker['d11aa'], boxandwhisker['d12aa'], boxandwhisker['d13aa'], boxandwhisker['d14aa'])
    sort_minorities(
        districts, 'native', 'tot_pop', boxandwhisker['d1n'], boxandwhisker['d2n'], boxandwhisker['d3n'], boxandwhisker['d4n'], boxandwhisker['d5n'], boxandwhisker['d6n'], boxandwhisker['d7n'], boxandwhisker['d8n'], boxandwhisker['d9n'], boxandwhisker['d10n'], boxandwhisker['d11n'], boxandwhisker['d12n'], boxandwhisker['d13n'], boxandwhisker['d14n'])
    sort_minorities(
        districts, 'pacific', 'tot_pop', boxandwhisker['d1p'], boxandwhisker['d2p'], boxandwhisker['d3p'], boxandwhisker['d4p'], boxandwhisker['d5p'], boxandwhisker['d6p'], boxandwhisker['d7p'], boxandwhisker['d8p'], boxandwhisker['d9p'], boxandwhisker['d10p'], boxandwhisker['d11p'], boxandwhisker['d12p'], boxandwhisker['d13p'], boxandwhisker['d14p'])
    sort_minorities(
        districts, 'hispanic', 'tot_pop', boxandwhisker['d1h'], boxandwhisker['d2h'], boxandwhisker['d3h'], boxandwhisker['d4h'], boxandwhisker['d5h'], boxandwhisker['d6h'], boxandwhisker['d7h'], boxandwhisker['d8h'], boxandwhisker['d9h'], boxandwhisker['d10h'], boxandwhisker['d11h'], boxandwhisker['d12h'], boxandwhisker['d13h'], boxandwhisker['d14h'])

    sort_minorities(
        districts, 'asian_vap', 'tot_vap', boxandwhisker_vap['d1a'], boxandwhisker_vap['d2a'], boxandwhisker_vap['d3a'], boxandwhisker_vap['d4a'], boxandwhisker_vap['d5a'], boxandwhisker_vap['d6a'], boxandwhisker_vap['d7a'], boxandwhisker_vap['d8a'], boxandwhisker_vap['d9a'], boxandwhisker_vap['d10a'], boxandwhisker_vap['d11a'], boxandwhisker_vap['d12a'], boxandwhisker_vap['d13a'], boxandwhisker_vap['d14a'])
    sort_minorities(
        districts, 'african_vap', 'tot_vap', boxandwhisker_vap['d1aa'], boxandwhisker_vap['d2aa'], boxandwhisker_vap['d3aa'], boxandwhisker_vap['d4aa'], boxandwhisker_vap['d5aa'], boxandwhisker_vap['d6aa'], boxandwhisker_vap['d7aa'], boxandwhisker_vap['d8aa'], boxandwhisker_vap['d9aa'], boxandwhisker_vap['d10aa'], boxandwhisker_vap['d11aa'], boxandwhisker_vap['d12aa'], boxandwhisker_vap['d13aa'], boxandwhisker_vap['d14aa'])
    sort_minorities(
        districts, 'native_vap', 'tot_vap', boxandwhisker_vap['d1n'], boxandwhisker_vap['d2n'], boxandwhisker_vap['d3n'], boxandwhisker_vap['d4n'], boxandwhisker_vap['d5n'], boxandwhisker_vap['d6n'], boxandwhisker_vap['d7n'], boxandwhisker_vap['d8n'], boxandwhisker_vap['d9n'], boxandwhisker_vap['d10n'], boxandwhisker_vap['d11n'], boxandwhisker_vap['d12n'], boxandwhisker_vap['d13n'], boxandwhisker_vap['d14n'])
    sort_minorities(
        districts, 'pacific_vap', 'tot_vap', boxandwhisker_vap['d1p'], boxandwhisker_vap['d2p'], boxandwhisker_vap['d3p'], boxandwhisker_vap['d4p'], boxandwhisker_vap['d5p'], boxandwhisker_vap['d6p'], boxandwhisker_vap['d7p'], boxandwhisker_vap['d8p'], boxandwhisker_vap['d9p'], boxandwhisker_vap['d10p'], boxandwhisker_vap['d11p'], boxandwhisker_vap['d12p'], boxandwhisker_vap['d13p'], boxandwhisker_vap['d14p'])
    sort_minorities(
        districts, 'hispanic', 'tot_vap', boxandwhisker_vap['d1h'], boxandwhisker_vap['d2h'], boxandwhisker_vap['d3h'], boxandwhisker_vap['d4h'], boxandwhisker_vap['d5h'], boxandwhisker_vap['d6h'], boxandwhisker_vap['d7h'], boxandwhisker_vap['d8h'], boxandwhisker_vap['d9h'], boxandwhisker_vap['d10h'], boxandwhisker_vap['d11h'], boxandwhisker_vap['d12p'], boxandwhisker_vap['d13h'], boxandwhisker_vap['d14h'])

    sort_minorities(
        districts, 'asian_cvap', 'tot_cvap', boxandwhisker_cvap['d1a'], boxandwhisker_cvap['d2a'], boxandwhisker_cvap['d3a'], boxandwhisker_cvap['d4a'], boxandwhisker_cvap['d5a'], boxandwhisker_cvap['d6a'], boxandwhisker_cvap['d7a'], boxandwhisker_cvap['d8a'], boxandwhisker_cvap['d9a'], boxandwhisker_cvap['d10a'], boxandwhisker_cvap['d11a'], boxandwhisker_cvap['d12a'], boxandwhisker_cvap['d13a'], boxandwhisker_cvap['d14a'])
    sort_minorities(
        districts, 'african_cvap', 'tot_cvap', boxandwhisker_cvap['d1aa'], boxandwhisker_cvap['d2aa'], boxandwhisker_cvap['d3aa'], boxandwhisker_cvap['d4aa'], boxandwhisker_cvap['d5aa'], boxandwhisker_cvap['d6aa'], boxandwhisker_cvap['d7aa'], boxandwhisker_cvap['d8aa'], boxandwhisker_cvap['d9aa'], boxandwhisker_cvap['d10aa'], boxandwhisker_cvap['d11aa'], boxandwhisker_cvap['d12aa'], boxandwhisker_cvap['d13aa'], boxandwhisker_cvap['d14aa'])
    sort_minorities(
        districts, 'native_cvap', 'tot_cvap', boxandwhisker_cvap['d1n'], boxandwhisker_cvap['d2n'], boxandwhisker_cvap['d3n'], boxandwhisker_cvap['d4n'], boxandwhisker_cvap['d5n'], boxandwhisker_cvap['d6n'], boxandwhisker_cvap['d7n'], boxandwhisker_cvap['d8n'], boxandwhisker_cvap['d9n'], boxandwhisker_cvap['d10n'], boxandwhisker_cvap['d11n'], boxandwhisker_cvap['d12n'], boxandwhisker_cvap['d13n'], boxandwhisker_cvap['d14n'])
    sort_minorities(
        districts, 'pacific_cvap', 'tot_cvap', boxandwhisker_cvap['d1p'], boxandwhisker_cvap['d2p'], boxandwhisker_cvap['d3p'], boxandwhisker_cvap['d4p'], boxandwhisker_cvap['d5p'], boxandwhisker_cvap['d6p'], boxandwhisker_cvap['d7p'], boxandwhisker_cvap['d8p'], boxandwhisker_cvap['d9p'], boxandwhisker_cvap['d10p'], boxandwhisker_cvap['d11p'], boxandwhisker_cvap['d12p'], boxandwhisker_cvap['d13p'], boxandwhisker_cvap['d14p'])
    sort_minorities(
        districts, 'hispanic_cvap', 'tot_cvap', boxandwhisker_cvap['d1h'], boxandwhisker_cvap['d2h'], boxandwhisker_cvap['d3h'], boxandwhisker_cvap['d4h'], boxandwhisker_cvap['d5h'], boxandwhisker_cvap['d6h'], boxandwhisker_cvap['d7h'], boxandwhisker_cvap['d8h'], boxandwhisker_cvap['d9h'], boxandwhisker_cvap['d10h'], boxandwhisker_cvap['d11h'], boxandwhisker_cvap['d12h'], boxandwhisker_cvap['d13h'], boxandwhisker_cvap['d14h'])

    sort_minorities(
        districts, 'democratic', 'tot_cvap', boxandwhisker_dem['d1d'], boxandwhisker_dem['d2d'], boxandwhisker_dem['d3d'], boxandwhisker_dem['d4d'], boxandwhisker_dem['d5d'], boxandwhisker_dem['d6d'], boxandwhisker_dem['d7d'], boxandwhisker_dem['d8d'], boxandwhisker_dem['d9d'], boxandwhisker_dem['d10d'], boxandwhisker_dem['d11d'], boxandwhisker_dem['d12d'], boxandwhisker_dem['d13d'], boxandwhisker_dem['d14d'])
    sort_minorities(
        districts, 'republican', 'tot_cvap', boxandwhisker_rep['d1r'], boxandwhisker_rep['d2r'], boxandwhisker_rep['d3r'], boxandwhisker_rep['d4r'], boxandwhisker_rep['d5r'], boxandwhisker_rep['d6r'], boxandwhisker_rep['d7r'], boxandwhisker_rep['d8r'], boxandwhisker_rep['d9r'], boxandwhisker_rep['d10r'], boxandwhisker_rep['d11r'], boxandwhisker_rep['d12r'], boxandwhisker_rep['d13r'], boxandwhisker_rep['d14r'])
    # reset districts
    districts = {}

with open('mipostprocessed.json', 'w') as f:
    json.dump(districting, f, ensure_ascii=False, indent=4)

with open('miboxandwhiskertot4.json', 'w') as f:
    json.dump(boxandwhisker, f, ensure_ascii=False, indent=4)

with open('miboxandwhiskervap4.json', 'w') as f:
    json.dump(boxandwhisker_vap, f, ensure_ascii=False, indent=4)

with open('miboxandwhiskercvap4.json', 'w') as f:
    json.dump(boxandwhisker_cvap, f, ensure_ascii=False, indent=4)

with open('miboxandwhiskerdem4.json', 'w') as f:
    json.dump(boxandwhisker_dem, f, ensure_ascii=False, indent=4)

with open('miboxandwhiskerrep4.json', 'w') as f:
    json.dump(boxandwhisker_rep, f, ensure_ascii=False, indent=4)
