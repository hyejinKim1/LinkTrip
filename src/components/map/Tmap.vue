<template>
  <div>
    <div ref="map" style="height: 600px;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      routeData: null,
    };
  },
  props: {
    places: {
      type: Array
    }
  },
  mounted() {
    this.initializeMap();
    
  },
  watch: {
    places: {
      handler() {
        console.log("places: ");
        console.log(this.places);
        console.log("tmap데이터 바뀜");
        this.plotMarkers();
        this.calculateOptimalRoute();
      },
      deep: true
    },
  },
  methods: {
    initializeMap() {
      if (typeof Tmapv2 !== 'undefined') {
    this.map = new Tmapv2.Map(this.$refs.map, {
      center: new Tmapv2.LatLng(33.3617, 126.5292),
      zoom: 12,
    });
  } else {
    console.error('TMap API script is not loaded.');
  }
    },
    plotMarkers() {
      console.log("places");
      console.log(this.places);
      if (typeof Tmapv2 !== 'undefined') {
      this.places.forEach((place) => {
        const marker = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(place.lat, place.lon),
          map: this.map,
        });
      });
    } else {
      console.error('Tmapv2 is not defined. TMap API script may not be loaded.');
    }
    },
    calculateOptimalRoute() {
      const placesCoordinates = this.places.map((place) => `${place.lon},${place.lat}`);
      const apiKey = '9NopawmZOQ1IRHQfBPu7uatOHSLsyhrIaFKJZGaf';

      // Make an API call to TMap Directions API to get the route
      fetch(
        `https://apis.openapi.sk.com/tmap/routes?version=1&format=json&appKey=${apiKey}&startX=${placesCoordinates[0]}&startY=${placesCoordinates[0]}&endX=${placesCoordinates[1]}&endY=${placesCoordinates[1]}&passList=${placesCoordinates.slice(2).join(':')}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.routeData = data;
          this.drawRoute();
        })
        .catch((error) => {
          console.error('Error fetching route data:', error);
        });
    },
    drawRoute() {
      const pathData = this.routeData.features[0].geometry.coordinates;
      const polyline = new Tmapv2.Polyline({
        path: pathData.map((coord) => new Tmapv2.LatLng(coord[1], coord[0])),
        map: this.map,
        strokeColor: 'blue',
        strokeWeight: 6,
      });
    },
  },
};
</script>

<style>
/* Add any additional styles here */
</style>
