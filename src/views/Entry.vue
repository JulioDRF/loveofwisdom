<template>
  <div id="entry">
     <b-container fluid="md" class="m-auto">
      <b-row align="center">
        <b-col>
          <h1>{{ entry.entryName }}</h1>
        </b-col>
      </b-row>
      <b-row class="mt-2">
         <b-col cols="auto" style="mr-auto">
          <b-button variant="primary" :to="'/category/' + entry.categoryId">
            <b-icon icon="arrow-left"></b-icon>
            {{ entry.categoryName }}
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col cols="auto" align="left">
          <b-card
            title="Preamble"
            body-class="preamble-text"
            :bg-variant="cardBackgroundVariant"
            :text-variant="cardTextColor">
            <b-card-text>{{ formattedPreamble }}</b-card-text>
            <b-card-text>Full entry:
              <b-link target="_blank" :href="entry.sepUrl">{{ entry.sepUrl }}</b-link>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mt-5" align="left">
        <b-col cols="auto">
          <h3>Related Entries</h3>
        </b-col>
      </b-row>
      <b-row class="mt-2" align="left">
        <b-col cols="auto">
          <EntryCardGroup
            :current-page="currentPage"
            :per-page="perPage"
            :entries="relatedEntries">
          </EntryCardGroup>
        </b-col>
      </b-row>
      <b-row v-if="needsPagination">
        <b-col>
          <b-pagination
            class="pagination"
            v-model="currentPage"
            :total-rows="relatedEntries.length"
            :per-page="perPage"
            aria-controls="entry-card-group"
          ></b-pagination>
        </b-col>
      </b-row>
     </b-container>
  </div>
</template>

<script>
import EntryCardGroup from '@/components/EntryCardGroup'
import { mapGetters } from 'vuex'

export default {
  name: 'Entry',
  components: {
    EntryCardGroup
  },
  computed: {
    ...mapGetters([
      'cardTextColor',
      'cardBackgroundVariant'
    ]),
    entry () {
      return this.$store.getters.entry(this.$route.params.id)
    },
    relatedEntryIds () {
      return this.entry.relatedEntries.map(r => r.entryId)
    },
    relatedEntries () {
      return this.$store.getters.entriesByIds(this.relatedEntryIds)
    },
    needsPagination () {
      return this.relatedEntries.length > this.perPage
    },
    formattedPreamble () {
      return this.entry.preamble
        .replace(/\s{3,}/g, 'this is a linebreak')
        .replace(/\n{1,2}/g, ' ')
        .replace(/this is a linebreak/g, '\n\n')
        .replace(/\[\d\]/g, '')
        .replace(/\\\(\\lambda\\\)/g, 'λ')
    }
  },
  data () {
    return {
      currentPage: 1,
      perPage: 5
    }
  }
}
</script>

<style scoped>
  .preamble-text {
    white-space: pre-line;
    text-align: justify;
  }
</style>