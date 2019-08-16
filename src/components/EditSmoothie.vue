<template>
  <div v-if="smoothie" class="editSmoothie container">
    <h2 class="center-align indigo-text">Edit Smoothie: {{ smoothie.title }}</h2>
    <form @submit.prevent="CheckIngredient">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="smoothie.title" />
      </div>
      <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]" />
        <i class="material-icons icons" @click="deleteIng(index)">delete</i>
      </div>
      <div class="field addIngredient">
        <label for="addIngredient">Add an ingredient (press tab to add more ingredients):</label>
        <input type="text" name="addIngredient" @keydown.tab.prevent="addIng" v-model="another" />
        <i class="material-icons icons" @click="addIng">add</i>
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import slugify from "slugify";
import db from "@/firebase/config";

export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    CheckIngredient() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      }
      this.EditSmoothie();
    },
    EditSmoothie() {
      if (!this.smoothie.title) {
        return (this.feedback = "You must enter a smoothie title");
      }
      if (!this.smoothie.ingredients.length) {
        return (this.feedback = "You must enter a smoothie ingredient");
      }
      this.feedback = null;
      // create slug
      this.smoothie.slug = slugify(this.smoothie.title, {
        replacement: "-",
        remove: /[&*_+~.()'"!\-:@]/g,
        lower: true
      });
      db.collection("smoothies")
        .doc(this.smoothie.id)
        .update({
          title: this.smoothie.title,
          slug: this.smoothie.slug,
          ingredients: this.smoothie.ingredients
        })
        .then(() => this.$router.push({ name: "Home" }))
        .catch(err => console.log(err));
    },
    deleteIng(ingIndex) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        (ingredient, index) => index !== ingIndex
      );
    },
    addIng() {
      if (!this.another)
        return (this.feedback =
          "You must enter a value to add an ingredient . . .");
      this.smoothie.ingredients.push(this.another);
      this.another = null;
      this.feedback = null;
    }
  },
  created() {
    const ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.slug);
    ref
      .get()
      .then(snapshot =>
        snapshot.forEach(doc => {
          this.smoothie = doc.data();
          this.smoothie.id = doc.id;
        })
      )
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
.editSmoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.editSmoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.editSmoothie .field {
  margin: 20px auto;
  position: relative;
}
.editSmoothie .icons {
  position: absolute;
  right: 0;
  bottom: 16px;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
