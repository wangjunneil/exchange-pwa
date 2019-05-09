<template>
  <div class="ion-page">
    <loading :active.sync="isLoading"
            :is-full-page="fullPage"
            :height="30"
            :width="30"
            background-color="#000">
    </loading>

    <ion-header translucent="true">
      <ion-toolbar color="danger">
        <ion-buttons slot="start">
          <ion-back-button text=""></ion-back-button>
        </ion-buttons>
        <ion-title>Country List</ion-title>
        <ion-buttons slot="primary">
          <router-link to="settings">
            <ion-button>
              <ion-icon color="light" slot="end" name="settings"></ion-icon>
            </ion-button>
          </router-link>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item button="true" :disabled="d.disabled" @click="choose(d)" lines="none" v-for="d in datas" v-bind:key="d.symbol">
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
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Countrys',
  data() {
    return {
      datas: [],
      isLoading: false,
      fullPage: false,
    };
  },
  created() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.isLoading = true;

      async function fetchData() {
        const data = await fetch('https://raw.githubusercontent.com/wangjunneil/exchange-pwa/master/country.json')
          .then(res => res.json());
        return data;
      }

      fetchData().then((res) => {
        this.datas = res;
        this.isLoading = false;
      });
    },
    choose(data) {
      data.rate = 0.00;

      let cacheData = JSON.parse(localStorage.getItem('cacheData'));
      const existElement = cacheData.filter(e => e.symbol == data.symbol);
      if (existElement.length === 0) {
        cacheData.push(data);
        localStorage.setItem('cacheData', JSON.stringify(cacheData));
      }

      this.$router.back();
    },
  },
  components: {
    Loading,
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
