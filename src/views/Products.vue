<template>
  <div class="bg-gray-50 py-24 pt-60 px-28  md:px-4 min-h-screen">
    <ul
      class="text-2xl font-extrabold grid grid-cols-5 grid-flow-row gap-10 justify-items-center items-center gap-y-20 xl:grid-cols-3 lg:grid-cols-2 lg:gap-y-10 sm:grid-cols-1"
    >
      <li v-for="product in products" :key="product.id" class="w-fit pt-20 lg:pt-10">
        <router-link
          :to="{
            name: 'ProductDetails',
            params: {
              id: product.id,
              category: product.category,
              title: product.title.toLowerCase().split(' ').join('-'),
            },
          }"
        >
          <div
            class="flex flex-col w-60 justify-center gap-1 bg-white pb-3 rounded-lg relative hover:shadow-lg transition duration-500 ease-in-out sm:w-72"
          >
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="w-full h-56 rounded-tl-lg rounded-tr-lg"
            />
            <h2 class="text-base font-medium text-left px-3">
              {{
                product.title.length > 19
                  ? product.title.substring(0, 19) + "..."
                  : product.title
              }}
            </h2>
            <p class="text-base font-semi-bold text-left px-3">
              ${{ product.price.toLocaleString() }}
            </p>
            <p class="text-sm text-gray-600 font-normal text-left px-3">
              <del
                >${{
                  (
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2).toLocaleString()
                }}</del
              >
            </p>
            <p
              class="text-sm font-normal bg-green-500 text-white rounded-tl-full rounded-bl-full py-1.5 px-2 w-fit text-left absolute top-4 right-0 inline-block"
            >
              {{ product.discountPercentage }}% off
            </p>
          </div>
        </router-link>
      </li>
      <!-- <h1>{{ products[0] }}</h1> -->
    </ul>
  </div>
</template>

<script>
import useUser from "@/composables/useUser";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Products",
  data() {
    return {
      products: [],
    };
  },

  mounted() {
    fetch("https://dummyjson.com/product")
      .then((response) => response.json())
      .then((json) => {
        this.products = json.products;
      });
  },

  setup() {
    const { user } = useUser();

    return { user };
  },
};
</script>
