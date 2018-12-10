define( [], function () {
	'use strict';
	// *****************************************************************************
	// Dimensions & Measures
	// *****************************************************************************
	var dimensions = {
		uses: "dimensions",
		min: 1,
		max: 1
	};
	var measures = {
		uses: "measures",
		min: 1,
		items: {
			ChartTypePicker: {
				type: "string",
				component: "dropdown",
				label: "Chart Type",
				ref: "qDef.chartType",
				options: [{
						value: "column",
						label: "Bar"
					},{
						value: "line",
						label: "Line"
					},{
						value: "smoothedLine",
						label: "Smoothed Line"
					},{
						value: "step",
						label: "Step"
					}],
				defaultValue: "line"
			},
			ChartColorPicker: {
					component: "color-picker",				
					type: "string",
					ref: "qDef.chartColor",
					label: "Chart Color",
					expression: "optional",
					defaultValue: "#92a2bd"
			},			
			valueAxisPicker: {
				type: "string",
				component: "dropdown",
				label: "Value Axis",
				ref: "qDef.valueAxis",
				options: [{
						value: "ValueAxis-1",
						label: "First Axis"
					},{
						value: "ValueAxis-2",
						label: "Secondary Axis"
					}],
				defaultValue: "ValueAxis-1"
			},
			NewStackProp: {
				ref: "qDef.newStack",
				label: "New Stack",
				type: "boolean",
				defaultValue: true
			},
			AppearanceSection: {
				   
				component: "expandable-items",
				label: "Appearance",
				items: {
					LabelAppearance: {
						type: "items",						
						label: "Label",
						items: {
						

						showLabelProp: {
							type: "boolean",
							component: "switch",
							label: "Show Label",
							ref: "qDef.showLabel",
							options: [{
								value: true,
							}, {
								value: false,
							}],
							defaultValue: false
						},
						labelPositionProp: {
							type: "string",
							component: "dropdown",
							label: "Label Position",
							ref: "qDef.labelPosition",
							options: [{
									value: "bottom",
									label: "Bottom"
								},{
									value: "top",
									label: "Top"
								},{
									value: "left",
									label: "Left"
								},{
									value: "right",
									label: "Right"
								},{
									value: "inside",
									label: "Inside"
								},{
									value: "middle",
									label: "Middle"
								}],
							defaultValue: "top"
						},
						labelRotationProp: {
							type: "string",
							component: "dropdown",
							label: "Label Rotation",
							ref: "qDef.labelRotation",
							options: [
								{
									value: "0",
									label: "none"
								},{
									value: "315",
									label: "315°"
								},{
									value: "270",
									label: "270°"
								}],
							defaultValue: "0"
						},
						labelAnchorProp: {
							type: "string",
							component: "dropdown",
							label: "Label Anchor",
							ref: "qDef.labelAnchor",
							options: [{
									value: "auto",
									label: "Auto"
								},{
									value: "start",
									label: "Start"
								}
								],
							defaultValue: "auto"
						},
						BulletPointPicker: {
							type: "string",
							component: "dropdown",
							label: "Bullet Point",
							ref: "qDef.bullet.type",
							options: [{
									value: "none",
									label: "None"
								},{
									value: "round",
									label: "Round"
								},{
									value: "square",
									label: "Square"
								},{
									value: "bubble",
									label: "Bubble"
								},{
									value: "diamond",
									label: "Diamond"
								}],
							defaultValue: "none"
						},
						BulletPointSizeSlider: {
							type: "number",
							component: "slider",
							label: "Bullet Point Size",
							ref: "qDef.bullet.size",
							min: 1,
							max: 25,
							step: 1,
							defaultValue: 8
						},
						colorLabelProp: {
							type: "boolean",
							component: "switch",
							label: "Color Label",
							ref: "qDef.colorLabel",
							options: [{
								value: true,
							}, {
								value: false,
											
							}],
							defaultValue: false
						}
					}
				},
				LineAppearance: {
					type: "items",
					label: "Line",
					items: {
						ChartLineThickness: {
							type: "number",
							component: "slider",
							label: "Line Thickness",
							ref: "qDef.lineThickness",
							min: 1,
							max: 5,
							step: 1,
							defaultValue: 1
						},
						DashLengthSlider: {
							type: "number",
							component: "slider",
							label: "Dash Length",
							ref: "qDef.dashLength",
							min: 0,
							max: 25,
							step: 1,
							defaultValue: 0
						},
						DashLengthProp: {
							type  : 'string',
							component: 'expression',
							label : 'Dash Length',
							ref  : 'qAttributeExpressions.0.qExpression',
							defaultValue: ''
						}
					}
	
				},
				FillAppearance: {
					type: "items",
					label: "Fill",
					items: {
						FillChartProp: {
							type: "boolean",
							component: "switch",
							label: "Fill Area",
							ref: "qDef.fillArea",
							options: [{
								value: true,
							}, {
								value: false,
							}],
							defaultValue: false
						},
						FillColorProp: {
							type  : 'string',	
							component: 'expression',
							label : 'Color',
							ref  : 'qAttributeExpressions.1.qExpression',
							defaultValue: ''
						}
					}
				}			

			}
		}
    }
	};
    // *****************************************************************************
	// Sorting section
	// *****************************************************************************
	var sorting = {
		uses: "sorting"
	};
	// *****************************************************************************
	// Legend section
	// *****************************************************************************
	var legendSection = {
		type: "items",
		label: "Legend",
		items: {
			MyCheckProp: {
				ref: "chartSettings.legend.show",
				label: "Show Legend",
				type: "boolean",
				defaultValue: false
			},
			MyButtongroupProp: {
				type: "string",
				component: "dropdown",
				label: "Position",
				ref: "chartSettings.legend.position",
				options: [
					{
						value: "top",
						label: "Top",
					},
					{
						value: "bottom",
						label: "Bottom",
					},
					{
						value: "left",
						label: "Left",
					},
					{
						value: "right",
						label: "Right",
					}
				],
				defaultValue: "bottom"
			}
		}
	};
	// *****************************************************************************
	// Guides section
	// *****************************************************************************
	var guideSection = {
		component: "expandable-items",
		label: "Guide",
		items: {
			Guide1: {
				type: "items",
				label: "First Guide",
				items: {
 					ShowGuideProp: {
						type: "boolean",
						component: "switch",
						label: "Show Guide",
						ref: "chartSettings.guide1.show",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: false
					},
					GuideOrientationProp: {
						type: "string",
						component: "buttongroup",
						label: "Orientation",
						ref: "chartSettings.guide1.orientation",
						options: [
							{
								value: "horizontal",
								label: "Horizontal",
							},
							{
								value: "vertical",
								label: "Vertical",
							}
						],
						defaultValue: false
					},
					GuideAboveChartProp: {
						type: "boolean",
						component: "switch",
						label: "Above Chart",
						ref: "chartSettings.guide1.above",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: false
					},
					GuideValueProp: {
						type: "string",
						ref: "chartSettings.guide1.value",
						label: "Value",
						expression: "optional"
					},
					GuideValueToProp: {
						type: "string",
						ref: "chartSettings.guide1.valueTo",
						label: "Value to",
						expression: "optional"
					},
					GuideLabelProp: {
						type: "string",
						ref: "chartSettings.guide1.label",
						label: "Label",
						expression: "optional"
					},
					GuideLabelInsideProp: {
						type: "boolean",
						component: "switch",
						label: "Label inside chart",
						ref: "chartSettings.guide1.inside",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: true
					},
					GuideLabelPositionProp: {
						type: "string",
						component: "dropdown",
						label: "Label Position",
						ref: "chartSettings.guide1.position",
						options: [
							{
								value: "top",
								label: "Top",
							},
							{
								value: "bottom",
								label: "Bottom",
							},
							{
								value: "left",
								label: "Left",
							},
							{
								value: "right",
								label: "Right",
							}
						],
						defaultValue: "right"
					},
					GuideFillColorPicker: {
					 
								  
											
						label:"Color",
						component: "color-picker",
						ref: "chartSettings.guide1.fillColor",
						type: "string",
						defaultValue: "#008000"
					},
					GuideDashLengthSlider: {
						type: "number",
						component: "slider",
						label: "Dash Length",
						ref: "chartSettings.guide1.dashLength",
						min: 1,
						max: 25,
						step: 1,
						defaultValue: 0
					},
				}
			},
			guide2: {
				type: "items",
				label: "Second Guide",
				items: {
 					ShowGuideProp: {
						type: "boolean",
						component: "switch",
						label: "Show Guide",
						ref: "chartSettings.guide2.show",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: false
					},
					GuideOrientationProp: {
						type: "string",
						component: "buttongroup",
						label: "Orientation",
						ref: "chartSettings.guide2.orientation",
						options: [
							{
								value: "horizontal",
								label: "Horizontal",
							},
							{
								value: "vertical",
								label: "Vertical",
							}
						],
						defaultValue: false
					},
					GuideAboveChartProp: {
						type: "boolean",
						component: "switch",
						label: "Above Chart",
						ref: "chartSettings.guide2.above",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: false
					},
					GuideValueProp: {
						type: "string",
						ref: "chartSettings.guide2.value",
						label: "Value",
						expression: "optional"
					},
					GuideValueToProp: {
						type: "string",
						ref: "chartSettings.guide2.valueTo",
						label: "Value to",
						expression: "optional"
					},
					GuideLabelProp: {
						type: "string",
						ref: "chartSettings.guide2.label",
						label: "Label",
						expression: "optional"
					},
					GuideLabelInsideProp: {
						type: "boolean",
						component: "switch",
						label: "Label inside chart",
						ref: "chartSettings.guide2.inside",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: true
					},
					GuideLabelPositionProp: {
						type: "string",
						component: "dropdown",
						label: "Label Position",
						ref: "chartSettings.guide2.position",
						options: [
							{
								value: "top",
								label: "Top",
							},
							{
								value: "bottom",
								label: "Bottom",
							},
							{
								value: "left",
								label: "Left",
							},
							{
								value: "right",
								label: "Right",
							}
						],
						defaultValue: "right"
					},
					GuideFillColorPicker: {
						label:"Color",
						component: "color-picker",
						ref: "chartSettings.guide2.fillColor",
						type: "string",
						defaultValue: "#008000"
					},
					GuideDashLengthSlider: {
						type: "number",
						component: "slider",
						label: "Dash Length",
						ref: "chartSettings.guide2.dashLength",
						min: 1,
						max: 25,
						step: 1,
						defaultValue: 0
					},
				}
			},
			guide3: {
				type: "items",
				label: "Third Guide",
				items: {
 					ShowGuideProp: {
						type: "boolean",
						component: "switch",
						label: "Show Guide",
						ref: "chartSettings.guide3.show",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: false
					},
					GuideOrientationProp: {
						type: "string",
						component: "buttongroup",
						label: "Orientation",
						ref: "chartSettings.guide3.orientation",
						options: [
							{
								value: "horizontal",
								label: "Horizontal",
							},
							{
								value: "vertical",
								label: "Vertical",
							}
						],
						defaultValue: false
					},
					GuideAboveChartProp: {
						type: "boolean",
						component: "switch",
						label: "Above Chart",
						ref: "chartSettings.guide3.above",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: false
					},
					GuideValueProp: {
						type: "string",
						ref: "chartSettings.guide3.value",
						label: "Value",
						expression: "optional"
					},
					GuideValueToProp: {
						type: "string",
						ref: "chartSettings.guide3.valueTo",
						label: "Value to",
						expression: "optional"
					},
					GuideLabelProp: {
						type: "string",
						ref: "chartSettings.guide3.label",
						label: "Label",
						expression: "optional"
					},
					GuideLabelInsideProp: {
						type: "boolean",
						component: "switch",
						label: "Label inside chart",
						ref: "chartSettings.guide3.inside",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: true
					},
					GuideLabelPositionProp: {
						type: "string",
						component: "dropdown",
						label: "Label Position",
						ref: "chartSettings.guide3.position",
						options: [
							{
								value: "top",
								label: "Top",
							},
							{
								value: "bottom",
								label: "Bottom",
							},
							{
								value: "left",
								label: "Left",
							},
							{
								value: "right",
								label: "Right",
							}
						],
						defaultValue: "right"
					},
					GuideFillColorPicker: {
						label:"Color",
						component: "color-picker",
						ref: "chartSettings.guide3.fillColor",
						type: "string",
						defaultValue: "#008000"
					},
					GuideDashLengthSlider: {
						type: "number",
						component: "slider",
						label: "Dash Length",
						ref: "chartSettings.guide3.dashLength",
						min: 1,
						max: 25,
						step: 1,
						defaultValue: 0
					},
				}
			},
			guide4: {
				type: "items",
				label: "Fourth Guide",
				items: {
 					ShowGuideProp: {
						type: "boolean",
						component: "switch",
						label: "Show Guide",
						ref: "chartSettings.guide4.show",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: false
					},
					GuideOrientationProp: {
						type: "string",
						component: "buttongroup",
						label: "Orientation",
						ref: "chartSettings.guide4.orientation",
						options: [
							{
								value: "horizontal",
								label: "Horizontal",
							},
							{
								value: "vertical",
								label: "Vertical",
							}
						],
						defaultValue: false
					},
					GuideAboveChartProp: {
						type: "boolean",
						component: "switch",
						label: "Above Chart",
						ref: "chartSettings.guide4.above",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: false
					},
					GuideValueProp: {
						type: "string",
						ref: "chartSettings.guide4.value",
						label: "Value",
						expression: "optional"
					},
					GuideValueToProp: {
						type: "string",
						ref: "chartSettings.guide4.valueTo",
						label: "Value to",
						expression: "optional"
					},
					GuideLabelProp: {
						type: "string",
						ref: "chartSettings.guide4.label",
						label: "Label",
						expression: "optional"
					},
					GuideLabelInsideProp: {
						type: "boolean",
						component: "switch",
						label: "Label inside chart",
						ref: "chartSettings.guide4.inside",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: true
					},
					GuideLabelPositionProp: {
						type: "string",
						component: "dropdown",
						label: "Label Position",
						ref: "chartSettings.guide4.position",
						options: [
							{
								value: "top",
								label: "Top",
							},
							{
								value: "bottom",
								label: "Bottom",
							},
							{
								value: "left",
								label: "Left",
							},
							{
								value: "right",
								label: "Right",
							}
						],
						defaultValue: "right"
					},
					GuideFillColorPicker: {
						label:"Color",
						component: "color-picker",
						ref: "chartSettings.guide4.fillColor",
						type: "string",
						defaultValue: "#008000"
					},
					GuideDashLengthSlider: {
						type: "number",
						component: "slider",
						label: "Dash Length",
						ref: "chartSettings.guide4.dashLength",
						min: 1,
						max: 25,
						step: 1,
						defaultValue: 0
					},
				}
			},
			guide5: {
				type: "items",
				label: "Fifth Guide",
				items: {
 					ShowGuideProp: {
						type: "boolean",
						component: "switch",
						label: "Show Guide",
						ref: "chartSettings.guide5.show",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: false
					},
					GuideOrientationProp: {
						type: "string",
						component: "buttongroup",
						label: "Orientation",
						ref: "chartSettings.guide5.orientation",
						options: [
							{
								value: "horizontal",
								label: "Horizontal",
							},
							{
								value: "vertical",
								label: "Vertical",
							}
						],
						defaultValue: false
					},
					GuideAboveChartProp: {
						type: "boolean",
						component: "switch",
						label: "Above Chart",
						ref: "chartSettings.guide5.above",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: false
					},
					GuideValueProp: {
						type: "string",
						ref: "chartSettings.guide5.value",
						label: "Value",
						expression: "optional"
					},
					GuideValueToProp: {
						type: "string",
						ref: "chartSettings.guide5.valueTo",
						label: "Value to",
						expression: "optional"
					},
					GuideLabelProp: {
						type: "string",
						ref: "chartSettings.guide5.label",
						label: "Label",
						expression: "optional"
					},
					GuideLabelInsideProp: {
						type: "boolean",
						component: "switch",
						label: "Label inside chart",
						ref: "chartSettings.guide5.inside",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: true
					},
					GuideLabelPositionProp: {
						type: "string",
						component: "dropdown",
						label: "Label Position",
						ref: "chartSettings.guide5.position",
						options: [
							{
								value: "top",
								label: "Top",
							},
							{
								value: "bottom",
								label: "Bottom",
							},
							{
								value: "left",
								label: "Left",
							},
							{
								value: "right",
								label: "Right",
							}
						],
						defaultValue: "right"
					},
					GuideFillColorPicker: {
						label:"Color",
						component: "color-picker",
						ref: "chartSettings.guide5.fillColor",
						type: "string",
						defaultValue: "#008000"
					},
					GuideDashLengthSlider: {
						type: "number",
						component: "slider",
						label: "Dash Length",
						ref: "chartSettings.guide5.dashLength",
						min: 1,
						max: 25,
						step: 1,
						defaultValue: 0
					},
				}
			},
			guide6: {
				type: "items",
				label: "Sixth Guide",
				items: {
 					ShowGuideProp: {
						type: "boolean",
						component: "switch",
						label: "Show Guide",
						ref: "chartSettings.guide6.show",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: false
					},
					GuideOrientationProp: {
						type: "string",
						component: "buttongroup",
						label: "Orientation",
						ref: "chartSettings.guide6.orientation",
						options: [
							{
								value: "horizontal",
								label: "Horizontal",
							},
							{
								value: "vertical",
								label: "Vertical",
							}
						],
						defaultValue: false
					},
					GuideAboveChartProp: {
						type: "boolean",
						component: "switch",
						label: "Above Chart",
						ref: "chartSettings.guide6.above",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: false
					},
					GuideValueProp: {
						type: "string",
						ref: "chartSettings.guide6.value",
						label: "Value",
						expression: "optional"
					},
					GuideValueToProp: {
						type: "string",
						ref: "chartSettings.guide6.valueTo",
						label: "Value to",
						expression: "optional"
					},
					GuideLabelProp: {
						type: "string",
						ref: "chartSettings.guide6.label",
						label: "Label",
						expression: "optional"
					},
					GuideLabelInsideProp: {
						type: "boolean",
						component: "switch",
						label: "Label inside chart",
						ref: "chartSettings.guide6.inside",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: true
					},
					GuideLabelPositionProp: {
						type: "string",
						component: "dropdown",
						label: "Label Position",
						ref: "chartSettings.guide6.position",
						options: [
							{
								value: "top",
								label: "Top",
							},
							{
								value: "bottom",
								label: "Bottom",
							},
							{
								value: "left",
								label: "Left",
							},
							{
								value: "right",
								label: "Right",
							}
						],
						defaultValue: "right"
					},
					GuideFillColorPicker: {
						label:"Color",
						component: "color-picker",
						ref: "chartSettings.guide6.fillColor",
						type: "string",
						defaultValue: "#008000"
					},
					GuideDashLengthSlider: {
						type: "number",
						component: "slider",
						label: "Dash Length",
						ref: "chartSettings.guide6.dashLength",
						min: 1,
						max: 25,
						step: 1,
						defaultValue: 0
					},
				}
			}
		}
   };
	// *****************************************************************************
	// Axis section
	// *****************************************************************************
	var axisSection = {
		component: "expandable-items",				   
		type: "items",
		label: "Axis",
		items: {
			Axis1: {
				type: "items",
				label: "First Axis",
				items: {
					
					showAxisProp: {
						type: "boolean",
						component: "switch",
						label: "Show Axis Line",
						ref: "chartSettings.axis1.show",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: true
					},
					showAxisLabelProp: {
						type: "boolean",
						component: "switch",
						label: "Show Axis Label",
						ref: "chartSettings.axis1.showLabel",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: true
					},
					axisPositionProp: {
						type: "string",
						component: "dropdown",
						label: "Axis Position",
						ref: "chartSettings.axis1.position",
						options: [
							{
								value: "top",
								label: "Top",
							},
							{
								value: "bottom",
								label: "Bottom",
							},
							{
								value: "left",
								label: "Left",
							},
							{
								value: "right",
								label: "Right",
							}
						],
						defaultValue: "left"
					},
					showAxisTitleProp: {
						type: "boolean",
						component: "switch",
						label: "Show Axis Title",
						ref: "chartSettings.axis1.showTitle",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: true
					},
					axisTitleProp: {
						type: "string",
						ref: "chartSettings.axis1.title",
						label: "Axis Title",
						expression: "optional"
					},
					axisSectionMinProp: {
						type: "string",
						ref: "chartSettings.axis1.sectionMin",
						label: "Axis Section Min",
						expression: "optional"
					},
					axisSectionMaxProp: {
						type: "string",
						ref: "chartSettings.axis1.sectionMax",
						label: "Axis Section Max",
						expression: "optional"
					}
 
				}
			},
		Axis2: {
				type: "items",
				label: "Second Axis",
				items: {
					enableAxisProp: {
						type: "boolean",
						component: "switch",
						label: "Enable secondary axis",
						ref: "chartSettings.axis2.enableAxis",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: false
					},
					axisPositionProp: {
						type: "string",
						component: "dropdown",
						label: "Axis Position",
						ref: "chartSettings.axis2.position",
						options: [
							{
								value: "top",
								label: "Top",
							},
							{
								value: "bottom",
								label: "Bottom",
							},
							{
								value: "left",
								label: "Left",
							},
							{
								value: "right",
								label: "Right",
							}
						],
						defaultValue: "right"
					},
					synchronizeAxisProp: {
						type: "boolean",
						component: "switch",
						label: "Synchronize Axes",
						ref: "chartSettings.axis2.synchronizeAxes",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: false
					},
					showAxisProp: {
						type: "boolean",
						component: "switch",
						label: "Show Axis Line",
						ref: "chartSettings.axis2.show",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: true
					},
					showAxisLabelProp: {
						type: "boolean",
						component: "switch",
						label: "Show Axis Label",
						ref: "chartSettings.axis2.showLabel",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: true
					},
					showAxisLabelProp: {
						type: "boolean",
						component: "switch",
						label: "Show Axis Label",
						ref: "chartSettings.axis2.showLabel",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: true
					},
					showAxisTitleProp: {
						type: "boolean",
						component: "switch",
						label: "Show Axis Title",
						ref: "chartSettings.axis2.showTitle",
						options: [{
							value: true,
						}, {
							value: false,
						}],
						defaultValue: true
					},
					axisTitleProp: {
						type: "string",
						ref: "chartSettings.axis2.title",
						label: "Axis Title",
						expression: "optional"
					},
					axisSectionMinProp: {
						type: "string",
						ref: "chartSettings.axis2.sectionMin",
						label: "Axis Section Min",
						expression: "optional"
					},
					axisSectionMaxProp: {
						type: "string",
						ref: "chartSettings.axis2.sectionMax",
						label: "Axis Section Max",
						expression: "optional"
					}
				}
			}
		}
	};
	// *****************************************************************************
	// Chart section
	// *****************************************************************************
	var chartSection = {
		type: "items",
		label: "Chart",
		items: {
			ChartOrientationProp: {
				type: "boolean",
				component: "buttongroup",
				label: "Orientation",
				ref: "chartSettings.chart.rotate",
				options: [
					{
						value: false,
						label: "Horizontal",
					},
					{
						value: true,
						label: "Vertical",
					}
				],
				defaultValue: false
			},
			StackTypeProp: {
				type: "string",
				component: "dropdown",
				label: "Stack Type",
				ref: "chartSettings.axis.stackType",
				options: [
					{
						value: "regular",
						label: "Regular",
					},
					{
						value: "100%",
						label: "100%",
					}
				],
				defaultValue: "regular"
			},
			leftMarginMinProp: {
				type: "string",
				ref: "chartSettings.margin.leftMarginMin",
				label: "Minimum Left Margin",
				expression: "optional"
			},
			UserDefinedGridCount: {
				type: "boolean",
				component: "switch",
				label: "User Defined Grid",
				ref: "chartSettings.chart.enableUserDefinedGridCount",
				options: [{
					value: true,
				}, {
					value: false,
				}],
				defaultValue: false
			},
			gridCountChartProp: {
				type: "integer",
				label: "User Defined Grid Count",
				ref: "chartSettings.chart.gridCount",
				defaultValue: "12"
			},
			GridPositionProp: {
				type: "string",
				component: "buttongroup",
				label: "Grid Position",
				ref: "chartSettings.chart.gridPosition",
				options: [
					{
						value: "middle",
						label: "middle",
					},
					{
						value: "start",
						label: "start",
					}
						],
				defaultValue: "start"
			},
			FontSizeChartProp: {
				type: "integer",
				label: "Font Size",
				ref: "chartSettings.chart.FontSize",
				defaultValue: 12
			},			
			clickableChartProp: {			
				type: "boolean",
				component: "switch",
				label: "Clickable",
				ref: "chartSettings.chart.clickable",
				options: [{
					value: true,
				}, {
					value: false,
				}],
				defaultValue: false
			},
			animateChartProp: {
				type: "boolean",
				component: "switch",
				label: "Chart Animation",
				ref: "chartSettings.chart.enableAnimation",
				options: [{
					value: true,
				}, {
					value: false,
				}],
				defaultValue: false
			},
			scrollableChartProp: {
				type: "boolean",
				component: "switch",
				label: "Chart Scrollbar",
				ref: "chartSettings.chart.enableScrollbar",
				options: [{
					value: true,
				}, {
					value: false,
				}],
				defaultValue: false
			}			




		}
	};
	// *****************************************************************************
	// Appearance section
	// *****************************************************************************
	var appearanceSection = {
		uses: "settings"
	};
	// *****************************************************************************
	// Main properties panel definition
	// Only what is defined here is returned from properties.js
	// *****************************************************************************
	return {
		type: "items",
		component: "accordion",
		items: {
			dimensions: dimensions,
			measures: measures,
			sorting: sorting,
			guide: guideSection,
			axis: axisSection,
			chart: chartSection,
			legend: legendSection,
			appearance: appearanceSection
		}
	};
});