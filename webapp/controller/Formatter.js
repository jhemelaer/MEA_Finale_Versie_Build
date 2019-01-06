sap.ui.define([], function () {
	"use strict";
	return {
		statusText: function (sStatus) {
			switch (sStatus) {
				
					case 0:
					return "open";
					
					case 1:
					return "success";
					
					case 2:
					return "incomplete";
					
					case 3:
					return "unresolved";
					
					case 4:
					return "onhold";
					
					case 5:
					return "onhold";
					
				default:
					return "onhold";
			}
		}
	};
});