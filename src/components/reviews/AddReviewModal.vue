<template>
  <div class="modal static-modal d-none" id="add-review-modal">
    <div class="modal__container rounded-lg m-auto px-4" style="width: 700px">
      <div
        class="
          border-bottom
          modal__header
          d-flex
          align-items-center
          justify-content-between
        "
      >
        <h4 class="modal__title">ADD A REVIEW</h4>
        <button class="modal__close-btn" @click="resetForm">&times;</button>
      </div>
      <div class="modal-body py-3">
        <form class="form" @submit.prevent="addReview">
          <div class="mb-3">
            <label class="form__label">Rating</label>
            <RatingStars
              @updateRating="updateRating"
              :ratingValue="rate"
              :viewOnly="false"
              id="rate"
            />
          </div>

          <div class="mb-3">
            <label class="form__label">Review Title</label>
            <input
              type="text"
              class="form__input"
              v-model="title"
              @input="errorFeedback = false"
            />
          </div>

          <div class="mb-3">
            <label class="form__label">Review Details</label>
            <textarea
              type="text"
              class="form__input"
              v-model="details"
              rows="4"
              @input="errorFeedback = false"
            ></textarea>
          </div>
          <p class="text-danger mt-n3 mb-2" v-if="errorFeedback">
            Please fill all fields first !
          </p>
          <div class="text-right border-top pt-3">
            <button class="btn btn--green">add review</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import RatingStars from "../shared/RatingStars.vue";
export default {
  components: { RatingStars },
  name: "AddReviewModal",
  data() {
    return {
      title: "",
      rate: 1,
      details: "",
      errorFeedback: null,
    };
  },
  methods: {
    updateRating(rate) {
      this.errorFeedback = false;
      this.rate = rate;
    },
    resetForm() {
      this.rate = 1;
      this.title = this.details = this.errorFeedback = "";
    },
    addReview() {
      this.errorFeedback = false;
      if (this.rate && this.title.trim() && this.details.trim()) {
        let review = {
          rate: this.rate,
          title: this.title,
          details: this.details,
        };
        this.$store
          .dispatch("addReview", review)
          .then(() => {
            this.resetForm();
            this.$modal.hideModal(document.getElementById("add-review-modal"));
          })
          .catch(() => {});
      } else {
        this.errorFeedback = true;
      }
    },
  },
};
</script>
