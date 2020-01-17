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

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item-group>
        <v-list-item v-for="(item, i) in items" :key="i" @click="getAppname(item.title)">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import axios from "./../../axiosInstance";
import EventBus from "../../eventBus";
export default {
  data: () => ({
    items: []
  }),
  created() {
    EventBus.$on('addNewApp', this.handler);
    this.initialize();
  },
  methods: {
    initialize() {
      axios.get("/getAllApp").then(res => {
        res.data.data.forEach(val => {
          this.items.push({ title: val });
          return this.items;
        });
      });
    },
    returnHome() {
      this.$router.push('/');
    },
    getAppname(application) {
      let code = "";
      let payload = {application, code }
      this.$store.dispatch('getAppname', payload).then( () => {
        const path = '/code'
        if (this.$route.path !== path) {
          this.$router.push(path);
        }
      })
    },
    handler(e) {
      let check = this.items.find(element => element.title === e.application);
      if(typeof(check) !== "undefined") {
        return this.items;
      } else {
        this.items.push({title: e});
      }
    }
  }
};
</script>

<style scoped>
.v-list-item__title {
  cursor: pointer;
}
</style>