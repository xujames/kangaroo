
<template lang="pug">
  .product-carousel__image-wrapper(@click="playVideo", :class="{ 'u-pointer': hasVideo }")
    icon.product-carousel__play(v-if="hasVideo", name="play", :size="$mq === 'mobile' ? '50px' : '120px'")
    img.product-carousel__image(v-lazy="image.src", :alt="image.alt" draggable="false")
</template>

<script>
  import Icon from 'scripts/components/basic/Icon.vue'

  const VIDEO_PREFIX = 'video:'

  export default {
    name: 'ProductCarouselImage',
    components: { Icon },
    props: {
      image: Object
    },
    computed: {
      hasVideo () {
        return this.image.alt.includes(VIDEO_PREFIX)
      },
      video () {
        return this.hasVideo ? this.image.alt.replace(VIDEO_PREFIX, '') : null
      },
      imageAlt () {
        return this.hasVideo ? 'Play Video' : this.image.alt
      }
    },
    methods: {
      playVideo () {
        if (this.hasVideo) {
          this.$store.dispatch('video/play', this.video)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .product-carousel {
    &__image-wrapper {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
    }

    &__play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      fill: $color-blue;
      z-index: 1;
    }

    &__image {
      position: absolute;
      top: 0;
      left: 0;
      align-self: center;
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }
</style>