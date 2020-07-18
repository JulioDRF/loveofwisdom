<template>
  <div>
    <b-card-group>
        <transition-group name="entry-card-group" tag="div">
          <EntryCard
            v-for="entry in chunkedEntries"
            :key="entry.entryId"
            :entry="entry">
          </EntryCard>
      </transition-group>
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

<style>
.entry-card-group-leave-to {
  opacity: 0;
  transform: translateX(20%);
}

.entry-card-group-item,
.entry-card-group-enter-active,
.entry-card-group-leave-active,
.entry-card-group-move {
  transition: all 0.5s ease;
}
</style>
