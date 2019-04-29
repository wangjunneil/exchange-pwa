<template>
    <div class="ion-page">
        <ion-header mode="md" translucent="true">
          <ion-toolbar color="danger">
            <ion-title>Exchange Rate</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content color="dark">
            <ListRate/>

            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
              <ion-fab-button @click="choose" color="danger" mode="md" translucent="true">
                <ion-icon name="add"></ion-icon>
              </ion-fab-button>
            </ion-fab>
        </ion-content>
      </div>
</template>

<script>
import ListRate from '@/components/ListRate.vue';

export default {
  name: 'home',
  components: {
    ListRate,
  },
  methods: {
    choose() {
        this.$router.push({path:'/country'});
    },
    doRefresh() {
        console.log('refresh');
    }
  },
};
</script>
