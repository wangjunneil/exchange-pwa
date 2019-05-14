<template>
    <div class="ion-page">
      <ion-header>
        <ion-toolbar color="dark">
          <ion-title>Rates</ion-title>
        </ion-toolbar>
      </ion-header>

        <ion-content color="light">
            <ListRate/>

            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
              <router-link to="country">
                <ion-fab-button color="danger" mode="md" translucent="true">
                  <ion-icon name="add"></ion-icon>
                </ion-fab-button>
              </router-link>
            </ion-fab>
        </ion-content>
      </div>
</template>

<script>
import ListRate from '@/components/ListRate.vue';
import { requestRate } from '../util/nativefun';

export default {
  name: 'home',
  created() {
    this.resetData();
    requestRate();
  },
  components: {
    ListRate,
  },
  methods: {
    resetData() {
      let cacheData = JSON.parse(localStorage.getItem('cacheData'));
      if (cacheData != null) {
        let updateCacheData = cacheData.filter(e => e.rate == "0.00" );
        localStorage.setItem('cacheData', JSON.stringify(updateCacheData));
      }
    }
  }
};
</script>

<style scoped>
ion-label {
  font-size:12px;
}
</style>
