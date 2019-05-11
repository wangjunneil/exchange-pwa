<template>
    <div class="ion-page">
        <ion-content color="dark">
            <ListRate/>

            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
              <router-link to="country">
                <ion-fab-button color="danger" mode="md" translucent="true">
                  <ion-icon name="add"></ion-icon>
                </ion-fab-button>
              </router-link>
            </ion-fab>
        </ion-content>

        <ion-footer translucent="true">
          <ion-label>Last update time: {{ lastUpdateTime }}</ion-label>
        </ion-footer>
      </div>
</template>

<script>
import ListRate from '@/components/ListRate.vue';
import { requestRate } from '../util/nativefun';

export default {
  name: 'home',
  data() {
    return {
      lastUpdateTime: "5/9/2019, 4:52:04 PM",
    };
  },
  created() {
    requestRate();
  },
  components: {
    ListRate,
  },
};
</script>

<style scoped>
ion-footer {
  text-align: right;
  padding: 5px 5px;
}

ion-label {
  font-size:12px;
}
</style>
