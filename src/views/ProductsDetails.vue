<template>
  <div
    v-if="product"
    class="bg-gray-50 py-24 px-28 md:py-16 md:px-4 min-h-screen"
  >
    <div class="pb-10">
      <h1 class="text-lg font-semibold mb-4 flex gap-2 items-center">
        <router-link to="/">Home</router-link>
        <img src="@/assets/right-arrow.png" class="w-4 h-4" alt="right-arrow" />
        <router-link
          :to="`/category/${product.category}`"
          class="text-lg font-semibold capitalize"
        >
          {{ product.category }}
        </router-link>

        <img src="@/assets/right-arrow.png" class="w-4 h-4" alt="" />
        <span class="text-purple-600 capitalize"         >
          {{ product.title }}
        </span>
      </h1>
    </div>
    <h1>{{ product.title }}</h1>
    <p>{{ product.description }}</p>
    <p>{{ product.price }}</p>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import useUser from "@/composables/useUser";

export default {
  name: "ProductDetails",
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
