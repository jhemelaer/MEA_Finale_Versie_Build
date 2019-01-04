sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function (BaseController, MessageBox, Utilities, History) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.mRv4.controller.DetailPage4", {
		
		
		newProjectSavePressed : function (){
			// project opslaan
				var OModelNewProjectCreate = {
						
								
		 					}; 
		 		 OModelNewProjectCreate.projectNewformid  = this.getView().byId("projectNewformid").getValue();
		 		 OModelNewProjectCreate.projectNewformtitel = this.getView().byId("projectNewformtitel").getValue();
					 OModelNewProjectCreate.projectNewformomschrijving = this.getView().byId("projectNewformomschrijving").getValue();
		 		 OModelNewProjectCreate.projectNewformbeginDatum = this.getView().byId("projectNewformbeginDatum").getValue();
		 		 OModelNewProjectCreate.projectNewformeindDatum = this.getView().byId("projectNewformeindDatum").getValue();
		 		 OModelNewProjectCreate.projectNewformActive = this.getView().byId("projectNewformActive").getState();
	//	 		 OModelNewProjectCreate.projectNewformedmanager = this.getView().byId("projectNewformedmanager").getSelectedKey();
				
				
				
		 		console.log(OModelNewProjectCreate);
			
			
			var toRouter = sap.ui.core.UIComponent.getRouterFor(this);
			toRouter.navTo("DetailPage1");
		},
		
		newProjectCancelPressed : function () {
			
			var toRouter = sap.ui.core.UIComponent.getRouterFor(this);
			toRouter.navTo("DetailPage1");
			
		},
		
		
		
		
		handleRouteMatched: function (oEvent) {
			var sAppId = "App5c0fc78059fdbb598f2a39fd";

			var oParams = {};

			this._oRootView = this.getOwnerComponent().getAggregation("rootControl");
			this._oRootView.getController().setMode(sap.m.SplitAppMode.HideMode);

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
		_onPageNavButtonPress: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var oQueryParams = this.getQueryParameters(window.location);

			if (sPreviousHash !== undefined || oQueryParams.navBackToLaunchpad) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("default", true);
			}

		},
		getQueryParameters: function (oLocation) {
			var oQuery = {};
			var aParams = oLocation.search.substring(1).split("&");
			for (var i = 0; i < aParams.length; i++) {
				var aPair = aParams[i].split("=");
				oQuery[aPair[0]] = decodeURIComponent(aPair[1]);
			}
			return oQuery;

		},
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("DetailPage4").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			var oView = this.getView();
			oView.addEventDelegate({
				onBeforeShow: function () {
					if (sap.ui.Device.system.phone) {
						var oPage = oView.getContent()[0];
						if (oPage.getShowNavButton && !oPage.getShowNavButton()) {
							oPage.setShowNavButton(true);
							oPage.attachNavButtonPress(function () {
								this.oRouter.navTo("MasterPage1", {}, true);
							}.bind(this));
						}
					}
				}.bind(this)
			});

		}
	});
}, /* bExport= */ true);