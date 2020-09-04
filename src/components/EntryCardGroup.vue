<template>
  <div>
    <b-card-group>
      <transition-group
        name="entry-card-group"
        tag="div"
      >
        <EntryCard
          v-for="entry in chunkedEntries"
          :key="entry.entryId"
          :entry="entry"
        />
      </transition-group>
    </b-card-group>
  </div>
</template>

<script>
import EntryCard from '@/components/EntryCard'

export default {
  name: 'EntryCardGroup',
  components: {
    EntryCard
  },
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    entries: {
      type: Array,
      required: true
    }
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

<style>
.entry-card-group-leave-to {
  opacity: 0;
}

.entry-card-group-item,
.entry-card-group-enter-active,
.entry-card-group-leave-active,
.entry-card-group-move {
  transition: all 0.5s ease;
}
</style>
