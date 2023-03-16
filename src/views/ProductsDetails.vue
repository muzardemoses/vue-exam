<template>
  <div v-if="product" class="bg-gray-50 pt-60  md:px-4 pb-20 sm:pt-48 sm:pb-12">
    <div class="pb-10 px-28 lg:px-12 sm:px-2 sm:pb-3">
      <h1 class="text-lg font-semibold mb-4 flex gap-2 items-center sm:text-sm sm:mb-1">
        <router-link to="/">Home</router-link>
        <img src="@/assets/right-arrow.png" class="w-4 h-4" alt="right-arrow" />
        <router-link
          :to="`/category/${product.category}`"
          class="text-lg font-semibold capitalize sm:text-sm"
        >
          {{ product.category }}
        </router-link>

        <img src="@/assets/right-arrow.png" class="w-4 h-4" alt="" />
        <span class="text-purple-600 capitalize">
          {{ product.title }}
        </span>
      </h1>
      <!-- <h1 class="text-2xl font-semibold mb-4 capitalize">
        {{ product.title }}
      </h1> -->
    </div>
    <div
      class="bg-white py-10 flex justify-center items-center gap-20  rounded-lg lg:flex-col sm:gap-5 "
    >
      <div>
        <ProductImages :images="product.images" />
      </div>
      <div class="text-left flex flex-col gap-3 w500 sm:px-5">
        <h1 class="text-base font-bold uppercase text-sky-500">
          {{ product.brand }}
        </h1>
        <h1 class="text-2xl font-bold capitalize text-gray-900">
          {{ product.title }}
        </h1>
        <h1 class="text-base font-normal text-gray-600 capitalize">
          {{ product.description }}
        </h1>
        <div class="flex">
          <star-rating :rating="product.rating"></star-rating>
          <p class="text-sm font-medium text-gray-600 ml-1">
            ({{ product.rating }})
          </p>
        </div>
        <h1 class="pt-5 flex gap-4 items-center">
          <span class="text-4xl font-bold text-gray-900">
            ${{ product.price.toLocaleString() }}
          </span>
          <span
            class="text-sm font-normal bg-green-500 text-white py-1.5 px-2 rounded-lg"
          >
            {{ product.discountPercentage }} % off
          </span>
        </h1>
        <span class="text-lg font-medium text-gray-400 line-through">
          ${{
            (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
          }}
        </span>        
        <!-- <div class="flex gap-4 items-center pt-10">
          <button
            class="bg-yellow-400 text-white py-2 px-4 w-60 rounded-lg font-medium hover:bg-yellow-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md flex items-center gap-2 justify-center"
          >
            <img
              src="@/assets/cart.png"
              alt="cart"
              class="h-7 w-7 transition duration-500 ease-in-out"
            />
            Add to Cart
          </button>
          <button
            class="bg-yellow-600 text-white py-2 px-4 w-60 rounded-lg font-medium ml-4 hover:bg-yellow-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-600 shadow-md"
          >
            Buy Now
          </button>
        </div> -->
        <CartAndBuyButtons :product="product" />
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import ProductImages from "@/components/ProductImages.vue";
import StarRating from "@/components/StarRating.vue";
import useUser from "@/composables/useUser";
import CartAndBuyButtons from "@/components/CartAndBuyButtons.vue";

export default {
  name: "ProductDetails",
  components: {
    ProductImages,
    StarRating,
    CartAndBuyButtons,
  },
  data() {
    return {
      product: null,
    };
  },

  created() {
    if (this.$route.params.id) {
      fetch(`https://dummyjson.com/products/${this.$route.params.id}`)
        .then((response) => response.json())
        .then((json) => {
          this.product = json;
        });
    }
  },

  setup() {
    const { user } = useUser();

    return { user };
  },
};
</script>

<style scoped>
.star-rating span::before {
  content: "\f005";
  font-family: fontawesome;
  font-weight: 900;
  margin-right: 5px;
}
.star-rating span.half::before {
  content: "\f089";
}

.w500 {
  width: 500px;
}

@media (max-width: 639px) {
  .w500 {
    width: 100%;
  }
}
</style>
