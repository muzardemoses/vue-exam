<template>
  <div>
    <div
      class="bg-gray-900 p-4 flex flex-row px-28 justify-between items-center transition duration-500 ease-in-out"
    >
      <div>
        <router-link to="/">
          <h1 class="text-2xl font-semibold text-sky-100">MuzardeStore</h1>
        </router-link>
      </div>
      <div>
        <ul
          class="flex flex-row justify-between items-center gap-9 font-semibold text-base text-gray-100"
        >
          <!-- <li v-if="!isLoggedIn">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/signup">Sign up</router-link>
        </li> -->
          <li v-if="isLoggedIn">
            <router-link to="/search" class="relative">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                v-model="searchTerm"
                placeholder="Search for products, brands and categories..."
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w400 pl-10 p-2.5 transition duration-500 ease-in-out"
                @keydown.enter="searchProducts"
              />
            </router-link>
          </li>
        </ul>
      </div>
      <div>
        <div class="flex flex-row gap-6 justify-center items-center">
          <div
          class="hover:bg-gray-700 p-3 transition duration-500 ease-in-out  rounded-full cursor-pointer hover:scale-110"
          >
            <img
              src="@/assets/cart.png"
              alt="cart"
              class="h-7 w-7  transition duration-500 ease-in-out"
            />
          </div>

          <div
            class="flex flex-row cursor-pointer items-center gap-2 transition duration-500 ease-in-out"
            @click="toggleDropdown"
          >
            <h2 class="text-2xl font-semibold text-sky-100">
              {{ displayEmail }}
            </h2>
            <img
              v-if="!isLoggedIn"
              src="@/assets/user-two.png"
              alt=""
              class="text-sky-100"
            />
            <p
              v-else
              class="avatar bg-gray-100 text-gray-900 font-bold text-2xl"
            >
              {{ firstLetter }}
            </p>
          </div>
        </div>

        <ul
          class="bg-white text-black rounded-lg shadow-lg min-w-fit max-w-sm absolute right-32 top-24 p-5 w-40 transition duration-500 ease-in-out"
          v-if="dropdown"
        >
          <li
            v-if="isLoggedIn"
            class="text-lg flex flex-col items-center justify-center cursor-pointer gap-1 no-underline w-fit"
          >
            <h4
              class="text-gray-900 font-semibold text-base flex flex-row items-center justify-center cursor-pointer gap-1 no-underline"
            >
              {{ user.email }}
            </h4>
            <button
              class="text-green-500 font-bold text-lg flex flex-row items-center justify-center cursor-pointer gap-1 no-underline hover:text-green-300 hover:translate-x-2 transition duration-500 ease-in-out"
              @click="logout()"
            >
              Log out
            </button>
          </li>
          <ul v-else>
            <li
              class="text-green-500 font-bold text-lg flex flex-row items-center justify-center cursor-pointer gap-1 no-underline hover:text-green-300 hover:translate-x-2 transition duration-500 ease-in-out"
            >
              <router-link to="/login">Login</router-link>
            </li>
            <li
              class="text-green-500 font-bold text-lg flex flex-row items-center justify-center cursor-pointer gap-1 no-underline hover:text-green-300 hover:translate-x-2 transition duration-500 ease-in-out"
            >
              <router-link to="/signup">Signup</router-link>
            </li>
          </ul>
        </ul>
      </div>
    </div>
    <p class="bg-gray-700 h-px"></p>
    <div
      class="bg-gray-900 p-2 flex flex-row justify-between items-center"
      v-if="isLoggedIn"
    >
      <ul class="flex flex-row justify-center items-center w-full gap-1">
        <li v-for="(category, index) in visibleCategories" :key="index">
          <a
            class="block px-3 py-2 hover:bg-gray-700 text-gray-100 cursor-pointer capitalize font-semibold text-base rounded-lg transition duration-500 ease-in-out"
            @click="selectCategory(category)"
          >
            {{ category }}
          </a>
        </li>
        <li>
          <button
            class="block px-3 py-2 hover:bg-gray-700 text-gray-300 cursor-pointer capitalize font-bold text-lg rounded-lg transition duration-500 ease-in-out"
            v-if="categories.length > 7"
            @click="showMore = !showMore"
          >
            {{ showMore ? "Less Categories" : "Other Categories" }}
          </button>
        </li>
      </ul>
    </div>
    <div
      class="bg-gray-100 p-2 flex flex-row justify-between items-center transition duration-500 ease-in-out"
      v-if="isLoggedIn && showMore"
    >
      <ul class="flex flex-row justify-center items-center w-full gap-1">
        <li v-for="(category, index) in hiddenCategories" :key="index">
          <a
            class="block px-3 py-2 hover:bg-gray-400 text-gray-900 cursor-pointer capitalize font-semibold text-base rounded-lg transition duration-500 ease-in-out"
            @click="selectCategory(category)"
          >
            {{ category }}
          </a>
        </li>
      </ul>
    </div>
    <p class="bg-gray-300 h-px"></p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { useRouter } from "vue-router";
import useUser from "@/composables/useUser";
//import DefImg from "@/assets/user-two.png";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  setup() {
    const { user } = useUser();
    const router = useRouter();

    return { user, router };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    ...mapState(["user"]),
    displayEmail() {
      return this.isLoggedIn ? "" : "Sign In";
    },
    firstLetter() {
      if (this.user && this.user.email) {
        return this.user.email.charAt(0).toUpperCase();
      } else {
        return "";
      }
    },
    visibleCategories() {
      return this.categories.slice(0, 10);
    },
    hiddenCategories() {
      return this.categories.slice(10);
    },
  },
  data() {
    return {
      dropdown: false,
      searchTerm: "",
      searchResults: [],
      categories: [
        "smartphones",
        "laptops",
        "fragrances",
        "skincare",
        "groceries",
        "home-decoration",
        "furniture",
        "tops",
        "womens-dresses",
        "womens-shoes",
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "womens-watches",
        "womens-bags",
        "womens-jewellery",
        "sunglasses",
        "automotive",
        "motorcycle",
        "lighting",
      ],
      showMore: false,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout", { router: this.router }).then(() => {
        this.$router.push("/login");
      });
    },
    toggleDropdown() {
      this.dropdown = !this.dropdown;
    },
    searchProducts() {
      const searchTerm = this.searchTerm.trim();

      // Check if search term is a category
      const category = this.categories.find(
        (cat) => cat.toLowerCase() === searchTerm.toLowerCase()
      );

      if (category) {
        this.$router.push({
          name: "CategorySearch",
          params: { categoryName: category },
        });
      } else {
        this.$router.push({
          name: "search",
          query: { q: searchTerm },
        });
      }
      console.log(category);
    },
    selectCategory(category) {
      this.searchQuery = category;
      // Navigate to the selected category page using Vue router
      this.$router.push({
        name: "CategorySearch",
        params: { categoryName: category },
      });
      //window.location.reload();
      this.search();
    },

    // searchProducts() {
    //   fetch(`https://dummyjson.com/products/search?q=${this.searchQuery}`)
    //     .then((res) => res.json())
    //     .then((json) => {
    //       this.searchResults = json.products;
    //     });
    // },
  },
};
</script>

<style scoped>
h1 {
  /* font-family: "Pacifico", cursive; */
  /* font-family: "Tilt Prism", cursive; */
  font-family: "Bungee Shade", "Tilt Prism", cursive;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
}

.w400 {
  width: 600px;
}
</style>
