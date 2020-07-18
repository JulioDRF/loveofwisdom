<template>
  <div id="home">
    <b-container fluid="md" class="m-auto">
      <b-row align="center">
        <b-col cols="auto" class="m-auto">
          <h1>Love of Wisdom</h1>
        </b-col>
      </b-row>
      <b-row align="center">
        <b-col sm="5" class="m-auto p-4">
          <b-input
            v-model="currentSearch"
            placeholder="Filter categories"
            @update="filterCategories"
          ></b-input>

        </b-col>
      </b-row>
      <b-card-group columns>
        <transition-group name="category-card-group" tag="div">
          <b-card
            class="category-card-group-item"
            v-for="cat in displayedCategories"
            :key="cat.categoryId"
            :bg-variant="cardBackgroundVariant"
            :text-variant="cardTextColor"
            :title="cat.categoryName"
            :img-src="cat.imageSrc"
            :img-alt="cat.categoryName"
            img-top
            @click="goToCategoryPage(cat)">
          </b-card>
        </transition-group>
      </b-card-group>
      <div v-if="displayedCategories.length === 0">
        <h4 align="center">No matches</h4>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Fuse from 'fuse.js'

export default {
  name: 'Home',
  computed: {
    ...mapState([
      'categories'
    ]),
    ...mapGetters([
      'cardTextColor',
      'cardBackgroundVariant'
    ]),
    displayedCategories () {
      return this.currentSearch.length ? this.filteredCategories : this.categories
    },
    fuse () {
      return new Fuse(this.categories, {
        keys: ['categoryName'],
        shouldSort: true,
        threshold: 0.2
      })
    }
  },
  data () {
    return {
      filteredCategories: [],
      currentSearch: ''
    }
  },
  methods: {
    goToCategoryPage (category) {
      return this.$router.push({ name: 'category', params: { id: category.categoryId } })
    },
    filterCategories () {
      this.filteredCategories = this.currentSearch.length
        ? this.fuse.search(this.currentSearch).map(({ item }) => item)
        : this.categories
    }
  }
}
</script>

<style>
.category-card-group-item {
  cursor: pointer;
  text-align: center;
}
.category-card-group-enter,
.category-card-group-leave-to {
  opacity: 0;
}

.category-card-group-item,
.category-card-group-enter-active,
.category-card-group-leave-active,
.category-card-group-move {
  transition: all 0.5s ease;
}

</style>
