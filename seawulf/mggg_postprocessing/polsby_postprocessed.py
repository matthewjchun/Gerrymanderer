import json
import geopandas as gpd
from helpers import calc_polsby, calc_obj_func

with open('miefgap.json') as f:
    postprocessed = json.load(f)

for districting in postprocessed:
    p0 = calc_polsby(postprocessed[districting], 'district10')
    p1 = calc_polsby(postprocessed[districting], 'district11')
    p2 = calc_polsby(postprocessed[districting], 'district12')
    p3 = calc_polsby(postprocessed[districting], 'district13')
    p4 = calc_polsby(postprocessed[districting], 'district14')
    p5 = calc_polsby(postprocessed[districting], 'district15')
    p6 = calc_polsby(postprocessed[districting], 'district16')
    p7 = calc_polsby(postprocessed[districting], 'district17')
    p8 = calc_polsby(postprocessed[districting], 'district18')
    p9 = calc_polsby(postprocessed[districting], 'district19')
    p10 = calc_polsby(postprocessed[districting], 'district20')
    p11 = calc_polsby(postprocessed[districting], 'district21')
    p12 = calc_polsby(postprocessed[districting], 'district22')
    p13 = calc_polsby(postprocessed[districting], 'district23')
    pavg = (p0+p1+p2+p3+p4+p5+p6+p7+p8+p9+p10+p11+p12+p13)/14
    postprocessed[districting]['polsby_avg'] = pavg
    postprocessed[districting]['objective_func'] = calc_obj_func(
        postprocessed[districting]['pop_eq'], postprocessed[districting]['polsby_avg'])
    print("objective function: " +
          str(postprocessed[districting]['objective_func']))

with open('mipolsbypost.json', 'w') as f:
    json.dump(postprocessed, f, ensure_ascii=False, indent=4)
