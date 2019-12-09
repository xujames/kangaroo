<template lang="pug">
.storage-plan
  .storage-plan__container.container
    .storage-plan__copy
      h2.storage-plan__title {{ title | unescape }}
      h3.storage-plan__subtitle {{ subtitle | unescape }}
      p.storage-plan__desc {{ desc | unescape }}

    .storage-plan__plan-box(v-for="plan in plans" :key="plan.title")
      img.storage-plan__plan-box__img(:src="plan.img.src" :alt="plan.img.alt")
      .storage-plan__plan-box__info
        h4.storage-plan__plan-box__title {{ plan.title | unescape }} - {{ plan.price }}
          span.storage-plan__plan-box__price / year
        p.storage-plan__plan-box__subtitle {{ plan.subtitle | unescape }}
        ul.storage-plan__plan-box__features
          li.storage-plan__plan-box__feature
            icon(name="checkmark")
            | {{ plan.feature_1 | unescape }}
          li.storage-plan__plan-box__feature {{ plan.feature_2 | unescape }}
          li.storage-plan__plan-box__feature {{ plan.feature_3 | unescape }}
        .storage-plan__plan-box__subcopy(v-if="plan.subcopy" v-html="plan.subcopy")

  p.storage-plan__disclaimer {{ disclaimer | unescape }}
</template>

<script>
import Icon from 'scripts/components/basic/Icon.vue'

export default {
  name: "Storage Plan",
  components: { Icon },
  props: {
    title: {
      type: String,
      default: () => ''
    },
    subtitle: {
      type: String,
      default: () => ''
    },
    desc: {
      type: String,
      default: () => ''
    },
    plans: {
      type: Array,
      default: () => []
    },
    disclaimer: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style lang="scss" scoped>
.storage-plan {
  background-color: $bg--alt-2;
  margin: 0;
  padding: 50px 0 29px 0;

  &__container {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 24px;
    line-height: 32px;
    font-weight: bold;
    margin: 0 0 16px 0;
  }

  &__subtitle {
    font-size: 20px;
    line-height: 32px;
    font-weight: 500;
    color: $color--primary--light;
    margin: 0 0 16px 0;
  }

  &__desc {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 20px;
  }

  &__disclaimer {
    margin: 0 $grid-gutter;
    font-size: 10px;
    line-height: 16px;
    color: $text--subtitle;
  }

  &__copy,
  &__plan-box {
    text-align: center;
  }

  &__plan-box {
    margin: 20px 25px;

    &__img {
      max-height: 126px;
      max-width: unset;
    }

    &__title {
      font-size: 20px;
      font-weight: 500;
      line-height: 20px;
      margin-bottom: 8px;
    }

    &__price {
      font-size: 12px;
      line-height: 13px;
      font-weight: 500;
    }

    &__subtitle {
      font-size: 14px;
      line-height: 20px;
      color: $color--primary--light;
    }

    &__features {
      list-style: none;
      text-align: left;
      margin: 0 auto;
      max-width: 165px;
    }

    &__feature {
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 14px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__subcopy {
      font-size: 12px;
      line-height: 13px;
      font-weight: 500;
      margin-bottom: 25px;
    }

    &__info {
      background-color: $color-white;
      border-top: 2px solid #000;
      padding: 24px 15px 32px 15px;
    }
  }
}
</style>