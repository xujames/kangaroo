
<template lang="pug">
  fieldset.option-select.option-select--buttons
    legend.option-select__legend.u-sr-only(v-if="label")
      span.option-select__legend--title {{ label }}
      span.option-select__legend--selection(v-if="label === 'Color'") {{ value }}

    label.option-select__label(v-for="option in optionSet" tabindex="0" :class="{ 'is-selected': option.value === value }") {{ option.price | money }} - {{ option.label }}
      input.u-sr-only(
        type="radio"
        tabindex="-1"
        v-model="currentValue"
        :id="option.label"
        :value="value"
        :disabled="option.disabled"
        :name="option"
        @change.prevent="onChange(option.value)"
      )
      .option-select__label__image-container
        img(v-if="option.img" :src="option.img" :alt="option.label")
      span.option-select__label__disclaimer(v-if="option.disclaimer") {{ option.disclaimer }}
</template>

<script>
  import TextInput from 'scripts/components/forms/TextInput.vue'

  export default {
    name: 'ProductOption',
    props: {
      product: Object,
      label: String,
      value: String,
      option: {
        type: String,
        default: 'option1',  
        validator (val) {
          return ['option1', 'option2', 'option3'].includes(val)
        }
      }
    },
    data () {
      return {
        currentValue: this.value
      }
    },
    mounted () {
      let initialValue = this.value && this.value !== '' ? this.value : this.optionSet[0].value
      this.$emit('input', initialValue)
    },
    computed: {
      optionSet () {
        return [...new Set(this.product.variants.slice().map(variant => {
          return {
            name: variant[this.option],
            price: variant.price,
            img: variant.image.src,
            disclaimer: variant.custom_fields.option_disclaimer
          }
        }))].map(option => ({
          label: option.name,
          value: option.name,
          price: option.price,
          img: option.img,
          disclaimer: option.disclaimer
        }))
      }
    },
    methods: {
      onChange (value) {
        this.$emit('input', value)
      }
    }
  }
</script>

<style scoped lang="scss">
  .option-select {
    border: none;
    padding: 0;

    &__legend {
      margin-bottom: 10px;

      &--title {
        font-size: rem(14); 
        font-weight: 500;
        line-height: 18px;
        margin-right: 8px;
      }

      &--selection {
        font-family: $font-body--main; 
        font-size: rem(11); 
        font-style: italic;
        line-height: 14px;
      }

      &--size-guide-link {
        font-size: rem(12);
        line-height: 16px;
        text-decoration: underline;
      }
    }

    &__label {
      position: relative;
      display: inline-block;
      padding: 11px 10px 9px 10px;
      min-width: 56px;
      width: calc(50% - 8px);
      border: 2px solid transparent;
      border-radius: 4px;
      border-color: $border--input;
      cursor: pointer;
      font-size: 12px;
      float: left;
      line-height: 16px;
      text-align: center;
      box-shadow: 0 2px 4px 0 rgba(34,31,32,0.05);
      transition: 0.3s ease-in-out;
      margin-right: 16px;
      margin-bottom: 24px;
      white-space: nowrap;

      &:nth-child(odd) {
        margin-right: 0;
      }

      &.is-selected {
        border-color: $border--input--selected;
      }

      @include tablet-up {
        font-size: 14px;
        line-height: 20px;
      }

      &__image-container {
        position: relative;
        width: 100%;
        padding-bottom: 70%;

        @include tablet-up {
          padding-bottom: 50%;
        }
      }

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      &__disclaimer {
        position: absolute;
        bottom: -23px;
        left: 0;
        width: 100%;
        font-size: 10px;
        line-height: 14px;
        color: $text--mid;

        @include tablet-up {
          font-size: 12px;
          line-height: 16px;
        }
      }
    }
  }
</style>
