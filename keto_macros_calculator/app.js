$(document).ready(function() {
  // submitting the form
  $("#submitButton").click(function() {
    //getting the data
    var bodyWeight = parseInt($("#bodyweightInput").val());
    var multiplier = getMultiplier();

    //sanitizing
    if (isNaN(bodyWeight)) {
      showError("Please enter numerical values.");
      return;
    }

    //making calculations
    var totalCalories = bodyWeight * multiplier;
    var protein = Math.round((totalCalories * 0.4) / 4);
    var carbs = "< 20";
    var fat = Math.round((totalCalories * 0.6) / 9);

    //setting the targets
    $("#totalCalories").text(`Total calories: ${totalCalories}`);
    $("#protein").text(`${protein} grams`);
    $("#carbs").text(`${carbs} grams`);
    $("#fat").text(`${fat} grams`);

    $("#displayContainer").fadeIn("slow");
    $("html, body").animate(
      { scrollTop: $("#displayContainer").offset().top },
      2000
    );
  });

  //get the multiplier from the multiplier radio input
  function getMultiplier() {
    return parseInt($("input[name=inlineRadioOptions]:checked").val());
  }

  //handling errors
  function showError(message) {
    $("#errorDiv").text(message);
    $("#errorDiv").fadeIn("slow");
    $("html, body").animate({ scrollTop: $("#errorDiv").offset().top }, 2000);
    setTimeout(function() {
      $("#errorDiv").fadeOut("slow");
    }, 2000);
  }
});
