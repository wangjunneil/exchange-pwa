<template>
    <div class="ion-page">
      <ion-header>
        <ion-toolbar color="dark">
          <ion-title>Rates</ion-title>
          <ion-buttons slot="primary" :hidden="isHidden">
            <ion-button @click="requestInstall">
              <ion-icon color="light" slot="end" name="download"></ion-icon>
            </ion-button>            
          </ion-buttons>
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
  data() {
    return {      
      isHidden: false,
      installPromptEvent: null,
    };
  },
  created() {
    this.initial();
    this.resetData();
    requestRate();
  },
  components: {
    ListRate,
  },
  methods: {
    initial() {
      // 若终端是手机隐藏下载按钮
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      if (flag) {        
        this.isHidden = true;
      }

      // 若非浏览器打开而是桌面应用打开则隐藏下载按钮
      window.addEventListener('appinstalled', (event) => {
        this.isHidden = true;
      });

      // save installPromptEvent when beforeinstallprompt event on desktop
      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        this.installPromptEvent = event;
      });  
    },
    requestInstall() {
      // popup install prompt (A2HS: Add to Home screen)
      if (this.installPromptEvent) {
        this.installPromptEvent.prompt();
        this.installPromptEvent.userChoice.then((choice) => {
          if (choice.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }

          // Clear the saved prompt since it can't be used again
          this.installPromptEvent = null;
        });
      }      
    },
    resetData() {
      const cacheData = JSON.parse(localStorage.getItem('cacheData'));
      if (cacheData != null) {
        const updateCacheData = cacheData.filter(e => e.rate === '0.00');
        localStorage.setItem('cacheData', JSON.stringify(updateCacheData));
      }
    },
  },
};
</script>

<style scoped>
ion-label {
  font-size:12px;
}
</style>
