<template>
  <div class="ion-page">
    <ion-header mode="md" translucent="true">
      <ion-toolbar color="danger">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Choose Country</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item lines="none" v-for="d in datas" v-bind:key="d.symbol">
          <ion-thumbnail slot="start">
            <img :src="d.logo">
          </ion-thumbnail>
          <ion-label>{{ d.symbol }}</ion-label>
          <ion-label slot="end" class="name">{{ d.name }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: 'Countrys',
  data () {
    return {
      datas : []
    }
  },
  created() {
    this.requestData();
  },
  methods: {
    requestData() {
      async function fetchData() {
        let data = await fetch('https://raw.githubusercontent.com/wangjunneil/exchange-pwa/master/country.json')
          .then(res => res.json());
        return data;
      }

      fetchData().then(res=> {
        this.datas = res;
      })
    },
  },
};
</script>

<style scoped>
  ion-item {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .name {
    text-align: right;
  }
</style>
