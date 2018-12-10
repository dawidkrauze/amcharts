/* var config = {
        host: "qsense-next-dev.bmwgroup.net",
        prefix: "/",
        //port: 4848,
        isSecure: window.location.protocol === "https:"
}; */

requirejs.config({
    // Set BaseUrl
    //"baseUrl": ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port: "") + config.prefix + "resources",

    // Define paths; relative from js folder
    "paths": {

        //Libraries
        "amcharts": "../extensions/AmChartsSerialRework/lib/amcharts",
		// "amcharts": "../extensions/AmChartsSerialSRI/lib/amcharts",
        //"amcharts.funnel": "/extensions/AmChartsBlocks/lib/funnel",
        //"amcharts.gauge": "/extensions/AmChartsBlocks/lib/gauge",
        //"amcharts.pie": "/extensions/AmChartsBlocks/lib/pie",
        //"amcharts.radar": "/extensions/AmChartsBlocks/lib/radar",
        "amcharts.serial": "../extensions/AmChartsSerialRework/lib/serial",
		// "amcharts.serial": "../extensions/AmChartsSerialSRI/lib/serial",
        //"amcharts.xy": "/extensions/AmChartsBlocks/lib/xy",
    },

    // Define dependencies, see https://www.amcharts.com/kbase/amcharts-meets-requirejs/ for reference
    "shim": {
        "amcharts.serial": {
            "deps": ["amcharts"],
            "exports": "AmCharts",
            "init": function () {
                AmCharts.isReady = true;
            }
        }
    }
});

