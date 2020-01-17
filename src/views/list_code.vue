<template>
  <div id="codeByApp">
    <template>
      <v-row>
        <v-col cols="6" class="my-0">
          <div id="search">
            <v-text-field
              placeholder="Search Code"
              v-model="txtSearch"
              class="mx-2"
              outlined
              rounded
              dense
            ></v-text-field>
            <v-btn class="btn-search" @click="searchCode(txtSearch)" fab dark small color="pink">
              <v-icon dark>mdi-magnify</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="6" class="my-0">
          <v-btn color="primary" dark class="mx-2 float-right" @click="dialog = !dialog">New Item</v-btn>
        </v-col>
      </v-row>
    </template>
    <v-dialog v-model="getdialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <dialogComponent :editItem="this.editedItem" />
    </v-dialog>
    <v-dialog v-model="dialog" max-width="500px">
      <dialogComponent1 :editdialog="this.dialog" @changeDialog="dialog = $event" />
    </v-dialog>

    <template>
      <v-card v-for="(item, i) in checkState" :key="i" id="card-language">
        <v-list-item three-line dense>
          <v-list-item-content>
            <v-list-item-title>Application: {{getAppname}}</v-list-item-title>
            <v-list-item-title>Code: {{item}}</v-list-item-title>
            <v-list-item-subtitle @click="editItem(item)">Support Language</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </template>
  </div>
</template>

<script>
import axios from "../axiosInstance";
import EventBus from "../eventBus";
import dialogComponent from "../components/dialog";
import dialogComponent1 from "../components/dialog1";
import { mapGetters } from "vuex";

export default {
  components: {
    dialogComponent,
    dialogComponent1
  },
  data: () => ({
    dialog: false,
    Readonly: true,
    txtSearch: "",
    editedIndex: -1,
    editedItem: {
      Application: "",
      code: "",
      language: "",
      text: ""
    },
    language: []
  }),
  created() {
    EventBus.$on("addNewApp", this.handler);
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Language Support";
    },
    ...mapGetters(["checkState", "getdialog", "getAppname"])
  },
  watch: {
    dialog(val) {
      val || this.close;
    }
  },
  methods: {
    editItem(item) {
      this.$store.dispatch("getdialog", true);
      axios
        .get("/languageByCode", {
          params: {
            code: item,
            application: this.$store.state.appname
          }
        })
        .then(res => {
          this.editedItem.Application = this.$store.state.appname;
          this.editedItem.code = item;
          this.language = Object.values(res.data.data);
          this.editedItem.language = this.language;
        });
      return this.editedItem;
    },
    searchCode(txtSearch) {
      let application = this.$store.state.appname;
      let code = txtSearch;
      this.$store.dispatch("getAppname", { application, code });
    },
    handler(e) {
      let check = this.checkState.find(element => element === e.code);
      if (typeof check !== "undefined") {
        axios
          .get("/languageByCode", {
            params: {
              code: e.code,
              application: this.$store.state.appname
            }
          })
          .then(res => {
            this.language = Object.values(res.data.data);
            let check = this.language.find(val => val.language === e.language);
            if(typeof(check) !== "undefined") {
              alert('Language is already!!!');
            } else {
              alert(`language addition success for code: ${e.code}`)
            }
          });
      } else {
        this.checkState.push(e.code);
        alert('code addition success!!!')
      }
    }
  }
};
</script>

<style scoped>
#search {
  position: relative;
}
.btn-search {
  position: absolute;
  top: 0;
  right: 7px;
}
#card-language {
  margin: 0 10px 10px;
}
.v-list-item__subtitle {
  color: #e91e63 !important;
  cursor: pointer;
  text-decoration: underline;
}
</style>