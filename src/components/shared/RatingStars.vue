<template>
  <div class="rating-box">
    <div class="rating-container" :class="{ 'view-only': viewOnly }">
      <template v-for="(i, index) in 5">
        <template>
          <input
            type="radio"
            v-model="rating"
            :value="5 - index"
            :id="`${id}-star-${5 - index}`"
            :disabled="viewOnly"
            :key="Math.random() * (index + 10)"
          />
          <label
            :for="`${id}-star-${5 - index}`"
            :key="Math.random() * (index + 10)"
          >
            <font-awesome-icon icon="star"
          /></label>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "RatingStars",
  props: {
    ratingValue: {},
    id: {
      required: true,
    },
    viewOnly: {
      default: true,
    },
  },
  data() {
    return {
      rating: this.ratingValue ? this.ratingValue : 0,
    };
  },
  watch: {
    // to handle updating the rate
    rating: function (value) {
      this.$emit("updateRating", value);
    },
    // reset the default value
    ratingValue: function (value) {
      this.rating = value;
    },
  },
};
</script>