define([
    // Load javascript files using requireJS
	// Note: if you load .js files, omit the file extension
	// otherwise requireJS will not load it correctly
    'jquery',
    './properties',
    'amcharts.serial'
],
    function ($, properties) {
        'use strict';

        return {
            initialProperties : {
                qHyperCubeDef : {
                    qDimensions : [],
                    qMeasures : [],
                    qInitialDataFetch : [{
                        qWidth : 10,
                        qHeight : 50
                    }]
                }
            },

            // Define what our properties panel look like
            definition: properties,
			
			//Enable Export
			support : {
				export: true
			},

            //Paint resp.Rendering logic
            paint: function ($element, layout) {

                //For debugging purposes
                // console.log(layout);

                //Initialize
                var _this = this;
                var data = [];

                //Data Load
                for(var i=0; i<layout.qHyperCube.qDataPages[0].qMatrix.length; i++){
                    var object = {};
                    
                    //Add Dimension
                    object.dimension = layout.qHyperCube.qDataPages[0].qMatrix[i][0].qText;

                    //Add Selection Identifier
                    object.selectionNum = layout.qHyperCube.qDataPages[0].qMatrix[i][0].qElemNumber;
                    
                    //Add Measures
                    for (var j=1; j<=layout.qHyperCube.qMeasureInfo.length; j++)
                    {     
                        object["measure_" + j] = layout.qHyperCube.qDataPages[0].qMatrix[i][j].qNum,
                        object["measureTxt_" + j] = layout.qHyperCube.qDataPages[0].qMatrix[i][j].qText,
                        object["dashLength_" + j] = layout.qHyperCube.qDataPages[0].qMatrix[i][j].qAttrExps.qValues[0].qNum
                        object["fillColor_" + j] = layout.qHyperCube.qDataPages[0].qMatrix[i][j].qAttrExps.qValues[1].qText
                    }

                    //Push to data array
                    data.push(object);
                }
               
                //console.log(data);

                $element.empty();

                //Render new object
                var id = "container_" + layout.qInfo.qId;

                //Check if the chart has already been created
                if (document.getElementById(id)) {
                    //If it has, empty it so we can repaint our visualization
                    $("#" + id).empty();
                }
                else {
                    //If it hasn't, create it with our id, width, and height
                    var width = $element.width();
                    var height = $element.height();
                    $element.append($('<div />;').attr("id", id).width(width).height(height));
                }

                var chartTemplate = {
                        "type": "serial",
                        "autoMargins": true,
                        "categoryField": "dimension",
                        "startDuration": 0,
						"decimalSeparator": ",",
						"thousandsSeparator": ".",							  
                        "rotate": layout.chartSettings.chart.rotate,
                        "creditsPosition": "top-right",
                        "fontFamily": "'QlikView Sans', sans-serif",
                        "fontSize": layout.chartSettings.chart.FontSize,
                        "categoryAxis": {
                            "gridPosition": "start"
							,"autoWrap": true
                        },
                        "trendLines": [],
                        "graphs": [],
                        "guides": [],
                        "valueAxes": [
                            {
                                "id": "ValueAxis-1",
                                "usePrefixes": true,
                                "position": layout.chartSettings.axis1.position || "left",								
                                "stackType": layout.chartSettings.axis.stackType,
                                "labelsEnabled": layout.chartSettings.axis1.showLabel,
                                "titleFontSize": 13
                            }
                        ],
                        "allLabels": [],
                        "balloon": {},
                        "legend": {
                            "enabled": layout.chartSettings.legend.show,
                            "valueWidth": 0,
                            "useGraphSettings": true
                        },
                        "titles": [],
                        "dataProvider": data
                    };
                
				
                //Animate Chart
                if(layout.chartSettings.chart.enableAnimation){
                    chartTemplate.startDuration = 1;
                }

                //Scrollable Axes
                if(layout.chartSettings.chart.enableScrollbar){
                    chartTemplate.chartScrollbar = {
                        "updateOnReleaseOnly": true,
						"offset": 55,
						"oppositeAxis": false
                    };
                }
				
				//UserDefinedGridCount (disable AutoGrid)

                if(layout.chartSettings.chart.enableUserDefinedGridCount){
                    chartTemplate.categoryAxis = {
                        "autoGridCount": !layout.chartSettings.chart.enableUserDefinedGridCount,
						"gridCount": layout.chartSettings.chart.gridCount,
						"gridPosition": layout.chartSettings.chart.gridPosition
                    };
                };								   

                //Add secondary axis if enabled
                if(layout.chartSettings.axis2.enableAxis){
                    var axisTemplate = {
                        "id": "ValueAxis-2",
                        "position": layout.chartSettings.axis2.position || "right",
                        "stackType": "regular",
                        "titleFontSize": 13,
						"labelsEnabled": layout.chartSettings.axis2.showLabel
                    };

					//Synchronize with Axis 1
                    if(layout.chartSettings.axis2.synchronizeAxes)
                    {
                        axisTemplate.synchronizationMultiplier = 1;
                        axisTemplate.synchronizeWith = "ValueAxis-1";
                    }
					
					//Hide Axis
					if(!layout.chartSettings.axis2.show){
						axisTemplate.axisThickness = 0;
						axisTemplate.tickLength = 0;
					}
					
					//Add Axis Title
					if(layout.chartSettings.axis2.showTitle){
						axisTemplate.title = layout.chartSettings.axis2.title || layout.qHyperCube.qMeasureInfo[1].qFallbackTitle;
					}		
			
					//Set Min/Max for value axis
					if(layout.chartSettings.axis2.sectionMin){
						axisTemplate.minimum = parseFloat(layout.chartSettings.axis2.sectionMin.replace(',','.'));
					}

					if(layout.chartSettings.axis2.sectionMax){
						axisTemplate.maximum = parseFloat(layout.chartSettings.axis2.sectionMax.replace(',','.'));
					}
					
					
					
                    //Push axis to Chart Template
                    chartTemplate.valueAxes.push(axisTemplate);
                };
				
                for(var i = 0; i<layout.qHyperCube.qMeasureInfo.length; i++){
                        switch(layout.qHyperCube.qMeasureInfo[i].chartType) {
                            
                            //Column Chart
                            case "column":
                            chartTemplate.graphs.push({
                                "balloonText":      "[[title]]: [[description]]",
                                "fillAlphas":       1,
                                "fillColors":       layout.qHyperCube.qMeasureInfo[i].chartColor.color || "#000000",
                                "lineThickness":    0,
                                "id":               "AmGraph-" + i,
                                "title":            layout.qHyperCube.qMeasureInfo[i].qFallbackTitle,
                                "type":             layout.qHyperCube.qMeasureInfo[i].chartType,
                                "newStack":         layout.qHyperCube.qMeasureInfo[i].newStack,
                                "valueAxis":        "ValueAxis-1",
                                "valueField":       "measure_" + (i+1),
                                "descriptionField": "measureTxt_" + (i+1)
                            });
			break;																					 
                            
                            //Default (smooth/stepped) Line Chart                            
                            default:
                            chartTemplate.graphs.push({
                                "balloonText":      "[[title]]: [[description]]",
                                "bullet":           layout.qHyperCube.qMeasureInfo[i].bullet.type,
                                "bulletSize":       layout.qHyperCube.qMeasureInfo[i].bullet.size,
                                "id":               "AmGraph-" + i,
                                "title":            layout.qHyperCube.qMeasureInfo[i].qFallbackTitle,
                                "lineColor":        layout.qHyperCube.qMeasureInfo[i].chartColor.color || "#000000",
                                "lineThickness":    layout.qHyperCube.qMeasureInfo[i].lineThickness,
                                "dashLength":       layout.qHyperCube.qMeasureInfo[i].dashLength,
								"valueAxis":        layout.qHyperCube.qMeasureInfo[i].valueAxis || "ValueAxis-1",
//                                "valueAxis":        "ValueAxis-1",
                                "type":             layout.qHyperCube.qMeasureInfo[i].chartType,
								"stackable":        !(layout.qHyperCube.qMeasureInfo[i].newStack),							 
                                "valueField":       "measure_" + (i+1),
                                "descriptionField": "measureTxt_" + (i+1),
								"dashLengthField":  "dashLength_" + (i+1)
                            });
                            break;
                        };

                        //Set Labels
                        if(layout.qHyperCube.qMeasureInfo[i].showLabel){
//							chartTemplate.graphs[i].labelAnchor = "start";
                            chartTemplate.graphs[i].labelAnchor = layout.qHyperCube.qMeasureInfo[i].labelAnchor;
                            chartTemplate.graphs[i].labelText = "[[description]]";
                            chartTemplate.graphs[i].labelPosition = layout.qHyperCube.qMeasureInfo[i].labelPosition || "top";
                            chartTemplate.graphs[i].labelRotation = layout.qHyperCube.qMeasureInfo[i].labelRotation || 0;

                            //Color Label
                            if(layout.qHyperCube.qMeasureInfo[i].colorLabel){
                                chartTemplate.graphs[i].color = layout.qHyperCube.qMeasureInfo[i].chartColor.color;
                            }
                        };
						
					    //Fill Area
                        if(layout.qHyperCube.qMeasureInfo[i].fillArea){
                            chartTemplate.graphs[i].fillAlphas = 0.2;
                            chartTemplate.graphs[i].fillColorsField = ("fillColor_" + (i+1)) || "undefined";
//                            chartTemplate.graphs[i].fillColors = "#ff69b4";
                        };		
						
                }

                //Add Axis Title
                if(layout.chartSettings.axis1.showTitle){
                    chartTemplate.valueAxes[0].title = layout.chartSettings.axis1.title || layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
                }

                //Hide Axis
                if(!layout.chartSettings.axis1.show){
                    chartTemplate.valueAxes[0].axisThickness = 0;
                    chartTemplate.valueAxes[0].tickLength = 0;
                }

                //Set Min/Max for value axis
                if(layout.chartSettings.axis1.sectionMin){
                    chartTemplate.valueAxes[0].minimum = parseFloat(layout.chartSettings.axis1.sectionMin.replace(',','.'));
                }

                if(layout.chartSettings.axis1.sectionMax){
                    chartTemplate.valueAxes[0].maximum = parseFloat(layout.chartSettings.axis1.sectionMax.replace(',','.'));
                }

                //Adjust margins
                if(layout.chartSettings.margin.leftMarginMin){
                    chartTemplate.minMarginLeft = parseInt(layout.chartSettings.margin.leftMarginMin,10) || 0;
                }

                //Add Guide-1
                if(layout.chartSettings.guide1.show){

                    //Adjust chart margin
                    if(layout.chartSettings.guide1.label){
                        chartTemplate.marginTop = 30;
                    };

                    var guide1Template = {
                        "id":           "Guide-1",
                        "above":        layout.chartSettings.guide1.above || false,
                        "dashLength":   layout.chartSettings.guide1.dashLength || 0,
                        "label":        layout.chartSettings.guide1.label,
                        "inside":       layout.chartSettings.guide1.inside || false,
                        "position":     layout.chartSettings.guide1.position || "right",
                    };

                    //Bind position depending on orientation
                    if(layout.chartSettings.guide1.orientation == 'vertical'){
                        guide1Template.category = layout.chartSettings.guide1.value.replace(',','.');
                        guide1Template.toCategory = layout.chartSettings.guide1.valueTo.replace(',','.') || "undefined";
                    }
                    else
                    {
                        guide1Template.value = layout.chartSettings.guide1.value.replace(',','.');
                        guide1Template.toValue = layout.chartSettings.guide1.valueTo.replace(',','.') || "undefined";
                    }

                    //Set guide color depending on line or area
                    if(layout.chartSettings.guide1.valueTo){
                        guide1Template.fillColor =  layout.chartSettings.guide1.fillColor.color || "#008000";
                        guide1Template.fillAlpha =  layout.chartSettings.guide1.opacity || 0.2;
                    }
                    else
                    {
                        guide1Template.lineAlpha = 1;
                        guide1Template.lineColor = layout.chartSettings.guide1.fillColor.color || "#008000";
                    }

                    //Push Guide Template
                    chartTemplate.guides.push(guide1Template);
                }

                //Add Guide-2
                if(layout.chartSettings.guide2.show){

                    var guide2Template = {
                        "id":           "Guide-2",
                        "above":        layout.chartSettings.guide2.above || false,
                        "dashLength":   layout.chartSettings.guide2.dashLength || 0,
                        "label":        layout.chartSettings.guide2.label,
                        "inside":       layout.chartSettings.guide2.inside || false,
                        "position":     layout.chartSettings.guide2.position || "right",
                    };

                    //Bind position depending on orientation
                    if(layout.chartSettings.guide2.orientation == 'vertical'){
                        guide2Template.category = layout.chartSettings.guide2.value.replace(',','.');
                        guide2Template.toCategory = layout.chartSettings.guide2.valueTo.replace(',','.') || "undefined";
                    }
                    else
                    {
                        guide2Template.value = layout.chartSettings.guide2.value.replace(',','.');
                        guide2Template.toValue = layout.chartSettings.guide2.valueTo.replace(',','.') || "undefined";
                    }

                    //Set guide color depending on line or area
                    if(layout.chartSettings.guide2.valueTo){
                        guide2Template.fillColor =  layout.chartSettings.guide2.fillColor.color || "#008000";
                        guide2Template.fillAlpha =  layout.chartSettings.guide2.opacity || 0.2;
                    }
                    else
                    {
                        guide2Template.lineAlpha = 1;
                        guide2Template.lineColor = layout.chartSettings.guide2.fillColor.color || "#008000";
                    }

                    //Push Guide Template
                    chartTemplate.guides.push(guide2Template);
                }

                //Add Guide-3
                if(layout.chartSettings.guide3.show){

                    var guide3Template = {
                        "id":           "Guide-3",
                        "above":        layout.chartSettings.guide3.above || false,
                        "dashLength":   layout.chartSettings.guide3.dashLength || 0,
                        "label":        layout.chartSettings.guide3.label,
                        "inside":       layout.chartSettings.guide3.inside || false,
                        "position":     layout.chartSettings.guide3.position || "right",
                    };

                    //Bind position depending on orientation
                    if(layout.chartSettings.guide3.orientation == 'vertical'){
                        guide3Template.category = layout.chartSettings.guide3.value.replace(',','.');
                        guide3Template.toCategory = layout.chartSettings.guide3.valueTo.replace(',','.') || "undefined";
                    }
                    else
                    {
                        guide3Template.value = layout.chartSettings.guide3.value.replace(',','.');
                        guide3Template.toValue = layout.chartSettings.guide3.valueTo.replace(',','.') || "undefined";
                    }

                    //Set guide color depending on line or area
                    if(layout.chartSettings.guide3.valueTo){
                        guide3Template.fillColor =  layout.chartSettings.guide3.fillColor.color || "#008000";
                        guide3Template.fillAlpha =  layout.chartSettings.guide3.opacity || 0.2;
                    }
                    else
                    {
                        guide3Template.lineAlpha = 1;
                        guide3Template.lineColor = layout.chartSettings.guide3.fillColor.color || "#008000";
                    }

                    //Push Guide Template
                    chartTemplate.guides.push(guide3Template);
                }

                //Add Guide-4
                if(layout.chartSettings.guide4.show){

                    var guide4Template = {
                        "id":           "Guide-4",
                        "above":        layout.chartSettings.guide4.above || false,
                        "dashLength":   layout.chartSettings.guide4.dashLength || 0,
                        "label":        layout.chartSettings.guide4.label,
                        "inside":       layout.chartSettings.guide4.inside || false,
                        "position":     layout.chartSettings.guide4.position || "right",
                    };

                    //Bind position depending on orientation
                    if(layout.chartSettings.guide4.orientation == 'vertical'){
                        guide4Template.category = layout.chartSettings.guide4.value.replace(',','.');
                        guide4Template.toCategory = layout.chartSettings.guide4.valueTo.replace(',','.') || "undefined";
                    }
                    else
                    {
                        guide4Template.value = layout.chartSettings.guide4.value.replace(',','.');
                        guide4Template.toValue = layout.chartSettings.guide4.valueTo.replace(',','.') || "undefined";
                    }

                    //Set guide color depending on line or area
                    if(layout.chartSettings.guide4.valueTo){
                        guide4Template.fillColor =  layout.chartSettings.guide4.fillColor.color || "#008000";
                        guide4Template.fillAlpha =  layout.chartSettings.guide4.opacity || 0.2;
                    }
                    else
                    {
                        guide4Template.lineAlpha = 1;
                        guide4Template.lineColor = layout.chartSettings.guide4.fillColor.color || "#008000";
                    }

                    //Push Guide Template
                    chartTemplate.guides.push(guide4Template);
                }

                //Add Guide-5
                if(layout.chartSettings.guide5.show){

                    var guide5Template = {
                        "id":           "Guide-5",
                        "above":        layout.chartSettings.guide5.above || false,
                        "dashLength":   layout.chartSettings.guide5.dashLength || 0,
                        "label":        layout.chartSettings.guide5.label,
                        "inside":       layout.chartSettings.guide5.inside || false,
                        "position":     layout.chartSettings.guide5.position || "right",
                    };

                    //Bind position depending on orientation
                    if(layout.chartSettings.guide5.orientation == 'vertical'){
                        guide5Template.category = layout.chartSettings.guide5.value.replace(',','.');
                        guide5Template.toCategory = layout.chartSettings.guide5.valueTo.replace(',','.') || "undefined";
                    }
                    else
                    {
                        guide5Template.value = layout.chartSettings.guide5.value.replace(',','.');
                        guide5Template.toValue = layout.chartSettings.guide5.valueTo.replace(',','.') || "undefined";
                    }

                    //Set guide color depending on line or area
                    if(layout.chartSettings.guide5.valueTo){
                        guide5Template.fillColor =  layout.chartSettings.guide5.fillColor.color || "#008000";
                        guide5Template.fillAlpha =  layout.chartSettings.guide5.opacity || 0.2;
                    }
                    else
                    {
                        guide5Template.lineAlpha = 1;
                        guide5Template.lineColor = layout.chartSettings.guide5.fillColor.color || "#008000";
                    }

                    //Push Guide Template
                    chartTemplate.guides.push(guide5Template);
                }

                //Add Guide-6
                if(layout.chartSettings.guide6.show){

                    var guide6Template = {
                        "id":           "Guide-6",
                        "above":        layout.chartSettings.guide6.above || false,
                        "dashLength":   layout.chartSettings.guide6.dashLength || 0,
                        "label":        layout.chartSettings.guide6.label,
                        "inside":       layout.chartSettings.guide6.inside || false,
                        "position":     layout.chartSettings.guide6.position || "right",
                    };

                    //Bind position depending on orientation
                    if(layout.chartSettings.guide6.orientation == 'vertical'){
                        guide6Template.category = layout.chartSettings.guide6.value.replace(',','.');
                        guide6Template.toCategory = layout.chartSettings.guide6.valueTo.replace(',','.') || "undefined";
                    }
                    else
                    {
                        guide6Template.value = layout.chartSettings.guide6.value.replace(',','.');
                        guide6Template.toValue = layout.chartSettings.guide6.valueTo.replace(',','.') || "undefined";
                    }

                    //Set guide color depending on line or area
                    if(layout.chartSettings.guide6.valueTo){
                        guide6Template.fillColor =  layout.chartSettings.guide6.fillColor.color || "#008000";
                        guide6Template.fillAlpha =  layout.chartSettings.guide6.opacity || 0.2;
                    }
                    else
                    {
                        guide6Template.lineAlpha = 1;
                        guide6Template.lineColor = layout.chartSettings.guide6.fillColor.color || "#008000";
                    }

                    //Push Guide Template
                    chartTemplate.guides.push(guide6Template);
                }

                //Match units to StackType
                if(layout.chartSettings.axis.stackType == "100%"){
                    chartTemplate.valueAxes[0].unit = "%";
                }
                                

                
                // chartTemplate.data = this.data;
                // console.log(chartTemplate);
                var chart = AmCharts.makeChart(id, chartTemplate);


                chart.validateData();

                
                //Add ClickListener for Selections if graph is clickable
                if(layout.chartSettings.chart.clickable){
                    chart.addListener("clickGraphItem",function(event){
                    console.log(event);
                    _this.backendApi.selectValues(0, [event.item.dataContext.selectionNum] , true);
                    });
                }
				
                /*Add ClickListener for Selections
                chart.addListener("clickSlice",function(event){
                    _this.selectValues(0, [event.dataItem.dataContext.selectionNum] , true);
                });*/
            }
        };
    }
);