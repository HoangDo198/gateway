<template>
  <div class="container">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field id="application" v-model="application" :counter="10" :rules="applicationRules" label="Application" required></v-text-field>

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


      <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">Submit</v-btn>

      <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

    </v-form>
  </div>
</template>

<script>
import axios from "../axiosInstance";
export default {
  data: () => ({
    valid: true,
    application: "",
    applicationRules: [
      v => !!v || "Language is required",
      
    ],
    text: "",
    textRules: [
      v => !!v || "Text is required",
    ],
    codeRules: [
      v => !!v || "Code is required",
    ],
    
    select: null,
    language: ["vi", "en"],
  }),

  methods: {
      validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    submit() {
      let language = this.select
      let code = document.getElementById("code").value;
      let text = document.getElementById("text").value;
      let application = document.getElementById("application").value;
      console.log(application);
      let obj = {};
      let data = [];
      obj.application = application;
      obj.code = code;
      obj.text = text;
      data.push(obj);
      console.log(data);
      axios
        .post("/language", { lang: language, data: data })
        .then()
        .catch(err => console.log(err));
    },
    
  }
};
</script>

<style>
.container {
  position: relative;
}
#table {
  position: absolute;
  right: 0;
}
</style>