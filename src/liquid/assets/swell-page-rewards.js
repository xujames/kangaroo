$(window).on('load' , ()=>{
	(()=>{
		$(document).ready(()=>{
			$(document).on("swell:initialized" , ()=>{
				console.log("swell:initialized");
				new campaign(spapi.activeCampaigns).renderCampaigns();
				new redeem(spapi.activeRedemptionOptions).renderRedeemptionOption();
			});
			$(document).on("swell:setup",()=>{
			console.log("swell:setup");
			if(swellAPI.getCustomerDetails().created_at===undefined)
			{
				new howItWorks(difinition.howItWork).renderOption();
			}
			new vipTier(swellAPI.getVipTiers(),difinition.vipTierBenefits,difinition.baseTier,swellAPI.getCustomerDetails()).renderVipTier()
			});
		});
	}).call(this);
})