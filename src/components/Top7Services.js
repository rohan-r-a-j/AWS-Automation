import PieChartComponent from "./PieChart"
function Top7ServicesComponent({costDetails}){


    return    <div
    className="card"
    style={{ width: "100%", height: "100%", aspectRatio: 16 / 8 }}
  >
    <div className="card-body">
      <h2 className="text-center">Top 7 Cost-Incurring Services</h2>
    </div>
    <PieChartComponent
      chartData={
        costDetails["Top 7 Cost-Incurring Services"]
          ? costDetails["Top 7 Cost-Incurring Services"]
          : []
      }
    />
  </div>
}
export default Top7ServicesComponent