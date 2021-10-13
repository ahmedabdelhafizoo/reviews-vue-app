<template>
  <div id="app">
    <AppHeader />
    <Reviews />
  </div>
</template>

<script>
import Reviews from "@/pages/Reviews.vue";
import AppHeader from "@/components/shared/AppHeader.vue";

export default {
  name: "App",
  components: {
    Reviews,
    AppHeader,
  },
  created() {
    this.$store.dispatch("loadReviews");
  },
};
</script>
