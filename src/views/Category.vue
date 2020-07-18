<template>
  <div id="category">
    <b-container fluid="md" class="m-auto">
      <b-row>
        <b-col align="center">
          <h1>{{ category.categoryName }}</h1>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="4" class="mb-2">
          <b-button variant="outline-primary" to="/"><b-icon icon="arrow-left"></b-icon> Categories</b-button>
        </b-col>
        <b-col sm="4">
          <b-input
            class="mr-auto"
            v-model="currentSearch"
            placeholder="Filter entries"
            @update="filterEntries"
          ></b-input>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <EntryCardGroupPaginated
            :per-page="10"
            :entries="displayedEntries"
            scrollOnPageChange>
          </EntryCardGroupPaginated>
          <div v-if="displayedEntries.length === 0">
            <h4 align="center">No matches</h4>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
import EntryCardGroupPaginated from '@/components/EntryCardGroupPaginated'

export default {
  name: 'Category',
  components: {
    EntryCardGroupPaginated
  },
  computed: {
    category () {
      return this.$store.getters.category(this.$route.params.id)
    },
    entriesByCategory () {
      return this.$store.getters.entriesByCategory(this.category.categoryId)
    },
    displayedEntries () {
      return this.currentSearch.length ? this.filteredEntries : this.entriesByCategory
    },
    fuse () {
      return new Fuse(this.entriesByCategory, {
        keys: ['entryName'],
        shouldSort: true,
        threshold: 0.2
      })
    }
  },
  data () {
    return {
      filteredEntries: [],
      currentSearch: ''
    }
  },
  methods: {
    filterEntries () {
      this.filteredEntries = this.currentSearch.length
        ? this.fuse.search(this.currentSearch).map(({ item }) => item)
        : this.entriesByCategory
    }
  }
}
</script>
