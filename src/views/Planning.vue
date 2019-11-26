<template>
  <div>
    <div class="page-title">
      <h3>{{'Planning' | localize}}</h3>
      <h4>{{info.bill | currencyFilter('RUB')}}</h4>
    </div>

    <Loader v-if="loading" />

    <p
      class="center"
      v-else-if="!categories.length"
    >
      {{'CategoriesEmpty' | localize}}. <router-link to="/categories">{{'Add' | localize}}</router-link>
    </p>

    <section v-else>
      <div
        v-for="category of categories"
        :key="category.id"
      >
        <p>
          <strong>{{category.title}}:</strong>
          {{category.spend | currencyFilter}} из {{category.limit | currencyFilter}}
        </p>
        <div
          class="progress"
          v-tooltip="category.tooltip"
        >
          <div
            class="determinate"
            :class="[category.progressColor]"
            :style="{width: category.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import currencyFilter from '@/filters/currency.filter';
import localize from '@/filters/localize.filter';

export default {
  name: 'planning',
  metaInfo() {
    return {
      title: this.$title('Planning'),
    };
  },
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['info']),
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.categories = categories.map((cat) => {
      const spend = records
        .filter(r => r.categoryID === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          let subTotal = total;
          subTotal += +record.amount;
          return subTotal;
        }, 0);

      const percent = 100 * spend / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      let progressColor = 'green';

      if (percent < 60) {
        progressColor = 'green';
      } else if (percent < 100) {
        progressColor = 'yellow';
      } else {
        progressColor = 'red';
      }

      const tooltipValue = cat.limit - spend;
      const tooltip = `${tooltipValue < 0 ? localize('Excess') : localize('Left')} ${currencyFilter(Math.abs(tooltipValue))}`;

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip,
      };
    });

    this.loading = false;
  },
};
</script>
