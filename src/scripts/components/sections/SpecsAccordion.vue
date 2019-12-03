<template lang="pug">
  section.specs-accordion
    accordion(:heading="accordionHeading")
      .specs-accordion__content
        slot
</template>

<script>
  import Accordion from 'scripts/components/basic/Accordion.vue'

  export default {
    name: 'SpecsAccordion',
    props: {
      accordionHeading: String
    },
    components: { Accordion }
  }
</script>

<style lang="scss">
  // Custom accordion component styles
  .specs-accordion {
    .accordion {
      border: none !important;
      padding: 0;
    }

    .accordion__header {
      padding-top: 40px;
      padding-bottom: 40px;
      justify-content: center;
      text-transform: none;
      font-size: rem(20);
      line-height: rem(20);
      font-weight: 600;

      @include tablet-up {
        font-size: rem(24);
        line-height: rem(23);
      }

      .icon {
        margin-left: 5px;
      }
    }

    .accordion__content {
      align-items: center;
      margin-left: 16px;
      margin-right: 16px;
    }

    // Styling slotted elements
    &__flex-column {
      @include desktop-up {
        flex: 1;
      }

      &:first-child {
        @include desktop-up {
          margin-right: 48px;
        }
      }

      &:last-child {
        @include desktop-up {
          margin-left: 48px;
        }
      }
    }

    &__block {
      margin-bottom: 24px;

      @include desktop-up {
        margin-bottom: 0;
      }

      &:not(:last-child) {
        @include desktop-up {
          margin-bottom: 32px;
        }
      }

      h2 {
        font-size: rem(20);
        line-height: rem(40);
        font-weight: 600;
        margin-bottom: 8px;
      }

      p {
        font-size: rem(14);
        line-height: rem(20);
        margin: 0;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .specs-accordion {
    display: block;
    padding: 0;
    background-color: $color-seashell-grey;

    &__content {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 1000px;
      padding-bottom: 40px;

      @include desktop-up {
        flex-direction: row;
      }
    }
  }
</style>