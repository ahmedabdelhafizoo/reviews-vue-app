<template>
  <section
    class="banner text-center text-white"
    :style="`background-image: url(${backGroundUrl})`"
  >
    <div class="container">
      <h1 class="banner__heading text-uppercase mb-5">
        {{ headingText }}
      </h1>
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "Banner",
  props: {
    headingText: {
      type: String,
      required: true,
    },
    backGroundUrl: {
      default:
        "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    },
  },
};
</script>
