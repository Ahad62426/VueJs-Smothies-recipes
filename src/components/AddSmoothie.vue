<template>
  <div class="addSmoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="CheckIngredient">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div v-for="(ing, index) in ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]" />
        <i class="material-icons icons" @click="deleteIng(index)">delete</i>
      </div>
      <div class="field addIngredient">
        <label for="addIngredient">Add an ingredient (press tab to add more ingredients):</label>
        <input type="text" name="addIngredient" @keydown.tab.prevent="addIng" v-model="another" />
        <i class="material-icons icons" @click="addIng">add</i>
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import slugify from "slugify";
import db from "@/firebase/config";

export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      slug: null,
      ingredients: [],
      another: null,
      feedback: null
    };
  },
  methods: {
    CheckIngredient() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      }
      this.AddSmoothie();
    },
    AddSmoothie() {
      if (!this.title) {
        return (this.feedback = "You must enter a smoothie title");
      } if (!this.ingredients.length) {
        return (this.feedback = "You must enter a smoothie ingredient");
      }
      this.feedback = null;
      // create slug
      this.slug = slugify(this.title, {
        replacement: "-",
        remove: /[&*_+~.()'"!\-:@]/g,
        lower: true
      });
      db.collection("smoothies")
        .add({
          title: this.title,
          slug: this.slug,
          ingredients: this.ingredients
        })
        .then(() => this.$router.push({ name: "Home" }))
        .catch(err => console.log(err));
    },
    deleteIng(ingIndex) {
      this.ingredients = this.ingredients.filter(
        (ingredient, index) => index !== ingIndex
      );
    },
    addIng() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else
        this.feedback = "You must enter a value to add an ingredient . . .";
    }
  }
};
</script>

<style scoped>
.addSmoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.addSmoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.addSmoothie .field {
  margin: 20px auto;
  position: relative;
}
.addSmoothie .icons {
  position: absolute;
  right: 0;
  bottom: 16px;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
