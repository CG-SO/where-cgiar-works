/* ---------------------------------------------------------------------------
   CGIAR Center headquarters — transcribed from "Where CGIAR Works".
   Coordinates are the published city/campus locations of each office.

   `region` uses this project's own taxonomy, the three regions in data/:
   Africa (africa.json), Latin America & the Caribbean (americas.json) and
   Asia & the Pacific (apac.json). Three headquarters sit outside all three,
   so they carry a fourth label, "Europe & North America".
   --------------------------------------------------------------------------- */

window.CENTERS = [
  {
    id: 'cgiar',
    name: 'CGIAR System Organization',
    abbr: 'CGIAR',
    city: 'Montpellier',
    country: 'France',
    region: 'Europe & North America',
    lat: 43.6108, lon: 3.8767,
    url: 'https://www.cgiar.org',
    focus: 'System-wide coordination of the CGIAR research partnership.',
    hq: true
  },
  {
    id: 'alliance-rome',
    name: 'Alliance of Bioversity International and CIAT',
    abbr: 'Alliance',
    city: 'Rome',
    country: 'Italy',
    region: 'Europe & North America',
    lat: 41.9028, lon: 12.4964,
    url: 'https://www.alliancebioversityciat.org',
    focus: 'Agricultural biodiversity, food systems and nutrition.'
  },
  {
    id: 'alliance-cali',
    name: 'Alliance of Bioversity International and CIAT',
    abbr: 'Alliance',
    city: 'Cali',
    country: 'Colombia',
    region: 'Latin America & the Caribbean',
    lat: 3.4516, lon: -76.5320,
    url: 'https://www.alliancebioversityciat.org',
    focus: 'Tropical crops, genetic resources and climate-smart agriculture.'
  },
  {
    id: 'icarda',
    name: 'International Center for Agricultural Research in the Dry Areas',
    abbr: 'ICARDA',
    city: 'Beirut',
    country: 'Lebanon',
    region: 'Asia & the Pacific',
    lat: 33.8938, lon: 35.5018,
    url: 'https://www.icarda.org',
    focus: 'Farming systems for the world’s dry and drought-prone areas.'
  },
  {
    id: 'icrisat',
    name: 'International Crops Research Institute for the Semi-Arid Tropics',
    abbr: 'ICRISAT',
    city: 'Patancheru',
    country: 'India',
    region: 'Asia & the Pacific',
    lat: 17.5169, lon: 78.2775,
    url: 'https://www.icrisat.org',
    focus: 'Sorghum, millets, chickpea, pigeonpea and groundnut in drylands.'
  },
  {
    id: 'ifpri',
    name: 'International Food Policy Research Institute',
    abbr: 'IFPRI',
    city: 'Washington DC',
    country: 'United States of America',
    region: 'Europe & North America',
    lat: 38.9072, lon: -77.0369,
    url: 'https://www.ifpri.org',
    focus: 'Food policy research to end hunger and malnutrition.'
  },
  {
    id: 'cimmyt',
    name: 'International Wheat and Maize Improvement Center',
    abbr: 'CIMMYT',
    city: 'Mexico City',
    country: 'Mexico',
    region: 'Latin America & the Caribbean',
    lat: 19.4326, lon: -99.1332,
    url: 'https://www.cimmyt.org',
    focus: 'Wheat and maize breeding and sustainable cereal systems.'
  },
  {
    id: 'cip',
    name: 'International Potato Center',
    abbr: 'CIP',
    city: 'Lima',
    country: 'Peru',
    region: 'Latin America & the Caribbean',
    lat: -12.0464, lon: -77.0428,
    url: 'https://www.cipotato.org',
    focus: 'Potato, sweetpotato and Andean roots and tubers.'
  },
  {
    id: 'africarice',
    name: 'AfricaRice',
    abbr: 'AfricaRice',
    city: 'Bouaké',
    country: 'Côte d’Ivoire',
    region: 'Africa',
    lat: 7.6906, lon: -5.0300,
    url: 'https://www.africarice.org',
    focus: 'Rice research for food security across Africa.'
  },
  {
    id: 'iita',
    name: 'International Institute of Tropical Agriculture',
    abbr: 'IITA',
    city: 'Ibadan',
    country: 'Nigeria',
    region: 'Africa',
    lat: 7.3775, lon: 3.9470,
    url: 'https://www.iita.org',
    focus: 'Cassava, banana, cowpea, maize and soybean in the tropics.'
  },
  {
    id: 'ilri-addis',
    name: 'International Livestock Research Institute',
    abbr: 'ILRI',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    region: 'Africa',
    lat: 9.0320, lon: 38.7469,
    url: 'https://www.ilri.org',
    focus: 'Livestock research for better lives through livestock.'
  },
  {
    id: 'ilri-nairobi',
    name: 'International Livestock Research Institute',
    abbr: 'ILRI',
    city: 'Nairobi',
    country: 'Kenya',
    region: 'Africa',
    lat: -1.2921, lon: 36.8219,
    url: 'https://www.ilri.org',
    focus: 'Livestock research for better lives through livestock.'
  },
  {
    id: 'icraf',
    name: 'World Agroforestry',
    abbr: 'ICRAF',
    city: 'Nairobi',
    country: 'Kenya',
    region: 'Africa',
    lat: -1.3031, lon: 36.8060,
    url: 'https://www.cifor-icraf.org',
    focus: 'Trees on farms, land restoration and agroforestry systems.'
  },
  {
    id: 'iwmi',
    name: 'International Water Management Institute',
    abbr: 'IWMI',
    city: 'Colombo',
    country: 'Sri Lanka',
    region: 'Asia & the Pacific',
    lat: 6.9271, lon: 79.8612,
    url: 'https://www.iwmi.org',
    focus: 'Sustainable management of water for agriculture.'
  },
  {
    id: 'irri',
    name: 'International Rice Research Institute',
    abbr: 'IRRI',
    city: 'Los Baños',
    country: 'Philippines',
    region: 'Asia & the Pacific',
    lat: 14.1699, lon: 121.2441,
    url: 'https://www.irri.org',
    focus: 'Rice science, breeding and the world’s largest rice genebank.'
  },
  {
    id: 'cifor',
    name: 'Center for International Forestry Research',
    abbr: 'CIFOR',
    city: 'Bogor',
    country: 'Indonesia',
    region: 'Asia & the Pacific',
    lat: -6.5971, lon: 106.8060,
    url: 'https://www.cifor-icraf.org',
    focus: 'Forests, landscapes and the people who depend on them.'
  },
  {
    id: 'worldfish',
    name: 'WorldFish',
    abbr: 'WorldFish',
    city: 'Penang',
    country: 'Malaysia',
    region: 'Asia & the Pacific',
    lat: 5.4164, lon: 100.3327,
    url: 'https://www.worldfishcenter.org',
    focus: 'Aquaculture and small-scale fisheries for nutrition.'
  }
];

