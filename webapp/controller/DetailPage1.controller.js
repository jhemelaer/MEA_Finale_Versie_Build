sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./Dialog2", "./Dialog3", "./Dialog1",
	"./utilities",
	"sap/ui/core/routing/History",
   "sap/ui/model/json/JSONModel"
], function (BaseController, MessageBox, Dialog2, Dialog3, Dialog1, Utilities, History,JSONModel) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.mRv4.controller.DetailPage1", {
		
		
		
		
		setValues : function (aaaaaaa) {
			
				var formId = sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage1--projectformid");
				var formTitel = sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage1--projectformtitel");
				var formOmschrijving = sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage1--projectformomschrijving");
				var formbeginDatum = sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage1--projectformbeginDatum");
				var formeindDatum = sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage1--projectformeindDatum");
				var formActive = sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage1--projectformActive");
				var formManager = sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage1--projectformManager");
				
				
				
                formId.setValue(aaaaaaa.Id);
                formTitel.setValue(aaaaaaa.Titel);
                formOmschrijving.setValue(aaaaaaa.Omschrijving);
                formbeginDatum.setValue(aaaaaaa.Begindatum);
                formeindDatum.setValue(aaaaaaa.Einddatum);
                
                if(aaaaaaa.Active == 1) {
                	formActive.setState(true);
                }
                
                if(aaaaaaa.Active != 1) {
                	formActive.setState(false);
                }
                
         //        formActive.setValue(aaaaaaa.Active);
         //       formManager.setValue(aaaaaaa.Idmanager);
         
         
        console.log(aaaaaaa.Active);
        console.log(aaaaaaa.Idmanager);
		
		},
		
		// formFieldsProject id's
			// projectformid
			// projectformtitel
			// projectformomschrijving
			// projectformbeginDatum
			// projectformeindDatum
			// projectformActive
			// projectformManager
		
		getUnidetedValues : function () {
						var OModelNewProject = {
					
							
						}; 
			OModelNewProject.projectformid = 	this.getView().byId("projectformid").getValue();
			OModelNewProject.projectformtitel =	this.getView().byId("projectformtitel").getValue();
			OModelNewProject.projectformomschrijving =	this.getView().byId("projectformomschrijving").getValue();
			OModelNewProject.projectformbeginDatum =	this.getView().byId("projectformbeginDatum").getValue();
			OModelNewProject.projectformeindDatum =	this.getView().byId("projectformeindDatum").getValue();
				// ook met Get
			OModelNewProject.projectformActive =	this.getView().byId("projectformActive").getState();
			OModelNewProject.projectformManager =	this.getView().byId("projectformManager").getSelectedKey();
			
			
			console.log(OModelNewProject);
			
			var OModelNewProjectModel = new JSONModel(OModelNewProject);
	        this.getView().setModel(OModelNewProjectModel);
			return OModelNewProject;
			},
			
			
			setProjectEditable : function (){
							//	formFieldsProject id's
				var projectformid = this.getView().byId("projectformid");
				var projectformtitel = this.getView().byId("projectformtitel");
				var projectformomschrijving = this.getView().byId("projectformomschrijving");
				var projectformbeginDatum = this.getView().byId("projectformbeginDatum");
				var projectformeindDatum = this.getView().byId("projectformeindDatum");
				var projectformActive = this.getView().byId("projectformActive");
				var projectformManager = this.getView().byId("projectformManager");
				
			
				// functie die waarde gaat ophalen en in een model opzet
				
			
				projectformid.setEditable(true);
				projectformtitel.setEditable(true);
				projectformomschrijving.setEditable(true);
				projectformbeginDatum.setEditable(true);
				projectformeindDatum.setEditable(true);
				
				projectformActive.setEnabled(true);
				projectformManager.setEnabled(true);
			},
			
			
			setProjectUnEdetable : function () {
				
				var projectformid = this.getView().byId("projectformid");
				var projectformtitel = this.getView().byId("projectformtitel");
				var projectformomschrijving = this.getView().byId("projectformomschrijving");
				var projectformbeginDatum = this.getView().byId("projectformbeginDatum");
				var projectformeindDatum = this.getView().byId("projectformeindDatum");
				var projectformActive = this.getView().byId("projectformActive");
				var projectformManager = this.getView().byId("projectformManager");
				
			
				// functie die waarde gaat ophalen en in een model opzet
				
				
				projectformid.setEditable(false);
				projectformtitel.setEditable(false);
				projectformomschrijving.setEditable(false);
				projectformbeginDatum.setEditable(false);
				projectformeindDatum.setEditable(false);
				
				projectformActive.setEnabled(false);
				projectformManager.setEnabled(false);
				
			},
		
		detailProjectEditPressed : function () {
			
			this.setProjectEditable();

			
		//	console.log(projectformid);
		
			var edit = this.getView().byId("detailProjectEdit")  ;
			var cancel = this.getView().byId("detailProjectCancel")  ;
			var save = this.getView().byId("detailProjectSave")  ;
			
			save.setVisible(true);
			edit.setVisible(false);
			cancel.setVisible(true);
		},
		
		detailProjectSavePressed : function () {
			
			
			this.setProjectUnEdetable();
			
			
			var edit = this.getView().byId("detailProjectEdit")  ;
			var cancel = this.getView().byId("detailProjectCancel")  ;
			var save = this.getView().byId("detailProjectSave")  ;
			save.setVisible(false);
			edit.setVisible(true);
			cancel.setVisible(false);
			
			// TO DO 
			//	
			//	1) nieuw model halen
				var NewModel = this.getUnidetedValues();
				console.log("dit is het verniewde moddel: " + NewModel);
				console.log(NewModel);
			//  2) niewe waarden opslaan db odata
				// TO DO
				
		},
		
		detailProjectCancelPressed : function () {
			
			this.setProjectUnEdetable();
			
			var edit = this.getView().byId("detailProjectEdit")  ;
			var cancel = this.getView().byId("detailProjectCancel")  ;
			var save = this.getView().byId("detailProjectSave")  ;
			save.setVisible(false);
			edit.setVisible(true);
			cancel.setVisible(false);
		
			// oude waarden terugzetten
		
		},
		
		
		
		
		handleRouteMatched: function (oEvent) {
			var sAppId = "App5c0fc78059fdbb598f2a39fd";

			var oParams = {};

			if (sap.ui.Device.system.desktop) {

				this._oRootView = this.getOwnerComponent().getAggregation("rootControl");
				this._oRootView.getController().setMode(sap.m.SplitAppMode.StretchCompressMode);

			} else {

				this._oRootView = this.getOwnerComponent().getAggregation("rootControl");
				this._oRootView.getController().setMode(sap.m.SplitAppMode.StretchCompressMode);

			}
			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;

			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function (oParam) {
						if (Object.keys(oParam).length !== 0) {
							for (var prop in oParam) {
								if (prop !== "sourcePrototype") {
									return prop + "(" + oParam[prop][0] + ")";
								}
							}
						}
					};

					this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

				}
			}

			var oPath;

			if (this.sContext) {
				oPath = {
					path: "/" + this.sContext,
					parameters: oParams
				};
				this.getView().bindObject(oPath);
			}

		},
		_onObjectAttributePress: function () {

			var sDialogName = "Dialog2";
			this.mDialogs = this.mDialogs || {};
			var oDialog = this.mDialogs[sDialogName];

			if (!oDialog) {
				oDialog = new Dialog2(this.getView());
				this.mDialogs[sDialogName] = oDialog;

				// For navigation.
				oDialog.setRouter(this.oRouter);
			}
			oDialog.open();

		},
		_onObjectAttributePress1: function () {

			var sDialogName = "Dialog1";
			this.mDialogs = this.mDialogs || {};
			var oDialog = this.mDialogs[sDialogName];

			if (!oDialog) {
				oDialog = new Dialog1(this.getView());
				this.mDialogs[sDialogName] = oDialog;

				// For navigation.
				oDialog.setRouter(this.oRouter);
			}
			oDialog.open();

		},
		_onStandardListItemPress: function (oEvent) {

			var oBindingContext = oEvent.getParameter("listItem").getBindingContext();

			return new Promise(function (fnResolve) {
				this.doNavigate("DetailPage2", oBindingContext, fnResolve, "");
			}.bind(this)).catch(function (err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		doNavigate: function (sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {
			var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
			var oModel = (oBindingContext) ? oBindingContext.getModel() : null;

			var sEntityNameSet;
			if (sPath !== null && sPath !== "") {
				if (sPath.substring(0, 1) === "/") {
					sPath = sPath.substring(1);
				}
				sEntityNameSet = sPath.split("(")[0];
			}
			var sNavigationPropertyName;
			var sMasterContext = this.sMasterContext ? this.sMasterContext : sPath;

			if (sEntityNameSet !== null) {
				sNavigationPropertyName = sViaRelation || this.getOwnerComponent().getNavigationPropertyForNavigationWithContext(sEntityNameSet,
					sRouteName);
			}
			if (sNavigationPropertyName !== null && sNavigationPropertyName !== undefined) {
				if (sNavigationPropertyName === "") {
					this.oRouter.navTo(sRouteName, {
						context: sPath,
						masterContext: sMasterContext
					}, false);
				} else {
					oModel.createBindingContext(sNavigationPropertyName, oBindingContext, null, function (bindingContext) {
						if (bindingContext) {
							sPath = bindingContext.getPath();
							if (sPath.substring(0, 1) === "/") {
								sPath = sPath.substring(1);
							}
						} else {
							sPath = "undefined";
						}

						// If the navigation is a 1-n, sPath would be "undefined" as this is not supported in Build
						if (sPath === "undefined") {
							this.oRouter.navTo(sRouteName);
						} else {
							this.oRouter.navTo(sRouteName, {
								context: sPath,
								masterContext: sMasterContext
							}, false);
						}
					}.bind(this));
				}
			} else {
				this.oRouter.navTo(sRouteName);
			}

			if (typeof fnPromiseResolve === "function") {
				fnPromiseResolve();
			}

		},
		_onObjectAttributePress2: function () {

			var sDialogName = "Dialog3";
			this.mDialogs = this.mDialogs || {};
			var oDialog = this.mDialogs[sDialogName];

			if (!oDialog) {
				oDialog = new Dialog3(this.getView());
				this.mDialogs[sDialogName] = oDialog;

				// For navigation.
				oDialog.setRouter(this.oRouter);
			}
			oDialog.open();

		},
		_onTableItemPress: function (oEvent) {

			var oBindingContext = oEvent.getParameter("listItem").getBindingContext();

			return new Promise(function (fnResolve) {
				this.doNavigate("DetailPage3", oBindingContext, fnResolve, "");
			}.bind(this)).catch(function (err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		applyFiltersAndSorters: function (sControlId, sAggregationName, chartBindingInfo) {
			if (chartBindingInfo) {
				var oBindingInfo = chartBindingInfo;
			} else {
				var oBindingInfo = this.getView().byId(sControlId).getBindingInfo(sAggregationName);
			}
			var oBindingOptions = this.updateBindingOptions(sControlId);
			this.getView().byId(sControlId).bindAggregation(sAggregationName, {
				model: oBindingInfo.model,
				path: oBindingInfo.path,
				parameters: oBindingInfo.parameters,
				template: oBindingInfo.template,
				templateShareable: true,
				sorter: oBindingOptions.sorters,
				filters: oBindingOptions.filters
			});

		},
		updateBindingOptions: function (sCollectionId, oBindingData, sSourceId) {
			this.mBindingOptions = this.mBindingOptions || {};
			this.mBindingOptions[sCollectionId] = this.mBindingOptions[sCollectionId] || {};

			var aSorters = this.mBindingOptions[sCollectionId].sorters;
			var aGroupby = this.mBindingOptions[sCollectionId].groupby;

			// If there is no oBindingData parameter, we just need the processed filters and sorters from this function
			if (oBindingData) {
				if (oBindingData.sorters) {
					aSorters = oBindingData.sorters;
				}
				if (oBindingData.groupby || oBindingData.groupby === null) {
					aGroupby = oBindingData.groupby;
				}
				// 1) Update the filters map for the given collection and source
				this.mBindingOptions[sCollectionId].sorters = aSorters;
				this.mBindingOptions[sCollectionId].groupby = aGroupby;
				this.mBindingOptions[sCollectionId].filters = this.mBindingOptions[sCollectionId].filters || {};
				this.mBindingOptions[sCollectionId].filters[sSourceId] = oBindingData.filters || [];
			}

			// 2) Reapply all the filters and sorters
			var aFilters = [];
			for (var key in this.mBindingOptions[sCollectionId].filters) {
				aFilters = aFilters.concat(this.mBindingOptions[sCollectionId].filters[key]);
			}

			// Add the groupby first in the sorters array
			if (aGroupby) {
				aSorters = aSorters ? aGroupby.concat(aSorters) : aGroupby;
			}

			var aFinalFilters = aFilters.length > 0 ? [new sap.ui.model.Filter(aFilters, true)] : undefined;
			return {
				filters: aFinalFilters,
				sorters: aSorters
			};

		},
		onInit: function () {
			
			var OldModel = this.getUnidetedValues();
		//	var OldModel = this.getView().getModel("OModelNewProjectModel");
			console.log("dit is het oude moddel: " + OldModel);
			console.log(OldModel);
			
			
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("DetailPage1").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			var oView = this.getView();
			oView.addEventDelegate({
				onBeforeShow: function () {
					if (sap.ui.Device.system.phone) {
						var oPage = oView.getContent()[0];
						if (oPage.getShowNavButton && !oPage.getShowNavButton()) {
							oPage.setShowNavButton(true);
							oPage.attachNavButtonPress(function () {
								this.oRouter.navTo("", {}, true);
							}.bind(this));
						}
					}
				}.bind(this)
			});

			var oView = this.getView(),
				oData = {},
				self = this;
			var oModel = new sap.ui.model.json.JSONModel();
			oView.setModel(oModel, "staticDataModel");
			self.oBindingParameters = {};

			oData["sap_IconTabBar_Page_0-content-sap_chart_BarChart-1544917068946"] = {};

			oData["sap_IconTabBar_Page_0-content-sap_chart_BarChart-1544917068946"]["data"] = [{
				"dim0": "India",
				"mea0": "296",
				"__id": 0
			}, {
				"dim0": "Canada",
				"mea0": "133",
				"__id": 1
			}, {
				"dim0": "USA",
				"mea0": "489",
				"__id": 2
			}, {
				"dim0": "Japan",
				"mea0": "270",
				"__id": 3
			}, {
				"dim0": "Germany",
				"mea0": "350",
				"__id": 4
			}];

			self.oBindingParameters['sap_IconTabBar_Page_0-content-sap_chart_BarChart-1544917068946'] = {
				"path": "/sap_IconTabBar_Page_0-content-sap_chart_BarChart-1544917068946/data",
				"model": "staticDataModel",
				"parameters": {}
			};

			oData["sap_IconTabBar_Page_0-content-sap_chart_BarChart-1544917068946"]["vizProperties"] = {
				"plotArea": {
					"dataLabel": {
						"visible": true,
						"hideWhenOverlap": true
					}
				}
			};

			oView.getModel("staticDataModel").setData(oData, true);

			function dateDimensionFormatter(oDimensionValue, sTextValue) {
				var oValueToFormat = sTextValue !== undefined ? sTextValue : oDimensionValue;
				if (oValueToFormat instanceof Date) {
					var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
						style: "short"
					});
					return oFormat.format(oValueToFormat);
				}
				return oValueToFormat;
			}

			var aDimensions = oView.byId("sap_IconTabBar_Page_0-content-sap_chart_BarChart-1544917068946").getDimensions();
			aDimensions.forEach(function (oDimension) {
				oDimension.setTextFormatter(dateDimensionFormatter);
			});

		},
		onAfterRendering: function () {

			var oChart,
				self = this,
				oBindingParameters = this.oBindingParameters,
				oView = this.getView();

			oChart = oView.byId("sap_IconTabBar_Page_0-content-sap_chart_BarChart-1544917068946");
			oChart.bindData(oBindingParameters['sap_IconTabBar_Page_0-content-sap_chart_BarChart-1544917068946']);

		}
	});
}, /* bExport= */ true);