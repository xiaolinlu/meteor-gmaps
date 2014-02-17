Package.describe({
	summary: 'GMaps for Meteor applications'
});

Package.on_use(function (api) {
	api.add_files(['gmaps.js'], 'client');
    api.export('gmaps', 'client');
});
