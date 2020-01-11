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
          <v-btn color="blue darken-1" text >Cancel</v-btn>
          <v-btn color="blue darken-1" text >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-list >
      <v-list-group
        v-for="item in items"
        :key="`${item.app}`"
        :prepend-icon="item.action"
        no-action
        sub-group
        value="true"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title class="title" v-text="item.app"></v-list-item-title>
            <v-divider></v-divider>
          </v-list-item-content>
        </template>

        <v-list-item id="warp-item" 
          v-for="subItem in item.subitems"
          :key="subItem._id"
          :style="{backgroundColor: '#fae7e7', borderColor: '#ff0000'}"
        >
          <v-list-item-content>
            <v-list-item-title>CODE: {{subItem.code}}</v-list-item-title>
            <v-list-item-subtitle>Text: {{subItem.text}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="editItem(subItem)">
              <v-icon color="dark lighten-1">mdi-border-color</v-icon>
            </v-btn>
          </v-list-item-action>

          <v-list-item-action >
            <v-btn icon @click="deleteItem()">
              <v-icon color="dark lighten-1">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>

        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
import axios from '../axiosInstance';
export default {
  data: () => ({
    dialog: false,
    editedIndex: -1,
    editedItem: {
      language: "",
      code: "",
      text: "",
      Application: "",
    },
    defaultItem: {
      language: "",
      code: "",
      text: "",
      Application: "",
    },
    items: [
      {
        app: "vi",
        subitems: [{
          language: "vi",
          _id: "5e1816ba7af7545a6cce1473",
          code: "LANGUAGE_CODE_NOT_FOUND",
          text: "Không tìm thấy mã lỗi này."
        },
        {
          language: "vi",
          _id: "5e1816ba7af7545a6cce1475",
          code: "LANGUAGE_CODE_NOT_FOUND",
          text: "Không tìm thấy mã lỗi này."
        }
        ]
      },
    ]
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created(){
    this.initialize();
  },
  methods: {
    initialize(){
      axios.get('/languageByCode', {
        params: {
          code: "LANGUAGE_CODE_NOT_FOUND"
        }
      }).then( data => {
        console.log(data);
      })
    },
    deleteItem () {
      confirm('Are you sure you want to delete this item?')
    },

    editItem (item) {
      this.editedIndex = this.items.indexOf(item);
      console.log(this.editedIndex);
      
      this.editedItem = Object.assign({}, item);
      this.dialog = true
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
  }
};
</script>
<style scoped>
button.v-btn.v-btn--depressed.theme--light.v-size--small {
  min-width: 0 !important;
  width: 80px !important;
  color: floralwhite;
  font-weight: bold;
  font-size: 16px;
}
.v-list-item.theme--light {
  margin: 0 20px 20px;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
}
.v-application .font-weight-light {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 36px !important;
}
.v-application--is-ltr
  .v-list-group--no-action
  > .v-list-group__items
  > div
  > .v-list-item {
  padding-left: 16px;
}
</style>