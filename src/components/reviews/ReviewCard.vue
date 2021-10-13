<template>
  <section class="card text-center px-3 px-sm-5 pb-4 rounded-lg bg-white">
    <img
      :src="review.user.image"
      alt="user image"
      class="card__img rounded-circle mt-n5"
      width="100"
      height="100"
    />

    <h3 class="card__heading mt-2 mb-0 font-weight-normal">
      {{ review.user.name }}
    </h3>

    <p class="card__date text-muted mb-1">{{ formatDate(review.date) }}</p>

    <h2 class="card__title mb-3">{{ review.title }}</h2>

    <div class="card__rating d-inline-flex align-items-center border-left-0">
      <span
        class="hand-icon px-4 py-1"
        :class="{ 'dis-like': review.rate < 4 }"
      >
        <font-awesome-icon icon="thumbs-up" />
      </span>
      <div class="ml-3">
        <ratingStars :ratingValue="review.rate" :id="review.id" />
      </div>
      <span class="rate-value mx-3">{{ review.rate }}/5</span>
    </div>

    <p class="card__details text-left my-4">
      {{ review.details }}
    </p>

    <div class="card__comments" v-if="review.comments.length">
      <div
        class="card__comment px-4 pt-4"
        v-for="comment in review.comments"
        :key="comment.id"
      >
        <p class="text-left">
          {{ comment.content }}
        </p>
        <img
          :src="comment.user.image"
          alt="user image"
          class="card__img rounded-circle mb-n4"
          width="50"
          height="50"
        />
      </div>
    </div>

    <form
      class="form pt-3"
      v-if="activeReview === review.id"
      :ref="review.id"
      @submit.prevent="addComment"
    >
      <label for="comment" class="form__label">Your Comment</label>
      <textarea
        v-model="comment"
        rows="7"
        class="form__input mb-3"
        id="comment"
        @input="errorFeedback = false"
      ></textarea>
      <small
        class="d-block text-danger text-left mb-3 mt-n3"
        v-if="errorFeedback"
        >This Field Is Required !</small
      >
      <button class="btn btn--green">add comment</button>
    </form>

    <!-- don't show this button if the auth user add comment before -->
    <button
      class="btn btn--green show-form-btn"
      @click="showCommentArea(review.id)"
      v-if="
        activeReview !== review.id &&
        !review.comments.some(
          (comment) => comment.user.id == $store.state.authUser.id
        )
      "
    >
      add comment
    </button>
  </section>
</template>

<script>
import RatingStars from "../shared/RatingStars.vue";
export default {
  components: { RatingStars },
  name: "ReviewCard",
  props: {
    review: {
      required: true,
    },
  },
  data() {
    return {
      comment: "",
      activeReview: "",
      errorFeedback: false,
    };
  },
  methods: {
    showCommentArea(reviewId) {
      this.activeReview = reviewId;
      setTimeout(
        () => this.$refs[reviewId].scrollIntoView({ behavior: "smooth" }),
        0
      );
    },
    addComment() {
      this.errorFeedback = false;
      if (this.comment.trim()) {
        let payload = {
          reviewId: this.activeReview,
          comment: this.comment,
        };
        this.$store.dispatch("addComment", payload);
        this.comment = this.activeReview = "";
      } else {
        this.errorFeedback = true;
      }
    },
    formatDate(value) {
      let date = new Date(value);
      return `${date.toLocaleString("en-US", {
        day: "numeric",
      })} ${date.toLocaleString("en-US", {
        month: "short",
      })} ${date.toLocaleString("en-US", { year: "numeric" })}`;
    },
  },
};
</script>
