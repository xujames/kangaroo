<template lang="pug">
section.app-features#app-features
  h2.app-features__title {{ title }}
  .app-features__images
    img.app-features__images-icon(v-for="(image, idx) in images" :src="image.src" :alt="image.alt" :key="idx")
  .container
    .row
      .app-feature__wrapper.large-4.column
        .app-feature(v-for="(feature, idx) in leftFeatures" :key="feature.title")
          img.app-feature__icon(:src="feature.icon")
          .app-feature__copy
            .app-feature__copy-title {{ feature.title }}
            .app-feature__copy-description {{ feature.description }}
      .large-4.column
        img.app-feature__image(:src="currentImage" :alt="currentAlt")
      .app-feature__wrapper.large-4.column
        .app-feature(v-for="(feature, idx) in rightFeatures" :key="feature.title")
          img.app-feature__icon(:src="feature.icon")
          .app-feature__copy
            .app-feature__copy-title {{ feature.title }}
            .app-feature__copy-description {{ feature.description }}


</template>

<script>
export default {
  props: {
    title: String,
    images: Array,
    features: Array
  },
  data: function() {
    return {
      currentImage: this.features[0].img.src,
      currentAlt: this.features[0].img.alt
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
  }
}
</script>

<style lang="scss" scoped>
  .app-features {
    background-color: $color-pastel-yellow;
    &__title {
      text-align: center;
      margin: 12px 0;
      padding: 0 $grid-gutter;
      font-weight: bold;
      font-size: rem(24);
      line-height: 32px;

      @include tablet-up {
        font-size: rem(32);
        line-height: 40px;
        margin: 24px 0;
      }
    }
    &__images {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: $grid-gutter * 3;
      &-icon {
        max-height: 40px;
        width: auto;
        &:first-child {
          margin-right: $grid-gutter;
        }
      }
    }
  }
  .app-feature {
    display: flex;
    align-items: center;
    &_wrapper {
      display: flex;
      justify-content: space-between;
    }
    &__image {
      display: block;
      max-width: 100%;
      max-height: 500px;
      margin: auto;
    }

  }
</style>