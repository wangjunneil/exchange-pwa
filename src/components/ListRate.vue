<template>
  <ion-list>
    <ion-item-sliding v-for="item in rateObjects" v-model="rateObjects" v-bind:key="item.symbol">
      <ion-item lines="none" min-height="30">
        <ion-thumbnail slot="start">
          <img :src="item.logo">
        </ion-thumbnail>
        <ion-label>
          <h2>{{ item.symbol }}</h2>
          <p>{{ item.name }}</p>
        </ion-label>
        <ion-input placeholder=""
          clearOnEdit
          slot="end"
          :value="item.rate"
          type="number"
          mode="md"
          @ionFocus="beginInput"
          @ionBlur="endInput"
          @ionInput="executeInput($event, item)">
        </ion-input>
      </ion-item>

      <ion-item-options side="end">
        <ion-item-option mode="md" translucent="true" color="danger"
          @click="removeData(item.symbol)">
          <ion-icon name="trash" color="light"></ion-icon>
        </ion-item-option>
      </ion-item-options>

    </ion-item-sliding>
  </ion-list>
</template>

<script>
const API_KEY = "673abeff572fd24d4eb4b3b6d16955bc";

export default {
  name: 'ListRate',
  created() {
    this.restoreData();
  },
  data() {
    return {
      rateObjects: [],
      rateValues: {

      },
    };
  },
  props: {
    msg: String,
  },
  methods: {
    beginInput(event) {
      if (event.target.value === '0.00') {
        event.target.value = '';
      }
    },
    endInput(event) {
      if (event.target.value === '') {
        event.target.value = '0.00';
      }
    },
    executeInput(event, item) {
      const value = event.target.value;

      let storedRates = JSON.parse(localStorage.getItem('storedRates'));
      if (storedRates === null) {
        return;
      }
      const quotes = storedRates.quotes;
      const cacheData = JSON.parse(localStorage.getItem('cacheData'));
      cacheData.forEach((v) => {
        v.rate = (value / quotes[`USD${v.symbol}`]).toFixed(2);
        this.rateObjects.splice(this.rateObjects.findIndex(e => e.symbol === v.symbol), 1, v);
        // this.$set(v, "rate", (value / quotes[`USD${v.symbol}`]).toFixed(2));
        // this.rateObjects.push(v);
      });

      // this.rateObjects.push(resultData);
// console.log(this.rateObjects);
      // this.$set(this.rateObjects, resultData);
      // cacheData.forEach(v => {
      //   v.rate = (value / quotes[`USD${v.symbol}`]).toFixed(2);
      //   // this.rateObjects.splice(this.rateObjects.findIndex(e => e.symbol === v.symbol), 1, v);
      //
      //   // this.$set(this.rateObjects, this.rateObjects.findIndex(e => e.symbol === v.symbol) , v);
      //   this.
      // })
    },
    removeData(symbol) {
      this.rateObjects = this.rateObjects.filter(e => e.symbol != symbol);
      localStorage.setItem('cacheData', JSON.stringify(this.rateObjects));
    },
    restoreData() {
      let cacheData = JSON.parse(localStorage.getItem('cacheData'));

      if (cacheData) {
        this.rateObjects = cacheData;
      } else {
        this.rateObjects = [
          { logo: '/static/CNY.png',name: '人民币',symbol: 'CNY',rate: "0.00"},
        ];
        localStorage.setItem('cacheData', JSON.stringify(this.rateObjects));
      }
    },
  },
};
</script>

<style scoped>
ion-icon {
  font-size:30px;
}

ion-item-sliding {
  margin-top: 15px;
  margin-bottom: 15px;
}

ion-input {
  text-align: right;
  font-size: 30px;
}
</style>
