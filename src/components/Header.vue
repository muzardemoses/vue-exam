<template>
  <div class="fixed top-0 left-0 w-full z-20 xl:bg-gray-900 pb-10">
    <div
      class="bg-gray-900 p-4 flex flex-row px-28 justify-between items-center transition duration-500 ease-in-out xl:px-20 md:px-6"
    >
      <div class="xl:flex xl:items-center xl:gap-3 xl:z-50">
        <button
          v-if="isLoggedIn"
          class="hamburger hidden xl:block focus:outline-none z-10 xl:mt-2 xl:z-40"
          :class="{ open: isSideMenuOpen }"
          @click="toggleSideMenu"
        >
          <span
            class="harburger-top bg-white transition duration-500 ease-in-out"
          ></span>
          <span
            class="harburger-middle bg-white transition duration-500 ease-in-out"
          ></span>
          <span
            class="harburger-bottom bg-white transition duration-500 ease-in-out"
          ></span>
        </button>
        <router-link to="/">
          <h1
            class="text-2xl font-semibold text-sky-100 xl:z-40 md:text-xl md:font-medium"
            @click="closeSideMenu"
          >
            MuzardeStore
          </h1>
        </router-link>
      </div>
      <div class="xl:hidden">
        <ul
          class="flex flex-row justify-between items-center gap-9 font-semibold text-base text-gray-100"
        >
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
      <div class="relative">
        <div class="flex flex-row gap-6 justify-center items-center md:gap-2">
          <router-link
            v-if="isLoggedIn"
            to="/cart"
            class="p-3 rounded-full transition duration-200 ease-in-out relative hover:shadow-lg hover:shadow-gray-800"
          >
            <img
              src="@/assets/cart.png"
              alt="Cart "
              class="h-10 w-10 transition duration-500 ease-in-out md:h-8 md:w-8"
            />
            <span
              class="text-sm font-bold text-yellow-500 absolute top-1 z- bg-gray-100 px-2 py-1 rounded-full left-1"
            >
              <!-- {{ cartItems.length }} -->
              <span v-if="totalItems > 0">{{ totalItems }}</span>
            </span>
          </router-link>

          <div
            class="flex flex-row cursor-pointer items-center gap-2 transition duration-500 ease-in-out"
            @click="toggleDropdown"
          >
            <h2
              class="text-2xl font-semibold text-sky-100 md:font-medium md:text-xl md:hidden"
            >
              {{ displayEmail }}
            </h2>
            <img
              v-if="!isLoggedIn"
              src="@/assets/user-two.png"
              alt=""
              class="text-sky-100 md:h-8 md:w-8"
            />
            <p
              v-else
              class="avatar bg-gray-100 text-gray-900 font-bold text-2xl md:font-medium md:text-xl"
            >
              {{ firstLetter }}
            </p>
          </div>
        </div>

        <ul
          class="bg-white text-black rounded-lg shadow-lg min-w-fit max-w-sm absolute right-0 top-16 p-5 w-40 transition duration-500 ease-in-out z-10 sm:w-36 sm:p-3 sm:top-14"
          v-if="dropdown"
        >
          <li
            v-if="isLoggedIn"
            class="text-lg flex flex-col items-center justify-center cursor-pointer gap-1 no-underline w-fit"
          >
            <h4
              class="text-gray-900 font-semibold text-base flex flex-row items-center justify-center cursor-pointer gap-1 no-underline sm:text-sm"
            >
              {{ user.email }}
            </h4>
            <button
              class="text-green-500 font-bold text-lg flex flex-row items-center justify-center cursor-pointer gap-1 no-underline hover:text-green-300 hover:translate-x-2 transition duration-500 ease-in-out sm:text-base"
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
    <p class="bg-gray-700 h-px xl:bg-gray-900 xl:h-0 xl:w-2 xl:hidden"></p>
    <div class="hidden xl:block w-full bg-gray-900 xl:border-none">
      <ul
        class="flex flex-row justify-between items-center gap-9 font-semibold text-base text-gray-100 w-full"
      >
        <li v-if="isLoggedIn" class="w-full mx-20 md:mx-6">
          <router-link to="/search" class="relative w-full">
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
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 transition duration-500 ease-in-out"
              @keydown.enter="searchProducts"
            />
          </router-link>
        </li>
      </ul>
    </div>
    <p class="bg-gray-700 h-px xl:bg-gray-900 xl:m-1 xl:hidden"></p>
    <div
      class="bg-gray-900 p-2 flex flex-row justify-between items-center xl:hidden"
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
      class="bg-gray-100 p-2 flex flex-row justify-between items-center transition duration-500 ease-in-out xl:hidden"
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
    <p class="bg-gray-300 h-px xl:hidden"></p>
    <aside :class="{ open: isSideMenuOpen }" v-if="isLoggedIn">
      <div class="hidden xl:block bg-gray-900 w-9/12 pt-24" v-if="isLoggedIn">
        <p class="bg-gray-600 h-px"></p>
        <h2
          class="text-gray-100 font-bold text-2xl text-left ml-8 mt-5 mb-7 md:font-semibold md:text-xl md:mt-4"
          @click="closeSideMenu"
        >
          <router-link to="/products" >
            Products
          </router-link>
        </h2>
        <div class="bg-gray-50 py-6 pl-8 flex flex-col gap-4 menu">
          <h2
            class="text-gray-900 font-bold text-2xl text-left md:font-semibold md:text-xl"
          >
            Categories
          </h2>
          <p class="bg-gray-800 h-1 w-10"></p>
          <ul :key="index" v-for="(category, index) in categories">
            <li @click="selectCategory(category)" class="w-fit capitalize">
              {{ category }}
            </li>
          </ul>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { useRouter } from "vue-router";
