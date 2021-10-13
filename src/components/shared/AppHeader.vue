<template>
  <header class="header bg-white">
    <div class="container d-flex align-items-center justify-content-between">
      <a href="#" class="header__logo my-2 mr-4">
        <img src="../../assets/logo.svg" alt="logo image" width="170" />
      </a>

      <a href="#" class="header__user d-flex align-items-center my-2 text-dark">
        <img
          :src="authUser.image"
          alt="user image"
          width="35"
          height="35"
          class="header__user__img rounded-circle mr-2"
        />
        <p class="header__user__name mb-0">{{ authUser.name }}</p>
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  computed: {
    authUser() {
      return this.$store.getters["getAuthUser"];
    },
  },
};
</script>
