import json

with open('vaefgap.json') as f:
    p = json.load(f)
with open('vaefgap1.json') as f:
    p1 = json.load(f)
with open('vaefgap2.json') as f:
    p2 = json.load(f)
with open('vaefgap3.json') as f:
    p3 = json.load(f)
with open('vaefgap4.json') as f:
    p4 = json.load(f)
with open('vapolsbypost.json') as f:
    pp = json.load(f)
with open('vapolsbypost1.json') as f:
    pp1 = json.load(f)
with open('vapolsbypost2.json') as f:
    pp2 = json.load(f)
with open('vapolsbypost3.json') as f:
    pp3 = json.load(f)
with open('vapolsbypost4.json') as f:
    pp4 = json.load(f)

with open('vaworstpopeq.json') as f:
    worstpopeq = json.load(f)
with open('vaworstpolsby.json') as f:
    worstpolsby = json.load(f)
with open('vaworstobj.json') as f:
    worstobj = json.load(f)
# with open('vaworstmajmin.json') as f:
#     worstmajmin = json.load(f)


def add_polsby(worstdistrictings, counter, pfile, id):
    worstdistrictings[counter]['polsby_avg'] = pfile[str(id)]['polsby_avg']
    worstdistrictings[counter]['objective_func'] = pfile[str(
        id)]['objective_func']
    worstdistrictings[counter]['district10']['polsby'] = pfile[str(
        id)]['district10']['polsby']
    worstdistrictings[counter]['district11']['polsby'] = pfile[str(
        id)]['district11']['polsby']
    worstdistrictings[counter]['district12']['polsby'] = pfile[str(
        id)]['district12']['polsby']
    worstdistrictings[counter]['district13']['polsby'] = pfile[str(
        id)]['district13']['polsby']
    worstdistrictings[counter]['district14']['polsby'] = pfile[str(
        id)]['district14']['polsby']
    worstdistrictings[counter]['district15']['polsby'] = pfile[str(
        id)]['district15']['polsby']
    worstdistrictings[counter]['district16']['polsby'] = pfile[str(
        id)]['district16']['polsby']
    worstdistrictings[counter]['district17']['polsby'] = pfile[str(
        id)]['district17']['polsby']
    worstdistrictings[counter]['district18']['polsby'] = pfile[str(
        id)]['district18']['polsby']
    worstdistrictings[counter]['district19']['polsby'] = pfile[str(
        id)]['district19']['polsby']
    worstdistrictings[counter]['district20']['polsby'] = pfile[str(
        id)]['district20']['polsby']


worstdistrictings = {}
counter = 0
for i in worstpopeq:
    # print(p[str(int(i['id'])-2000)])

    if int(i['id']) < 2000:
        worstdistrictings[counter] = p[str(i['id'])]
        add_polsby(worstdistrictings, counter, pp, i['id'])
    elif int(i['id']) >= 2000 and int(i['id']) < 4000:
        worstdistrictings[counter] = p1[str(int(i['id']-2000))]
        add_polsby(worstdistrictings, counter, pp1, int(i['id']-2000))
    elif int(i['id']) >= 4000 and int(i['id']) < 6000:
        worstdistrictings[counter] = p2[str(int(i['id']-4000))]
        add_polsby(worstdistrictings, counter, pp2, int(i['id']-4000))
    elif int(i['id']) >= 6000 and int(i['id'] < 8000):
        worstdistrictings[counter] = p3[str(int(i['id']-6000))]
        add_polsby(worstdistrictings, counter, pp3, int(i['id']-6000))
    elif int(i['id']) >= 8000 and int(i['id'] < 10000):
        worstdistrictings[counter] = p4[str(int(i['id']-8000))]
        add_polsby(worstdistrictings, counter, pp4, int(i['id']-8000))
    counter += 1

for i in worstpolsby:
    if int(i['id']) < 2000:
        worstdistrictings[counter] = p[str(i['id'])]
        add_polsby(worstdistrictings, counter, pp, i['id'])
    elif int(i['id']) >= 2000 and int(i['id']) < 4000:
        worstdistrictings[counter] = p1[str(int(i['id']-2000))]
        add_polsby(worstdistrictings, counter, pp1, int(i['id']-2000))
    elif int(i['id']) >= 4000 and int(i['id']) < 6000:
        worstdistrictings[counter] = p2[str(int(i['id']-4000))]
        add_polsby(worstdistrictings, counter, pp2, int(i['id']-4000))
    elif int(i['id']) >= 6000 and int(i['id'] < 8000):
        worstdistrictings[counter] = p3[str(int(i['id']-6000))]
        add_polsby(worstdistrictings, counter, pp3, int(i['id']-6000))
    elif int(i['id']) >= 8000 and int(i['id'] < 10000):
        worstdistrictings[counter] = p4[str(int(i['id']-8000))]
        add_polsby(worstdistrictings, counter, pp4, int(i['id']-8000))
    counter += 1

for i in worstobj:
    if int(i['id']) < 2000:
        worstdistrictings[counter] = p[str(i['id'])]
        add_polsby(worstdistrictings, counter, pp, i['id'])
    elif int(i['id']) >= 2000 and int(i['id']) < 4000:
        worstdistrictings[counter] = p1[str(int(i['id']-2000))]
        add_polsby(worstdistrictings, counter, pp1, int(i['id']-2000))
    elif int(i['id']) >= 4000 and int(i['id']) < 6000:
        worstdistrictings[counter] = p2[str(int(i['id']-4000))]
        add_polsby(worstdistrictings, counter, pp2, int(i['id']-4000))
    elif int(i['id']) >= 6000 and int(i['id'] < 8000):
        worstdistrictings[counter] = p3[str(int(i['id']-6000))]
        add_polsby(worstdistrictings, counter, pp3, int(i['id']-6000))
    elif int(i['id']) >= 8000 and int(i['id'] < 10000):
        worstdistrictings[counter] = p4[str(int(i['id']-8000))]
        add_polsby(worstdistrictings, counter, pp4, int(i['id']-8000))
    counter += 1
# for i in worstmajmin:
#     if int(i['id']) < 2000:
#         worstdistrictings[counter] = p[str(i['id'])]
#         add_polsby(worstdistrictings, counter, pp, i['id'])
#     elif int(i['id']) >= 2000 and int(i['id']) < 4000:
#         worstdistrictings[counter] = p1[str(int(i['id']-2000))]
#         add_polsby(worstdistrictings, counter, pp1, int(i['id']-2000))
#     elif int(i['id']) >= 4000 and int(i['id']) < 6000:
#         worstdistrictings[counter] = p2[str(int(i['id']-4000))]
#         add_polsby(worstdistrictings, counter, pp2, int(i['id']-4000))
#     elif int(i['id']) >= 6000 and int(i['id'] < 8000):
#         worstdistrictings[counter] = p3[str(int(i['id']-6000))]
#         add_polsby(worstdistrictings, counter, pp3, int(i['id']-6000))
#     elif int(i['id']) >= 8000 and int(i['id'] < 10000):
#         worstdistrictings[counter] = p4[str(int(i['id']-8000))]
#         add_polsby(worstdistrictings, counter, pp4, int(i['id']-8000))
#     counter += 1

with open('vaworstdistrictings.json', 'w') as f:
    json.dump(worstdistrictings, f, ensure_ascii=False, indent=4)
