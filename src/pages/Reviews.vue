<template>
  <div>
    <Banner headingText="what our users say about shahry ?">
      <button
        class="btn btn--white"
        data-modal="true"
        data-target="add-review-modal"
      >
        add review
      </button>
    </Banner>

    <div class="container reviews" v-if="reviews.length">
      <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
    </div>

    <AddReviewModal />
  </div>
</template>

<script>
import Banner from "@/components/shared/Banner.vue";
import ReviewCard from "@/components/reviews/ReviewCard.vue";
import AddReviewModal from "@/components/reviews/AddReviewModal.vue";

export default {
  name: "Reviews",
  components: {
    Banner,
    ReviewCard,
    AddReviewModal,
  },
  computed: {
    reviews() {
      return this.$store.getters["getReviews"];
    },
  },
};
</script>
