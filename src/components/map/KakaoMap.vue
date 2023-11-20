<script>
export default {
  data() {
    return {
      map: null,
      positions: [],
      ps: null,
      infowindow: null,
      places: [],
      locations: [],
      markers: [],
      polylines: [],
    }
  },
  props: {
    query: {
      type: String
    },
    mapData: {
      type: Array
    }
  },
  watch: {
    query: function () {
      console.log(this.query);
      this.ps.keywordSearch(this.query, this.placesSearchCB);
      return this.query;
    },
    mapData: {
      handler() {
        console.log("mapData: ");
        console.log(this.mapData);
        console.log("map데이터 바뀜");
        this.removeMarker();
        this.removePolyline();
        this.makeList(this.mapData);
        return this.mapData;
      },
      deep: true
    },

  },
  mounted() {
    window.kakao && window.kakao.maps
      ? this.initMap()
      : this.addKakaoMapScript();
  },
  methods: {
    addKakaoMapScript() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=36a9fd278c2c99a830e34141dcdcc950&libraries=services";
      document.head.appendChild(script);
    },
    initMap() {
      var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 8 //지도의 레벨(확대, 축소 정도)
      };
      this.map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      this.ps = new kakao.maps.services.Places();
    },
    placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        this.places = [];
        this.places = data;
        this.$emit("searchPlaces", this.places);
      }
    },
    makeList(data) {
      this.positions = [];
      this.locations = [];
      console.log("length" + data.length);
      var bounds = new kakao.maps.LatLngBounds();
      data.forEach((area) => {
        console.log(area);

        bounds.extend(new kakao.maps.LatLng(area.lon, area.lat));
        this.locations.push(new kakao.maps.LatLng(area.lon, area.lat))

        let markerInfo = {
          title: area.placeName,
          latlng: new kakao.maps.LatLng(area.lon, area.lat),
        };
        this.positions.push(markerInfo);
      });
      this.displayMarker();
      this.displayLink();
      this.map.setBounds(bounds);
    },
    displayMarker() {
      for (var i = 0; i < this.positions.length; i++) {
        var content = `<div class ="label"><span class="left"></span><span class="center">${i+1}</span><span class="right"></span></div>`;

        // 커스텀 오버레이를 생성
        var customOverlay = new kakao.maps.CustomOverlay({
          position: this.positions[i].latlng,
          content: content
        });

        // 커스텀 오버레이를 지도에 표시
        customOverlay.setMap(this.map);

        this.markers.push( customOverlay);
      }
    },
    displayLink() {
      var polyline = new kakao.maps.Polyline({
        path: this.locations, // 선을 구성하는 좌표배열 
        strokeWeight: 5, // 선의 두께 
        strokeColor: '#FFAE00', // 선의 색깔
        strokeOpacity: 0.7, // 선의 불투명도
        strokeStyle: 'solid' // 선의 스타일
      });
      polyline.setMap(this.map);
      this.polylines.push(polyline);
    },
    // 지도 위에 표시되고 있는 마커를 모두 제거
    removeMarker() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
    // 지도 위에 표시되고 있는 polyline 모두 제거
    removePolyline() {
      for (var i = 0; i < this.polylines.length; i++) {
        this.polylines[i].setMap(null);
      }
      this.polylines = [];
    }
  }
};
</script>

<template>
  <div class="place-div">
    <!-- kakao map start -->
    <div id="map" class="map-div"></div>
    <!-- kakao map end -->
  </div>
</template>

<style scoped>
.place-div {
  display: flex;
}

.map-div {
  width: 100%;
  height: 80vh;
}

.place-item-div {
  border: 1px solid black;
}
</style>