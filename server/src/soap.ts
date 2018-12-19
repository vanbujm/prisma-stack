import soap from 'soap';
import xmlFormatter from 'xml-formatter';
/*
public WSDL file for testing which I found on StackOverflow:
    http://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL
*/

const url = 'http://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL';

/*
  soap for node
  https://www.npmjs.com/package/soap
*/

const wsdlOptions: soap.IOptions = {
  forceSoap12Headers: true,
  envelopeKey: 'IEAEnvelope'
  // wsdl_headers: {
  //   Header: {
  //     BatchDateTime: 'somevalue'
  //   }
  // }
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
  // const clientDescription = numberConversionClient.wsdl.describeServices();

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

  const args = { ubiNum: 2 };

  (numberConversionClient as any).NumberToWordsAsync(args).then(
    (response: any[]) => {
      const resultJSObj = response[0];
      const rawXMLResponse = response[1];
      const soapHeaderJSObj = response[2];
      const rawXMLRequest = response[3];

      // console.log(`rawXMLResponse: \r\n\t${rawXMLResponse}`);
      // console.log(`soapHeaderJSObj: \r\n\t${JSON.stringify(soapHeaderJSObj)}`);
      console.log(`rawXMLRequest: \r\n\r\n${xmlFormatter(rawXMLRequest)}`);
    },
    (error: any) => {
      console.log(error);
    }
  );

  // Synchronise call
  // numberConversionClient.NumberToWords(args, (err, result, rawResponse, soapHeader, rawRequest) =>{
  //     console.log(result);
  // });
});
