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
      infowindows: [],
      polylines: [],
      bounds: null,
    }
  },
  props: {
    region: {
      type: String
    },
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
        console.log(this.region);
        console.log("mapData: ");
        console.log(this.mapData);
        console.log("map데이터 바뀜");
        this.removeMarker();
        this.removePolyline();
        if (this.mapData.length == 0) {
          this.map.setCenter(this.setCenter(this.region));
        } else {
          this.makeList(this.mapData);
        }
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
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=88eb08e9160e48bfdd48150ca34249a4&libraries=services";
      document.head.appendChild(script);
    },
    setCenter(region) {
      switch (region) {
        case "제주도":
          return new kakao.maps.LatLng(33.450701, 126.570667);
        case "서울":
          return new kakao.maps.LatLng(37.5546788388674, 126.970606917394);
        case "인천":
          return new kakao.maps.LatLng(37.456004465652136, 126.7052580700657);
        case "부산":
          return new kakao.maps.LatLng(35.17973748292069, 129.07506783124393);
        case "대전":
          return new kakao.maps.LatLng(36.3504119, 127.3845475);
        case "대구":
          return new kakao.maps.LatLng(35.8714354, 128.601445);
        case "광주":
          return new kakao.maps.LatLng(35.1595454, 126.8526012);
        case "울산":
          return new kakao.maps.LatLng(35.5383773, 129.3113596);
        case "세종특별자치시":
          return new kakao.maps.LatLng(36.5040736, 127.2494855);
        case "경기도":
          return new kakao.maps.LatLng(37.4449168, 127.1388684);
        case "강원도":
          return new kakao.maps.LatLng(37.6969518, 127.8886827);
        case "충청북도":
          return new kakao.maps.LatLng(36.8, 127.7);
        case "충청남도":
          return new kakao.maps.LatLng(36.5184, 126.7);
        case "경상북도":
          return new kakao.maps.LatLng(36.4919, 128.8889);
        case "경상남도":
          return new kakao.maps.LatLng(35.4606, 128.2132);
        case "전라북도":
          return new kakao.maps.LatLng(35.8242238, 127.1479532);
        case "전라남도":
          return new kakao.maps.LatLng(34.8679, 126.991);
        default:
          return new kakao.maps.LatLng(37.5546788388674, 126.970606917394);
      }
    },
    initMap() {
      var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: this.setCenter(this.region), //지도의 중심좌표.
        level: 8 //지도의 레벨(확대, 축소 정도)
      };
      this.map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      this.ps = new kakao.maps.services.Places();
      this.bounds = new kakao.maps.LatLngBounds();

      // console.log(this.mapData);
      // if (this.mapData.length > 0) {
      //     this.makeList(this.mapData);
      //   }
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
      data.forEach((area) => {
        console.log(area);

        this.bounds.extend(new kakao.maps.LatLng(area.lon, area.lat));
        this.locations.push(new kakao.maps.LatLng(area.lon, area.lat))

        let markerInfo = {
          title: area.placeName,
          url: area.placeUrl,
          latlng: new kakao.maps.LatLng(area.lon, area.lat),
        };
        this.positions.push(markerInfo);
      });
      this.displayMarker();
      this.displayLink();
      this.map.setBounds(this.bounds);
    },
    displayMarker() {
      var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'

      for (var i = 0; i < this.positions.length; i++) {
        var imageSize = new kakao.maps.Size(36, 37);
        //var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        var imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, (i * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        }
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);

        var marker = new kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: this.positions[i].latlng, // 마커를 표시할 위치
          title: this.positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });

        marker.setMap(this.map);

        this.markers.push(marker);

        var content = `<div style="padding: 5px; z-index:1"><a href=${this.positions[i].url} target="_blank" style="text-decoration:none;">${this.positions[i].title}</a></div>`;

        this.addListeners(marker, content);
      }
    },
    addListeners(marker, content) {
      var infoWindow = new kakao.maps.InfoWindow({
        position: marker.getPosition(),
        content: content
      });

      // 마커에 마우스를 올렸을 때 이벤트 처리
      kakao.maps.event.addListener(marker, 'mouseover', function () {
        infoWindow.open(marker.getMap(), marker);
      });

      this.infowindows.push(infoWindow);


      // 마커에 마우스를 내렸을 때 이벤트 처리 (선택 사항)
      // kakao.maps.event.addListener(marker, 'mouseout', function () {
      //   infoWindow.close();
      // });
    },
    displayLink() {
      var polyline = new kakao.maps.Polyline({
        path: this.locations, // 선을 구성하는 좌표배열 
        strokeWeight: 7, // 선의 두께 
        strokeColor: '#FFAE00', // 선의 색깔
        strokeOpacity: 0.5, // 선의 불투명도
        strokeStyle: 'solid' // 선의 스타일
      });
      polyline.setMap(this.map);
      this.polylines.push(polyline);
    },
    // 지도 위에 표시되고 있는 마커를 모두 제거
    removeMarker() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
        this.infowindows[i].setMap(null);
      }
      this.markers = [];
      this.infowindows = [];
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
  <!-- kakao map start -->
  <div id="map" class="map-div"></div>
  <!-- kakao map end -->
</template>

<style scoped>
.place-item-div {
  border: 1px solid black;
}
</style>