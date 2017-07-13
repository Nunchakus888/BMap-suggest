<template>
    <div>
        <label>详细地址</label>
        <input type="text" id="suggestId" v-model="address.street" @focus="suggest"/>
        <div id="searchResultPanel"></div>
    </div>
</template>

<script>
	export default {
		name: 'owo-suggest',
        props: ['address', 'addressModel'],
		data() {
			return {
				//当前组件的全局属性
				location: {
					longitude: '',
					latitude: '',
					geo: null,
					ac: null
                }
			}
		},
		beforeCreate() {
			const that = this;
			let script = document.createElement("script");
			script.src = "http://api.map.baidu.com/api?v=2.0&ak=Gqtw3ThvbFwecyzjaBUYOdHcOY98KCNa&callback=init";
			document.body.appendChild(script);
            window.onload = () => {
				const geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(r => {
					if (geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
						console.log('定位成功--->', r);
						const latitude = r.point.lat, longitude = r.point.lng;
						that.location.longitude = longitude;
						that.location.latitude = latitude;
						that.location.geo = new BMap.Geocoder();
					}
					else {
						alert('failed' + this.getStatus());
					}
				}, (err) => {
					alert(err.code, "位置服务被拒绝");
				}, {
					enableHighAccuracy: true,
					maximumAge: 0,
					timeout: 3000
				});
            };
		},
        destroyed() {
			this.location.ac && this.location.ac.dispose();
        },

		methods: {
			suggest (event) {
				const that = this;
				const ac = new BMap.Autocomplete({
					input: 'suggestId',
                    //根据当前定位 suggest..
					location: new BMap.Point(that.location.longitude, that.location.latitude)
				});
				this.location.ac = ac;
				ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
					const _value = e.item.value;
					const myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
					that.address.street = myValue;
					const geo = that.location.geo ? that.location.geo : new BMap.Geocoder();
                    geo.getPoint(myValue, function (point) {
						if (point) {
							console.log('getpoint--->', point);
							that.address.longitude = point.lng;
							that.address.latitude = point.lat;
						} else {
							alert("您选择地址没有解析到结果!");
						}
					}, _value.city);
				});
			}
		}
	}
</script>

<style>
    #searchResultPanel {
        max-height: 400px;
        overflow-y: scroll;
        border: 1px solid #C0C0C0;
        height: auto;
        display: none;
    }

</style>