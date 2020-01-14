<template>
  <v-navigation-drawer
    id="app-drawer"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    permanent
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title" @click="returnHome()">Application Language</v-list-item-title>
        <v-list-item-subtitle>fast and furious</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list dense nav>
      <v-list-item 
      v-for="item in items" 
      :key="item.title"
      :to="item.to" 
      @click="getAppname(item.title)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import axios from "./../../axiosInstance";
import {mapActions} from 'vuex'; 
export default {
  data: () => ({
    items: []
  }),
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      axios.get("/getAllApp").then(res => {
        res.data.data.map(val => {
          this.items.push({ title: val, to: '/GateWay' });
        });
      });
    },
    returnHome() {
      this.$router.push({
        name: "Form"
      });
    },
    ...mapActions([
      'getAppname'
    ])
  },
};
</script>

<style scoped>
.v-list-item__title {
  cursor: pointer;
}
</style>