<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="dialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Settings</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="dialog">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-list three-line subheader>
      <v-subheader>Languages Support Code</v-subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Application:</v-list-item-title>
          <v-list-item-title>{{editItem.Application}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Languages Code:</v-list-item-title>
          <v-list-item-title>{{editItem.code}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="6">
        <v-list subheader>
          <v-subheader>Languages</v-subheader>
          <v-list-item v-for="(langs, i) in editItem.language" :key="i">
            <v-list-item-content>
              <v-list-item-title>{{langs.language}}:</v-list-item-title>
              <v-list-item-subtitle>
                <v-text-field v-model="langs.text" ref="LangText" readonly></v-text-field>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="dark lighten-1" @click="changEdit(i)">mdi-border-color</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="dark lighten-1" @click="deleteItem(i, langs._id)">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-btn color="error" dark large @click="update()">Update</v-btn>
          </v-list-item>
        </v-list>
      </v-col>

      <AddNew :getCode="editItem.code" @dataProp="editItem.language.push($event)"/>

    </v-row>
  </v-card>
</template>

<script>
import axios from "../axiosInstance";
import AddNew from './addNewByApp';
export default {
  props: {
    editItem: Object
  },
  components: {
    AddNew,
  },
  data: () => ({
    notifications: false,
    sound: true,
    widgets: false
  }),
  methods: {
    dialog() {
      this.$store.dispatch("getdialog", false);
    },
    deleteItem(i, id) {
      this.editedIndex = i;
      confirm("Are you sure you want to delete this item?") &&
      axios
        .delete("/deleteById", {
          params: {
            id: id
          }
        })
        .then(() => {
          alert("delete successed!!!");
          this.editItem.language.splice(this.editedIndex, 1);
        })
        .catch(err => {
          alert("delete fail!!!");
          console.log(err);
        });
    },
    changEdit(i) {
      let id = this.$refs.LangText[i].$refs.input.id;
      document.getElementById(id).removeAttribute("readonly");
      document.getElementById(id).onblur = function() {
        this.setAttribute("readonly", "true");
      };
    },
    async update() {
      let id;
      let text;
      this.editItem.language.map(val => {
        id = val._id;
        text = val.text;
      });
      await axios.put("/updateById", { id, text });
      alert("update success !!!");
    },
    close() {
      this.$store.dispatch("getdialog", false);
    },
  }
};
</script>