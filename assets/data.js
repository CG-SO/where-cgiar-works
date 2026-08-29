/* ---------------------------------------------------------------------------
   Engine-level geographic data for "Where CGIAR works".

   The editable content — Center headquarters, page title/subtitle — lives in
   data/centers.json, fetched at runtime, not here. This file holds the parts
   that are geographic classification rather than content: which countries
   fall in which coverage tier, and which region each of those countries
   belongs to. A content editor adding a new Center does not need to touch
   this file; its country and region come from the Center's own entry in
   centers.json.
   --------------------------------------------------------------------------- */

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
