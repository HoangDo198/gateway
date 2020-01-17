<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add New</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="12">
            <v-text-field
              id="application"
              v-model="application"
              :counter="10"
              :rules="applicationRules"
              label="Application"
              required
            ></v-text-field>

            <v-text-field id="code" :rules="codeRules" label="Code" required></v-text-field>

            <v-text-field id="text" :rules="textRules" label="Text" required></v-text-field>

            <v-select
              v-model="select"
              :items="language"
              :rules="[v => !!v || 'Language is required']"
              label="Language"
              id="language"
              required
            ></v-select>
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
</template>

<script>
import axios from "../axiosInstance";
import EventBus from "../eventBus";
export default {
  props: {
    editdialog: Boolean,
  },
  data: () => ({
    dialog: false,
    valid: true,
    application: "",
    applicationRules: [v => !!v || "Language is required"],
    text: "",
    textRules: [v => !!v || "Text is required"],
    codeRules: [v => !!v || "Code is required"],

    select: null,
    language: ["vi", "en"]
  }),
  methods: {
    save() {
      let language = this.select;
      let code = document.getElementById("code").value;
      let text = document.getElementById("text").value;
      let application = document.getElementById("application").value;
      // console.log(application);
      let obj = {};
      let data = [];
      obj.language = language;
      obj.code = code;
      obj.text = text;
      obj.application = application;
      data.push(obj);
      axios
        .post("/language", { lang: language, data: data })
        .then(() => {
            EventBus.$emit('addNewApp', obj);
        })
        .catch(err => console.log(err));
      // this.desserts.push(this.editedItem);
      // alert("add new success");
      this.close();
    },
    close() {
        if(this.editdialog){
            this.$emit('changeDialog', this.dialog);
        }
    }
  }
};
</script>