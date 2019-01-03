sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (BaseController, MessageBox, Utilities, History,JSONModel) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.mRv4.controller.DetailPage3", {
		
		getUnidetedValues : function () {
			
		 	 var OModelNewTaak = {
						
								
		 					}; 
		 	 	 OModelNewTaak.taakformLabel  = this.getView().byId("taakformLabel").getValue();
		 	 	 OModelNewTaak.taakformresponsible = this.getView().byId("taakformresponsible").getSelectedKey();
				 OModelNewTaak.taakformdescr = this.getView().byId("taakformdescr").getValue();
		 	 	 OModelNewTaak.taakformdeadline = this.getView().byId("taakformdeadline").getValue();
		 	 	 OModelNewTaak.taakformstatus = this.getView().byId("taakformstatus").getSelectedButton().getText();
		 	 	 OModelNewTaak.taakformscore = this.getView().byId("taakformscore").getValue();
		 	 	 OModelNewTaak.taakformfeedback = this.getView().byId("taakformfeedback").getValue();
				
			
		 	 	console.log(OModelNewTaak);
				
			 	var OModelNewTaakModel = new JSONModel(OModelNewTaak);
		         this.getView().setModel(OModelNewTaakModel);
		 	 	return OModelNewTaak;
	
		 },
		
		
		setTaakEditable : function (){
			
			var taakformLabel = this.getView().byId("taakformLabel");
			taakformLabel = taakformLabel.setEditable(true);
			
			var taakformresponsible = this.getView().byId("taakformresponsible");
			taakformresponsible = taakformresponsible.setEnabled(true);
			
			var taakformdescr = this.getView().byId("taakformdescr");
			taakformdescr =taakformdescr.setEditable(true);
			
			var taakformdeadline = this.getView().byId("taakformdeadline");
			taakformdeadline = taakformdeadline.setEditable(true);
			
			var taakformstatus = this.getView().byId("taakformstatus");
			taakformstatus = taakformstatus.setEnabled(true);
			
			var taakformscore = this.getView().byId("taakformscore");
			taakformscore = taakformscore.setEditable(true);
			
			var taakformfeedback = this.getView().byId("taakformfeedback");
			taakformfeedback = taakformfeedback.setEditable(true);
		},
		
		setTaakUnEdetable : function () {
			var taakformLabel = this.getView().byId("taakformLabel");
			taakformLabel = taakformLabel.setEditable(false);
			
			var taakformresponsible = this.getView().byId("taakformresponsible");
			taakformresponsible = taakformresponsible.setEnabled(false);
			
			var taakformdescr = this.getView().byId("taakformdescr");
			taakformdescr =taakformdescr.setEditable(false);
			
			var taakformdeadline = this.getView().byId("taakformdeadline");
			taakformdeadline = taakformdeadline.setEditable(false);
			
			var taakformstatus = this.getView().byId("taakformstatus");
			taakformstatus = taakformstatus.setEnabled(false);
			
			var taakformscore = this.getView().byId("taakformscore");
			taakformscore = taakformscore.setEditable(false);
			
			var taakformfeedback = this.getView().byId("taakformfeedback");
			taakformfeedback = taakformfeedback.setEditable(false);
		},
	
		detailTaakEditPressed : function () {
			
			this.setTaakEditable();
		
			var edit = this.getView().byId("detailTaakEdit")  ;
			var save = this.getView().byId("detailTaakSave")  ;
			var cancel = this.getView().byId("detailTaakCancel")  ;
			
			save.setVisible(true);
			edit.setVisible(false);
			cancel.setVisible(true);
		},
		detailTaakSavePressed : function () {
			
				this.setTaakUnEdetable();
				
			var edit = this.getView().byId("detailTaakEdit")  ;
			var save = this.getView().byId("detailTaakSave")  ;
			var cancel = this.getView().byId("detailTaakCancel")  ;
			
			save.setVisible(false);
			edit.setVisible(true);
			cancel.setVisible(false);
			
			//	1) nieuw model halen
			// TO DO 
			//	
			//	1) nieuw model halen
				var NewModel = this.getUnidetedValues();
				console.log("dit is het verniewde moddel: " + NewModel);
				console.log(NewModel);
			//  2) niewe waarden opslaan db odata
				// TO DO
		
	},
		detailTaakCancelPressed : function () {
			
			 this.setTaakUnEdetable();
		
			var edit = this.getView().byId("detailTaakEdit")  ;
			var save = this.getView().byId("detailTaakSave")  ;
			var cancel = this.getView().byId("detailTaakCancel")  ;
			
			save.setVisible(false);
			edit.setVisible(true);
			cancel.setVisible(false);
			
				// oude waarden terugzetten
				
	},
	
		detailTaakDeletePressed : function () {
		
		// TO DO
		
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

			this.aRadioButtonGroupIds = [
				"sap_Responsive_Page_0-content-build_simple_form_Form-1544917525143-formContainers-build_simple_form_FormContainer-1-formElements-build_simple_form_FormElement-1-fields-sap_m_RadioButtonGroup-1544917697714"
			];
			this.handleRadioButtonGroupsSelectedIndex();

		},
		handleRadioButtonGroupsSelectedIndex: function () {
			var that = this;
			this.aRadioButtonGroupIds.forEach(function (sRadioButtonGroupId) {
				var oRadioButtonGroup = that.byId(sRadioButtonGroupId);
				var oButtonsBinding = oRadioButtonGroup ? oRadioButtonGroup.getBinding("buttons") : undefined;
				if (oButtonsBinding) {
					var oSelectedIndexBinding = oRadioButtonGroup.getBinding("selectedIndex");
					var iSelectedIndex = oRadioButtonGroup.getSelectedIndex();
					oButtonsBinding.attachEventOnce("change", function () {
						if (oSelectedIndexBinding) {
							oSelectedIndexBinding.refresh(true);
						} else {
							oRadioButtonGroup.setSelectedIndex(iSelectedIndex);
						}
					});
				}
			});

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
		convertTextToIndexFormatter: function (sTextValue) {
			var oRadioButtonGroup = this.byId(
				"sap_Responsive_Page_0-content-build_simple_form_Form-1544917525143-formContainers-build_simple_form_FormContainer-1-formElements-build_simple_form_FormElement-1-fields-sap_m_RadioButtonGroup-1544917697714"
			);
			var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
			if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
				// look up index in bound context
				var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
				return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function (
					oButtonContext) {
					return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
				});
			} else {
				// look up index in static items
				return oRadioButtonGroup.getButtons().findIndex(function (oButton) {
					return oButton.getText() === sTextValue;
				});
			}

		},
		_onRadioButtonGroupSelect: function () {

		},
		onInit: function () {
			
			var OldModel = this.getUnidetedValues();
		//	var OldModel = this.getView().getModel("OModelNewTaakModel");
			console.log("dit is het oude moddel lid: " + OldModel);
			console.log(OldModel);
			
			
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("DetailPage3").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			var oView = this.getView();
			oView.addEventDelegate({
				onBeforeShow: function () {
					if (sap.ui.Device.system.phone) {
						var oPage = oView.getContent()[0];
						if (oPage.getShowNavButton && !oPage.getShowNavButton()) {
							oPage.setShowNavButton(true);
							oPage.attachNavButtonPress(function () {
								this.oRouter.navTo("DetailPage1", {}, true);
							}.bind(this));
						}
					}
				}.bind(this)
			});

		}
	});
}, /* bExport= */ true);