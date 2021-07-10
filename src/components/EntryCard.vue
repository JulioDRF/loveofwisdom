<template>
  <div class="entry-card w-100 mb-2">
    <b-card
      class="entry-card-group-item"
      :bg-variant="cardBackgroundVariant"
      :text-variant="cardTextColor"
      :title="entry.entryName"
      align="left"
      @click="goToEntryPage(entry)"
    >
      <b-card-text>{{ description }}</b-card-text>
      <b-link :to="'/entry/' + entry.entryId">
        See more
      </b-link>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EntryCard',
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  computed: {
    description () {
      return this.entry.preamble.slice(0, 150).trim() + '...'
    },
    ...mapGetters([
      'cardTextColor',
      'cardBackgroundVariant'
    ])
  },
  methods: {
    goToEntryPage (entry) {
      return this.$router.push({ name: 'entry', params: { id: entry.entryId } })
    }
  }
}
</script>

<style>
.entry-card {
  cursor: pointer
}
</style>
