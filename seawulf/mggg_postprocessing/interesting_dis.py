import heapq


def find_interesting_dis(redistricting_id):
    interesting_districtings = {
        'pop_eq': [],
        'majority_minority': [],
        'polsby': [],
        'avg': []
    }

    # each should be list of dictionaries
    pop_eq = [{
        "id": redistricting_id,
        "pop_eq": interesting_districtings['pop_eq'][0]
    }]
    majority_minority = {}
    polsby = {}
    avg = {}

    pop_eq_final = sorted(pop_eq, key=lambda i: i['pop_eq'])[8:]
    avg_final = sorted(avg, key=lambda i: i['avg'], reverse="True")[8:]
    polsby_final = sorted(polsby, key=lambda i: i['polsby'])[7:]
    maj_min_final = sorted(
        majority_minority, key=lambda i: i['majority_minority'])[7:]

    return pop_eq_final, avg_final, polsby_final, maj_min_final
