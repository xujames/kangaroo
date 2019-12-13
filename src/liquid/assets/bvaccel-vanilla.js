function PrivacyShield($el) {
  this.$el = $el;
  this.toggle = true;
  this.init();
}

PrivacyShield.prototype.init = function () {
  this.cacheSelectors();
  this.bindEvents();
};

PrivacyShield.prototype.cacheSelectors = function () {
  this.$imageOff = $(".privacy-shield__image--off");
  this.$toggleIndicator = this.$el.find(".toggle-indicator");
  this.$toggleBtn = this.$el.find(".privacy-shield--toggle");
};

PrivacyShield.prototype.bindEvents = function () {
  this.$toggleBtn.click(this.handlePrivacyShieldToggle.bind(this))
};

PrivacyShield.prototype.handlePrivacyShieldToggle = function () {
  this.toggle = !this.toggle;
  this.$toggleIndicator.toggleClass('toggle-off').toggleClass('toggle-on');
  this.toggle ? this.$imageOff.css('opacity', 1) : this.$imageOff.css('opacity', 0);
};

$(".privacy-shield-container").each(function () {
  new PrivacyShield($(this));
});