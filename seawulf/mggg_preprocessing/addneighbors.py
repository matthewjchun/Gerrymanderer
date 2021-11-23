import geopandas as gpd
import json

file = "az_precincts_ids_orig"
gdf = gpd.read_file(file)

# add NEIGHBORS column
gdf["NEIGHBORS"] = None

for index, precinct in gdf.iterrows():

    # get 'not disjoint' counties
    neighbors = gdf[~gdf.geometry.disjoint(precinct.geometry)].GEOID20.tolist()

    # remove own name of the precinct from the list
    neighbors = [name for name in neighbors if precinct.GEOID20 != name]

    # add names of neighbors as NEIGHBORS value
    gdf.at[index, "NEIGHBORS"] = ", ".join(neighbors)

gdf.to_file("neighbors_precinct")
