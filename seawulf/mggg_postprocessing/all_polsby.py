import geopandas as gpd
import math
import json

gdf = gpd.read_file("az_precinct.json")
polsby = {}
for index, row in gdf.iterrows():
    area = row['geometry'].area
    perimeter = row["geometry"].length

    polsby_popper = (4 * math.pi * area) / math.pow(perimeter, 2)

    gdf.loc[index, 'polsby_popper'] = polsby_popper

for i in range(len(gdf)):
    polsby[gdf['id'][i]] = {
        "polsby": gdf['polsby_popper'][i]
    }

with open('all_polsby.json', 'w') as f:
    json.dump(polsby, f, ensure_ascii=False, indent=4)
