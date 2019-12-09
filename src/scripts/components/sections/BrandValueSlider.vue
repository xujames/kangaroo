<template lang="pug">
  .brand-value-slider(
    v-touch:swipe.left="nextSlide"
    v-touch:swipe.right="prevSlide"
  )
    h2.brand-value-slider__title(v-if="title && $mq === 'mobile'") {{ title }}
    .brand-value-slider__content-container(v-if="$mq != 'mobile'" ref="tab_container")
      h2.brand-value-slider__title(v-if="title && $mq != 'mobile'") {{ title }}
      .brand-value-slider__content-highlight(
        :style="{ height: `${highlightHeight}px`, top: `${highlightTop}px` }"
      )
        .brand-value-slider__content-highlight__timer-bar(:style="{ height: `${timerHeight}%`, transition: `height ${timerLength}s linear` }")
      .brand-value-slider__tab(
        v-for="(sec, idx) in content_sections" 
        ref="tab"
        tabindex="0"
        @focus="currentSlide = idx; autoplay = false"
        :class="{ 'active': currentSlide === idx }"
        :aria-label="`${sec.title}: ${sec.content}`"
        role="figure"
      )
        h3.brand-value-slider__tab__title {{ sec.title | unescape }}
        p.brand-value-slider__tab__content {{ sec.content | unescape }}
    .brand-value-slider__image-container
      transition(name="fade")
        img(:src="currentImage.src" :key="currentImage.src" :alt="currentImage.alt")
    carousel.brand-value-slider__carousel(
      ref="contentSlider"
      v-if="$mq === 'mobile'"
      @change="currentSlide = $event"
      dots
    )
      slide.brand-value-slider__slide(v-for="(sec, idx) in content_sections" :key="`${sec.title}_${idx}`")
        h3.brand-value-slider__slide__title {{ sec.title | unescape }}
        p.brand-value-slider__slide__content {{ sec.content | unescape }}
</template>

<script>
import Carousel from 'scripts/components/basic/Carousel.vue'
import Slide from 'scripts/components/basic/Slide.vue'

export default {
  name: "BrandValueSlider",
  components: { Carousel, Slide },
  data () {
    return {
      currentSlide: 0,
      highlightHeight: 0,
      highlightTop: 0,
      timerHeight: 0,
      timerLength: 0,
      autoplay: true
    }
  },
  props: {
    title: {
      type: String,
      default: () => ''
    },
    content_sections: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.highlightHeight = this.$refs.tab[this.currentSlide].clientHeight
    this.setHightlightTop()
    this.startTimer()
  },
  watch: {
    currentSlide () {
      this.$refs.contentSlider && this.$refs.contentSlider.slideTo(this.currentSlide)
      if (this.$mq != 'mobile') {
        this.highlightHeight = this.$refs.tab[this.currentSlide].clientHeight
        this.setHightlightTop()  
      }
    }
  },
  computed: {
    currentImage () {
      return this.content_sections[this.currentSlide].img
    }
  },
  methods: {
    nextSlide () {
      if (this.currentSlide + 1 <= this.content_sections.length - 1) this.currentSlide++
    },
    prevSlide () {
      if (this.currentSlide - 1 >= 0) this.currentSlide--
    },
    setHightlightTop () {
      let tabTop = this.$refs.tab[this.currentSlide].getBoundingClientRect().top,
          containerTop = this.$refs.tab_container.getBoundingClientRect().top
      
      this.highlightTop = tabTop - containerTop
    },
    startTimer () {
      this.timerLength = 0
      this.timerHeight = 0
      setTimeout(() => {
        this.timerLength = 7
        this.timerHeight = 100
      }, 50)
      this.currentSlide + 1 <= this.content_sections.length - 1 ? this.nextSlide() : this.currentSlide = 0

      this.iteration = setTimeout(() => {
        if (this.autoplay && this.$mq !== 'mobile') {
          this.startTimer()
        } else {
          this.timerLength = 0
          this.timerHeight = 0
        } 
      }, 7000)
    }
  }
}
</script>

<style lang="scss" scoped>
.brand-value-slider {
  margin: 40px auto;
  max-width: 1390px;

  @include tablet-up {
    display: flex;
    padding-left: $grid-gutter;
    margin: 80px auto;
  }

  &__title {
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    text-align: center;
    margin: 0 0 25px 0;

    @include tablet-up {
      text-align: left;
      font-size: 36px;
      line-height: 40px;
      margin: 0;
      padding-right: 95px;
    }
  }

  &__content-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;
    max-width: 40%;
  }

  &__content-highlight {
    position: absolute;
    width: 100%;
    background-color: $color-pastel-yellow-2;
    transition: 0.4s height, 0.4s top;
    z-index: 1;

    &__timer-bar {
      width: 1px;
      background-color: black;
      padding: 0;
      margin: 0;
    }
  }

  &__tab {
    padding: 24px 32px;
    z-index: 1;
    outline: none;
    cursor: pointer;

    &__title {
      font-size: 24px;
      font-weight: bold;
      line-height: 40px;
      opacity: 0.51;
      transition: 0.4s opacity;
    }

    &__content {
      font-size: 14px;
      line-height: 20px;
      opacity: 0;
      transition: 0.4s opacity, 0.4s color;
    }

    &.active {
      .brand-value-slider__tab__title,
      .brand-value-slider__tab__content {
        opacity: 1;
      }
    }
  }

  &__image-container {
    width: 100%;
    padding-bottom: 68%;
    position: relative;

    @include tablet-up {
      padding-bottom: 40%;
      flex-grow: 1;
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__carousel {
    margin-top: 15px;
  }

  &__slide {
    padding: 0 $grid-gutter;
    text-align: center;

    &__title {
      font-size: 20px;
      line-height: 32px;
      font-weight: bold;
      margin: 0 0 12px 0;
    }

    &__content {
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 12px;
    }
  }
}
</style>