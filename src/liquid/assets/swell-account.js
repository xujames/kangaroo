const refer3=new refer(difinition.refferalForm,difinition.shareLinks)
$(window).on('load' , ()=>{
	(()=>{
		$(document).ready(()=>{
			$(document).on("swell:initialized" , ()=>{
				console.log("swell:initialized");
				new campaign(spapi.activeCampaigns).renderCampaigns();
				new redeem(spapi.activeRedemptionOptions).renderRedeemptionOption();
				refer3.createReferForm();
			});
			$(document).on("swell:setup",()=>{
			console.log("swell:setup");
			new vipTier(swellAPI.getVipTiers(),difinition.vipTierBenefits,difinition.baseTier,swellAPI.getCustomerDetails()).renderVipTier();
				refer3.showForm(swellAPI.getCustomerDetails());
				if (swellAPI.getCustomerDetails().referrals.length)
				 {
					refer3.renderHistoryRefer(swellAPI.getCustomerDetails().referrals)
				}
			});
		});
	}).call(this);
})