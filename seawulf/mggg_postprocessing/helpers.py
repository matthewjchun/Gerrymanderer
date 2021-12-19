import math
import geopandas as gpd

POP_EQ_WEIGHT = 0.6
POLSBY_WEIGHT = 0.4

gdf = gpd.read_file("mi_geos.json")


def check_majority_minority(minority, total_pop):
    if minority >= (total_pop/2):
        return True
    return False


def calc_obj_func(pop_eq, polsby):
    return (pop_eq * POP_EQ_WEIGHT) + (polsby * POLSBY_WEIGHT)


def calc_pop_eq(district_list):
    return (max(district_list) - min(district_list)) / sum(district_list)


def sort_minorities(districts, minority, total, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14):
    minority_list = []
    for district in districts:
        minority_list.append(float(districts[district]
                             [minority]) / float(districts[district][total]))
    minority_list.sort()
    d1.append(minority_list[0])
    d2.append(minority_list[1])
    d3.append(minority_list[2])
    d4.append(minority_list[3])
    d5.append(minority_list[4])
    d6.append(minority_list[5])
    d7.append(minority_list[6])
    d8.append(minority_list[7])
    d9.append(minority_list[8])
    d10.append(minority_list[9])
    d11.append(minority_list[10])
    d12.append(minority_list[11])
    d13.append(minority_list[12])
    d14.append(minority_list[13])


def calc_polsby(districting, district):
    district_geometry = []
    for precinct in districting[district]['precincts']:
        district_geometry.append(gdf.loc[int(precinct)-1539]['geometry'])
    convex = gpd.GeoSeries(district_geometry)
    convex_union = convex.unary_union
    area = convex_union.area
    perimeter = convex_union.length

    polsby = (4 * math.pi * area) / math.pow(perimeter, 2)
    districting[district]['polsby'] = polsby
    print("polsby: " + str(polsby))

    return polsby
