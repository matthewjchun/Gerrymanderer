import json
import statistics
import numpy

with open('miboxandwhiskerrep.json') as t:
    rep = json.load(t)
with open('miboxandwhiskerrep1.json') as t:
    rep1 = json.load(t)
with open('miboxandwhiskerrep2.json') as t:
    rep2 = json.load(t)
with open('miboxandwhiskerrep3.json') as t:
    rep3 = json.load(t)
with open('miboxandwhiskerrep4.json') as t:
    rep4 = json.load(t)

d1aa = rep['d1r'] + (rep1['d1r']) + (
    rep2['d1r']) + (rep3['d1r']) + (rep4['d1r'])
d2aa = rep['d2r'] + (rep1['d2r']) + (
    rep2['d2r']) + (rep3['d2r']) + (rep4['d2r'])
d3aa = rep['d3r'] + (rep1['d3r']) + (
    rep2['d3r']) + (rep3['d3r']) + (rep4['d3r'])
d4aa = rep['d4r'] + (rep1['d4r']) + (
    rep2['d4r']) + (rep3['d4r']) + (rep4['d4r'])
d5aa = rep['d5r'] + (rep1['d5r']) + (
    rep2['d5r']) + (rep3['d5r']) + (rep4['d5r'])
d6aa = rep['d6r'] + (rep1['d6r']) + (
    rep2['d6r']) + (rep3['d6r']) + (rep4['d6r'])
d7aa = rep['d7r'] + (rep1['d7r']) + (
    rep2['d7r']) + (rep3['d7r']) + (rep4['d7r'])
d8aa = rep['d8r'] + (rep1['d8r']) + (
    rep2['d8r']) + (rep3['d8r']) + (rep4['d8r'])
d9aa = rep['d9r'] + (rep1['d9r']) + (
    rep2['d9r']) + (rep3['d9r']) + (rep4['d9r'])
d10aa = rep['d10r'] + (rep1['d10r']) + (
    rep2['d10r']) + (rep3['d10r']) + (rep4['d10r'])
d11aa = rep['d11r'] + (rep1['d11r']) + (
    rep2['d11r']) + (rep3['d11r']) + (rep4['d11r'])

d1aa_rep = {
    'min': min(d1aa),
    'max': max(d1aa),
    'med': statistics.median(d1aa),
    '1q': numpy.percentile(d1aa, 25),
    '3q': numpy.percentile(d1aa, 75)
}

d2aa_rep = {
    'min': min(d2aa),
    'max': max(d2aa),
    'med': statistics.median(d2aa),
    '1q': numpy.percentile(d2aa, 25),
    '3q': numpy.percentile(d2aa, 75)
}

d3aa_rep = {
    'min': min(d3aa),
    'max': max(d3aa),
    'med': statistics.median(d3aa),
    '1q': numpy.percentile(d3aa, 25),
    '3q': numpy.percentile(d3aa, 75)
}

d4aa_rep = {
    'min': min(d4aa),
    'max': max(d4aa),
    'med': statistics.median(d4aa),
    '1q': numpy.percentile(d4aa, 25),
    '3q': numpy.percentile(d4aa, 75)
}

d5aa_rep = {
    'min': min(d5aa),
    'max': max(d5aa),
    'med': statistics.median(d5aa),
    '1q': numpy.percentile(d5aa, 25),
    '3q': numpy.percentile(d5aa, 75)
}

d6aa_rep = {
    'min': min(d6aa),
    'max': max(d6aa),
    'med': statistics.median(d6aa),
    '1q': numpy.percentile(d6aa, 25),
    '3q': numpy.percentile(d6aa, 75)
}

d7aa_rep = {
    'min': min(d7aa),
    'max': max(d7aa),
    'med': statistics.median(d7aa),
    '1q': numpy.percentile(d7aa, 25),
    '3q': numpy.percentile(d7aa, 75)
}

d8aa_rep = {
    'min': min(d8aa),
    'max': max(d8aa),
    'med': statistics.median(d8aa),
    '1q': numpy.percentile(d8aa, 25),
    '3q': numpy.percentile(d8aa, 75)
}

d9aa_rep = {
    'min': min(d9aa),
    'max': max(d9aa),
    'med': statistics.median(d9aa),
    '1q': numpy.percentile(d9aa, 25),
    '3q': numpy.percentile(d9aa, 75)
}
d10aa_rep = {
    'min': min(d10aa),
    'max': max(d10aa),
    'med': statistics.median(d10aa),
    '1q': numpy.percentile(d10aa, 25),
    '3q': numpy.percentile(d10aa, 75)
}
d11aa_rep = {
    'min': min(d11aa),
    'max': max(d11aa),
    'med': statistics.median(d11aa),
    '1q': numpy.percentile(d11aa, 25),
    '3q': numpy.percentile(d11aa, 75)
}
aa_rep = [d1aa_rep, d2aa_rep, d3aa_rep, d4aa_rep,
          d5aa_rep, d6aa_rep, d7aa_rep, d8aa_rep, d9aa_rep, d10aa_rep, d11aa_rep]

with open('mibw/rep.json', 'w') as f:
    json.dump(aa_rep, f, ensure_ascii=False, indent=4)
