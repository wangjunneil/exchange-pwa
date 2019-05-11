<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="danger">
        <ion-title>Device Offline</ion-title>
        <ion-buttons slot="start">
          <router-link to="/">
            <ion-button>
              <ion-icon color="light" slot="start" name="home"></ion-icon>
            </ion-button>
          </router-link>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
      <ion-content color="light">
        <img src="/static/assets/offline.gif">
        <p class="offline">
            You are offline, Please Check your connections
        </p>
      </ion-content>
    </div>
</template>

<script>
export default {
  name: 'offline',
};
</script>

<style scoped>
  ion-content {
    padding-top: 100px;
    text-align: center;
  }
  img {
    width: 80%;
    padding-top: 50px;
  }
</style>
