var xlsx = require('xlsx');
var twilio = require('twilio');

const accountSid = "YOUR_ACCOUNT_SID";
const authToken = "YOUR_AUTH_TOKEN";
const client = new twilio(accountSid, authToken);

const workbook = xlsx.readFile('./Phones.xlsx');
const sheet_name_list = workbook.SheetNames;


var bulktext = function() {

    var numbers = [];
    var arlocationlength = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]).length;

    for (var i = 0; i < arlocationlength; i ++) {
        numbers.push(xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])[i].address);
    }

    console.log(numbers);

    var body = 'MY MESSAGE IN BULK USING TWILIO';

    Promise.all(
        numbers.map(number => {
            return client.messages.create({
                to: number,
                from: 'YOUR_PROGRAMMABLE_SMS_SERVICE_SID',
                body: body
            });
        })
    )
        .then(messages => {
            console.log('Messages sent!');
        })
        .catch(err => console.error(err));
};

bulktext();







