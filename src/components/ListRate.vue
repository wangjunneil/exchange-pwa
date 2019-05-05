<template>
  <ion-list>
    <ion-item-sliding v-for="item in rateObjects" v-bind:key="item.symbol">
      <ion-item lines="none" min-height="30">
        <ion-thumbnail slot="start">
          <img :src="item.logo">
        </ion-thumbnail>
        <ion-label>
          <h2>{{ item.symbol }}</h2>
          <p>{{ item.country }}</p>
        </ion-label>
        <ion-input placeholder="" clearOnEdit slot="end" value="0.00" type="number" mode="md" @ionFocus="beginInput" @ionBlur="endInput"></ion-input>
      </ion-item>

      <ion-item-options side="end">
        <ion-item-option mode="md" translucent="true" color="danger">
          <ion-icon name="trash" color="light"></ion-icon>
        </ion-item-option>
      </ion-item-options>

    </ion-item-sliding>
  </ion-list>
</template>

<script>
export default {
  name: 'ListRate',
  data: function () {
    return {
      rateObjects: [
        {
          logo: '/static/CNY.png',
          country: '人民币',
          symbol: 'CNY',
          rate: 123.10,
        },
        {
          logo: '/static/USD.png',
          country: '美元',
          symbol: 'USD',
          rate: 789.00,
        },
        {
          logo: '/static/JPY.png',
          country: '日元',
          symbol: 'JPY',
          rate: 123.0,
        },
      ],
    };
  },
  props: {
    msg: String,
  },
  methods: {
    beginInput(event) {
      console.log(event);
      if (event.target.value === '0.00') {
        event.target.value = '';
      }
    },
    endInput(event) {
      if (event.target.value === '') {
        event.target.value = '0.00';
      }
    },
  },
};
</script>

<style scoped>
ion-icon {
  font-size:30px;
}
/* ion-list {
  padding-bottom: 15px;
}
ion-item, ion-item-options {
  padding-top: 15px;
} */

ion-item-sliding {
  margin-top: 15px;
  margin-bottom: 15px;
}

ion-input {
  text-align: right;
  font-size: 30px;
}
</style>
