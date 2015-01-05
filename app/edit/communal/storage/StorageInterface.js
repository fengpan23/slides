define([],
function() {
	'use strict';

	function StorageInterface(registry) {
		this.registry = registry;
	}

	StorageInterface.prototype = {
		ready: function() {
			if(!this._providers){
				this._providers = this.registry.getBest('strut.StorageProvider');
			}
			return this._providers != null;
		},
	
		save: function(data, cb) {
			if(this.ready()){
				data.last_modified = this.currentTime();
				return this._providers.setContents(data, cb);
			}
		},

		load: function(deckId, cb) {
			if(this.ready()){
				return this._providers.getContents(deckId, cb);
			}
		},

		remove: function(deckId) {
			return this._providers.rm(deckId);
		},

		currentTime: function() {
			var dateTime = new Date();
			var hh = dateTime.getHours();
			var mm = dateTime.getMinutes();
//			var ss = dateTime.getSeconds();
//			var week = dateTime.getDay();
//			var time4 = dateTime.toLocaleDateString(); 
//			var time5 = dateTime.toLocaleTimeString(); 

			return dateTime.getFullYear() + "-" + (dateTime.getMonth() + 1) + "-" + dateTime.getDate() + "   " + hh + ":" + mm;
		}
	};

	return StorageInterface;
});