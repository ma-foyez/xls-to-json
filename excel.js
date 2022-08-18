//Model Class for Duty Roster Master
class dutyRosterMaster {
  constructor(EmployeeID, OfficeID, NameOfEmployee, bulkDutyDetail) {
    this.EmployeeID = EmployeeID;
    this.OfficeID = OfficeID;
    this.NameOfEmployee = NameOfEmployee;
    this.bulkDutyDetail = [];
  }
}

//Model Class for Duty Roster Details
class dutyRosterDetails {
  constructor(DayNumber, ShiftName) {
    this.DayNumber = DayNumber;
    this.ShiftName = ShiftName;
  }
}

input.addEventListener("change", function () {
  var input = document.getElementById("input");
  readXlsxFile(input.files[0]).then(function (data) {
    var i = 0;
    var headers = [];
    var json_object = [];
    var masterDutyRoster = [];
    data.map((row, index) => {
      if (i === 0) {
        headers = row;
      }
      if (i > 0) {
        var temp = {};
        for (let j = 0; j < row.length; j++) {
          temp[headers[j]] = row[j];
        }

        json_object.push(temp);
      }
      i++;
    });

    for (let k = 0; k < json_object.length; k++) {
      // per roster object
      const singleDutyRosterObject = json_object[k];
      const dutyRoster = new dutyRosterMaster();
      dutyRoster.EmployeeID = singleDutyRosterObject["EmployeeID"];
      dutyRoster.OfficeID = singleDutyRosterObject["OfficeID"];
      dutyRoster.NameOfEmployee = singleDutyRosterObject["NameOfEmployee"];

      const findDutyDetailsValue = Object.keys(singleDutyRosterObject).reduce(
        function (obj, key) {
          if (
            key != "EmployeeID" &&
            key != "NameOfEmployee" &&
            key != "OfficeID"
          ) {
            //remove by keys Ex: EmployeeID, OfficeID, NameOfEmployee
            obj[key] = singleDutyRosterObject[key];
          }
          return obj;
        },
        {}
      );
      // get object keys for reassign value
      var objKeys = Object.keys(findDutyDetailsValue);
      for (let l = 0; l < objKeys.length; l++) {
        const objDayNumber = objKeys[l];
        const objShiftName = singleDutyRosterObject[objDayNumber];

        var dutyDetails = new dutyRosterDetails();
        dutyDetails.DayNumber = objDayNumber;
        dutyDetails.ShiftName = objShiftName;
        dutyRoster.bulkDutyDetail.push(dutyDetails);
      }
      masterDutyRoster.push(dutyRoster);
    }
    document.getElementById("json-data").value = JSON.stringify(
      masterDutyRoster,
      null,
      4
    );
  });
});
