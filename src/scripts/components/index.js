import Icon from "scripts/components/basic/Icon.vue";
import Modal from "scripts/components/basic/Modal.vue";
import Tab from "scripts/components/basic/Tab.vue";
import Tabs from "scripts/components/basic/Tabs.vue";
import Accordion from "scripts/components/basic/Accordion.vue";
import AccordionGroup from "scripts/components/basic/AccordionGroup.vue";
import Toast from "scripts/components/basic/Toast.vue";
import Carousel from "scripts/components/basic/Carousel.vue";
import Slide from "scripts/components/basic/Slide.vue";
import Hero from "scripts/components/basic/Hero.vue";

import IconButton from "scripts/components/buttons/IconButton.vue";
import IconLink from "scripts/components/buttons/IconLink.vue";
import PrimaryButton from "scripts/components/buttons/PrimaryButton.vue";
import SubmitButton from "scripts/components/buttons/SubmitButton.vue";
import LinkButton from "scripts/components/buttons/LinkButton.vue";

import VideoCarousel from "scripts/components/video/VideoCarousel.vue";
import VideoModal from "scripts/components/video/VideoModal.vue";

import ProductDisplay from "scripts/components/product/ProductDisplay.vue";

/**
 * Deferred components
 * 
 * These components will only load if they are rendered by markup. Use
 * for components that don't load on every page.
 * 
 * i.e. below the fold components, landing page components, etc.
 */
// const AsyncComponent = () => import('scripts/components/category/AsyncComponent.vue')

export default {
  Icon,
  Modal,
  Tab,
  Tabs,
  Accordion,
  AccordionGroup,
  Toast,
  Carousel,
  Slide,
  Hero,
  IconButton,
  IconLink,
  PrimaryButton,
  SubmitButton,
  LinkButton,
  VideoCarousel,
  VideoModal,
  ProductDisplay
};