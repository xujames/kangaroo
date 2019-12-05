<template lang="pug">
  section.faq-accordions
    .faq-accordions__image
      img(:src="image", alt="Frequently Asked Questions")
    .faq-accordions__questions
      h1.faq-accordions__heading {{ heading }}
      accordion-group(v-if="questions.length")
        accordion(v-for="(block, idx) in questions", :heading="block.question", :key="idx")
          p.faq-accordions__answer {{ block.answer }}


</template>

<script>
  import Accordion from 'scripts/components/basic/Accordion.vue';
  import AccordionGroup from 'scripts/components/basic/AccordionGroup.vue';

  export default {
    name: 'FaqAccordions',
    components: { Accordion, AccordionGroup },
    props: {
      settings: Object
    },
    data() {
      return {
        image: this.settings.image,
        heading: this.settings.heading,
        questions: this.settings.questions
      }
    }
  }
</script>

<style lang="scss" scoped>
  .faq-accordions {
    max-width: 1390px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    margin-bottom: 50px;

    @include tablet-up {
      flex-direction: row;
      padding-right: 15px;
      margin-bottom: 80px;
    }

    &__image {
      flex: 1;

      @include tablet-up {
        height: 500px;
        margin-right: 12px;
      }

      @include desktop-up {
        height: 550px;
        margin-right: 25px;
      }

      > img {
        @include tablet-up {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }

    &__heading {
      text-align: center;
      font-size: rem(24);
      font-weight: 600;
      line-height: rem(32);
      margin-bottom: 20px;

      @include tablet-up {
        text-align: left;
        font-size: rem(50);
        line-height: rem(60);
        margin-top: 30px;
      }
    }

    &__questions {
      flex: 1;
      width: 100%;
      padding-left: 15px;
      padding-right: 15px;

      @include tablet-up {
        margin-left: 12px;
        padding-left: 0;
        padding-right: 0;
      }

      @include desktop-up {
        margin-left: 25px;
      }
    }

    &__answer {
      font-size: rem(12);
      line-height: rem(20);
    }
  }
</style>