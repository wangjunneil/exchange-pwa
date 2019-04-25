<template>
  <div>
    <md-content class="md-scrollbar">
      <ListRate />

      <md-speed-dial md-direction="bottom" class="md-bottom-right">
        <md-speed-dial-target @click="linkForword">
          <md-icon class="md-primary">add</md-icon>
        </md-speed-dial-target>
      </md-speed-dial>
    </md-content>
  </div>
</template>

<script>
import ListRate from '@/components/ListRate.vue';

export default {
  name: 'Main',
  methods: {
    linkForword() {
      this.$router.push({path:'/country'})
    }
  },
  components: {
    ListRate,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
