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
          <b-button variant="primary" to="/"><b-icon icon="arrow-left"></b-icon> Categories</b-button>
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
          <EntryCardGroup
            id="entry-card-group"
            :current-page="currentPage"
            :per-page="perPage"
            :entries="displayedEntries">
          </EntryCardGroup>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-pagination
            class="pagination"
            v-model="currentPage"
            :total-rows="displayedEntryCount"
            :per-page="perPage"
            aria-controls="entry-card-group"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
import EntryCardGroup from '@/components/EntryCardGroup'

export default {
  name: 'Category',
  components: {
    EntryCardGroup
  },
  computed: {
    category () {
      return this.$store.getters.category(this.$route.params.id)
    },
    entriesByCategory () {
      return this.$store.getters.entriesByCategory(this.category.categoryId)
    },
    displayedEntries () {
      return this.filteredEntries.length ? this.filteredEntries : this.entriesByCategory
    },
    displayedEntryCount () {
      return this.displayedEntries.length
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
      currentSearch: '',
      currentPage: 1,
      perPage: 10
    }
  },
  methods: {
    filterEntries () {
      this.filteredEntries = this.currentSearch.length
        ? this.fuse.search(this.currentSearch).map(({ item }) => item)
        : this.entriesByCategory
    }
  },
  watch: {
    currentPage: () => {
      setTimeout(() => window.scroll(0, 0), 1)
    }
  }
}
</script>

<style>
.pagination > li.page-item > button.page-link {
  color: var(--text-color);
  background: var(--bg-color-secondary);
}
.pagination > li.page-item.active > button.page-link {
  color: #ffffff;
  background: #007bff;
}
.pagination > li.page-item.disabled > span {
  color: var(--text-color);
  background: var(--bg-color-secondary);
}
</style>
