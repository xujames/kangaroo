<template lang="pug">
  section.container.privacy-shield.privacy-shield--mobile(v-if="$mq === 'mobile'")
    .privacy-shield__image(:style="{ 'background-image': `url(${shieldOnMobile})` }")
      transition(name="fade")
        .privacy-shield__image--off(v-if="!toggle" :style="{ 'background-image': `url(${shieldOffMobile})` }")
      .privacy-shield__badge
        img(:src="badgeImage" alt="Privacy Shield badge")
      privacy-shield-toggle(:label="toggleText", :toggle="toggle", @privacyShieldToggled="handlePrivacyShieldToggle")
    .privacy-shield__content
      h1 {{ heading }}
      p {{ description }}
  section.container.privacy-shield.privacy-shield--desktop(v-else, :style="{ 'background-image': `url(${shieldOnDesktop})` }")
    transition(name="fade")
      .privacy-shield__image--off(v-if="!toggle" :style="{ 'background-image': `url(${shieldOffDesktop})` }")
    .privacy-shield__content
      h1 {{ heading }}
      p {{ description }}
      .privacy-shield__badge
        img(:src="badgeImage" alt="Privacy Shield badge")
    privacy-shield-toggle(:label="toggleText", :toggle="toggle", @privacyShieldToggled="handlePrivacyShieldToggle")
</template>

<script>
  import PrivacyShieldToggle from 'scripts/components/sections/PrivacyShield/PrivacyShieldToggle.vue'

  export default {
    name: 'PrivacyShield',
    components: { PrivacyShieldToggle },
    props: {
      settings: Object
    },
    data() {
      return {
        heading: this.settings.heading,
        description: this.settings.description,
        toggleText: this.settings.toggleText,
        badgeImage: this.settings.badge,
        shieldOnDesktop: this.settings.shieldOnDesktop,
        shieldOffDesktop: this.settings.shieldOffDesktop,
        shieldOnMobile: this.settings.shieldOnMobile,
        shieldOffMobile: this.settings.shieldOffMobile,
        toggle: true
      }
    },
    methods: {
      handlePrivacyShieldToggle() {
        this.toggle = !this.toggle;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .privacy-shield {
    max-width: 1390px;

    &--desktop {
      background-size: cover;
      background-position: center;
      height: 500px;
      position: relative;
      padding: 115px 50px 0;

      @include desktop-up {
        height: 640px;
      }
    }

    &--mobile {
      padding: 0;
    }

    &__badge {
      position: absolute;
      top: 30px;
      right: 30px;
      width: 72px;
      z-index: 1;
      
      @include tablet-up {
        position: unset;
        top: unset;
        right: unset;
        margin-top: 33px;
        width: 89px;
      }
    }

    &__image {
      background-size: cover;
      background-position: center;
      position: relative;
      width: 100vw;
      height: 100vw;

      &--off {
        position: absolute;
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }

    &__content {
      text-align: center;
      max-width: 600px;
      margin-top: 16px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 15px;
      padding-right: 15px;
      z-index: 1;

      @include tablet-up {
        margin-top: 0;
        margin-left: 0;
        margin-right: 0;
        padding-left: 0;
        padding-right: 0;
        text-align: left;
        max-width: 360px;
      }

      @include desktop-up {
        max-width: 530px;
      }

      h1 {
        font-size: rem(20);
        line-height: rem(32);
        font-weight: 600;
        margin-top: 0;
        margin-bottom: 6px;

        @include tablet-up {
          margin-bottom: 18px;
        }

        @include desktop-up {
          font-size: rem(36);
          line-height: rem(44);
          margin-bottom: 26px;
        }
      }

      p {
        font-size: rem(14);
        line-height: rem(20);

        @include desktop-up {
          font-size: rem(16);
          line-height: rem(22);
        }
      }
    }
  }
</style>