/* ---------------------------------------------------------------------------
   Country shading.

   The source graphic is a heat map of geographic coverage of the CGIAR
   2025-2030 Research Portfolio, tinted in three shades of green with no
   printed key. The groupings below reproduce that shading as closely as the
   artwork allows and are labelled as approximate in the legend — they are NOT
   an official CGIAR dataset. Country names match the Natural Earth 110m names
   used in geo.js.
   --------------------------------------------------------------------------- */

window.FOOTPRINT = {
  // Darkest — heaviest portfolio coverage; includes every Center host country.
  3: [
    'Mexico', 'Colombia', 'Peru', 'Côte d’Ivoire', 'Nigeria', 'Ghana',
    'Burkina Faso', 'Mali', 'Senegal', 'Ethiopia', 'Kenya', 'Uganda',
    'Tanzania', 'Egypt', 'Morocco', 'Lebanon', 'India', 'Bangladesh',
    'Nepal', 'Vietnam', 'Philippines', 'Indonesia', 'Sri Lanka', 'Malaysia'
  ],
  // Mid — substantial portfolio coverage.
  2: [
    'Guatemala', 'Honduras', 'Nicaragua', 'Ecuador', 'Bolivia', 'Brazil',
    'Rwanda', 'Burundi', 'Malawi', 'Zambia', 'Zimbabwe', 'Mozambique',
    'Madagascar', 'Niger', 'Benin', 'Togo', 'Cameroon', 'Dem. Rep. Congo',
    'Sudan', 'S. Sudan', 'Somalia', 'Tunisia', 'Algeria', 'Jordan', 'Syria',
    'Iran', 'Turkey', 'Yemen', 'Pakistan', 'Afghanistan', 'Uzbekistan',
    'Kyrgyzstan', 'Tajikistan', 'Myanmar', 'Thailand', 'Cambodia', 'Laos',
    'China'
  ],
  // Lightest — lighter portfolio coverage at the edge of the heat map.
  1: [
    'Belize', 'El Salvador', 'Costa Rica', 'Panama', 'Cuba', 'Haiti',
    'Dominican Rep.', 'Jamaica', 'Venezuela', 'Guyana', 'Suriname',
    'Paraguay', 'Uruguay', 'Argentina', 'Chile', 'Mauritania', 'Gambia',
    'Guinea', 'Guinea-Bissau', 'Sierra Leone', 'Liberia', 'Chad',
    'Central African Rep.', 'Congo', 'Gabon', 'Eq. Guinea', 'Angola',
    'Namibia', 'Botswana', 'South Africa', 'Lesotho', 'eSwatini',
    'Eritrea', 'Djibouti', 'Somaliland', 'Libya', 'W. Sahara', 'Israel',
    'Palestine', 'Iraq', 'Saudi Arabia', 'Oman', 'United Arab Emirates',
    'Kuwait', 'Qatar', 'Azerbaijan', 'Armenia', 'Georgia', 'Kazakhstan',
    'Turkmenistan', 'Mongolia', 'Bhutan', 'North Korea', 'Timor-Leste',
    'Papua New Guinea', 'Solomon Is.', 'Fiji', 'Vanuatu', 'Croatia'
  ]
};

