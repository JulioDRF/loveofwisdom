<template>
  <div>
    <b-card-group>
        <EntryCard
          v-for="entry in chunkedEntries"
          :key="entry.entryId"
          :entry="entry">
        </EntryCard>
    </b-card-group>
  </div>
</template>

<script>
import EntryCard from '@/components/EntryCard'

export default {
  name: 'EntryCardGroup',
  props: {
    currentPage: Number,
    perPage: Number,
    entries: Array
  },
  components: {
    EntryCard
  },
  computed: {
    firstIndex () {
      return (this.currentPage - 1) * this.perPage
    },
    lastIndex () {
      return this.currentPage * this.perPage
    },
    chunkedEntries () {
      return this.entries.slice(this.firstIndex, this.lastIndex)
    }
  }
}
</script>
