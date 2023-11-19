<script>
import axios from "axios";
export default {
  data() {
    return {
      map: null,
      positions: [],
      ps: null,
      infowindow: null,
      searchQuery: '',
      places: [],
      locations: [],
    }
  },
  // props: {
  //   keword: {
  //     type: String
  //   }
  // },
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
    handleSearchInput() {
      // 검색어 입력이 변경될 때 호출되는 메서드

      this.ps.keywordSearch(this.searchQuery, this.placesSearchCB); 
    },
    placesSearchCB (data, status) {
    if (status === kakao.maps.services.Status.OK) {
        this.places = [];
        this.places = data;
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
    displayLink(){

      var polyline = new kakao.maps.Polyline({
      path: this.locations, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: '#FFAE00', // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'solid' // 선의 스타일입니다
      }) ;

      // 지도에 선을 표시합니다 
      polyline.setMap(this.map);  
    }
  }
};
</script>

<template>
  <div>
    <div>
    <label for="place-search">장소 검색:</label>
    <input
      type="text"
      id="place-search"
      v-model="searchQuery"
      @input="handleSearchInput"
    />
    <button @click="searchPlaces">검색</button>

    <div v-if="places.length">
      <h2>검색 결과:</h2>
      <ul>
        <li v-for="(place, index) in places" :key="index">
          {{ place.place_name }} - {{ place.address_name }}
        </li>
      </ul>
    </div>
  </div>
  <!-- kakao map start -->
  <div id="map" class="mt-3" style="width: 90vw; height: 70vh"></div>
  <!-- kakao map end -->
  </div>
</template>

<style scoped>

</style>