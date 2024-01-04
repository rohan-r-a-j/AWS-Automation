import { ResponsivePie } from "@nivo/pie";

export function mapAWSCostToChartData(topServices) {
  // Define a base color palette or logic for assigning colors
  const colors = [
    "hsl(240, 100%, 50%)",
    "hsl(354, 70%, 50%)",
    "hsl(59, 70%, 50%)",
    "hsl(71, 70%, 50%)",
    "hsl(344, 70%, 50%)",
    "hsl(210, 70%, 50%)",
    "hsl(120, 70%, 50%)",
  ];

  let mapped= topServices?.map((service, index) => {
    return {
      id: service.service.replace(/[^a-zA-Z0-9]/g, ""), // Remove non-alphanumeric characters for ID
      label: service.service,
      value: parseFloat(service.cost).toFixed(2),
      color: colors[index % colors.length], // Assign a color, cycle through colors array
    };
  });
  return mapped
}

// Example usage
//   const top7Services = [
//       { "service": "Amazon Elastic Compute Cloud - Compute", "cost": "859.6219827201" },
//       { "service": "EC2 - Other", "cost": "335.7069934796" },
//       { "service": "Amazon Elastic Container Service for Kubernetes", "cost": "130.938484418" },
//       { "service": "Amazon Elastic Load Balancing", "cost": "94.5982189974" },
//       { "service": "Amazon Relational Database Service", "cost": "66.7519129496" },
//       { "service": "Amazon Elastic MapReduce", "cost": "28.67742816" },
//       { "service": "AWS Global Accelerator", "cost": "11.1675987801" }
//   ];

//   const chartData = mapAWSCost

let data = [
  {
    id: "ec2",
    label: "ec2",
    value: 167,
    color: "hsl(338, 70%, 50%)",
  },
  {
    id: "lambda",
    label: "lambda",
    value: 455,
    color: "hsl(354, 70%, 50%)",
  },
  {
    id: "EKS",
    label: "EKS",
    value: 296,
    color: "hsl(59, 70%, 50%)",
  },
  {
    id: "RDS",
    label: "RDS",
    value: 379,
    color: "hsl(71, 70%, 50%)",
  },
  {
    id: "AWS s3",
    label: "S3",
    value: 573,
    color: "hsl(344, 70%, 50%)",
  },
];
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const PieChartComponent = ({ chartData }) => (
  <ResponsivePie
    data={mapAWSCostToChartData(chartData)}
    // data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    fit={true}
    innerRadius={0.5}
    padAngle={0.7}
    sortByValue={true}
    cornerRadius={3}
 colors={{scheme:'set2'}}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [
        ["darker", 10],
        ["brighter", 5],
      ],
    }}
    // arcLinkLabelComponent={({ datum, label, style }) => {
    //   console.log(datum, style);

    //   return (
    //     <g transform={`translate(${style.x},${style.y})`}>
    //       <text
    //         textAnchor={style.textAnchor}
    //         style={{
    //           fill: style.textColor,
    //           fontSize: "16px", // Increase font size
    //           fontWeight: "bold", // Make font bolder
    //         }}
    //       >
    //         {label}
    //       </text>
    //     </g>
    //   );
    // }}
    // defs={[
    //   {
    //     id: "dots",
    //     type: "patternDots",
    //     background: "inherit",
    //     color: "rgba(255, 255, 255, 0.3)",
    //     size: 4,
    //     padding: 1,
    //     stagger: true,
    //   },
    //   {
    //     id: "lines",
    //     type: "patternLines",
    //     background: "inherit",
    //     color: "rgba(255, 255, 255, 0.3)",
    //     rotation: -45,
    //     lineWidth: 6,
    //     spacing: 10,
    //   },
    // ]}
    // fill={[
    //   {
    //     match: {
    //       id: "ruby",
    //     },
    //     id: "dots",
    //   },
    //   {
    //     match: {
    //       id: "c",
    //     },
    //     id: "dots",
    //   },
    //   {
    //     match: {
    //       id: "go",
    //     },
    //     id: "dots",
    //   },
    //   {
    //     match: {
    //       id: "python",
    //     },
    //     id: "dots",
    //   },
    //   {
    //     match: {
    //       id: "scala",
    //     },
    //     id: "lines",
    //   },
    //   {
    //     match: {
    //       id: "lisp",
    //     },
    //     id: "lines",
    //   },
    //   {
    //     match: {
    //       id: "elixir",
    //     },
    //     id: "lines",
    //   },
    //   {
    //     match: {
    //       id: "javascript",
    //     },
    //     id: "lines",
    //   },
    // ]}
    legends={[
      {
        anchor: "top-right",
        direction: "column",
        justify: false,
        translateX: 80,
        translateY: 5,
        itemsSpacing: 5 ,
        itemWidth: 350,
        itemHeight: 8,
        itemTextColor: "#404",
        itemDirection: "left-to-right",
        // itemBackground: "#ddd",
        itemOpacity: 1,
        symbolSize: 8,
        symbolShape: "circle",

        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
              //   itemBackground:'#fffd',
            },
          },
        ],
      },
    ]}
  />
);

export default PieChartComponent;
