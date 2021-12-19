import json

with open('mipostprocessed.json') as f:
    p = json.load(f)
# with open('vapostprocessed1.json') as f:
#     p1 = json.load(f)
# with open('vapostprocessed2.json') as f:
#     p2 = json.load(f)
# with open('vapostprocessed3.json') as f:
#     p3 = json.load(f)
# with open('vapostprocessed4.json') as f:
#     p4 = json.load(f)


def calc_eg(p, num_districts):
    for districting in p:
        dem_votes = rep_votes = tot_votes = 0
        sum_gap = 0
        for district in p[districting]['districts']:
            key = 'district' + str(district)
            dem_votes += p[districting][key]['democratic']
            rep_votes += p[districting][key]['republican']
            tot_votes = dem_votes + rep_votes
            win = tot_votes/2
            if dem_votes > rep_votes:
                d_votes_wasted = dem_votes - win
                r_votes_wasted = rep_votes
            elif rep_votes > dem_votes:
                d_votes_wasted = dem_votes
                r_votes_wasted = rep_votes - win
            else:
                continue
            efficiency_gap = (max(d_votes_wasted, r_votes_wasted) -
                              min(d_votes_wasted, r_votes_wasted)) / tot_votes
            p[districting][key]['efficiency_gap'] = efficiency_gap
            sum_gap += efficiency_gap
        p[districting]['efficiency_gap_avg'] = sum_gap / num_districts


calc_eg(p, 14)
# calc_eg(p1, 11)
# calc_eg(p2, 11)
# calc_eg(p3, 11)
# calc_eg(p4, 11)

with open('miefgap.json', 'w') as f:
    json.dump(p, f, ensure_ascii=False, indent=4)
# with open('vaefgap1.json', 'w') as f:
#     json.dump(p1, f, ensure_ascii=False, indent=4)
# with open('vaefgap2.json', 'w') as f:
#     json.dump(p2, f, ensure_ascii=False, indent=4)
# with open('vaefgap3.json', 'w') as f:
#     json.dump(p3, f, ensure_ascii=False, indent=4)
# with open('vaefgap4.json', 'w') as f:
#     json.dump(p4, f, ensure_ascii=False, indent=4)
