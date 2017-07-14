<template>
    <div>
        <label>详细地址</label>
        <input type="text" id="suggestId" v-model="address.street"/>
        <div id="searchResultPanel"></div>
    </div>
</template>

<script>
	export default {
		name: 'owo-suggest',
        props: ['addressModel'],
		data() {
			return {
                address: {
			        street: this.addressModel.street,
                    longitude: this.addressModel.longitude,
                    latitude: this.addressModel.latitude
                },
				ac: null
			}
		},
        created() {
            const that = this;
            const script = document.createElement('script');
            script.src = 'http://api.map.baidu.com/api?v=2.0&ak=Gqtw3ThvbFwecyzjaBUYOdHcOY98KCNa&callback=init';
            document.body.appendChild(script);
            window.onload = () => {
                const geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(r => {
                    if (geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
                        const longitude = r.point.lng;
                        const latitude = r.point.lat;

                        this.ac = new BMap.Autocomplete({
                            input: 'suggestId',
                            location: new BMap.Point(longitude, latitude)
                        });
                        this.ac.setInputValue(this.address.street);
                        this.ac.addEventListener('onconfirm', function (e) {
                            const _value = e.item.value;
                            const myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
                            new BMap.Geocoder().getPoint(myValue, function (point) {
                                if (point) {
                                    that.address.longitude = point.lng;
                                    that.address.latitude = point.lat;
                                    that.address.street = myValue;
                                } else {
                                    alert('您选择地址没有解析到结果!');
                                    that.address.longitude = '';
                                    that.address.latitude = '';
                                }
                                that.$emit('address', that.address);
                            }, _value.city);
                        });
                    } else {
                        alert('failed' + this.getStatus());
                    }
                }, (err) => {
                    alert(err.code, '位置服务被拒绝');
                }, {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 3000
                });
            };
        },
        destroyed() {
            this.ac && this.ac.dispose();
        },
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