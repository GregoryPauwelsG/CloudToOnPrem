sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("servicesui.controller.List", {
                onInit: function () {
                    $.ajax({
                        url: '/catalog/Books',
                        type: 'GET',
                        dataType: "text",
                        //contentType: "application/json",
                        crossDomain: true,
                        processData: false,
                        success: function(data){
                            console.log("success: "+data);
                        },
                        error: function(e){
                            console.log("error: "+e);
                            console.log(JSON.stringify(e))
                        }
                      });
                    
                      $.ajax({
                        url: '/catalog/getAvailableServices',
                        type: 'POST',
                        dataType: "text",
                        contentType: "application/json",
                        //data: JSON.stringify({"serviceName": "testServiceName"}),
                        crossDomain: true,
                        processData: false,
                        success: function(data){
                            console.log("success: "+data);
                        },
                        error: function(e){
                            console.log("error: "+e);
                            console.log(JSON.stringify(e))
                        }
                      });
   
                }
            });
        });
