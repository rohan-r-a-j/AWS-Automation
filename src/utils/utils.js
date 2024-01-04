export function mapGeoData(costs) {
 
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
  let keysArray = Object.keys(keys);
  ////console.log("keys", keysArray);
  return keysArray;
}

export function reorganizeCosts(data) {
  let organizedData = {};
  //console.log("Data", data);
  for (let month in data) {
    let monthData = data[month]["Service wise Cost"];

    if (!organizedData["Total Cost"]) {
      organizedData["Total Cost"] = {};
      organizedData["Total Cost"][month] = data[month]["Total Cost"];
    } else organizedData["Total Cost"][month] = data[month]["Total Cost"];

   //console.log("datesx");
    for (let service in monthData) {
      if (!organizedData[service]) {
        organizedData[service] = {};
      }
      organizedData[service][month] = monthData[service];
      let monthKeys = Object.keys(data) 
      for (let i = 0; i < monthKeys.length; i++) {
        if (organizedData[service][monthKeys[i]] === undefined) {
          organizedData[service][monthKeys[i]] = "-";
        }
      }
    }
  }

  //console.log("Organized", organizedData);
  return organizedData;
}

// Example usage
let data = {
  // ... (your data goes here) ...
};

let organizedData = reorganizeCosts(data);

// Print the organized data
for (let service in organizedData) {
  //console.log(service + ":");
  for (let month in organizedData[service]) {
    //console.log(`  - ${month}: ${organizedData[service][month]} USD`);
  }
}

export let baseUrl = 'http://35.174.164.149:3000'
// process.env.NODE_ENV!=='production' ?'http://localhost:3000':''

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