import useUser from "@/composables/useUser";
import { mapGetters } from "vuex";
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
    // cartItems() {
    //   return this.$store.state.cartItems;
    // },
    ...mapGetters(["totalItems"]),
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
      isSideMenuOpen: false,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout", { router: this.router }).then(() => {
        this.dropdown = false;
        this.$router.push("/login");
      });
    },
    toggleDropdown() {
       this.isLoggedIn ? (this.dropdown = !this.dropdown) : this.$router.push("/login");
    //   this.dropdown = !this.dropdown;
    },
    toggleSideMenu() {
      this.isSideMenuOpen = !this.isSideMenuOpen;
      document.body.classList.toggle("overflow-hidden");
      document.body.classList.toggle("is-side-menu-open");
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
      if (this.isSideMenuOpen) {
        this.toggleSideMenu();
      }
      // Navigate to the selected category page using Vue router
      this.$router.push({
        name: "CategorySearch",
        params: { categoryName: category },
      });
      //window.location.reload();
      this.search();
    },
    closeSideMenu() {
      this.isSideMenuOpen = false;
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
.hamburger {
  cursor: pointer;
  width: 25px;
  height: 25px;
  transition: all 0.25s;
  position: relative;
}
.harburger-top,
.harburger-middle,
.harburger-bottom {
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 2px;
  transform: translate(0px);
  transition: all 0.5s;
}
.harburger-middle {
  transform: translateY(7px);
}
.harburger-bottom {
  transform: translateY(14px);
}

.open {
  transform: rotate(90deg);
  transform: translateY(0px);
}
.open .harburger-top {
  transform: rotate(45deg) translateY(6px) translate(6px);
}
.open .harburger-middle {
  display: none;
}
.open .harburger-bottom {
  transform: rotate(-45deg) translateY(6px) translate(-6px);
}

aside {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  border: none;
  background-color: rgba(0, 0, 0, 0.4);
  padding-right: 80px;
}

aside.open {
  transform: translateX(0);
}

.menu {
  max-height: 85vh; /* adjust this value to fit your needs */
  overflow-y: auto;
}

body.is-side-menu-open {
  overflow: hidden;
}

@media (max-width: 600px) {
  .avatar {
    width: 35px;
    height: 35px;
    line-height: 35px;
  }
}
</style>
