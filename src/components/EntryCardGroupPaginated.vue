<template>
  <div id="entry-card-group-paginated">
    <EntryCardGroup
      id="entry-card-group"
      :current-page="currentPage"
      :per-page="perPage"
      :entries="entries">
    </EntryCardGroup>
    <div v-if="needsPagination">
      <b-pagination
        class="pagination"
        v-model="currentPage"
        :total-rows="entryCount"
        :per-page="perPage"
        aria-controls="entry-card-group"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import EntryCardGroup from '@/components/EntryCardGroup'

export default {
  name: 'EntryCardGroupPaginated',
  props: {
    entries: Array,
    perPage: Number,
    scrollOnPageChange: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    EntryCardGroup
  },
  computed: {
    needsPagination () {
      return this.entries.length > this.perPage
    },
    entryCount () {
      return this.entries.length
    }
  },
  data () {
    return {
      currentPage: 1
    }
  },
  watch: {
    currentPage () {
      if (this.scrollOnPageChange) {
        setTimeout(() => window.scroll(0, 0), 1)
      }
    },
    entryCount (count) {
      if (count < this.perPage) {
        this.currentPage = 1
      }
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
