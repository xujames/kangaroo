<template lang="pug">
section.app-features#app-features
  h2.app-features__title {{ title | unescape }}
  .app-features__images
    img.app-features__images-icon(v-for="(image, idx) in images" :src="image.src" :alt="image.alt" :key="idx")
  .container(v-if="$mq === 'desktop' || $mq === 'hd'")
    .row
      .app-feature__wrapper.large-4.column.move-up
        .app-feature(
          v-for="(feature, idx) in leftFeatures"
          :key="feature.title"
          @focus="swapImage(feature.img)"
          tabindex="0"
          :aria-label="`App Feature: ${feature.title}, App Feature Description ${feature.description}`"
          role="figure"
        )
          img.app-feature__icon(:src="feature.icon")
          .app-feature__copy
            .app-feature__copy-title {{ feature.title | unescape }}
            .app-feature__copy-description {{ feature.description | unescape }}
      .large-4.column
        img.app-feature__image(:src="currentImage" :alt="currentAlt")
      .app-feature__wrapper.large-4.column.move-up
        .app-feature(
          v-for="(feature, idx) in rightFeatures"
          :key="feature.title"
          @focus="swapImage(feature.img)"
          tabindex="0"
          :aria-label="`App Feature: ${feature.title}, App Feature Description ${feature.description}`"
          role="figure"
        )
          img.app-feature__icon(:src="feature.icon")
          .app-feature__copy
            h4.app-feature__copy-title {{ feature.title | unescape }}
            p.app-feature__copy-description {{ feature.description | unescape }}
  .container.slick-container(v-else)
    carousel(
      ref="appFeaturesCarousel", 
      :slides-to-show="1", 
      :infinite="multipleImages ? true : false",
      :dots="multipleImages ? true : false"
    )
      slide(v-for="(feature, idx) in features" :key="idx")
        img.feature-slide__image(:src="feature.img.src" :alt="feature.img.alt")
        img.feature-slide__icon(:src="feature.icon")
        .feature-slide__copy
          .app-feature__copy-title {{ feature.title }}
          .app-feature__copy-description {{ feature.description }}
</template>

<script>
import Carousel from 'scripts/components/basic/Carousel.vue';
import Slide from 'scripts/components/basic/Slide.vue';

export default {
  name: 'AppFeatures',
  components: { Carousel, Slide },
  props: {
    title: String,
    images: Array,
    features: Array
  },
  data: function() {
    return {
      currentImage: this.features[0].img.src,
      currentAlt: this.features[0].img.alt,
      multipleImages: this.features.length > 1
    };
  },
  computed: {
    leftFeatures () {
      return this.features.filter((feature) => {
        return feature.index % 2 != 0;
      });
    },
    rightFeatures() {
      return this.features.filter((feature) => {
        return feature.index % 2 === 0;
      });
    }
  },
  methods: {
    swapImage(img) {
      if (img.src.length > 0) {
        this.currentImage = img.src;
        this.currentAlt = img.alt;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-features {
    background-color: $color-pastel-yellow;
    .container {
      max-width: 300px;
      margin: auto;
      @include tablet-up {
        max-width: 100%;
        margin: 0;
      }
    }
    &__title {
      text-align: center;
      margin: 12px 0;
      padding: 0 $grid-gutter;
      font-weight: bold;
      font-size: 20px;
      line-height: 40px;
      @include tablet-up {
        font-size: rem(32);
        margin: 24px 0;
      }
    }
    &__images {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: $grid-gutter * 2;
      @include tablet-up {
         margin-bottom: $grid-gutter * 3;
      }
      &-icon {
        max-height: 34px;
        width: auto;
        @include tablet-up {
           max-height: 40px;
        }
        &:first-child {
          margin-right: $grid-gutter;
        }
      }
    }
  }
  .app-feature {
    display: flex;
    align-items: start;
    padding: 24px;
    cursor: pointer;
    margin: 24px 0;
    transition: box-shadow .12s ease-in-out;
    &:hover,
    &:focus {
      box-shadow: 0 2px 4px 0 rgba(34,31,32,0.25);
      outline: none;
      .app-feature__copy-description {
        opacity: 1;
      }
    }
    &__wrapper.move-up {
      position: relative;
      top: -48px;
    }
    &__icon {
      max-width: 75px;
      height: auto;
      margin: 0 24px 0 auto;
    }
    &__copy {
      &-title {
        font-size: 20px;
        line-height: 1;
        font-weight: 700;
        padding-bottom: 12px;
      }
      &-description {
        font-size: 14px;
        line-height: 20px;
        opacity: 0;
        transition: opacity .12s ease-in-out;
      }
    }
    &__image {
      display: block;
      max-width: 100%;
      max-height: 500px;
      margin: auto;

    }

  }
  .feature-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    &__image {
      width: 60%;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 24px;
      @include tablet-up {
        max-height: 300px;
        width: auto;
      }
    }
    &__icon {
      width: 75px;
      margin: 0 auto;

    }
    &__copy { 
      margin: 12px 0;
      text-align: center;
      .app-feature__copy-description {
        opacity: 1;
      }
    }
  }
</style>