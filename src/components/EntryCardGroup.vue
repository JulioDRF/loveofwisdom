<template>
  <div>
    <b-card-group>
      <transition-group
        name="entry-card-group"
        tag="div"
      >
        <EntryCard
          v-for="entry in entries"
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
    entries: {
      type: Array,
      required: true
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
