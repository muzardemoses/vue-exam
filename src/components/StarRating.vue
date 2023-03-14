<template>
  <div class="star-rating flex items-center flex-row">
    <!-- <span v-for="i in starRating.fullStars" :key="`full-${i}`"> -->
    <svg
      aria-hidden="true"
      class="w-5 h-5 text-yellow-400"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      v-for="i in starRating.fullStars"
      :key="`full-${i}`"
    >
      <path
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      ></path>
    </svg>
    <!-- </span> -->
    <!-- <span v-if="starRating.hasHalfStar"> -->
    <!-- <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="star-half bg-gray-300"
      v-if="starRating.hasHalfStar"
      key="half"
    >
      <path d="M12 16.74L18.18 20l-1.64-7.07L22 9.22l-7.19-.61L12 2v18z" />
    </svg> -->
    <img
      src="@/assets/half-star.png"
      class="star-half w-4 h-4"
      v-if="starRating.hasHalfStar"
      key="half"
      alt="half-star"
    />
    <!-- </span> -->
    <!-- <span v-for="i in starRating.emptyStars" :key="`empty-${i}`" class=""> -->
    <svg
      aria-hidden="true"
      class="w-5 h-5 text-gray-300"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      v-for="i in starRating.emptyStars"
      :key="`empty-${i}`"
    >
      <path
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      ></path>
    </svg>
    <!-- </span> -->
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      required: true,
    },
  },
  computed: {
    starRating() {
      const fullStars = Math.floor(this.rating);
      const hasHalfStar = this.rating - fullStars >= 0.5;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
      return { fullStars, hasHalfStar, emptyStars };
    },
  },
};
</script>

<style scoped>
.star-rating {
  font-size: 0; /* remove whitespace between inline-block elements */
}

.star-half {
  fill: #ffc107;
  margin-right: 2px;
}

.star-rating .far {
  color: #ccc;
}
</style>
