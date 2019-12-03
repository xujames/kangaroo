<template lang="pug">
  section.highlights-slider
    carousel(
      ref="cameraHighlightsSlider",
      v-if="slides.length",
      :slides-to-show="$mq === 'mobile' || $mq === 'tablet' ? 1 : 1.5",
      :labels="labels"
      :center-mode="true"
    )
      slide(v-for="(slide, index) in slides", :key="index")
        .highlights-slider__slide
          .highlights-slider__slide-text
            h2.highlights-slider__slide-heading {{ slide.heading }}
            p.highlights-slider__slide-subheading {{ slide.subheading }}
          img.highlights-slider__slide-image(:src="slide.image" draggable="false")
</template>

<script>
import Carousel from 'scripts/components/basic/Carousel.vue'
import Slide from 'scripts/components/basic/Slide.vue'

export default {
  name: "HighlightsSlider",
  components: { Carousel, Slide },
  props: {
    slides: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    labels() {
      return this.slides.map(slide => slide.label);
    }
  }
}
</script>

<style lang="scss" scoped>
  .highlights-slider {
    display: block;
    padding: 0 15px;
    text-align: center;

    @include desktop-up {
      padding: 0;
    }

    &__slide {
      display: flex;
      flex-direction: column;

      @include desktop-up {
        padding-left: 48px;
        padding-right: 48px;
      }

      &-text {
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 24px;
        padding-left: 50px;
        padding-right: 50px;

        @include desktop-up {
          padding-right: 0;
          padding-left: 0;
          margin-bottom: 40px;
        }
      }

      &-heading {
        font-size: rem(20);
        line-height: rem(32);
        font-weight: 600;

        @include desktop-up {
          font-size: rem(24);
          line-height: rem(40);
        }
      }

      &-subheading {
        font-size: rem(12);
        line-height: rem(20);

        @include desktop-up {
          font-size: rem(16);
        }
      }

      &-image {
        margin-top: auto;
      }
    }
  }
</style>