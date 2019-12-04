class refer
{
	constructor(formsRefer,shareLinks)
	{
		this.formsRefer=formsRefer;
		this.shareLinks=shareLinks;
	}
	createReferForm()
	{
		this.renderReferForm(this.formsRefer.newUserForm,this.onNextSubmit);
		this.renderReferForm(this.formsRefer.exictingUserForm,this.onSendSubmit);
	}
	renderReferForm(form,onsubmit)
	{
		$(".refer-form").append(
			$("<form>").addClass(form.formtype).append(
				$("<p>").text(form.text),
				$("<div>").addClass("refer-form-input").append(
				$("<input>",{
					type:"text",
					placeholder:form.placeolder
				}),
				$("<input>",{
					type:"submit",
					value:form.submittext
				}))).addClass("hiddenForm").submit((e)=>onsubmit(e)));
		if(form.formtype=="exicting")
			this.renderShareLinks();
	}
	renderShareLinks()
	{
		$(".exicting").append(
			$("<p>").text("Share your referral link:"),
			$("<div>").addClass("shareLinks"));
			this.shareLinks.forEach(link=>{
				$(".shareLinks").append(
					$("<div>").addClass(link.class).append($("<a>",{href:link.href})
						.append($("<i>",{class:link.icon}))))
			})
			$(".swell-share-referral-sms").addClass("hidden-or-show")
			$(".swell-share-referral-copylink").click(this.copyLinkClicked)
	}
	copyLinkClicked()
	{
		$("body").append(
			$("<div>").addClass("popup-background").append(
			$("<div>").addClass("popup-body").append(
				$("<div>").addClass("popup-close").text("✕").click(()=>{
					$(".popup-background").remove();}),			
				$("<h5>").text(swellAPI.getCustomerDetails().referralLink),
				$("<input>",{type:"button",value:"Copy Link"}).click(()=>{
					navigator.clipboard.writeText(swellAPI.getCustomerDetails().referralLink)}),			
				$("<p>").text("Copy link and share with your friends."))))
	}
	onNextSubmit(e)
	{
		e.preventDefault();
		var userEmail= $(".new input");
		$(".error-email").remove();
		let onSuccess=function()
		{
			$(".new").removeClass("showForm").addClass("hiddenForm");
			$(".exicting").removeClass("hiddenForm").addClass("showForm");
		}
		let onError=function()
		{
			$(".refer-form-input").append(
				$("<p>").text("Invalid email address").addClass("error-email"))
		}
		swellAPI.identifyReferrer(userEmail.val(),onSuccess,onError);
	}
	onSendSubmit(e)
	{
		e.preventDefault();
		var friendsEmail=$(".exicting input");
		var mails=friendsEmail.val().split(",");
				console.log(mails)
		$(".error-email").remove();
		let onSuccess=function()
		{
			$(".refer-and-history").append(
				$("<div>").addClass("refer-mail-send").append(
					$("<div>").text("✕").addClass("refer-mail-send-close").click(()=>{
						$(".refer-mail-send").remove();
					}),
					$("<h3>").text("Thanks!"),
					$("<h6>").text("A referral email has been successfully sent.")
					))
		}
		let onError=function()
		{
			$(".refer-form-input").append(
				$("<p>").text("Invalid email address").addClass("error-email"))
		}
		 swellAPI.sendReferralEmails(mails,onSuccess,onError)
	}
	showForm(customer)
	{
		if(customer.email!==undefined)
		{
			$(`.${this.formsRefer.exictingUserForm.formtype}`).removeClass("hiddenForm").addClass("showForm");
		}
		else
		{
			$(`.${this.formsRefer.newUserForm.formtype}`).removeClass("hiddenForm").addClass("showForm");
		}
	}
	renderHistoryRefer(referrals)
	{	
		$(".history-refer").removeClass("hidden-history").addClass("show-history")
		$(".image").addClass("img-size-to-history")
		referrals.forEach(refer=>{
			$(".history-refer table tbody").append(
				$("<tr>").append(
					$("<td>").text(refer.email),
					$("<td>").text(`${refer.completedAt!==null ? "Purchased" : "Invited"}`)))
		})
	}
}