<template lang="pug">
  .privacy-technology#specs
    h2.privacy-technology__title {{ title }}
    carousel(
      ref="privacyTechCarousel", 
      :slides-to-show="1", 
      :infinite="multipleImages ? true : false",
      :dots="false"
    )
      slide(v-for="(slide, idx) in slides" :key="idx")
        .container
          .row
            img.slide__image.column.large-8(:src="slide.image" :alt="slide.alt")
            .slide__copy-blocks.column.large-3
              .slide__copy-wrapper(v-for="block in slide.content")
                img.slide__copy-icon(:src="block.icon.src")
                .slide__copy-text
                  .slide__copy-title {{ block.title }}
                  .slide__copy-description {{ block.desc }}
    carousel-button.privacy-technology__arrows(
      @backClick="onBackButtonClick",
      @nextClick="onNextButtonClick",
      color="blue"
    )
</template>

<script>
import Carousel from 'scripts/components/basic/Carousel.vue';
import Slide from 'scripts/components/basic/Slide.vue';
import CarouselButton from 'scripts/components/buttons/CarouselButton.vue';

export default {
  name: 'PrivacyTechnologyFeatures',
  components: { Carousel, Slide, CarouselButton },
  data: function() {
    return {
      multipleImages: this.slides.length > 1
    };
  },
  props: {
    title: String,
    slides: Array
  },
  computed: {
    
  },
  methods: {
    onBackButtonClick(){
      this.$refs.privacyTechCarousel.slidePrev()
    },
    onNextButtonClick(){
      this.$refs.privacyTechCarousel.slideNext()
    }
  }
}
</script>

<style lang="scss" scoped>
  .privacy-technology {
    background-color: $color-light-grey;
    padding-bottom: 40px;
    padding-top: 40px;
    @include tablet-up {
      padding-bottom: 30px;
      padding-top: 60px;
    }
    &__title {
      text-align: center;
      margin-bottom: 48px;
      padding: 0 $grid-gutter;
      font-weight: bold;
      font-size: 20px;
      line-height: 40px;
      @include tablet-up {
        font-size: rem(32);
        margin-bottom: 64px;
      }
    }
    &__arrows {
      text-align: center;
    }
    .row {
      justify-content: center;
    }
    .slide {
      &__image {
        flex: 1;
        @include tablet-up {
          max-width: 800px;
          max-height: 528px;
          object-fit: contain;
        }
      }
      &__copy {
        &-wrapper {
          display: flex;
          align-items: flex-start;
          margin: 48px 0;
        }
        &-icon {
          max-width: 40px;
          height: auto;
          margin-right: 18px;
        }
        &-title {
          font-size: 16px;  
          font-weight: bold;  
          line-height: 1;
          margin-bottom: 12px;
        }
        &-description {
          font-size: 16px;  
          line-height: 22px;
        }
      }
    }
  }
</style>