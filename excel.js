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
        data.map((row, index) => {
            if (i === 0) {
                headers = row;
            }
            if (i > 0) {
                var temp = {};
                const rowArrayValue = row.slice(3, 60);

                for (let j = 0; j < row.length; j++) {
                    temp[headers[j]] = row[j];
                    // insert data into formatted json data set
                    jsonFormattedData.EmployeeID = temp.EmployeeID;
                    jsonFormattedData.NameOfEmployee = temp.NameOfEmployee;
                    jsonFormattedData.OfficeID = temp.OfficeID;

                    const newValue = Object.keys(temp).reduce(function (obj, key) {
                        if (key != "EmployeeID" && key != "NameOfEmployee" && key != "OfficeID") {           //key you want to remove
                            obj[key] = temp[key];
                        }
                        return obj;
                    }, {});

                }

                console.log('temp :>> ', temp);



                var details = {
                    ShiftName: '',
                    DayNumber: '',
                }
                for (let index = 0; index < newValue.length; index++) {
                    const element = newValue[index];
                    console.log('element :>> ', element);
                    details.ShiftName = element;
                    jsonFormattedData.bulkDutyDetail.push(details);

                }

                // find data from header row
                // for (let x = 0; x < headers.length; x++) {
                //     const xyz = headers[x];
                //     console.log('xyz value is :>> ', xyz);
                // }
                json_object.push(temp);
            }
            i++;
        });

        document.getElementById("json-data").value = JSON.stringify(json_object, null, 4);
    });
});