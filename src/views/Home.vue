<template>
    <div class="ion-page">
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
  created() {
    this.timerRefresh();
  },
  data() {
    return {
      API_KEY: "673abeff572fd24d4eb4b3b6d16955bc",
    };
  },
  components: {
    ListRate,
  },
  methods: {
    timerRefresh() {
      setInterval(()=>{
        let cacheData = JSON.parse(localStorage.getItem('cacheData'));
        let currencies = "";
        cacheData.forEach(e => { currencies += e.symbol + ',' });

        fetch(`http://www.apilayer.net/api/live?access_key=${this.API_KEY}&source=USD&currencies=${currencies}&format=1`)
        .then(resp => { return resp.json(); })
        .then(function(myJson) {
          if (myJson.success) {
              console.log(new Date(parseInt(myJson.timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '));
              localStorage.setItem('storedRates', JSON.stringify(myJson));
          } else {
              console.log(myJson.error.info);
          }
        });
      }, 10000); // 30秒
    },
    choose() {
      this.$router.push({ path: '/country' });
    },
    doRefresh() {
      console.log('refresh');
    },
  },
};
</script>
