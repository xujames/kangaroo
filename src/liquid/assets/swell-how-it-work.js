class howItWorks{
	constructor(option)
	{
		this.option=option;
	}
	renderOption()
	{
		this.option.forEach(option=>{
			$(".how-it-work-option").append(
				$("<div>").addClass("option").append(
					$("<div>").text(option.number).addClass("circle"),
					$("<h5>").text(option.title),
					$("<p>").text(option.explainP1),
					$("<p>").text(option.explainP2)))
		})
	}
}