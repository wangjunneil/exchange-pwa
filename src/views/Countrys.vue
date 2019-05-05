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
        <ion-item lines="none" >
          <ion-thumbnail slot="start">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==">
          </ion-thumbnail>
          <ion-label>
            CNY
          </ion-label>
          <ion-label slot="end" class="name">
            人民币
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: 'Countrys',
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
