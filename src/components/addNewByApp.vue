<template>
  <v-col cols="6">
    <v-list subheader>
      <v-subheader>Add new Language</v-subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="mb-3">Language:</v-list-item-title>
          <v-text-field
            autocomplete="off"
            v-model="language"
            :rules="[v => !!v || 'Language is required']"
            placeholder="language..."
            outlined
            dense
            required
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="mb-3">Text:</v-list-item-title>
          <v-text-field
            autocomplete="off"
            v-model="text"
            :rules="[v => !!v || 'text is required']"
            placeholder="Text..."
            outlined
            dense
            required
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-btn color="error" dark large @click="Add()">Add New</v-btn>
      </v-list-item>
    </v-list>
  </v-col>
</template>

<script>
import axios from "../axiosInstance";
export default {
  props: {
    getCode: String
  },
  data: () => ({
    language: "",
    text: "",
    dataProp: {}
  }),
  methods: {
    Add() {
      let obj = {};
      let data = [];
      obj.code = this.getCode;
      obj.text = this.text;
      obj.application = this.$store.state.appname;
      this.dataProp = obj;
      this.dataProp.language = this.language;
      data.push(obj);
      axios
        .post("/language", { lang: this.language, data: data })
        .then(() => {
          this.$emit("dataProp", this.dataProp);
          alert("add new language for:" + this.code);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>