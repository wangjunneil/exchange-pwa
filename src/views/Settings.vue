<template>
    <div class="ion-page">
      <ion-header translucent="true">
        <ion-toolbar color="danger">
          <ion-buttons slot="start">
            <ion-back-button text=""></ion-back-button>
          </ion-buttons>
          <ion-title>Settings</ion-title>
        </ion-toolbar>
      </ion-header>
        <ion-content color="dark">
          <ion-item>
            <ion-label>Allow position</ion-label>
            <ion-toggle slot="end" color="danger"></ion-toggle>
          </ion-item>
            <ion-item>
              <ion-label>Allow notification</ion-label>
              <ion-toggle slot="end" color="danger"></ion-toggle>
            </ion-item>
            <ion-item>
              <ion-label>Refresh time</ion-label>
              <ion-select interface="action-sheet">
                <ion-select-option value="5">5 min</ion-select-option>
                <ion-select-option value="10">10 min</ion-select-option>
                <ion-select-option value="30" selected>30 min</ion-select-option>
                <ion-select-option value="60">60 min</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item class="about">
              <ion-label>
                Powered by <a href="//wangjun.dev"><b>wangjun.dev</b></a> @2019
              </ion-label>
              <ion-icon name="logo-octocat" slot="end"></ion-icon>
              </ion-item>
        </ion-content>
      </div>
</template>

<script>
export default {
  name: 'Settings',
  methods: {
    endInput(event) {
      let val = event.target.value;
      if (val === '' || val == '0') {
        event.target.value = '1';
      }
    },
  },
};
</script>

<style scoped>
ion-label {
  padding-top: 15px;
  padding-bottom: 15px;
}
.about {
  margin-top: 5px;
  margin-bottom: 5px;
}
ion-input {
  text-align: right;
  font-weight: bold;
}
.units {
  color: gray;
  padding-left: 5px;
}
</style>
