class vipTier
{
    constructor(tierList,benefits,baseTier,customer){
        this.benefits=benefits;
        this.customer=customer;
        this.tierList=[baseTier ,...tierList];
    }
    renderVipTier()
    {
        var spend;
        this.tierList.forEach((tier,index)=>{
            if(this.tierList.length!=(index+1))
            {
                spend=this.tierList[index+1].swellrequiredAmountSpentCents;
                spend=spend/100-1;
                console.log(spend)
            }   
            
            console.log(index)
            $(".tiers").append(
                $("<div>").addClass(`level l${index+1}`).append(
                    $("<div>").addClass("div-to-current-status"),
                    $("<div>").text(tier.name).addClass("title"),
                    this.tierList.length!=(index+1) ?
                    $("<div>").html(`Spend ${tier.swellrequiredAmountSpent}-$${spend}/ <br class="show-at-leptop"> ${tier.swellrequiredReferralsCompleted}-${this.tierList[index+1].swellrequiredReferralsCompleted-1}<br class="show-at-mobile"> successful referrals`) : $("<div>").html(`Spend ${tier.swellrequiredAmountSpent}+/ <br class="show-at-leptop"> ${tier.swellrequiredReferralsCompleted}+<br class="show-at-mobile"> successful referrals`)
                    ,$("<div>").text(`${tier.pointsMultiplier}x`)))
        })
        this.benefits.forEach(benefit=>{
            $(".benefits").append(
                $("<div>").html(benefit.benefit))
            this.tierList.forEach((tier,index)=>{
                $(`.l${index+1}`).append(
                    $("<div>").text(benefit[`level${index+1}`]))
            })
        })
        this.customerTier();
    }
    customerTier()
    {
        var currentTier=null;
        if(this.customer.created_at!==undefined)
        {
            if(this.customer.vipTier===null){
                currentTier=1;
            }
            else{
                currentTier=this.tierList.map(tier=>tier.name).indexOf(this.customer.vipTier.name)+1;
            } 
            $(".title-to-customer").text(`You are ${this.tierList[currentTier-1].name}`)
        }
        this.renderSlickToMobile(currentTier)
    }    
    renderSlickToMobile(currentTier)
    {
      if(currentTier===null) {
          currentTier=1;
      }
      var newscript = document.createElement('script');
      newscript.type = 'text/javascript';
      newscript.async = true;
      newscript.src = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js';
      (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
          
      setTimeout(function()
      {
         $(".tiers").slick({
           slidesToShow: 3,
           slidesToScroll: 1,
           responsive: [
           {
               breakpoint: 800, 
               settings: 
               {
                initialSlide: currentTier,
                slidesToShow: 1,
                slidesToScroll: 1,
                nextArrow: '<span class="swell-left fa fa-chevron-left"></span>',
                prevArrow: '<span class="swell-right fa fa-chevron-right"></span>',
                }}
               ]});
            }, 300); 
       }
}