/* Which region each shaded country belongs to. Selecting a region filter
   drops every country outside it back to the base map colour. Generated to
   cover exactly the countries listed in FOOTPRINT above. */

window.COUNTRY_REGION = {
  /* Africa */
  'Algeria':                 'Africa',
  'Angola':                  'Africa',
  'Benin':                   'Africa',
  'Botswana':                'Africa',
  'Burkina Faso':            'Africa',
  'Burundi':                 'Africa',
  'Cameroon':                'Africa',
  'Central African Rep.':    'Africa',
  'Chad':                    'Africa',
  'Congo':                   'Africa',
  'Côte d’Ivoire':           'Africa',
  'Dem. Rep. Congo':         'Africa',
  'Djibouti':                'Africa',
  'Egypt':                   'Africa',
  'Eq. Guinea':              'Africa',
  'Eritrea':                 'Africa',
  'Ethiopia':                'Africa',
  'Gabon':                   'Africa',
  'Gambia':                  'Africa',
  'Ghana':                   'Africa',
  'Guinea':                  'Africa',
  'Guinea-Bissau':           'Africa',
  'Kenya':                   'Africa',
  'Lesotho':                 'Africa',
  'Liberia':                 'Africa',
  'Libya':                   'Africa',
  'Madagascar':              'Africa',
  'Malawi':                  'Africa',
  'Mali':                    'Africa',
  'Mauritania':              'Africa',
  'Morocco':                 'Africa',
  'Mozambique':              'Africa',
  'Namibia':                 'Africa',
  'Niger':                   'Africa',
  'Nigeria':                 'Africa',
  'Rwanda':                  'Africa',
  'S. Sudan':                'Africa',
  'Senegal':                 'Africa',
  'Sierra Leone':            'Africa',
  'Somalia':                 'Africa',
  'Somaliland':              'Africa',
  'South Africa':            'Africa',
  'Sudan':                   'Africa',
  'Tanzania':                'Africa',
  'Togo':                    'Africa',
  'Tunisia':                 'Africa',
  'Uganda':                  'Africa',
  'W. Sahara':               'Africa',
  'Zambia':                  'Africa',
  'Zimbabwe':                'Africa',
  'eSwatini':                'Africa',
  /* Latin America & the Caribbean */
  'Argentina':               'Latin America & the Caribbean',
  'Belize':                  'Latin America & the Caribbean',
  'Bolivia':                 'Latin America & the Caribbean',
  'Brazil':                  'Latin America & the Caribbean',
  'Chile':                   'Latin America & the Caribbean',
  'Colombia':                'Latin America & the Caribbean',
  'Costa Rica':              'Latin America & the Caribbean',
  'Cuba':                    'Latin America & the Caribbean',
  'Dominican Rep.':          'Latin America & the Caribbean',
  'Ecuador':                 'Latin America & the Caribbean',
  'El Salvador':             'Latin America & the Caribbean',
  'Guatemala':               'Latin America & the Caribbean',
  'Guyana':                  'Latin America & the Caribbean',
  'Haiti':                   'Latin America & the Caribbean',
  'Honduras':                'Latin America & the Caribbean',
  'Jamaica':                 'Latin America & the Caribbean',
  'Mexico':                  'Latin America & the Caribbean',
  'Nicaragua':               'Latin America & the Caribbean',
  'Panama':                  'Latin America & the Caribbean',
  'Paraguay':                'Latin America & the Caribbean',
  'Peru':                    'Latin America & the Caribbean',
  'Suriname':                'Latin America & the Caribbean',
  'Uruguay':                 'Latin America & the Caribbean',
  'Venezuela':               'Latin America & the Caribbean',
  /* Asia & the Pacific */
  'Afghanistan':             'Asia & the Pacific',
  'Armenia':                 'Asia & the Pacific',
  'Azerbaijan':              'Asia & the Pacific',
  'Bangladesh':              'Asia & the Pacific',
  'Bhutan':                  'Asia & the Pacific',
  'Cambodia':                'Asia & the Pacific',
  'China':                   'Asia & the Pacific',
  'Fiji':                    'Asia & the Pacific',
  'Georgia':                 'Asia & the Pacific',
  'India':                   'Asia & the Pacific',
  'Indonesia':               'Asia & the Pacific',
  'Iran':                    'Asia & the Pacific',
  'Iraq':                    'Asia & the Pacific',
  'Israel':                  'Asia & the Pacific',
  'Jordan':                  'Asia & the Pacific',
  'Kazakhstan':              'Asia & the Pacific',
  'Kuwait':                  'Asia & the Pacific',
  'Kyrgyzstan':              'Asia & the Pacific',
  'Laos':                    'Asia & the Pacific',
  'Lebanon':                 'Asia & the Pacific',
  'Malaysia':                'Asia & the Pacific',
  'Mongolia':                'Asia & the Pacific',
  'Myanmar':                 'Asia & the Pacific',
  'Nepal':                   'Asia & the Pacific',
  'North Korea':             'Asia & the Pacific',
  'Oman':                    'Asia & the Pacific',
  'Pakistan':                'Asia & the Pacific',
  'Palestine':               'Asia & the Pacific',
  'Papua New Guinea':        'Asia & the Pacific',
  'Philippines':             'Asia & the Pacific',
  'Qatar':                   'Asia & the Pacific',
  'Saudi Arabia':            'Asia & the Pacific',
  'Solomon Is.':             'Asia & the Pacific',
  'Sri Lanka':               'Asia & the Pacific',
  'Syria':                   'Asia & the Pacific',
  'Tajikistan':              'Asia & the Pacific',
  'Thailand':                'Asia & the Pacific',
  'Timor-Leste':             'Asia & the Pacific',
  'Turkey':                  'Asia & the Pacific',
  'Turkmenistan':            'Asia & the Pacific',
  'United Arab Emirates':    'Asia & the Pacific',
  'Uzbekistan':              'Asia & the Pacific',
  'Vanuatu':                 'Asia & the Pacific',
  'Vietnam':                 'Asia & the Pacific',
  'Yemen':                   'Asia & the Pacific',
  /* Europe & North America */
  'Croatia':                 'Europe & North America',
};
