import heapq
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
# make dictionary of id, measure value
# insert to lambda function
counter = 0
pop_eq = []
polsby = []
avg = {}
obj_func = []
maj_min = []

for districting in p:
    pop_eq.append({
        'id': counter,
        'pop_eq': p[districting]['pop_eq']
    })
    polsby.append({
        'id': counter,
        'polsby': pp[districting]['polsby_avg']
    })
    obj_func.append({
        'id': counter,
        'obj_func': pp[districting]['objective_func']
    })
    maj_min.append({
        'id': counter,
        'maj_min': p[districting]['majority_minority_tot']
    })
    counter += 1
for districting in p1:
    pop_eq.append({
        'id': counter,
        'pop_eq': p1[districting]['pop_eq']
    })
    polsby.append({
        'id': counter,
        'polsby': pp1[districting]['polsby_avg']
    })
    obj_func.append({
        'id': counter,
        'obj_func': pp1[districting]['objective_func']
    })
    maj_min.append({
        'id': counter,
        'maj_min': p1[districting]['majority_minority_tot']
    })
    counter += 1
for districting in p2:
    pop_eq.append({
        'id': counter,
        'pop_eq': p2[districting]['pop_eq']
    })
    polsby.append({
        'id': counter,
        'polsby': pp2[districting]['polsby_avg']
    })
    obj_func.append({
        'id': counter,
        'obj_func': pp2[districting]['objective_func']
    })
    maj_min.append({
        'id': counter,
        'maj_min': p2[districting]['majority_minority_tot']
    })
    counter += 1
for districting in p3:
    pop_eq.append({
        'id': counter,
        'pop_eq': p3[districting]['pop_eq']
    })
    polsby.append({
        'id': counter,
        'polsby': pp3[districting]['polsby_avg']
    })
    obj_func.append({
        'id': counter,
        'obj_func': pp3[districting]['objective_func']
    })
    maj_min.append({
        'id': counter,
        'maj_min': p3[districting]['majority_minority_tot']
    })
    counter += 1
for districting in p4:
    pop_eq.append({
        'id': counter,
        'pop_eq': p4[districting]['pop_eq']
    })
    polsby.append({
        'id': counter,
        'polsby': pp4[districting]['polsby_avg']
    })
    obj_func.append({
        'id': counter,
        'obj_func': pp4[districting]['objective_func']
    })
    maj_min.append({
        'id': counter,
        'maj_min': p4[districting]['majority_minority_tot']
    })
    counter += 1

pop_eq_final = sorted(pop_eq, key=lambda i: i['pop_eq'])
# avg_final = sorted(avg, key=lambda i: i['avg'], reverse="True")[8:]
polsby_final = sorted(polsby, key=lambda i: i['polsby'], reverse=True)
obj_func_final = sorted(
    obj_func, key=lambda i: i['obj_func'])
maj_min_final = sorted(
    maj_min, key=lambda i: i['maj_min'], reverse=True)


bestpopeq = pop_eq_final[0:10]
worstpopeq = pop_eq_final[-10:]
bestpolsby = polsby_final[0:10]
worstpolsby = polsby_final[-10:]
bestobj = obj_func_final[0:10]
worstobj = obj_func_final[-10:]
worstmajmin = maj_min_final[-10:]

# with open('vabestpopeq.json', 'w') as f:
#     json.dump(bestpopeq, f, ensure_ascii=False, indent=4)
# with open('vaworstpopeq.json', 'w') as f:
#     json.dump(worstpopeq, f, ensure_ascii=False, indent=4)
# with open('vabestpolsby.json', 'w') as f:
#     json.dump(bestpolsby, f, ensure_ascii=False, indent=4)
# with open('vaworstpolsby.json', 'w') as f:
#     json.dump(worstpolsby, f, ensure_ascii=False, indent=4)
# with open('vabestobj.json', 'w') as f:
#     json.dump(bestobj, f, ensure_ascii=False, indent=4)
# with open('vaworstobj.json', 'w') as f:
#     json.dump(worstobj, f, ensure_ascii=False, indent=4)
with open('vaworstmajmin.json', 'w') as f:
    json.dump(worstmajmin, f, ensure_ascii=False, indent=4)
