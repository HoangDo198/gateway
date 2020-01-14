<template>
  <div id="GatewayList">
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-row>
          <v-col cols="12">
            <v-btn color="primary" dark class="mx-2 float-right" v-on="on">New Item</v-btn>
          </v-col>
        </v-row>
      </template>

      <v-card>
        <v-card-title>
          <span class="headline">{{formTitle}}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="12">
                <v-text-field v-model="editedItem.language" label="Language"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field v-model="editedItem.code" label="Code"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field v-model="editedItem.text" label="Text"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field v-model="editedItem.Application" label="Application"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <template>
      <v-card>
        <v-card-title>
          <span class="headline">Languages</span>
        </v-card-title>

        <v-card-actions id="language" v-for="lang in checkState" :key="lang">
          <v-btn color="blue darken-1" v-text="lang" @click="getByApp(lang)"></v-btn>
        </v-card-actions>
      </v-card>
    </template>

    <v-divider></v-divider>
    <template>
      <v-card v-for="item in items" :key="item._id" id="card-language">
        <v-list-item two-line dense>
          <v-list-item-content>
            <v-list-item-title>{{item.code}}</v-list-item-title>
            <v-list-item-subtitle>{{item.text}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="dark lighten-1" @click="editItem(item)">mdi-border-color</v-icon>
            </v-btn>
          </v-list-item-action>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="dark lighten-1" @click="deleteItem(item)">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "./../axiosInstance";
export default {
  data: () => ({
    dialog: false,
    editedIndex: -1,
    editedItem: {
      language: "",
      code: "",
      text: "",
      Application: ""
    },
    defaultItem: {
      language: "",
      code: "",
      text: "",
      Application: ""
    },
    items: [],
    language: []
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["checkState"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {},
    getByApp(lang) {
      axios
        .get("/languagetByApp", {
          params: {
            application: this.$store.state.appname,
            lang: lang
          }
        })
        .then(res => {
          console.log(res);
          let datas = Object.values(res.data.data);
          this.items = datas;
          console.log(this.items);
        });
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      confirm("Are you sure you want to delete this item?");
      this.items.splice(this.editedIndex, 1);
      axios.delete('/deleteById', {params:{
        id: this.editedItem._id
      }}).then(res => {
        console.log(res);
        alert('delete successed!!!');
      }).catch(err => {
        console.log(err);
        alert('delete fail!!!');
      })
    },

    editItem(item) {
      this.dialog = true;
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
        console.log(this.editedItem._id);
        console.log(this.editedItem.text);
        axios.put('/updateById', {
          id: this.editedItem._id,
          text: this.editedItem.text
        }).then(res => {
          Object.assign(this.items[this.editedIndex], res.data.data);
          alert('update successed!!!');
        }).catch(err => {
          console.log(err);
          alert('update fail !!!');
        })
      } else {
        this.desserts.push(this.editedItem);
        alert('add new success');
      }
      // this.close();
    }
  }
};
</script>
<style scoped>
#language {
  display: inline-block !important;
}
#card-language {
  margin: 10px;
}
</style>