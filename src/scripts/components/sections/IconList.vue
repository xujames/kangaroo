
<template lang="pug">
  .icon-list
    h3.icon-list__title {{ title }}
    p.icon-list__desc {{ desc }}

    .icon-list__steps
      .icon-list__step(v-for="step in steps" :key="step.title")
        img(:src="step.img_url" :alt="step.img_alt")
        h4.icon-list__step__title {{ step.title }}
        p.icon-list__step__desc {{ step.desc }}
    carousel.icon-list__carousel(dots)
      slide.icon-list__step(v-for="(step, index) in steps" :key="step.title")
        img.icon-list__step__img(:src="step.img_url" :alt="step.img_alt")
        
        h4.icon-list__step__title 
          span.step(v-if="$mq === 'mobile'") Step {{ index + 1 }}: 
          | {{ step.title }}
        
        p.icon-list__step__desc {{ step.desc }}
</template>

<script>
  import Carousel from 'scripts/components/basic/Carousel.vue'
  import Slide from 'scripts/components/basic/Slide.vue'

  export default {
    name: 'IconList',
    components: { Carousel, Slide },
    props: {
      title: String,
      desc: String,
      steps: Array
    },
    computed: {
      ctaIsAccent () {
        return this.cta_type.includes('accent')
      },
      ctaIsOutline () {
        return this.cta_type.includes('outline')
      },
      ctaIsSecondary () {
        return this.cta_type.includes('secondary')
      },
      ctaIsText () {
        return this.cta_type.includes('text')
      }
    }
  }
</script>

<style lang="scss">
.icon-list {
  text-align: center;
  padding: 0 $grid-gutter;
  margin: 80px 0;

  &__title {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 20px;
    line-height: 40px;
    font-weight: bold;

    @include tablet-up {
      font-size: 32px;
    }
  }

  &__desc {
    font-size: 14px;
    line-height: 20px;
    max-width: 840px;
    margin: 0 auto;
    margin-bottom: 32px;

    @include tablet-up {
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 48px;
    }
  }

  &__steps {
    display: none;
    max-width: 1150px;
    margin: 0 auto;

    @include tablet-up {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }

  &__carousel {
    @include tablet-up {
      display: none;
    }
  }

  &__step {
    max-width: 352px;

    &.slide {
      display: inline-block;
    }

    &__img {
      height: 120px;
    }

    &__title {
      margin: 19px 0 8px 0;
      font-size: 18px;
      line-height: 40px;
      font-weight: bold;
    }

    &__desc {
      font-size: 16px;
      line-height: 22px;
      padding-bottom: 20px;
    }

    @include tablet-up {
      &__title {
        font-size: 20px;
        line-height: 32px;
      }

      &__desc {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }

  &__cta {
    min-width: 220px;
  }
}
</style>