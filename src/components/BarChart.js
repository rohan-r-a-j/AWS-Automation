import { ResponsiveBar } from "@nivo/bar";
import { barChartKey, mapBarChartData } from "../utils/utils";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

let x = {
    "Dec": {
        "Total Cost": "1586.36 USD",
        "Service wise Cost": {
            "EC2": 878.6,
            "EC2 - Other": 345.57,
            "EKS": 138.02,
            "ELB": 100.79,
            "RDS": 69.68,
            "OTHERS": 53.7
        }
    },
    "Nov": {
        "Total Cost": "3016.72 USD",
        "Service wise Cost": {
            "EC2": 1816.57,
            "EC2 - Other": 503.46,
            "RDS": 229.12,
            "EKS": 165.05,
            "ELB": 140.44,
            "OTHERS": 162.09
        }
    },
    "Oct": {
        "Total Cost": "3570.15 USD",
        "Service wise Cost": {
            "EC2": 2338.53,
            "EC2 - Other": 499.05,
            "EKS": 260.98,
            "RDS": 228.02,
            "ELB": 140.73,
            "OTHERS": 102.83
        }
    },
    "Sep": {
        "Total Cost": "2068.27 USD",
        "Service wise Cost": {
            "EC2": 1288.4,
            "EC2 - Other": 387.01,
            "EKS": 165.7,
            "RDS": 147.51,
            "ELB": 59.63,
            "OTHERS": 20.03
        }
    },
    "Aug": {
        "Total Cost": "1829.91 USD",
        "Service wise Cost": {
            "EC2": 1282.61,
            "EC2 - Other": 310.2,
            "RDS": 128.07,
            "EKS": 90.93,
            "ELB": 13.8,
            "OTHERS": 4.29
        }
    },
    "Jul": {
        "Total Cost": "1618.92 USD",
        "Service wise Cost": {
            "EC2": 1115.49,
            "EC2 - Other": 360.6,
            "RDS": 119.52,
            "EKS": 14.41,
            "S3": 6.66,
            "OTHERS": 2.26
        }
    },
    "Jun": {
        "Total Cost": "1133.09 USD",
        "Service wise Cost": {
            "EC2": 653.92,
            "EC2 - Other": 351.9,
            "RDS": 96.43,
            "S3": 28.44,
            "EKS": 1.92,
            "OTHERS": 0.48
        }
    }
}
const BarChart = ({ data /* see data tab */ }) => (
  <ResponsiveBar
   
    data={mapBarChartData(data).toReversed()}
    keys={barChartKey(x)}
    indexBy="month"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "paired" }}
    
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
    ]}
    fill={[
      {
        match: {
          id: "fries",
        },
        id: "dots",
      },
      {
        match: {
          id: "sandwich",
        },
        id: "lines",
      },
    ]}
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Months",
      legendPosition: "middle",
      legendOffset: 36,
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Costs",
      legendPosition: "middle",
      legendOffset: -50,
      truncateTickAt: 0,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelFormat="2r"
isFocusable={true}
    valueFormat='.3s'
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "top-right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: -40,
        itemsSpacing: 30,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    // barAriaLabel={(e) =>
    //   e.id + ": " + e.formattedValue + " in country: " + e.indexValue
    // }
  />
);
export default BarChart;
