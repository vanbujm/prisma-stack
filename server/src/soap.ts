var soap = require('soap');

/*
public WSDL file for testing which I found on StackOverflow:
    http://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL
*/

var url =
  'http://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL';

/*
  soap for node
  https://www.npmjs.com/package/soap
*/

var wsdlOptions = {
  forceSoap12Headers: true,
  envelopeKey: 'IEAEnvelope'
};

// let wsdlOptions = {
//   overrideRootElement: {
//     name: 'IEAEnvelope'
//   }
//   //xmlKey: 'IEAEnvelope'
//   //overrideRootElement: {
//   //name: 'IEAEnvelope'
//   //   namespace: 'xmlns:tns',
//   //   xmlnsAttributes: [
//   //     {
//   //       name: 'xmlns:xsi',
//   //       value: 'http://www.w3.org/2001/XMLSchema-instance'
//   //     },
//   //     {
//   //       name: 'xmlns',
//   //       value:
//   //         'http://www.auspost.com.au/Schema/AgencyServices/TrustBasedServices/IdentityEnrolmentApplication:v1'
//   //     }
//   //   ]
//   //}
// };

soap.createClient(url, wsdlOptions, (err, numberConversionClient) => {
  let clientDescription = numberConversionClient.describe();

  /*
  numberConversionClient.on('request', (xml, eid) => {
    console.log(`before request send: \r\n\t${eid}`);
    console.log(`xml: \r\n\t${xml}`);
  });
  */

  numberConversionClient.on('soapError', (error, eid) => {
    console.log(`soapError eid: \r\n\t${eid}`);
    console.log(`soapError: \r\n\t${error}`);
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
