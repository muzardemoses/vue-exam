<template>
  <div class="bg-gray-50 py-24 pt-60 px-28 md:px-4  min-h-screen sm:pt-52">
    <div class="pb-10 sm:pb-1">
      <h1 class="text-lg font-semibold mb-4 flex gap-2 sm:text-base sm:font-medium sm:gap-1">
        <router-link to="/products">All Products</router-link> /
        <span class="text-lg font-semibold capitalize sm:text-base sm:font-medium">
            Category
          </span
        > /
        <span class="text-purple-600 capitalize">
          {{ $route.params.categoryName }}</span
        >
      </h1>
      <div class="flex justify-between items-center w-full mb-6 ">
        <h1 class="text-2xl font-semibold mb-4 capitalize sm:text-lg sm:mb-3">
           {{ $route.params.categoryName }}
        </h1>
        <p
        class="sm:text-xs sm:mb-3"
        >
          {{
            categorySearchResults && categorySearchResults.length > 0
              ? categorySearchResults.length + " results found"
              : ""
          }}
        </p>
      </div>
    </div>
    <div v-if="categorySearchResults && categorySearchResults.length > 0">
      <ul
        class="text-2xl font-extrabold grid grid-cols-3 grid-flow-row gap-10 justify-around justify-items-center gap-y-20 w-8/12 mx-auto xl:w-full lg:grid-cols-2 sm:grid-cols-1"
      >
        <li
          v-for="product in categorySearchResults"
          :key="product.id"
          class="w-fit self-center"
        >
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
                :title="product.title"
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
                    ).toFixed(2)
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
      </ul>
    </div>
    <div v-else>
      <p>No search results found.</p>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "categorySearch",
  data() {
    return {
      categorySearchResults: null,
    };
  },
  created() {
    this.fetchResults();
  },
  //   watch: {
  //     "$route.query.categoryName": function () {
  //       this.fetchResults();
  //     },
  //   },
  watch: {
    $route(to, from) {
      if (to.params.categoryName !== from.params.categoryName) {
        this.fetchResults();
      }
    },
  },
  methods: {
    fetchResults() {
      const searchCategory = this.$route.params.categoryName;
      fetch(`https://dummyjson.com/products/category/${searchCategory}`)
        .then((res) => res.json())
        .then((json) => {
          this.categorySearchResults = json.products;
          console.log(json.products);
        });
    },
  },
};
</script>

<style scoped></style>
