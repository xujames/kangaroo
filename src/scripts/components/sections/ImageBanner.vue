<template lang="pug">
  section.image-banner(:style="backgroundImage")
    .image-banner__content
      h1.image-banner__heading {{ heading }}
      h2.image-banner__subheading {{ subheading }}
      link-button(:label="btnText", :href="btnUrl" secondary)
</template>

<script>
  import LinkButton from 'scripts/components/buttons/LinkButton.vue'

  export default {
    name: 'ImageBanner',
    components: { LinkButton },
    props: {
      settings: Object
    },
    data() {
      return {
        heading: this.settings.heading,
        subheading: this.settings.subheading,
        btnText: this.settings.btnText,
        btnUrl: this.settings.btnUrl,
        desktopImage: this.settings.desktopImage,
        mobileImage: this.settings.mobileImage
      }
    },
    computed: {
      backgroundImage() {
        return {
          'background-image': `url(${this.$mq === 'mobile' ? this.mobileImage : this.desktopImage})`
        }
      }
    }
  }
</script>

<style lang="scss">
  .image-banner {
    // Styling button
    .button {
      text-decoration: none;
      border-radius: 2px;
      min-width: 60%;
    }
  }
</style>

<style lang="scss" scoped>
  .image-banner {
    max-width: 1390px;
    padding: 40px 15px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    min-height: 570px;
    background-position: center;
    background-size: cover;

    @include tablet-up {
      min-height: unset;
      padding: 96px 48px;
      margin-top: 80px;
      margin-bottom: 30px;
      background-position: left;
    }

    @include desktop-up {
      padding: 124px 106px;
    }

    &__content {
      text-align: center;
      margin-top: auto;

      @include tablet-up {
        margin-top: 0;
        text-align: left;
        max-width: 500px;
        margin-left: auto;
      }

      @include desktop-up {
        max-width: 585px;
      }
    }

    &__heading {
      font-size: rem(24);
      line-height: rem(32);
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 10px;
      color: $color-white;

      @include desktop-up {
        font-size: rem(42);
        line-height: rem(52);
        margin-bottom: 18px;
      }
    }

    &__subheading {
      font-size: rem(20);
      line-height: rem(24);
      font-weight: 600;
      margin-top: 10px;
      margin-bottom: 20px;
      color: $color--secondary;

      @include desktop-up {
        font-size: rem(32);
        line-height: rem(32);
        margin-top: 18px;
        margin-bottom: 28px;
      }
    }
  }
</style>