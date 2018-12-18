var soap = require('soap');

/*
public WSDL file for testing which I found on StackOverflow:
    http://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL
*/

var url =
  'http://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL';

soap.createClient(url, (err, numberConversionClient) => {
  let clientDescription = numberConversionClient.describe();

  numberConversionClient.on('request', (xml, eid) => {
    console.log(`before request send: \r\n\t${eid}`);
    console.log(`xml: \r\n\t${xml}`);
  });

  var args = { ubiNum: 2 };

  numberConversionClient.NumberToWordsAsync(args).then(
    response => {
      let resultJSObj = response[0];
      let rawXMLResponse = response[1];
      let soapHeaderJSObj = response[2];
      let rawXMLRequest = response[3];

      console.log(`resultJSObj: \r\n\t${JSON.stringify(resultJSObj)}`);
      console.log(`rawXMLResponse: \r\n\t${rawXMLResponse}`);
      console.log(`soapHeaderJSObj: \r\n\t${JSON.stringify(soapHeaderJSObj)}`);
      console.log(`rawXMLRequest: \r\n\t${rawXMLRequest}`);
    },
    error => {
      console.log(error);
    }
  );

  // Synchronise call
  // numberConversionClient.NumberToWords(args, (err, result, rawResponse, soapHeader, rawRequest) =>{
  //     console.log(result);
  // });
});

console.log('Running...');
