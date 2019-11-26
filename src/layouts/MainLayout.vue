<template>
  <div>
    <Loader v-if="loading" :class="'app-loader-fullscreen'"/>
    <div class="app-main-layout" v-else>

      <Navbar
        @click="isOpen = !isOpen"
      />

      <Sidebar
        v-model="isOpen"
        :key="locale"
      />

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div
        v-tooltip="createRecord"
        class="fixed-action-btn"
      >
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue';
import messages from '@/utils/messages';
import localize from '@/filters/localize.filter';

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
    }

    this.loading = false;
  },
  components: {
    Navbar, Sidebar,
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    },
    createRecord() {
      return localize('Record');
    },
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || localize('MsgSomethingWrong'));
    },
  },
};
</script>
