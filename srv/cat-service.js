const cds = require("@sap/cds");
var xsenv = require("@sap/xsenv");
const sd = require('@sap/cds-dk');
const { executeHttpRequest, getDestination } = require("@sap-cloud-sdk/core")
const sdk = require('@sap-cloud-sdk/http-client');
const axios = require('axios');

class CatalogService extends cds.ApplicationService {
     
 init() {
    const { Books } = cds.entities("my.bookshop");
   
    // Reduce stock of ordered books if available stock suffices
    this.on("getAvailableServices", async (req) => {
        xsenv.loadEnv();

        var services = xsenv.getServices({
            dest: { tag: 'destination' }
        });
        const uri = services.dest.uri;
    
        console.log(services);
        let options1 = {
            method: 'POST',
            url: services.dest.url + '/oauth/token?grant_type=client_credentials',
            headers: {
                Authorization: 'Basic ' + Buffer.from(services.dest.clientid + ':' + services.dest.clientsecret).toString('base64')
            }
        };
        let res1 = await axios(options1);
        var options2 = {
                method: 'GET',
                url: uri + '/destination-configuration/v1/destinations/' + "ODataDest",
                headers: {
                    Authorization: 'Bearer ' + res1.data.access_token
                }
            };
            let res2 = await axios(options2);
            console.log("res2: "+JSON.stringify(res2.data.destinationConfiguration.URL));

    });

    this.on('READ', 'Books', async req => {
     console.log(req.query); 

    });
 
    return super.init();
  }
 }
 
 module.exports = { CatalogService };