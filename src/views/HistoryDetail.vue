<template>
  <div>
    <Loader v-if="loading" />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link exact to="/history" class="breadcrumb">{{'History' | localize}}</router-link>
        <a class="breadcrumb" @click.prevent>{{record.type === 'income' ? 'Доход' : 'Расход'}}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              red: record.type === 'outcome',
              green: record.type === 'income',
            }"
          >
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p>Сумма: {{record.amount | currencyFilter}}</p>
              <p>Категория: {{record.categoryName}}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="center" v-else>
      Запись с id=<strong>{{$route.params.id}}</strong> не найдена
    </p>
  </div>
</template>

<script>
import localize from '../filters/localize.filter';

export default {
  name: 'history-detail',
  metaInfo() {
    return {
      title: this.$title('HistoryDetail'),
    };
  },
  data: () => ({
    record: null,
    loading: true,
  }),
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch('fetchRecordByID', id);
    const category = await this.$store.dispatch('fetchCategoryByID', record.categoryID);

    this.record = {
      ...record,
      categoryName: category.title,
    };

    this.loading = false;
  },
};
</script>
