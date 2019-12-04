const refer1=new refer(difinition.refferalForm,difinition.shareLinks)
$(window).on('load' , ()=>{
	(()=>{
		$(document).ready(()=>{
			$(document).on("swell:initialized" , ()=>{
				console.log("swell:initialized");
				refer1.createReferForm();
			});
			$(document).on("swell:setup",()=>{
				refer1.showForm(swellAPI.getCustomerDetails());
				if (swellAPI.getCustomerDetails().referrals.length)
				 {
					refer1.renderHistoryRefer(swellAPI.getCustomerDetails().referrals)
				}


			});
		});
	}).call(this);
})