  $(document).ready(function () {
      $(document).on("swell:initialized", function () {
          console.log("swell:initialized");
          spapi.activeRedemptionOptions.forEach(option => {
              if (option.discount_type === "fixed_amount") {
                  $(".cart-fixed-amount").append(
                      $("<option>").text(`${option.prettyDiscount} Off for ${option.cost_text}`).attr({
                          "data-redemption-option-id": option.id
                      }).val(option.id).addClass("swell-redemption-link")
                  )
              }
          })
          $(".swell-cart-element input[type=button]").click((e) => {
            console.log("click");
            e.preventDefault();
            $("option:selected").click();
          })
      });
  });