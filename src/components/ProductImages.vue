<template>
  <div class="flex flex-col gap-6 items-center justify-center mb-8 xl:pl-6 sm:pl-0">
    <div class="flex gap-16 items-center">
      <button
        class="w-fit h-fit rounded-full  bg-gray-700 hover:bg-gray-800 transition duration-500 ease-in-out xl:hidden lg:block sm:hidden"
        @click="prevImage"
      >
        <img src="@/assets/chevron-left.png" alt="" class="h-16 w-16 " />
      </button>
      <div class="h400 w500">
        <img
          :src="currentImage"
          alt="Product Image"
          class="h400 w500 rounded-2xl"
        />
      </div>

      <button
        class="w-fit h-fit rounded-full bg-gray-700 hover:bg-gray-800 transition duration-500 ease-in-out xl:hidden lg:block sm:hidden"
        @click="nextImage"
      >
        <img src="@/assets/chevron-right.png" alt="" class="h-16 w-16" />
      </button>
    </div>
    <div class="flex flex-wrap justify-center gap-3 sm:gap-2">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="w-16 h-16 relative transition duration-500 ease-in-out sm:w-14 sm:h-14"
      >
        <img
          :src="image"
          alt="Product Image"
          class="w-full h-full object-contain cursor-pointer rounded-lg transition duration-500 ease-in-out"
          @click="changeImage(index)"
        />
        <div
          class="absolute inset-0 flex items-center justify-center"
          v-if="currentIndex === index"
        >
          <div
            class="w-full h-full bg-black opacity-25 transition-opacity duration-500 ease-in-out rounded-lg"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.h400 {
  height: 380px;
  border-radius: 10px;
}
.w500 {
  width: 400px;
  border-radius: 10px;
}
button {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;

}

@media (max-width: 639px) {
  .h400 {
    height: 300px;
  }
  .w500 {
    width: 300px;
  }
}
</style>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    },
  },
  methods: {
    prevImage() {
      this.currentIndex =
        this.currentIndex === 0
          ? this.images.length - 1
          : this.currentIndex - 1;
    },
    nextImage() {
      this.currentIndex =
        this.currentIndex === this.images.length - 1
          ? 0
          : this.currentIndex + 1;
    },
    changeImage(index) {
      this.currentIndex = index;
    },
  },
};
</script>
