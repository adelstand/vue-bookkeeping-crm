<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'AppName' | localize}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          class="validate"
          v-model.trim="email"
          :class="{
            invalid: ($v.email.$dirty && !$v.email.required) ||
                     ($v.email.$dirty && !$v.email.email)
                  }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >Поле Email не должно быть пустым</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >Поле Email заполнено неверно</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          v-model.trim="password"
          :class="{
            invalid: ($v.password.$dirty && !$v.password.required) ||
                     ($v.password.$dirty && !$v.password.minLength)
          }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >Введите пароль</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          Пароль слишком короткий
          ({{password.length}} из {{$v.password.$params.minLength.min}} символов)
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          v-model.trim="name"
          :class="{
            invalid: ($v.name.$dirty && !$v.name.required) ||
                     ($v.name.$dirty && !$v.name.minLength)
          }"
        />
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >Поле Имя должно быть заполнено</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.name.$dirty && !$v.name.minLength"
        >Поле Имя слишком короткое</small>
      </div>
      <div class="input-field">
        <input
          id="bill"
          type="number"
          class="validate"
          v-model.number="bill"
        />
        <label for="bill">Счет</label>
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

      <p>
        <label>
          <input
            type="checkbox"
            v-model="agree"
            :class="{invalid: $v.agree.$dirty && !$v.agree.checked}"
          />
          <span>С правилами согласен</span>
        </label>
      </p>
      <small
        class="helper-text invalid"
        v-if="$v.agree.$dirty && !$v.agree.checked"
      >Согласитесь с правилами</small>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'register',
  metaInfo() {
    return {
      title: this.$title('Register'),
    };
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    bill: 0,
    isRuLocale: true,
    locale: 'ru-RU',
    agree: false,
  }),
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    name: {
      required,
      minLength: minLength(2),
    },
    agree: {
      checked: v => v,
    },
  },
  mounted() {
    window.M.updateTextFields();
  },
  computed: {
    setLocale() {
      this.locale = this.isRuLocale ? 'ru-RU' : 'en-US';
    },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        bill: this.bill,
        locale: this.isRuLocale ? 'ru-RU' : 'en-US',
      };
      try {
        await this.$store.dispatch('register', formData);
        this.$router.push('/');
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
  .switch {
    margin: 15px 0;
  }
</style>
