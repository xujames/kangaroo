
<template lang="pug">
  button.button(
    type="submit", 
    :class="buttonClass", 
    :disabled="isDisabled", 
    @click="$emit('click')"
  )
    icon(v-if="icon", :name="icon", :size="iconSize")
    span {{ label }}
</template>

<script>
  import Icon from 'scripts/components/basic/Icon.vue'
  import PrimaryButton from 'scripts/components/buttons/PrimaryButton.vue'

  export default {
    extends: PrimaryButton,
    components: { Icon },
    name: 'SubmitButton',
  }
</script>

<style scoped lang="scss">
</style>