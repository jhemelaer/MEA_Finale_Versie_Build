sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType"
], function (BaseController, MessageBox, Utilities, History, Filter, FilterOperator, FilterType) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.mRv4.controller.MasterPage1", {
		handleRouteMatched: function (oEvent) {
			var sAppId = "App5c0fc78059fdbb598f2a39fd";

			var oParams = {};
			var oView = this.getView();
			var bSelectFirstListItem = true;
			if (oEvent.mParameters.data.context || oEvent.mParameters.data.masterContext) {
				this.sContext = oEvent.mParameters.data.context;

				this.sMasterContext = oEvent.mParameters.data.masterContext;

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
					
					
					
					this.sMasterContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

				}
			}

			var oPath;

			if (this.sMasterContext) {
				oPath = {
					path: "/" + this.sMasterContext,
					parameters: oParams
				};
				this.getView().bindObject(oPath);
			} else if (this.sContext) {
				var sCurrentContextPath = "/" + this.sContext;

				bSelectFirstListItem = false;
			}

			if (bSelectFirstListItem) {
				oView.addEventDelegate({
					onBeforeShow: function () {
						var oContent = this.getView().getContent();
						if (oContent) {
							if (!sap.ui.Device.system.phone) {
								var oList = oContent[0].getContent() ? oContent[0].getContent()[0] : undefined;
								if (oList) {
									var sContentName = oList.getMetadata().getName();
									if (sContentName.indexOf("List") > -1) {
										oList.attachEventOnce("updateFinished", function () {
											var oFirstListItem = this.getItems()[0];
											if (oFirstListItem) {
												oList.setSelectedItem(oFirstListItem);
												oList.fireItemPress({
													listItem: oFirstListItem
												});
											}
										}.bind(oList));
									}
								}
							}
						}
					}.bind(this)
				});
			}

		},
		_attachSelectListItemWithContextPath: function (sContextPath) {
			var oView = this.getView();
			var oContent = this.getView().getContent();
			if (oContent) {
				if (!sap.ui.Device.system.phone) {
					var oList = oContent[0].getContent() ? oContent[0].getContent()[0] : undefined;
					if (oList && sContextPath) {
						var sContentName = oList.getMetadata().getName();
						var oItemToSelect, oItem, oContext, aItems, i;
						if (sContentName.indexOf("List") > -1) {
							if (oList.getItems().length) {
								oItemToSelect = null;
								aItems = oList.getItems();
								for (i = 0; i < aItems.length; i++) {
									oItem = aItems[i];
									oContext = oItem.getBindingContext();
									if (oContext && oContext.getPath() === sContextPath) {
										oItemToSelect = oItem;
									}
								}
								if (oItemToSelect) {
									oList.setSelectedItem(oItemToSelect);
								}
							} else {
								oView.addEventDelegate({
									onBeforeShow: function () {
										oList.attachEventOnce("updateFinished", function () {
											oItemToSelect = null;
											aItems = oList.getItems();
											for (i = 0; i < aItems.length; i++) {
												oItem = aItems[i];
												oContext = oItem.getBindingContext();
												if (oContext && oContext.getPath() === sContextPath) {
													oItemToSelect = oItem;
												}
											}
											if (oItemToSelect) {
												oList.setSelectedItem(oItemToSelect);
											}
										});
									}
								});
							}
						}

					}
				}
			}

		},
		avatarInitialsFormatter: function (sTextValue) {
			return typeof sTextValue === 'string' ? sTextValue.substr(0, 2) : undefined;

		},
		_onAvatarPress: function (oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function (fnResolve) {

				this.doNavigate("DetailPage4", oBindingContext, fnResolve, "");
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
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("MasterPage1").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

		},
		 naarNederlands: function () {
		 	sap.ui.getCore().getConfiguration().setLanguage( "ne" );
		 },
		 
		 naarEngles: function () {
		 	sap.ui.getCore().getConfiguration().setLanguage( "de" );
		 },

		onFilterProjects : function (oEvent) {

			var aFilter = [], sQuery = oEvent.getParameter("query"),
				oList = this.getView().byId("projectsList"),
				oBinding = oList.getBinding("items");

			 if (sQuery) {
			 	aFilter.push(new Filter("Titel", FilterOperator.Contains, sQuery));
			 }
			oBinding.filter(aFilter);
		},
		
			onSelectionChange: function(event) {
				
				
				
				// opvullen data: 
					
				
				console.log(event.getSource().getSelectedItem().getBindingContext().getObject());
				
               // alert(event.getSource().getSelectedItem().getBindingContext().getObject().Titel);
                console.log(JSON.stringify(event.getSource().getSelectedItem().getBindingContext().getObject()));
                
                
                var formId = sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage1--projectformid");
                console.log(formId);
              //  formId.setEditable(true);
                formId.setValue("hello");
                
            //    sap.ui.getCore().byId("projectformtitel").getValue("hello");
            //    sap.ui.getCore().byId("projectformtitel").setValue("hello");
                
            //     sap.ui.getCore().byId("projectformtitel").setValue("hello");
			     sap.ui.controller("com.sap.build.standard.mRv4.controller.DetailPage1").setValues(event.getSource().getSelectedItem().getBindingContext().getObject());    
             
              },
		
		onListItemPress: function(oEvent)
		{
			console.log(oEvent);
			 alert(event.getSource().getSelectedItem().getBindingContext().getObject().Titel);
    		console.log(JSON.stringify(event.getSource().getSelectedItem().getBindingContext().getObject()));
			
			//var oItem = oEvent.getSource();
			//var oContext = oItem.getBindingContext();
			//var sTitel = oContext.getProperty("Titel");
		//	alert('Hallo!')
		}
	});
}, /* bExport= */ true);