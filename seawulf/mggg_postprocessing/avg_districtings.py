import json

# compare percentages of poptype, demographic group with median values from box and whisker
with open('az/finalboxwhisker/a_cvap.json') as f:
    avg = json.load(f)
with open('az/postprocessed/postprocessed.json') as f:
    p = json.load(f)

districtpops = []
# sort districts from lowest to highest population
# sum of squares of demographic pop from median in box and whisker
for districting in p:
    for district in p[districting]['districts']:
        print(district)
        key = 'district' + district
        districtpops.append(p[districting][key]
                            ["asian_cvap"]/p[districting][key]["tot_cvap"])
        break
    break
    # districtpops.append(p[districting][district])
