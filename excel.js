var input = document.getElementById("input");
//data format
var jsonFormattedData = {
    EmployeeID: "",
    OfficeID: "",
    NameOfEmployee: "",
    bulkDutyDetail: [],
    // bulkDutyDetail: [{
    //     DayNumber: 0,
    //     ShiftName: ""
    // }]
};

input.addEventListener("change", function () {
    readXlsxFile(input.files[0]).then(function (data) {
        var i = 0;
        var headers = [];
        var json_object = [];
        console.log("data :>> ", data);
        data.map((row, index) => {
            if (i === 0) {
                headers = row;
            }
            if (i > 0) {
                var temp = {};
                var bulkDutyDetail = [];
                const rowObjectValue = row.slice(0, 3);
                const rowArrayValue = row.slice(3, 60);
                console.log("headers :>> ", headers);
                console.log("row :>> ", row);

                for (let x = 0; x < row.length; x++) {
                    temp[headers[x]] = row[x];
                    // insert data into formatted json data set
                    jsonFormattedData.EmployeeID = temp.EmployeeID;
                    jsonFormattedData.NameOfEmployee = temp.NameOfEmployee;
                    jsonFormattedData.OfficeID = temp.OfficeID;

                    // bulkDutyDetail.DayNumber = x;
                    // bulkDutyDetail.ShiftName = "fayez"
                    // temp.DayNumber = headers[x]
                    // bulkDutyDetail.propertyName = "ShiftName"

                    // bulkDutyDetail.ShiftName = row[x
                }

                // find data from header row
                // for (let x = 0; x < headers.length; x++) {
                //     const xyz = headers[x];
                //     console.log('xyz value is :>> ', xyz);
                // }
                console.log("jsonFormattedData :>> ", jsonFormattedData);
                json_object.push(temp);
            }
            i++;
        });
        document.getElementById("json-data").value = JSON.stringify(
            json_object,
            null,
            4
        );
    });
});