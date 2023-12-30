import GeoChart from "./GeoChart";
function CountryViewComponent({ costChartData }) {
  return (
    <div
      className="card"
      style={{ width: "100%", height: "100%", aspectRatio: 16 / 8 }}
    >
      <h4 className="text-center " style={{ color: "rgba(0,0,0,0.4)",position:'absolute',zIndex:2,padding:'1rem',textDecoration:'underline',fontFamily:'sans-serif' }}>
        Region Wise Cost Graph
      </h4>
      <div
        style={{ height: "100%" }}
        className="d-flex flex-row justify-content-end"
      >
        <div style={{ width: "100%", height: "100%" }} className="col-8">
          <GeoChart
            data={
              costChartData["Country Costs"]
                ? costChartData["Country Costs"]
                : {}
            }
          />
        </div>
      </div>
    </div>
  );
}

export default CountryViewComponent;
