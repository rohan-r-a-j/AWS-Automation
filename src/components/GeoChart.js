import { ResponsiveChoropleth } from "@nivo/geo";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
let data = [
    {
      id: "AFG",
      value: 123726,
    },
    {
      id: "AGO",
      value: 716044,
    },
    {
      id: "ALB",
      value: 107141,
    },
    {
      id: "ARE",
      value: 136065,
    },
    {
      id: "ARG",
      value: 248845,
    },
    {
      id: "ARM",
      value: 408480,
    },
    {
      id: "ATA",
      value: 260868,
    },
    {
      id: "ATF",
      value: 527898,
    },
    {
      id: "AUT",
      value: 804902,
    },
    {
      id: "AZE",
      value: 654305,
    },
    {
      id: "BDI",
      value: 253324,
    },
    {
      id: "BEL",
      value: 563424,
    },
    {
      id: "BEN",
      value: 381841,
    },
    {
      id: "BFA",
      value: 554106,
    },
    {
      id: "BGD",
      value: 24940,
    },
    {
      id: "BGR",
      value: 932961,
    },
    {
      id: "BHS",
      value: 803538,
    },
    {
      id: "BIH",
      value: 205495,
    },
    {
      id: "BLR",
      value: 916475,
    },
    {
      id: "BLZ",
      value: 790669,
    },
    {
      id: "BOL",
      value: 189149,
    },
    {
      id: "BRN",
      value: 533681,
    },
    {
      id: "BTN",
      value: 433554,
    },
    {
      id: "BWA",
      value: 948330,
    },
    {
      id: "CAF",
      value: 521631,
    },
    {
      id: "CAN",
      value: 610018,
    },
    {
      id: "CHE",
      value: 299802,
    },
    {
      id: "CHL",
      value: 822791,
    },
    {
      id: "CHN",
      value: 972315,
    },
    {
      id: "CIV",
      value: 108622,
    },
    {
      id: "CMR",
      value: 103358,
    },
    {
      id: "COG",
      value: 194093,
    },
    {
      id: "COL",
      value: 265152,
    },
    {
      id: "CRI",
      value: 242700,
    },
    {
      id: "CUB",
      value: 717772,
    },
    {
      id: "-99",
      value: 44267,
    },
    {
      id: "CYP",
      value: 185559,
    },
    {
      id: "CZE",
      value: 916631,
    },
    {
      id: "DEU",
      value: 27933,
    },
    {
      id: "DJI",
      value: 952099,
    },
    {
      id: "DNK",
      value: 240624,
    },
    {
      id: "DOM",
      value: 654115,
    },
    {
      id: "DZA",
      value: 965119,
    },
    {
      id: "ECU",
      value: 235830,
    },
    {
      id: "EGY",
      value: 366360,
    },
    {
      id: "ERI",
      value: 261939,
    },
    {
      id: "ESP",
      value: 902059,
    },
    {
      id: "EST",
      value: 668626,
    },
    {
      id: "ETH",
      value: 991879,
    },
    {
      id: "FIN",
      value: 356550,
    },
    {
      id: "FJI",
      value: 500180,
    },
    {
      id: "FLK",
      value: 183041,
    },
    {
      id: "FRA",
      value: 417923,
    },
    {
      id: "GAB",
      value: 477513,
    },
    {
      id: "GBR",
      value: 532234,
    },
    {
      id: "GEO",
      value: 247208,
    },
    {
      id: "GHA",
      value: 639824,
    },
    {
      id: "GIN",
      value: 239729,
    },
    {
      id: "GMB",
      value: 666801,
    },
    {
      id: "GNB",
      value: 449718,
    },
    {
      id: "GNQ",
      value: 977033,
    },
    {
      id: "GRC",
      value: 744051,
    },
    {
      id: "GTM",
      value: 810097,
    },
    {
      id: "GUY",
      value: 943909,
    },
    {
      id: "HND",
      value: 848144,
    },
    {
      id: "HRV",
      value: 969797,
    },
    {
      id: "HTI",
      value: 513314,
    },
    {
      id: "HUN",
      value: 673185,
    },
    {
      id: "IDN",
      value: 235980,
    },
    {
      id: "IND",
      value: 121962,
    },
    {
      id: "IRL",
      value: 584924,
    },
    {
      id: "IRN",
      value: 60855,
    },
    {
      id: "IRQ",
      value: 486160,
    },
    {
      id: "ISL",
      value: 81765,
    },
    {
      id: "ISR",
      value: 228610,
    },
    {
      id: "ITA",
      value: 197608,
    },
    {
      id: "JAM",
      value: 175936,
    },
    {
      id: "JOR",
      value: 39132,
    },
    {
      id: "JPN",
      value: 788918,
    },
    {
      id: "KAZ",
      value: 884213,
    },
    {
      id: "KEN",
      value: 154592,
    },
    {
      id: "KGZ",
      value: 886482,
    },
    {
      id: "KHM",
      value: 170241,
    },
    {
      id: "OSA",
      value: 78021,
    },
    {
      id: "KWT",
      value: 599359,
    },
    {
      id: "LAO",
      value: 73358,
    },
    {
      id: "LBN",
      value: 462081,
    },
    {
      id: "LBR",
      value: 132616,
    },
    {
      id: "LBY",
      value: 730968,
    },
    {
      id: "LKA",
      value: 14332,
    },
    {
      id: "LSO",
      value: 910953,
    },
    {
      id: "LTU",
      value: 156907,
    },
    {
      id: "LUX",
      value: 658749,
    },
    {
      id: "LVA",
      value: 86817,
    },
    {
      id: "MAR",
      value: 214983,
    },
    {
      id: "MDA",
      value: 392389,
    },
    {
      id: "MDG",
      value: 602543,
    },
    {
      id: "MEX",
      value: 771943,
    },
    {
      id: "MKD",
      value: 707274,
    },
    {
      id: "MLI",
      value: 481239,
    },
    {
      id: "MMR",
      value: 419687,
    },
    {
      id: "MNE",
      value: 464808,
    },
    {
      id: "MNG",
      value: 458657,
    },
    {
      id: "MOZ",
      value: 465873,
    },
    {
      id: "MRT",
      value: 417168,
    },
    {
      id: "MWI",
      value: 964632,
    },
    {
      id: "MYS",
      value: 89066,
    },
    {
      id: "NAM",
      value: 496220,
    },
    {
      id: "NCL",
      value: 393825,
    },
    {
      id: "NER",
      value: 838254,
    },
    {
      id: "NGA",
      value: 635857,
    },
    {
      id: "NIC",
      value: 586916,
    },
    {
      id: "NLD",
      value: 875205,
    },
    {
      id: "NOR",
      value: 932157,
    },
    {
      id: "NPL",
      value: 579461,
    },
    {
      id: "NZL",
      value: 16786,
    },
    {
      id: "OMN",
      value: 756907,
    },
    {
      id: "PAK",
      value: 3562,
    },
    {
      id: "PAN",
      value: 214866,
    },
    {
      id: "PER",
      value: 334101,
    },
    {
      id: "PHL",
      value: 276915,
    },
    {
      id: "PNG",
      value: 530851,
    },
    {
      id: "POL",
      value: 663168,
    },
    {
      id: "PRI",
      value: 124720,
    },
    {
      id: "PRT",
      value: 422585,
    },
    {
      id: "PRY",
      value: 145377,
    },
    {
      id: "QAT",
      value: 325573,
    },
    {
      id: "ROU",
      value: 694226,
    },
    {
      id: "RUS",
      value: 771246,
    },
    {
      id: "RWA",
      value: 121473,
    },
    {
      id: "ESH",
      value: 724223,
    },
    {
      id: "SAU",
      value: 455010,
    },
    {
      id: "SDN",
      value: 747948,
    },
    {
      id: "SDS",
      value: 683778,
    },
    {
      id: "SEN",
      value: 879863,
    },
    {
      id: "SLB",
      value: 594324,
    },
    {
      id: "SLE",
      value: 917865,
    },
    {
      id: "SLV",
      value: 622058,
    },
    {
      id: "ABV",
      value: 177174,
    },
    {
      id: "SOM",
      value: 377832,
    },
    {
      id: "SRB",
      value: 47961,
    },
    {
      id: "SUR",
      value: 350125,
    },
    {
      id: "SVK",
      value: 302161,
    },
    {
      id: "SVN",
      value: 390313,
    },
    {
      id: "SWZ",
      value: 92418,
    },
    {
      id: "SYR",
      value: 477723,
    },
    {
      id: "TCD",
      value: 837958,
    },
    {
      id: "TGO",
      value: 885049,
    },
    {
      id: "THA",
      value: 48828,
    },
    {
      id: "TJK",
      value: 898023,
    },
    {
      id: "TKM",
      value: 933709,
    },
    {
      id: "TLS",
      value: 508910,
    },
    {
      id: "TTO",
      value: 271459,
    },
    {
      id: "TUN",
      value: 577359,
    },
    {
      id: "TUR",
      value: 223182,
    },
    {
      id: "TWN",
      value: 754290,
    },
    {
      id: "TZA",
      value: 896252,
    },
    {
      id: "UGA",
      value: 686153,
    },
    {
      id: "UKR",
      value: 65908,
    },
    {
      id: "URY",
      value: 695505,
    },
    {
      id: "USA",
      value: 799291,
    },
    {
      id: "UZB",
      value: 450904,
    },
    {
      id: "VEN",
      value: 466857,
    },
    {
      id: "VNM",
      value: 126526,
    },
    {
      id: "VUT",
      value: 186296,
    },
    {
      id: "PSE",
      value: 416457,
    },
    {
      id: "YEM",
      value: 112493,
    },
    {
      id: "ZAF",
      value: 101222,
    },
    {
      id: "ZMB",
      value: 456800,
    },
    {
      id: "ZWE",
      value: 954715,
    },
    {
      id: "KOR",
      value: 754022,
    },
  ];
