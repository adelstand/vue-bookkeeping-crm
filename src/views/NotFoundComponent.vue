<template>
  <div>
    <h3>{{'404' | localize}}</h3>
    <router-link to="/">{{'ToHome' | localize}}</router-link>
  </div>
</template>

<script>
export default {
  name: '404',
  metaInfo() {
    return {
      title: this.$title('404'),
    };
  },
};
</script>
