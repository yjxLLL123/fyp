<template>
  <div id="container"></div>
</template>

<script>
export default {
  name: 'CustomMap',
  data() {
    return {
      map: null,
      car1: null,
      car2: null
    };
  },
  mounted() {
    this.loadMap();
  },
  methods: {
    loadMap() {
      // 引入高德地图API
      const url = "https://webapi.amap.com/maps?v=2.0&key=3c36d5aaa945e9dd8789bbcd74dcfa58";
      const jsapi = document.createElement('script');
      jsapi.charset = 'utf-8';
      jsapi.src = url;
      document.head.appendChild(jsapi);

      jsapi.onload = () => {
        var map = new AMap.Map('container', {
          resizeEnable: true
        });
        var options = {
          'showButton': true,
          'position': 'LB',
          'offset': [10, 20],
          'showMarker': true,
          'markerOptions': {
            'offset': new AMap.Pixel(-18, -36),
            'content': '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
          },
          'showCircle': true,
          'circleOptions': {
            'strokeColor': '#0093FF',
            'noSelect': true,
            'strokeOpacity': 0.5,
            'strokeWeight': 1,
            'fillColor': '#02B0FF',
            'fillOpacity': 0.25
          }
        }
        AMap.plugin(["AMap.Geolocation"], () => {
          var geolocation = new AMap.Geolocation(options);
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
        });
        // 隐藏地图版权信息
        setTimeout(() => {
          document.getElementsByClassName('amap-logo')[0].remove();
          document.getElementsByClassName('amap-copyright')[0].remove();
        }, 500);
        this.initCars();
        this.startPositionUpdate();
      }
    },
    initCars() {
      // 初始化车辆标记
      this.car1 = new AMap.Marker({
        map: this.map,
        position: new AMap.LngLat(120.1, 30.1), // 初始位置
        // icon: '../assets/img_png' // 可以自定义车辆图标
      });

      this.car2 = new AMap.Marker({
        map: this.map,
        position: new AMap.LngLat(120.2, 30.2), // 初始位置
        // icon: '../assets/img_1.png' // 可以自定义车辆图标
      });
    },
    updateLocation(newLngLat1, newLngLat2) {
      this.car1.setPosition(new AMap.LngLat(newLngLat1.longitude, newLngLat1.latitude));
      this.car2.setPosition(new AMap.LngLat(newLngLat2.longitude, newLngLat2.latitude));
      this.checkDistance();
    },
    checkDistance() {
      const pos1 = this.car1.getPosition();
      const pos2 = this.car2.getPosition();

      // 检查位置数据是否有效
      if (!pos1 || !pos2) {
        console.error("One or both positions are undefined.");
        return;
      }

      try {
        const dist = AMap.GeometryUtil.distance([pos1, pos2]);
        if (dist < 500) {
          alert('两车距离过近，请小心驾驶！');
        }
      } catch (error) {
        console.error('Error calculating distance:', error);
      }
    }
    ,

    startPositionUpdate() {
      setInterval(() => {
        const newLngLat1 = {longitude: 120 + Math.random(), latitude: 30 + Math.random()};
        const newLngLat2 = {longitude: 120 + Math.random(), latitude: 30 + Math.random()};
        console.log("更新位置：", newLngLat1, newLngLat2);
        this.updateLocation(newLngLat1, newLngLat2);
      }, 10000); // 每10秒更新位置
    }
  }
}
</script>

<style scoped>
#container {
  height: 100vh; /* 或者其他具体的高度 */
  width: 100%;
}
</style>