const GeoChart = () => (
  <ResponsiveChoropleth
    data={data}
    // features="/* please have a look at the description for usage */"
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    colors="nivo"
    domain={[0, 1000000]}
    unknownColor="#666666"
    label="properties.name"
    valueFormat=".2s"
    projectionTranslation={[0.5, 0.5]}
    projectionRotation={[0, 0, 0]}
    enableGraticule={true}
    graticuleLineColor="#dddddd"
    borderWidth={0.5}
    borderColor="#152538"
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#38bcb2",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "#eed312",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
      {
        id: "gradient",
        type: "linearGradient",
        colors: [
          {
            offset: 0,
            color: "#000",
          },
          {
            offset: 100,
            color: "inherit",
          },
        ],
      },
    ]}
    fill={[
      {
        match: {
          id: "CAN",
        },
        id: "dots",
      },
      {
        match: {
          id: "CHN",
        },
        id: "lines",
      },
      {
        match: {
          id: "ATA",
        },
        id: "gradient",
      },
    ]}
    legends={[
      {
        anchor: "bottom-left",
        direction: "column",
        justify: true,
        translateX: 20,
        translateY: -100,
        itemsSpacing: 0,
        itemWidth: 94,
        itemHeight: 18,
        itemDirection: "left-to-right",
        itemTextColor: "#444444",
        itemOpacity: 0.85,
        symbolSize: 18,
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000000",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default GeoChart;

