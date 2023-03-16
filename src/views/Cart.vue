<template>
  <div class="bg-white pt-60 px-28 lg:px-8 md:px-4 pb-20 sm:px-1 sm:pt-52">
    <div
      class="bg-gray-50 py-10 px-20 rounded-lg flex flex-col lg:px-6 sm:px-3 sm:py-6"
    >
      <div class="flex justify-between items-center">
        <h2
          class="text-3xl font-bold mb-4 flex gap-2 items-center sm:text-2xl sm:font-semibold"
        >
          Cart
          <Span class="text-gray-500 font-semibold sm:font-medium"
            >({{ totalItems }} items)</Span
          >
        </h2>
        <p class="text-gray-500 font-semibold">Price</p>
      </div>
      <p class="bg-gray-200 h-px mb-5"></p>
      <div class="py-10 sm:py-5">
        <div
          v-for="(item, index) in cartItems"
          :key="item.id"
          class="flex flex-col pb-4 gap-2"
        >
          <div class="flex justify-between">
            <router-link
              :to="{
                name: 'ProductDetails',
                params: {
                  id: item.id,
                  category: item.category,
                  title: item.name.toLowerCase().split(' ').join('-'),
                },
              }"
              class="flex gap-8 sm:gap-2"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="h-32 w-32 rounded-lg sm:h-24 sm:w-24"
              />
              <div class="flex flex-col justify-center gap-1 sm:justify-start">
                <h2
                  class="text-2xl font-medium capitalize text-gray-600 mb-2 sm:text-lg sm:w-36 truncated-name"
                >
                  {{ item.name }}
                </h2>
                <p class="text-sm font-medium text-green-400 capitalize">
                  In Stock: {{ item.stock }}
                </p>
                <p class="text-sm font-medium text-gray-400 sm:text-xs">
                  <img
                    src="@/assets/reload.png"
                    alt="reload"
                    class="h-5 w-5 inline-block"
                  />
                  Free 30-day returns
                </p>
              </div>
            </router-link>
            <div class="flex flex-col justify-center gap-3 sm:gap-2">
              <h3
                class="text-3xl font-semibold capitalize text-right sm:text-xl sm:font-medium"
              >
                ${{ (item.price * item.quantity).toLocaleString() }}
              </h3>
              <div class="flex items-center gap-2 sm:justify-end sm:flex-col">
                <p
                  class="text-base font-semibold text-gray-400 line-through sm:hidden"
                >
                  ${{ item.originalPrice.toLocaleString() }}
                </p>
                <span
                  class="text-sm font-semibold bg-green-500 text-white py-1.5 px-2 rounded-lg sm:text-xs sm:font-medium sm:py-1 sm:px-1.5"
                >
                  save ${{ item.amountSaved.toLocaleString() }}
                </span>
              </div>
              <span
                class="text-lg font-semibold text-gray-400 text-right sm:text-base"
              >
                ${{ item.price.toLocaleString() }} * {{ item.quantity }}
              </span>
            </div>
          </div>
          <div class="flex justify-between items-center pb-5 pt-2">
            <button
              @click="removeItem(index)"
              class="flex gap-2 items-end justify-center hover:opacity-80 p-2 hover:bg-gray-200 rounded-lg transition duration-200 ease-in-out"
            >
              <img
                src="@/assets/delete.png"
                alt="delete"
                class="h-6 w-6 hover:brightness-100"
              />
              <span
                class="text-sm font-medium text-gray-400 hover:text-gray-500 transition duration-200 ease-in-out"
              >
                Remove
              </span>
            </button>
            <div class="flex gap-2 items-center">
              <button
                @click="updateQuantity(index, item.quantity - 1)"
                :disabled="item.quantity <= 1"
                class="bg-yellow-400 text-white py-2 px-4 w-16 rounded-lg font-medium hover:bg-yellow-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md
                disabled:opacity-50 disabled:cursor-not-allowed
                sm:w-14 "
              >
                -
              </button>
              <div
                class="bg-gray-100 text-gray-600 py-2 px-4 w-20 rounded-lg font-medium text-center"
                type="number"
              >
                {{ item.quantity }}
              </div>
              <!-- <input
                type="number"
                v-model.number="item.quantity"
                min="1"
                :max="item.stock"
              /> -->
              <button
                @click="updateQuantity(index, item.quantity + 1)"
                :disabled="item.quantity >= item.stock"
                class="bg-yellow-400 text-white py-2 px-4 w-16 rounded-lg font-medium hover:bg-yellow-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md 
                disabled:opacity-50 disabled:cursor-not-allowed 
                sm:w-14"
              >
                +
              </button>
            </div>
          </div>
          <p class="bg-gray-200 h-px mb-5"></p>
        </div>
        <div class="flex justify-between items-center">
          <p class="text-xl font-medium text-gray-500">
            Subtotal:
            <span class="text-2xl font-semibold text-gray-900">
              ${{ cartTotal.toLocaleString() }}
            </span>
          </p>
          <button
            class="px-2 py-1 border-purple-500 border hover:border-purple-600 rounded-md text-purple-500 hover:text-purple-600 transition duration-300 ease-in-out hover:shadow-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
            @click="checkout"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  //eslint-disable-next-line
  name: "Cart",
  computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    },
    ...mapGetters(["totalItems"]),
    runcatedName() {
      if (this.$vuetify.breakpoint.width <= 640 && this.item.name.length > 10) {
        return this.item.name.substring(0, 10) + "...";
      } else {
        return this.item.name;
      }
    },
  },
  methods: {
    removeItem(index) {
      const item = this.cartItems[index];
      this.$store.dispatch("removeFromCart", item);
      this.$toast.success(`${item.name} removed from cart!`);
    },
    updateQuantity(index, quantity) {
      this.$store.dispatch("updateCartItemQuantity", { index, quantity });
      this.$toast.success(`Quantity updated!`);
    },
    checkout() {
      // TODO: Implement checkout logic
      alert("Checkout not implemented!");
    },
  },
};
</script>

<style scoped>
@media (max-width: 639px) {
  .truncated-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
