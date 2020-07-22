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
          <b-button variant="outline-primary" :to="'/category/' + entry.categoryId">
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
            <div v-if="needsMathFormatting" :key="entry.entryId + 'Math'">
              <b-card-text v-katex:auto>{{ formattedPreamble }}</b-card-text>
            </div>
            <div v-else :key="entry.entryId">
              <b-card-text>{{ formattedPreamble }}</b-card-text>
            </div>
            <b-card-text align="left">
              Full entry: <b-link target="_blank" :href="entry.sepUrl">{{ entry.sepUrl }}</b-link>
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
          <EntryCardGroupPaginated
            :per-page="5"
            :entries="relatedEntries">
          </EntryCardGroupPaginated>
        </b-col>
      </b-row>
     </b-container>
  </div>
</template>

<script>
import EntryCardGroupPaginated from '@/components/EntryCardGroupPaginated'
import { mapGetters } from 'vuex'

export default {
  name: 'Entry',
  components: {
    EntryCardGroupPaginated
  },
  computed: {
    ...mapGetters([
      'cardTextColor',
      'cardBackgroundVariant'
    ]),
    entry () {
      return this.$store.getters.entry(this.$route.params.id)
    },
    relatedEntries () {
      return this.$store.getters.entriesByIds(this.entry.relatedEntries)
    },
    formattedPreamble () {
      return this.entry.preamble
        .replace(/\s{4,}/g, 'this is a linebreak')
        .replace(/\s{1,3}/g, ' ')
        .replace(/this is a linebreak/g, '\n\n')
        .replace(/\[\d\]/g, '')
    },
    needsMathFormatting () {
      return this.entry.preamble.includes('(\\')
    }
  }
}
</script>

<style>
.preamble-text {
  white-space: pre-line;
  text-align: justify;
}
.preamble-text > p > span > span.katex-display {
  margin: 0;
}
</style>
