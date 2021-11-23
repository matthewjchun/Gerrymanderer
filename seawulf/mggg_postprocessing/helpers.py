import math

POP_EQ_WEIGHT = 0.6
POLSBY_WEIGHT = 0.4


def check_majority_minority(minority, total_pop):
    if minority >= total_pop/2:
        return True
    return False


def calc_obj_func(pop_eq, polsby):
    return (pop_eq * POP_EQ_WEIGHT) + (polsby * POLSBY_WEIGHT)


def calc_pop_eq(district_list):
    return (max(district_list) - min(district_list)) / sum(district_list)
