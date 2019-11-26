<template>
  <div>
    <div class="page-title">
      <h3>{{"ProfileTitle" | localize}}</h3>
    </div>

    <form
      @submit.prevent="submitHandler"
      class="form"
    >
      <div class="input-field">
        <input
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
          id="description"
          type="text"
        />
        <label for="description">{{'Name' | localize}}</label>
        <span
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >{{'Message_EnterName' | localize}}</span>
      </div>

      <div class="switch">
        <label>
          English
          <input
            v-model="isRuLocale"
            type="checkbox">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Button_Update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'profile',
  metaInfo() {
    return {
      title: this.$title('ProfileTitle'),
    };
  },
  data: () => ({
    name: '',
    isRuLocale: true,
  }),
  validations: {
    name: { required },
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US',
        });
      } catch (e) {

      }
    },
  },
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === 'ru-RU' ? true : false;
    setTimeout(() => {
      window.M.updateTextFields();
    }, 0);
  },
  computed: {
    ...mapGetters(['info']),
  },
};
</script>

<style scoped>
  .switch {
    margin: 15px 0;
  }
</style>
