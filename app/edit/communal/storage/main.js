define(['./RemoteStorage',
		'./StorageInterface'
	], function(RemoteStorage, StorageInterface) {
	var storageInterface, remoteStorage = new RemoteStorage();

	return {
		initialize: function(registry) {
			storageInterface = new StorageInterface(registry)
			registry.register({
				interfaces: 'strut.StorageInterface'
			}, storageInterface)

			registry.register({
				interfaces: 'strut.StorageProvider'
			}, remoteStorage);
		}
	};
});


// define(['./ExitSaver', './TimedSaver', './Saver'],
// function(ExitSaver, TimedSaver, Saver) {
// 	/*
// 	service will be an auto-saver factory
// 	so you can get new instance of the auto saver.

// 	The auto saver takes an object that is exportable.
// 	*/

// 	var service = {
// 		timedSaver: function(exportable, duration, storageInterface) {
// 			return new TimedSaver(exportable, duration, storageInterface);
// 		},

// 		exitSaver: function(exportable, storageInterface) {
// 			return new ExitSaver(exportable, storageInterface);
// 		},

// 		manualSaver: function(exportable, storageInterface) {
// 			return new Saver(exportable, storageInterface);
// 		}
// 	};

// 	return {
// 		initialize: function(registry) {
// 			registry.register({
// 				interfaces: 'strut.Savers'
// 			}, service);
// 		}
// 	};
// });