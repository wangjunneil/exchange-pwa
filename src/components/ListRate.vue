<template>
    <md-list class="md-triple-line">
        <md-list-item v-for="item in rateObjects" v-bind:key="item.symbol">
          <md-avatar class="md-large">
            <img :src="item.logo" :alt="item.symbol">
          </md-avatar>

          <div class="md-list-item-text">
            <span>{{ item.symbol }}</span>
            <span>{{ item.country }}</span>
          </div>

          <input type="number"
            :value="item.rate"
            placeholder="请输入金额"
            @focus="beginInput($event)"
            @blur="endInput($event)"/>
        </md-list-item>
      </md-list>
</template>

<script>
export default {
  name: 'ListRate',
  data: function () {
    return {
      rateObjects: [
        {
          logo: require('../assets/country/CNY.png'),
          country: '人民币',
          symbol: 'CNY',
          rate: 123.10,
        },
        {
          logo: require('../assets/country/USD.png'),
          country: '美元',
          symbol: 'USD',
          rate: 789.00,
        },
        {
          logo: require('../assets/country/JPY.png'),
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
.md-list {
    /* width: 320px; */
    max-width: 100%;
    /* display: inline-block; */
    vertical-align: top;
    border: 1px solid rgba(#fff, .12);
}
input {
  background-color: #424242;
    text-align: right;
    font-size: 30px;
    width: 50%;
    color: #fff;

    /* -webkit-text-fill-color: #fff; */
    border: none;
    outline:none;
}
input::-webkit-input-placeholder {
  color: gray;
}
</style>
