<template lang="pug">
  button.privacy-shield--toggle(type="button", @click="$emit('privacyShieldToggled')") {{ label }}
    .toggle-indicator(:class="toggleClass")
</template>

<script>
  export default {
    name: 'PrivacyShieldToggle',
    props: {
      label: String,
      toggle: Boolean
    },
    computed: {
      toggleClass() {
        return this.toggle ? 'toggle-on' : 'toggle-off';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .privacy-shield--toggle {
    position: absolute;
    bottom: 42px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-white;
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    padding: 8px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgba(34,31,32,0.05);

    @include tablet-up {
      transform: none;
      bottom: 46px;
      left: 65%;
    }
  }

  .toggle-indicator {
    width: 39px;
    background-color: $color-seashell-grey;
    border-radius: 11px;
    height: 19px;
    box-shadow: inset 0 0 3px 0 rgba(0,0,0,0.04);
    margin-left: 15px;
    position: relative;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      transition: transform 0.2s ease;
    }

    &.toggle-on {
      &::after {
        transform: translateX(20px);
        background-color: $color-orange;
      }
    }

    &.toggle-off {
      &::after {
        background-color: $color-lead;
      }
    }
  }
</style>