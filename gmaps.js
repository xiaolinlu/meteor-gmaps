/* This file is part of meteor-gmaps project
 *
 * Copyright (c) 2014 Paulo Sérgio Borges de Oliveira Filho
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

var GMAPS_URL = '//cdnjs.cloudflare.com/ajax/libs/gmaps.js/0.4.5/gmaps.js';

gmaps = {}

gmaps.init = function (params, callback) {
	this.init_params = defaultval(params, {});
	this.loaded_callback = defaultval(callback, null);

	var gm_params = {
		key: defaultval(this.init_params.key, null),
		sensor: defaultval(this.init_params.sensor, false),
		language: defaultval(this.init_params.language, null),
		callback: 'gmaps.gm_loaded'
	};

	var gm_url = location.protocol + '//maps.googleapis.com/maps/api/js';
	var first = true;
	var sep = '?';

	// Build GET params string
	for (var key in gm_params) {
		if (gm_params.hasOwnProperty(key) && gm_params[key] !== null) {
			gm_url += sep + key + '=' + gm_params[key];

			if (first) {
				sep = '&';
				first = false;
			}
		}
	}

	// Load Google Maps v3 javascript
	async_load(gm_url);
}

gmaps.gm_loaded = function () {
	console.log("Google Maps javascript API loaded");

	var gmaps_url = defaultval(this.init_params.gmaps,
								location.protocol + GMAPS_URL);

	// Load GMaps javascript
	async_load(gmaps_url, this.gmaps_loaded.bind(this));
}

gmaps.gmaps_loaded = function () {
	console.log("GMaps javascript API loaded");

	this.loaded_callback();
}

// Asynchronously loads `url` and calls `callback` when its done
var async_load = function (url, callback) {
	var s = document.createElement('script');

	s.type = 'text/javascript';
	s.src = url;
	s.async = true;

	if (callback)
		s.addEventListener('load', callback, false);

	var head = document.getElementsByTagName('head')[0];
	head.appendChild(s);
}

var defaultval = function (val, d) {
	return typeof val !== 'undefined' ? val : d;
}
