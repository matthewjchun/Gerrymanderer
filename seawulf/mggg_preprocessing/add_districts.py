import geopandas as gpd
import maup

precincts = gpd.read_file("combined")
districts = gpd.read_file("az_districts")

assignment = maup.assign(precincts['geometry'], districts['geometry'])

precincts["DISTRICT"] = assignment

precincts.to_file("precincts")