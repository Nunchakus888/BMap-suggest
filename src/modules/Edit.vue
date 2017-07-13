<template>
    <div id="app">
        <div class="address">
            <div>
                <owo-select :selectData="addressMock.province"></owo-select>
            </div>

            <div>
                <owo-select :selectData="addressMock.city"></owo-select>
            </div>

            <div>
                <owo-select :selectData="addressMock.area"></owo-select>
            </div>
        </div>

        <owo-suggest class="suggest" :address="addressModel"></owo-suggest>

        <div class="submit">
            <a class="info-submit-btn" href="javascript:;" @click="saveInfo">保存</a>
        </div>
    </div>
</template>

<script>
	import {CHINA_DISTRICT} from '@lib/distpicker.data';
	import Select from '@components/Select';
	import Suggest from '@components/Suggest';

	export default {
		name: 'openrack-list',
		components: {
			'owo-select': Select,
			'owo-suggest': Suggest
		},
		data() {
			return {

				addressMock: {
					province: {
						title: '省',
						model: '',
						list: CHINA_DISTRICT['86'],
						select: this.getProvinces
					},
					city: {
						title: '市',
						model: '',
						list: [],
						select: this.getCities
					},
					area: {
						title: '区／县',
						model: '',
						list: [],
						select: this.getDistricts
					}
				},

				addressModel: {
					provinceId: '',
					cityId: '',
					areaId: '',
					street: '',
					longitude: '',
					latitude: '',
				},

			}
		},
		methods: {
			getProvinces(event) {
				this.addressMock.city.list = CHINA_DISTRICT[event.target.value];
				this.addressMock.area.list = [];
                this.addressModel.provinceId = event.target.value;
			},
			getCities(event) {
				this.addressMock.area.list = CHINA_DISTRICT[event.target.value];
                this.addressModel.cityId = event.target.value;
            },
			getDistricts(event) {
                this.addressModel.areaId = event.target.value;
			},
            saveInfo() {
			    console.log(this.addressModel);
            }
		}
	}
</script>

<style>

    #app {
        margin: 100px;
    }

    .address {
        display: -webkit-box;
        -webkit-box-pack: justify;
        width: 60%;
        margin-bottom: 20px;
    }

    .address > div {

    }

    .suggest {
        width: 40%;
    }
    .suggest > input {
        width: 80%;
    }

    .submit {
        margin: 30px 0;
        text-align: center;
    }

    .info-submit-btn {
        display: inline-block;
        text-align: center;
        user-select: none;
        border-radius: 3px;
        background: #42b983;
        border: 1px solid #42b983;
        color: #fff;
        width: 150px;
        line-height: 30px;
    }
    a {
        color: #42b983;
        text-decoration: none;
    }
</style>