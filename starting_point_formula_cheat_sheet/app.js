var CARB_CAL = 4;
var PROT_CAL = 4;
var FAT_CAL = 9;
var FAT_LOSS_MULT = 10;
var MAINTENANCE_MULT = 14;
var WEIGHT_GAIN_MULT = 17;

$(document).ready(function() {
  //changing the label on the dropdown menu when selecting a menuitem
  $(".dropdown-menu a").click(function() {
    $("#dropdownMenuButton:first-child").text($(this).text());
    $("#dropdownMenuButton:first-child").val($(this).text());
  });

  //submitting the form
  $("#submitButton").click(function() {
    //getting the data
    var calorieTarget = parseInt($("#calorieTargetInput").val());
    var numberOfMeals = parseInt($("#dropdownMenuButton").text());
    var carbRatio = parseInt($("#carbRatioInput").val());
    var fatRatio = parseInt($("#fatRatioInput").val());
    var proteinRatio = parseInt($("#proteinRatioInput").val());

    //sanitizing
    if (
      isNaN(calorieTarget) ||
      isNaN(numberOfMeals) ||
      isNaN(carbRatio) ||
      isNaN(fatRatio) ||
      isNaN(proteinRatio)
    ) {
      showError("Please enter numerical values.");
      return;
    }
    if (
      carbRatio + fatRatio + proteinRatio < 99 ||
      carbRatio + fatRatio + proteinRatio > 101
    ) {
      showError("Please have your ratios add up to 100%.");
      return;
    }

    //making calculations
    var carbCalories = Math.round(calorieTarget * (carbRatio / 100));
    var proteinCalories = Math.round(calorieTarget * (proteinRatio / 100));
    var fatCalories = Math.round(calorieTarget * (fatRatio / 100));
    var carbGrams = Math.round(carbCalories / CARB_CAL);
    var proteinGrams = Math.round(proteinCalories / PROT_CAL);
    var fatGrams = Math.round(fatCalories / FAT_CAL);
    var carbPerMeal = Math.round(carbGrams / numberOfMeals);
    var proteinPerMeal = Math.round(proteinGrams / numberOfMeals);
    var fatPerMeal = Math.round(fatGrams / numberOfMeals);

    //setting the targets
    $("#calorieTargetHeader").text(
      "For Your Calorie Target of: " + calorieTarget
    );
    $("#carbCalorieListing").text("Your carb calories: " + carbCalories);
    $("#proteinCalorieListing").text(
      "Your protein calories: " + proteinCalories
    );
    $("#fatCalorieListing").text("Your fat calories: " + fatCalories);
    $("#carbGramListing").text("Your carb grams: " + carbGrams);
    $("#proteinGramListing").text("Your protein grams: " + proteinGrams);
    $("#fatGramListing").text("Your fat grams: " + fatGrams);
    $("#carbMealListing").text("Your carbs per meal: " + carbPerMeal);
    $("#proteinMealListing").text("Your protein per meal: " + proteinPerMeal);
    $("#fatMealListing").text("Your fat per meal: " + fatPerMeal);

    $("#calculatorDisplayContainer").fadeIn("slow");
    $("html, body").animate(
      { scrollTop: $("#calculatorDisplayContainer").offset().top },
      2000
    );
  });

  //listener for bodyweight input to change the calorie target
  $("#bodyweightInput").keypress(function(event) {
    var char = String.fromCharCode(event.keyCode);
    var bodyweight = parseInt($("#bodyweightInput").val() + char);
    if (!isNaN(bodyweight)) {
      $("#calorieTargetInput").val(bodyweight * getMultiplier());
    }
  });

  //listener for the multiplier input to change the calorie target
  $("input[name=inlineRadioOptions]").click(function() {
    var bodyweight = parseInt($("#bodyweightInput").val());
    if (!isNaN(bodyweight)) {
      $("#calorieTargetInput").val(bodyweight * getMultiplier());
    }
  });
});

//get the multiplier from the multiplier radio input
function getMultiplier() {
  var radioOption = $("input[name=inlineRadioOptions]:checked").val();
  if (radioOption === "fatLoss") return FAT_LOSS_MULT;
  else if (radioOption === "maintenance") return MAINTENANCE_MULT;
  else return WEIGHT_GAIN_MULT;
}

//handling errors
function showError(message) {
  $("#errorDiv").text(message);
  $("#errorDiv").fadeIn("slow");
  $("html, body").animate(
    { scrollTop: $("#errorDiv").offset().top },
    2000
  );
  setTimeout(function() {
    $("#errorDiv").fadeOut("slow");
  }, 2000);
}
