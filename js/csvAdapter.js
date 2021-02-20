// A simple wrapper that loads a file and then converts it to an array of JSON objects
//
// Takes a string filename and an optional callback that will receive the processed task data
function loadAndFormatTaskData(filename, callback) {
  let request = new XMLHttpRequest();
  request.open('GET', filename);
  request.responseType = 'text';

  request.onload = function() {
    let rawTaskDataCSV = request.response;

    let parsedTaskData = csvStringToArray(rawTaskDataCSV);
    if(callback === undefined) {
      console.log(parsedTaskData)
    } else {
      callback(parsedTaskData);
    }
  };

  request.send();
};
  
// A simple CSV parser
//
// Always assumes the CSV has headers
function csvStringToArray(strData) {
  const objPattern = new RegExp(("(\\,|\\r?\\n|\\r|^)(?:\"((?:\\\\.|\"\"|[^\\\\\"])*)\"|([^\\,\"\\r\\n]*))"), "gi");

  let arrMatches = null, arrData = [[]];
  while (arrMatches = objPattern.exec(strData)) {
    if (arrMatches[1].length && arrMatches[1] !== ",") arrData.push([]);
    arrData[arrData.length - 1].push(arrMatches[2] ?
      arrMatches[2].replace(new RegExp("[\\\\\"](.)", "g"), '$1') :
      arrMatches[3]);
  }

  headerData = arrData.shift();
  hashData = arrData.map(row => {
    let i = 0;
    return headerData.reduce(
      (acc, key) => {
        acc[key] = row[i++];
        return acc;
      },
      {}
    );
  });
  return hashData;
};