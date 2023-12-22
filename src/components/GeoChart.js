import { ResponsiveChoropleth } from "@nivo/geo";
import { features } from "../shared/features";
import { mapGeoData } from "../utils/utils";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

// console.log("geoData", mapGeoData({data}));
const GeoChart = ({data}) => (
  <ResponsiveChoropleth
    data={mapGeoData(data)}
    // data={[]}
    features={features.features}
    onClick={(e) => console.log(e)}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    colors="nivo"
    domain={[0, 400]}
    unknownColor="#666666"
    label="properties.name"
    valueFormat=".2s"
    // theme={{'labels':{'text'}}}
    
    tooltip={({ feature }) =>
      feature.data?.value>=0 ? (
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(4px)",
          }}
          className="card p-2"
        >
          <div>TotalCost: {feature.data.value}</div>
          {feature.data.regions.map((item,i) => (
            <div className="card-body" key={i}>
              <b className="text-success">{item[0]}</b> : ${item[1]}
            </div>
          ))}
        </div>
      ) : (
        ""
      )
    }
    projectionTranslation={[0.5, 0.5]}
    projectionRotation={[0, 0, 0]}
    enableGraticule={true}
    graticuleLineColor="#dddddd"
    borderWidth={0.5}
    borderColor="#152538"
    projectionScale={100}
    graticuleLineWidth={500}
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
        id: "valueGradient",
        type: "linearGradient",
        colors: [
          {
            offset: 0,
            color: "#0f0",
          },
          {
            offset: 100,
            color: "#f00",
          },
        ],
      },
    ]}
    // fill={[
    //   {
    //     match: {
    //       id: "CAN",
    //     },
    //     id: "dots",
    //   },
    //   {
    //     match: {
    //       id: "CHN",
    //     },
    //     id: "lines",
    //   },
    //   {
    //     match: {
    //       id: "",
    //     },
    //     id: "gradient",
    //   },
    // ]}
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
