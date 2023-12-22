export function mapGeoData(costs) {
  // console.log("passed",costs)
  let d = Object.entries(costs);
  let dataArray = [];
  for (let item of d) {
    let totalCost = Object.values(item[1]).reduce((p, c) => p + c, 0);
    dataArray.push({
      id: item[0],
      value: totalCost,
      regions: Object.entries(item[1]),
    });
  }
  //   console.log("dataArray",dataArray)
  return dataArray;
}

export function mapBarChartData(data) {
  let mapped = [];
  for (const key in data) {
    mapped.push({ month: key, ...data[key]["Service wise Cost"] });
  }

  return mapped;
}
export function barChartKey(data) {
  let keys = {};
  for (const key in data) {
    // mapped.push({ month: key, ...data[key]["Service wise Cost"] });
    for (let nestedKey in data[key]["Service wise Cost"]) {
      keys[nestedKey] = nestedKey;
    }
  }

  return Object.keys(keys);
}

// let costs = {
//   USA: {
//     "us-east-1": 855.71,
//     "us-east-2": 295.58,
//     "us-west-1": 0,
//     "us-west-2": 59,
//   },
//   IND: {
//     "ap-south-1": 330.01,
//   },
//   OTH: {
//     NoRegion: 0,
//     global: 13.15,
//   },
//   JPN: {
//     "ap-northeast-1": 6.34,
//     "ap-northeast-3": 3.06,
//   },
//   SWE: {
//     "eu-north-1": 7.37,
//   },
//   AUS: {
//     "ap-southeast-2": 4.96,
//   },
//   FRA: {
//     "eu-west-3": 0.53,
//   },
//   KOR: {
//     "ap-northeast-2": 0.42,
//   },
//   SGP: {
//     "ap-southeast-1": 0,
//   },
//   CAN: {
//     "ca-central-1": 0,
//   },
//   DEU: {
//     "eu-central-1": 0,
//   },
//   IRL: {
//     "eu-west-1": 0,
//   },
//   GBR: {
//     "eu-west-2": 0,
//   },
//   BRA: {
//     "sa-east-1": 0,
//   },
// };
