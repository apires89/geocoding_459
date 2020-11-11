import mapboxgl from 'mapbox-gl';
///added for search on map
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if(mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map(
    {
      container: 'map',
      style: 'mapbox://styles/apires89/cjpb0eog5a2tx2spj2qhqytwz'
    })
    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.infoWindow); //added this line
      ///custom marker
      const element = document.createElement('div');
      element.className = 'marker';
      element.style.backgroundImage = `url('${marker.image_url}')`;
      element.style.backgroundSize = 'contain';
      element.style.width = '25px';
      element.style.height = '25px';
      ///
      new mapboxgl.Marker(element) // add element inside function
       .setLngLat([ marker.lng, marker.lat ])
       .setPopup(popup) // added this line here
       .addTo(map);
      });
    const fitMapToMarkers = (map, markers) => {
    const bounds = new mapboxgl.LngLatBounds();
    markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
    map.fitBounds(bounds, { padding: 70, maxZoom: 40, duration: 0 });
    };
    fitMapToMarkers(map, markers);
    //add this line for search on map
    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
                                      mapboxgl: mapboxgl }));
    }
  }


export { initMapbox };
