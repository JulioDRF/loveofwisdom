<template>
  <div id="entry">
    <b-container
      fluid="md"
      class="m-auto"
    >
      <b-row align="center">
        <b-col>
          <h1>{{ entry.entryName }}</h1>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col
          cols="auto"
          style="mr-auto"
        >
          <b-button
            variant="outline-primary"
            :to="'/category/' + entry.categoryId"
          >
            <b-icon-arrow-left />
            {{ entry.categoryName }}
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col
          cols="auto"
          align="left"
        >
          <b-card
            title="Preamble"
            body-class="preamble-text"
            :bg-variant="cardBackgroundVariant"
            :text-variant="cardTextColor"
          >
            <div
              v-if="needsMathFormatting"
              :key="entry.entryId + '-Math'"
            >
              <b-card-text v-katex:auto>
                {{ formattedPreamble }}
              </b-card-text>
            </div>
            <div
              v-else
              :key="entry.entryId"
            >
              <b-card-text>{{ formattedPreamble }}</b-card-text>
            </div>
            <b-card-text align="left">
              Full entry: <b-link
                target="_blank"
                :href="entry.sepUrl"
                rel="noopener"
              >
                {{ entry.sepUrl }}
              </b-link>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
      <b-row
        class="mt-5"
        align="left"
      >
        <b-col cols="auto">
          <h3>Related Entries</h3>
        </b-col>
      </b-row>
      <b-row
        class="mt-2"
        align="left"
      >
        <b-col cols="auto">
          <EntryCardGroupPaginated
            :per-page="5"
            :entries="relatedEntries"
          />
        </b-col>
      </b-row>
      <b-row
        class="mt-5"
        align="left"
      >
        <b-col cols="auto">
          <h3>Archived versions</h3>
        </b-col>
      </b-row>
      <b-row
        class="mt-2"
        align="left"
      >
        <b-col cols="12">
          <ul class="archives-list">
            <li
              v-for="archive in archives"
              :key="archive.url"
            >
              <b-link
                :href="archive.url"
                target="_blank"
                rel="noopener"
              >
                {{ archive.name }}
              </b-link>
            </li>
          </ul>
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
    archives () {
      const seasons = {
        win: 'Winter',
        spr: 'Spring',
        sum: 'Summer',
        fall: 'Fall'
      }
      return this.entry.archiveUrls.map((url) => {
        const dateCode = url.split('/')[4]
        const year = dateCode.slice(-4)
        const season = seasons[dateCode.slice(0, -4)]
        const name = `${season} ${year}`
        return {
          url,
          name
        }
      })
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
.archives-list {
  columns: 130px auto;
}
</style>
