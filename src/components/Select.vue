<template>
    <div class="owo-select">
        <label>{{ selectData.title }}</label>
        <select @change="selectData.select" v-model="selectData.model">
            <option value="" name="">-- 请选择 --</option>
            <option v-for="(name, code) in selectData.list" :value="code" :name="name">{{ name }}</option>
        </select>
    </div>
</template>

<script>
    export default {
    	name: 'owo-select',
        props: ['selectData'],
        data() {
    		return {

            }
        },
        methods: {

        },
    }
</script>

<style>
    label {
        font-size: 16px;
    }
    .owo-select > select {
        width: 123px
    }
</style>