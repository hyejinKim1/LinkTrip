<script>
// import { getCurrentInstance } from "vue";
// const { emit } = getCurrentInstance();
export default {
  // emits: ["searchPlaces"],
  data() {
    return {
      map: null,
      positions: [],
      ps: null,
      infowindow: null,
      places: [],
      locations: [],
    }
  },
  props: {
    region: {
      type: String
    },
    query: {
      type: String
    }
  },
  watch:{
    query: function(){
      console.log(this.query);
      this.ps.keywordSearch(this.region+this.query, this.placesSearchCB);
      return this.query;
    }
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
        level: 5 //지도의 레벨(확대, 축소 정도)
      };
      this.map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      this.ps = new kakao.maps.services.Places();
      // this.infowindow = new kakao.maps.InfoWindow({zIndex:1});
    },
    placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        this.places = [];
        this.places = data;
        this.$emit("searchPlaces", this.places);
        this.makeList(this.places);
      }
    },
    makeList(data) {
      this.positions = [];
      this.locations = [];
      data.forEach((area) => {
        console.log(area);

        this.locations.push(new kakao.maps.LatLng(area.y, area.x))

        let markerInfo = {
          title: area.place_name,
          latlng: new kakao.maps.LatLng(area.y, area.x),
        };
        this.positions.push(markerInfo);
      });
      this.displayMarker();
      this.displayLink();
    },
    displayMarker() {
      // 마커 이미지의 이미지 주소입니다
      var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

      for (var i = 0; i < this.positions.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: this.positions[i].latlng, // 마커를 표시할 위치
          title: this.positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });
        marker.setMap(this.map);
      }
      // 첫번째 검색 정보를 이용하여 지도 중심을 이동 시킵니다
      this.map.setCenter(this.positions[0].latlng);
    },
    displayLink() {

      var polyline = new kakao.maps.Polyline({
        path: this.locations, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: '#FFAE00', // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid' // 선의 스타일입니다
      });

      // 지도에 선을 표시합니다 
      polyline.setMap(this.map);
    }
  }
};
</script>

<template>
  <div class="place-div">
    <!-- kakao map start -->
    <div id="map" class="map-div" style="width: 90vw; height: 80vh"></div>
    <!-- kakao map end -->
  </div>
</template>

<style scoped>
.place-div {
  display: flex;
}

.search-div {
  width: 20vw;
  height: 100vh;
  overflow: scroll;
}

.map-div {
  width: 50vw;
}

.place-item-div {
  border: 1px solid black;
}
</style>