<template>
  <ion-list>
    <!--<ion-list-header>
      <ion-label></ion-label>
    </ion-list-header>-->

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
export default {
  name: 'ListRate',
  created() {
    this.restoreData();
  },
  data() {
    return {
      rateObjects: [],
    };
  },
  props: {
    msg: String,
  },
  methods: {
    beginInput(event) {
      if (event.target.value === '0.00' || event.target.value === '0') {
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

      const rates = storedRates.rates;
      const currency = (value / rates[`${item.symbol}`]).toFixed(2); // 本币换算成美元

      const cacheData = JSON.parse(localStorage.getItem('cacheData'));
      cacheData
        .filter(e => e.symbol != item.symbol) // 过滤本币
        .forEach(v => {
          v.rate = (currency * rates[`${v.symbol}`]).toFixed(2);
          this.rateObjects.splice(this.rateObjects.findIndex(e => e.symbol === v.symbol), 1, v);
        });
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
