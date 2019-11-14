
<template lang="pug">
  .product-carousel
    carousel(
      ref="productImageCarousel", 
      :slides-to-show="1", 
      :infinite="multipleImages ? true : false",
      :dots="multipleImages && $mq === 'mobile' ? true : false"
      :verticalDots="multipleImages && $mq != 'mobile' ? true : false"
      :thumbnail-images="$mq != 'mobile' ? images : []"
    )
      slide(v-for="(image, index) in images", :key="index")
        product-carousel-image(:image="image")
</template>

<script>
  import IconButton from 'scripts/components/buttons/IconButton.vue'
  import Carousel from 'scripts/components/basic/Carousel.vue'
  import Slide from 'scripts/components/basic/Slide.vue'
  import ProductCarouselImage from 'scripts/components/product/ProductCarouselImage.vue'

  export default {
    name: 'ProductSlider',
    components: { IconButton, Carousel, Slide, ProductCarouselImage },
    props: {
      images: Array
    },
    data() {
      return {
        multipleImages: this.images.length > 1
      }
    }
  }
</script>

<style scoped lang="scss">
  .product-carousel {
    position: relative;
    padding: 0;

    @include mobile-only {
      max-width: 550px;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
