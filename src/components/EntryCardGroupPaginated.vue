<template>
  <div id="entry-card-group-paginated">
    <EntryCardGroup
      id="entry-card-group"
      :current-page="currentPage"
      :per-page="perPage"
      :entries="entries"
    />
    <div v-if="needsPagination">
      <b-pagination
        v-model="currentPage"
        class="pagination"
        :total-rows="entryCount"
        :per-page="perPage"
        aria-controls="entry-card-group"
      />
    </div>
  </div>
</template>

<script>
import EntryCardGroup from '@/components/EntryCardGroup'

export default {
  name: 'EntryCardGroupPaginated',
  components: {
    EntryCardGroup
  },
  props: {
    entries: {
      type: Array,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    scrollOnPageChange: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    needsPagination () {
      return this.entries.length > this.perPage
    },
    entryCount () {
      return this.entries.length
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
