/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
'use strict';

var _markerClicked = false;
var infoCard = null;
var mapSearch = null;
var mapDirections = null;
var selector = null;

var t = document.querySelector('#t');
t.getLocation = false;
t._searching = false;

t.addEventListener('dom-change', function(e) {
  infoCard = document.querySelector('info-card');
  mapSearch = document.querySelector('google-map-search');
  mapDirections = document.querySelector('google-map-directions');
  selector = document.querySelector('#markerselector');
});

t._onDirectionsResponse = function(e, detail) {
  var dur = detail.response.routes[0].legs[0].duration.text;
  this.set('selectedMarker.duration', dur);
};

t._onSearch = function(e, detail) {
  this._searching = true;
  mapDirections.map = null; // remove displayed directions when marker is clicked.
};

t._onMapResults = function(e, detail) {
  this._searching = false;
};

t._onGeoResponse = function(e, detail) {
  // Set user's location as start address for directions.
  mapDirections.startAddress = {lat: detail.latitude, lng: detail.longitude};
};

t._onMarkerClick = function(e, detail) {
  _markerClicked = true;
  infoCard.dismissOnOutsideClick = true;
  mapDirections.map = null; // remove displayed directions when marker is clicked.

  var marker = this.$.markerlist.itemForElement(e.target);

  mapSearch.getDetails(marker.place_id).then(function(place) {
    marker = place; // replace marker metadata with full details.
    selector.select(marker);
    infoCard.open();
  });
};

t._showDirections = function(e, detail) {
  this.getLocation = true; // Ensure we have user's location.
  mapDirections.map = mapSearch.map; // setting the map displays the directions.
  t.async(function() {
    infoCard.close();
  }, 800);
};

document.addEventListener('google-map-ready', function(e) {
  document.body.classList.add('loaded');
  var loadEl = document.getElementById('loading');
  loadEl.addEventListener('transitionend', loadEl.remove);
});

document.addEventListener('click', function(e) {
  if (!_markerClicked) {
    infoCard.dismissOnOutsideClick = false;
  }
  _markerClicked = false;
});

// Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-51314200-1', 'auto');
ga('send', 'pageview');

})();
