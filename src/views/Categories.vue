<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CreateCategory @created="addNewCategory" />
        <EditCategory
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateKeys"
          @updated="updateCategories"
        />
        <p v-else class="center">Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import CreateCategory from '../components/CreateCategory.vue';
import EditCategory from '../components/EditCategory.vue';

export default {
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true,
    updateKeys: 0,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  components: {
    CreateCategory, EditCategory,
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
      console.log(this.categories);
    },
    updateCategories(category) {
      const index = this.categories.findIndex(c => c.id === category.id);
      this.categories[index].title = category.title;
      this.categories[index].limit = category.limit;
      this.updateKeys += 1;
    },
  },
};
</script>
