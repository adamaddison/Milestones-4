milestonesModule.controller("milestonesController", function($scope)
{

// 		INITIALISING COUNTDOWN VARIABLES
// Declaring day value variables, the current day and milestones have a default value of zero and the days until end has a default value of 10
$scope.currentDay = 0;
$scope.currentDayPercentage = 0;
$scope.daysUntilEnd = 10;

// Fetching current date
var currentSessionDate = new Date();
currentSessionDate.setHours(0, 0, 0, 0); // Ignoring time from calculation
$scope.milestones = [  {milestone: 1, daysUntilMilestone: 0, name: "Milestone 1", date: currentSessionDate},
		     					{milestone: 2, daysUntilMilestone: 0, name: "Milestone 2", date: currentSessionDate},
		  					{milestone: 3, daysUntilMilestone: 0, name: "Milestone 3", date: currentSessionDate},
		   					{milestone: 4, daysUntilMilestone: 0, name: "Milestone 4", date: currentSessionDate},
		   					{milestone: 5, daysUntilMilestone: 0, name: "Milestone 5", date: currentSessionDate},
		    					{milestone: 6, daysUntilMilestone: 0, name: "Milestone 6", date: currentSessionDate},
		     					{milestone: 7, daysUntilMilestone: 0, name: "Milestone 7", date: currentSessionDate},
		     					{milestone: 8, daysUntilMilestone: 0, name: "Milestone 8", date: currentSessionDate},
		     					{milestone: 9, daysUntilMilestone: 0, name: "Milestone 9", date: currentSessionDate},
		    					{milestone: 10, daysUntilMilestone: 0, name: "Milestone 10", date: currentSessionDate}];
$scope.countdownName = "";
$scope.startDate = new Date(2020, 0, 1);
$scope.endDate = new Date(2020, 0, 11);

//	Assigning previous input values to the local variables
if(localStorage.currentDay !== undefined){ $scope.currentDay = parseInt(localStorage.currentDay); }
if(localStorage.daysUntilEnd !== undefined){ $scope.daysUntilEnd = parseInt(localStorage.daysUntilEnd); }
if(localStorage.milestones !== undefined)
{
	// Assigning the milestones data structure from the previous session to the milestones object array so that it can be used in the app
	$scope.milestones = JSON.parse(localStorage.milestones);

	var totalNumberOfMilestones = 10;
	
	// If the name attributes are undefined because of previously using an older version of milestones
	// then the name attribute for all milestones will be populated with default values
	if($scope.milestones[0].name == undefined)
	{			
		// Populating all milestone names with default value
		for(var i=0;i<totalNumberOfMilestones;i++)
		{
			$scope.milestones[i].name = "Milestone " + (i+1);
		}
	}
	
	// Converting the milestone date attributes from a string type to date objects so that they can be used with date functions
	if($scope.milestones[0].date !== undefined) // only if the date attributes already exist
	{
		for(var i=0;i<totalNumberOfMilestones;i++)
		{
			$scope.milestones[i].date = new Date($scope.milestones[i].date);
		}
	}
	else // if the user is coming from an older version of milestones without the date attributes then the dates are initialised
	{
		for(var i=0;i<totalNumberOfMilestones;i++)
		{
			$scope.milestones[i].date = currentSessionDate;
		}
	}

}
if(localStorage.countdownName !== undefined){ $scope.countdownName = localStorage.countdownName; }

// This variable indicates how many milestones the user is using on the progress bar
$scope.numberOfActiveMilestones = 1;
 // assigning previous value to variable
if(localStorage.numberOfActiveMilestones !== undefined){ $scope.numberOfActiveMilestones = parseInt(localStorage.numberOfActiveMilestones); }

// This variable contains a message that displays when a countdown is over
$scope.countdownEndMessage = "";
if(localStorage.countdownEndMessage !== undefined)
{ $scope.countdownEndMessage = localStorage.countdownEndMessage; }

// This variable contains multiple objects, each containing the variables for different countdowns that have been created by the user
$scope.savedCountdowns = [];
if(localStorage.savedCountdowns !== undefined)
{	
	$scope.savedCountdowns = JSON.parse(localStorage.savedCountdowns);
	// converting all date properties from a string type to a date type
	for(var i=0;i<$scope.savedCountdowns.length;i++){ $scope.savedCountdowns[i].dateSaved = new Date($scope.savedCountdowns[i].dateSaved); }
}
else if(localStorage.savedCountdowns == undefined) // If this is the first time the web app is being used then the multiple countdowns array is initialised with the default countdown values
{
	// Fetching current date
	var currentSessionDate = new Date();
	    currentSessionDate.setHours(0, 0, 0, 0); // Ignoring time from calculation

$scope.savedCountdowns = [{		dateSaved:	    currentSessionDate,
					countdownName: 	    $scope.countdownName,
					countdownEndMessage: $scope.countdownEndMessage,
					currentDay: 	    $scope.currentDay,
					daysUntilEnd:	    $scope.daysUntilEnd,
					numberOfActiveMilestones: $scope.numberOfActiveMilestones,
					milestones: 	    $scope.milestones
			  }];
}
$scope.numberOfCountdowns = 1; // Current number of countdowns created by the user (1 by default)
if(localStorage.numberOfCountdowns !== undefined){ $scope.numberOfCountdowns = parseInt(localStorage.numberOfCountdowns); }
$scope.currentCountdown = 0; // Currently selected countdown on display (0 by default)
if(localStorage.currentCountdown !== undefined){ $scope.currentCountdown = parseInt(localStorage.currentCountdown); }


//		INITIALISING APPLICATION CONSTANTS AND STATE VARIABLES

// This constant represents the maximum number of milestones that can be displayed
$scope.TOTAL_NUMBER_OF_MILESTONES = 10;
// This constant represents the minimum number of milestones that can be displayed
$scope.MINIMUM_NUMBER_OF_MILESTONES = 0;


// These two string constants indicate the height in pixels for the milestone labels, standard for normal display and lower when the user clicks on a label (so that it stands out)
$scope.STANDARD_LABEL_HEIGHT = "42px";
$scope.LOWER_LABEL_HEIGHT = "72px";


// COLOURS
$scope.GREY = "gray";
$scope.DARK_GREY = "#434343";
$scope.LIGHT_GREY = "#f1f1f1";
$scope.WHITE = "#ffffff";
$scope.BLACK = "#000000";
$scope.INNER_PROGRESS_BAR_GREY = "#757575"; // Using for dark mode to contrast with black background
$scope.HIGHLIGHTED_ITEM = "rgb(51, 167, 255)";


// LANGUAGES
// Setting the constant values of all possible countdown languages
$scope.ENGLISH = 0;
$scope.FRENCH = 1;
$scope.GERMAN = 2;
$scope.SPANISH = 3;
$scope.PORTUGUESE = 4;
$scope.ITALIAN = 5;
$scope.countdownLang = $scope.ENGLISH; // English on by default
if(localStorage.countdownLang !== undefined)
{ $scope.countdownLang = JSON.parse(localStorage.countdownLang); } // restoring language value from previous session

// These constants contain the words of the selected language for the time remaining text, milestones countdown pane text and the status bar
$scope.Days = "Days";
$scope.Day = "Day";
$scope.Weeks = "Weeks";
$scope.Week = "Week";
$scope.Months = "Months";
$scope.Month = "Month";
$scope.REMAINING = "Remaining";
$scope.REMAINING_UNTIL = "Remaining Until";
$scope.COMPLETED = "Completed";
$scope.SINCE_START = "since start";
$scope.MILESTONE_COUNTDOWNS_HEADER = "Milestone Countdowns";


// STATUS BAR
// This variable holds the current text that is displayed in the status bar
$scope.statusBarDisplayText = "";
// This variable holds the title text for the status bar dialog box (appears when the user clicks on the status bar)
$scope.statusBarDialogTitle = "Status Bar Message";


// TIME REMAINING FORMAT
// These constants represent a countdown mode for the time remaining text
$scope.DAYS = 0;
$scope.WEEKS = 1;
$scope.MONTHS = 2;
$scope.MONTHS_DAYS = 3;
// This variable indicates what format is to be used in the time remaining text (default value is days)
$scope.timeRemainingFormat = $scope.DAYS;
if(localStorage.weeksOrDays !== undefined){ $scope.timeRemainingFormat = JSON.parse(localStorage.weeksOrDays); } // restoring value from web storage (uses old variable name)

// MILESTONE MARKER FORMAT
// These constants represent a format that the milestone markers on the progress bar can display
$scope.PERCENTAGE = 0;
$scope.DAY_NUM = 1;
$scope.DATE = 2;
// This variable indicates which format is currently used in the milestone markers (default value is percentage)
$scope.milestoneMarkerFormat = $scope.PERCENTAGE;
if(localStorage.milestoneMarkerFormat !== undefined){ $scope.milestoneMarkerFormat = JSON.parse(localStorage.milestoneMarkerFormat); } // restoring value from web storage


// DARK / LIGHT MODE
$scope.DARK_MODE = 0;
$scope.LIGHT_MODE = 1;
$scope.autoTheme = false;
if(localStorage.autoTheme !== undefined){ $scope.autoTheme = JSON.parse(localStorage.autoTheme); }
// This variable indicates which theme is in current use (dark mode or light mode)
$scope.theme = $scope.LIGHT_MODE;
if(localStorage.theme !== undefined){ $scope.theme = JSON.parse(localStorage.theme); } // restoring value from web storage
$scope.darkModeBackground = "N/A";
if(localStorage.darkModeBackground !== undefined){ $scope.darkModeBackground = localStorage.darkModeBackground; } // restoring value from web storage
$scope.lightModeBackground = "N/A";
if(localStorage.lightModeBackground !== undefined){ $scope.lightModeBackground = localStorage.lightModeBackground; } // restoring value from web storage
// These boolean variables indicate whether the progress bar is blue (a milestone has been reached) or green (the countdown is complete)
$scope.progressBarIsBlue = false;
$scope.progressBarIsGreen = false;
// This variable stores the URL value of the currently selected background so that the selectedBg class is applied to highlight the item in the menu
$scope.selectedBackground = "";


// This variable contains the path to the toggle switch image file for toggling automatic theme selection
$scope.toggleSwitchAutoTheme = "Icons/toggleOff.svg";

// These two variables contain the file path the the dark and light mode ticked / unticked icons (light mode is ticked by default)
$scope.lightModeTickBox = "Icons/tickedTheme.svg";
$scope.darkModeTickBox = "Icons/untickedTheme.svg";

// This variable is used to indicate the second parameter (theme) of the setBackground method when called from the background list items in the HTML
// This means that only one set of background items are needed in the html that dynamically call setBackground, rather than having separate background items that call it with dark mode and light mode
$scope.setBackgroundHTMLParam = $scope.LIGHT_MODE;
// The user can choose from 8 different backgrounds (including default and custom)
$scope.NUM_OF_BACKGROUNDS = 8;
// This holds the URL of the custom background image, which is assigned to the dark/lightModeBackground variable when custom background is selected
$scope.customBackgroundImage = "";
if(localStorage.customBackgroundImage !== undefined){ $scope.customBackgroundImage = localStorage.customBackgroundImage; } // restoring value from web storage


// MULTIPLE COUNTDOWNS
// This variable contains the file path to the plus icon used in the top-left of the All Countdowns pane (which becomes greyed out when there are 10 milestones to indicate the limit)
$scope.plusButtonAllCountdowns = "Icons/plus.svg";
$scope.countdownToDelete = -1;
$scope.showDeleteDialog = false;


//			FUNCTION DECLARATIONS

// These two methods hide and show the window containing the UI for modifying the end date, current day, and milestone
$scope.showSetupWindow = function()
{
	$scope.closeMilestoneCountdowns();
	$scope.showAllCountdowns(false);
	
	document.getElementById('setupWindow').style.visibility = "visible";
	document.getElementById('setupWindow').style.opacity = "1";
	document.getElementById('greyedOutBackground').style.visibility = "visible";
	document.getElementById('greyedOutBackground').style.opacity = "1";
}
$scope.hideSetupWindow = function()
{
	document.getElementById('setupWindow').style.visibility = "hidden";
	document.getElementById('setupWindow').style.opacity = "0";
	document.getElementById('greyedOutBackground').style.visibility = "hidden";
	document.getElementById('greyedOutBackground').style.opacity = "0";
}


// PURPOSE: This function calculates the progress bar percentage and sets the progress bar length and milestone marker positions. This also has the effect of displaying new milestones / removing deleted milestones.
// USE: This function is used in the initialiseUI function, which is called on web app startup to set up the UI with previous values. This function is also called when the user presses the done button on the setup window.
$scope.calculateProgressBar = function()
{

// Re-calculating the current day, daysUntil, and milestone daysUntil variables as the user may have modified the start and end dates
$scope.initialiseCountdownVariables();

//if the data the user has entered is valid (only integers) then this data will be displayed on the progress bar
if($scope.isInputValid() == true)
{
	$scope.hideSetupWindow();
	
	// The purpose of resetting the progress bar back to black/dark grey is because that is the default colour before it is changed to blue/green for getting to a milestone or getting to the end
	// resetting the progress bar to black (if in light mode)
	if($scope.theme == $scope.LIGHT_MODE)
	{
		document.getElementById('innerProgressBar').style.backgroundColor=$scope.BLACK;
	}
	// resetting the progress bar to dark grey (if in dark mode)
	else if($scope.theme == $scope.DARK_MODE)
	{
		document.getElementById('innerProgressBar').style.backgroundColor=$scope.INNER_PROGRESS_BAR_GREY;
	}

	// assigning the outer progress bar to a variable
	var totalProgress = document.getElementById('outerProgressBar');


	// calculating the current number of days as a proportion of the total days until the end date
	var progressBarProportion = ($scope.currentDay / $scope.daysUntilEnd);
	
	// calculating the width of the inner progress bar based on the current days proportion
	var progressBarLength = 100 * progressBarProportion;

	// setting the length of the inner progress bar 
	document.getElementById('innerProgressBar').style.width = progressBarLength + "%";
	

	// assigning the current days as a percentage of the total days until the end date to a variable to be displayed to the user
	$scope.currentDayPercentage = progressBarProportion * 100;
	$scope.currentDayPercentage = Math.round($scope.currentDayPercentage * 10) / 10;	// rounding down to one decimal place
	
	// Resetting progress bar status indicators back to default values
	$scope.progressBarIsBlue = false;
	$scope.progressBarIsGreen = false;
	document.getElementById('innerProgressBar').style.borderRadius="7px 0 0 7px"; // When the inner progress bar will be rounded on the right corners when full, otherwise the right corners are sharp

	// each milestone marker is put into the appropriate position on the progress bar, or if the milestone isn't active then it is made hidden
	for(var i=1;i<=$scope.TOTAL_NUMBER_OF_MILESTONES;i++)
	{
		// if the milestone marker is in the current range of active milestones (milestone 1 to milestone N) then it will be placed in the appropriate position
		if(i<=$scope.numberOfActiveMilestones)
		{ 
			// calculating the milestone day as a proportion of the total days until the end date
			var milestoneMarkerProportion = $scope.milestones[i-1].daysUntilMilestone / $scope.daysUntilEnd;
			
			// calculating the left offset for the milestone marker
			var milestoneOffsetLength = 100 * milestoneMarkerProportion;
			
			// positioning both the milestone marker and it's associated label
			document.getElementById('milestoneMarker'+i).style.left = milestoneOffsetLength + "%";
			document.getElementById('milestoneLabel'+i).style.left = milestoneOffsetLength + "%";

			// making sure that the milestone marker is visible
			document.getElementById('milestoneMarker'+i).style.display="block";
			document.getElementById('milestoneLabel'+i).style.display="block";
			
			// if the length of the progress bar is at the same position as a milestone marker (i.e. the user reached a milestone) then the progress bar will turn BLUE
			if(progressBarProportion == milestoneMarkerProportion){ document.getElementById('innerProgressBar').style.backgroundColor="DodgerBlue"; $scope.progressBarIsBlue = true; }

			// if the progress bar proportion is 1 (i.e. the user has reached the end day) then the progress bar will be GREEN
			if(progressBarProportion == 1){ document.getElementById('innerProgressBar').style.backgroundColor="#40c350"; $scope.progressBarIsGreen = true; document.getElementById('innerProgressBar').style.borderRadius="7px"; }

		}
		else{ document.getElementById('milestoneMarker'+i).style.display="none"; document.getElementById('milestoneLabel'+i).style.display="none"; } // When the loop encounters the inactive milestones then it will just hide them
	}
	
	// Assigning the new countdown name to the countdown name in the saved countdowns array so that it will immediately appear in the sidebar
	$scope.savedCountdowns[$scope.currentCountdown].countdownName = $scope.countdownName;
		
	// saving user input to web storage, making them available when the user next opens the browser
	localStorage.currentDay = $scope.currentDay;
	localStorage.daysUntilEnd = $scope.daysUntilEnd;
	localStorage.milestones = JSON.stringify($scope.milestones);
	localStorage.numberOfActiveMilestones = $scope.numberOfActiveMilestones;
	localStorage.weeksOrDays = $scope.timeRemainingFormat;
	localStorage.milestoneMarkerFormat = $scope.milestoneMarkerFormat;
	localStorage.theme = $scope.theme;
	localStorage.lightModeBackground = $scope.lightModeBackground;
	localStorage.darkModeBackground = $scope.darkModeBackground;
	localStorage.customBackgroundImage = $scope.customBackgroundImage;
	localStorage.autoTheme = $scope.autoTheme;
	localStorage.countdownLang = $scope.countdownLang;
	localStorage.countdownName = $scope.countdownName;
	localStorage.countdownEndMessage = $scope.countdownEndMessage;
	localStorage.savedCountdowns = JSON.stringify($scope.savedCountdowns);
	localStorage.numberOfCountdowns = $scope.numberOfCountdowns
	localStorage.currentCountdown = $scope.currentCountdown;
	
	// Setting the status bar to display the current day and days until the next milestone
	$scope.statusBarText($scope.currentDay, -1);
}
}

// PURPOSE: To add a new active milestone and allow the user to modify it's value
// USE: This function is run when the user clicks the add milestone button
$scope.addMilestone = function()
{
	// depending on the current number of milestones in use the appropriate milestone input box is displayed to the user
	switch($scope.numberOfActiveMilestones)
	{
		case 0: document.getElementById('milestone1').style.display="block"; break;
		case 1: document.getElementById('milestone2').style.display="block"; break;
		case 2: document.getElementById('milestone3').style.display="block"; break;
		case 3: document.getElementById('milestone4').style.display="block"; break;
		case 4: document.getElementById('milestone5').style.display="block"; break;
		case 5: document.getElementById('milestone6').style.display="block"; break;
		case 6: document.getElementById('milestone7').style.display="block"; break;
		case 7: document.getElementById('milestone8').style.display="block"; break;
		case 8: document.getElementById('milestone9').style.display="block"; break;
		case 9: document.getElementById('milestone10').style.display="block"; break;
	}
	
	// now that a new milestone has been added this is indicated by incrementing the numberOfActiveMilestones variable
	if($scope.numberOfActiveMilestones < $scope.TOTAL_NUMBER_OF_MILESTONES)
	{
		$scope.numberOfActiveMilestones = $scope.numberOfActiveMilestones + 1;
	}
	// graying out the add milestone button when 10 milestones have been added
	if($scope.numberOfActiveMilestones >= $scope.TOTAL_NUMBER_OF_MILESTONES){ document.getElementById('addMilestone').style.color = $scope.GREY; }
}

// PURPOSE: To indicate the removal of a milestone and shift all milestone values up one element so that there remains a contiguous list of active milestones
// USE: The cross button in the HTML UI
$scope.deleteMilestone = function(milestoneToDelete)
{
	// after the milestone is deleted this is indicated by decrementing the numberOfActiveMilestones variable
	if($scope.numberOfActiveMilestones > $scope.MINIMUM_NUMBER_OF_MILESTONES)
	{
		$scope.numberOfActiveMilestones = $scope.numberOfActiveMilestones - 1;
		
      // Making the add milestone button visible (giving it white text in dark mode, or black text in light mode)
		if($scope.theme == $scope.DARK_MODE)
      { document.getElementById('addMilestone').style.color = $scope.WHITE; }
      else if($scope.theme == $scope.LIGHT_MODE)
      { document.getElementById('addMilestone').style.color = $scope.BLACK; }
	}

	// when the number of milestones is reduced by one the milestone label and marker is hidden from view
	switch($scope.numberOfActiveMilestones)
	{
	case 0: document.getElementById('milestone1').style.display="none"; document.getElementById('milestoneLabel1').style.display="none"; document.getElementById('milestoneMarker1').style.display="none"; break;
	case 1: document.getElementById('milestone2').style.display="none"; document.getElementById('milestoneLabel2').style.display="none"; document.getElementById('milestoneMarker2').style.display="none"; break;
	case 2: document.getElementById('milestone3').style.display="none"; document.getElementById('milestoneLabel3').style.display="none"; document.getElementById('milestoneMarker3').style.display="none"; break;
	case 3: document.getElementById('milestone4').style.display="none"; document.getElementById('milestoneLabel4').style.display="none"; document.getElementById('milestoneMarker4').style.display="none"; break;
	case 4: document.getElementById('milestone5').style.display="none"; document.getElementById('milestoneLabel5').style.display="none"; document.getElementById('milestoneMarker5').style.display="none"; break;
	case 5: document.getElementById('milestone6').style.display="none"; document.getElementById('milestoneLabel6').style.display="none"; document.getElementById('milestoneMarker6').style.display="none"; break;
	case 6: document.getElementById('milestone7').style.display="none"; document.getElementById('milestoneLabel7').style.display="none"; document.getElementById('milestoneMarker7').style.display="none"; break;
	case 7: document.getElementById('milestone8').style.display="none"; document.getElementById('milestoneLabel8').style.display="none"; document.getElementById('milestoneMarker8').style.display="none"; break;
	case 8: document.getElementById('milestone9').style.display="none"; document.getElementById('milestoneLabel9').style.display="none"; document.getElementById('milestoneMarker9').style.display="none"; break;
	case 9: document.getElementById('milestone10').style.display="none"; document.getElementById('milestoneLabel10').style.display="none"; document.getElementById('milestoneMarker10').style.display="none"; break;
	}

	// moving all rows below the row of the deleted milestone up one element in the milestone array
	for(var i=0;i<$scope.milestones.length;i++)
	{
		// if a milestone row is below or equal to the one that was deleted then it will be assigned the days until milestone value below it
		if ($scope.milestones[i].milestone >= milestoneToDelete && i < $scope.TOTAL_NUMBER_OF_MILESTONES-1)
		{
			$scope.milestones[i].daysUntilMilestone = $scope.milestones[i+1].daysUntilMilestone;
			$scope.milestones[i].name = $scope.milestones[i+1].name;
			$scope.milestones[i].date = $scope.milestones[i+1].date;
		}
		 // the last milestone will be assigned zero as nothing is below it
		else if(i == $scope.TOTAL_NUMBER_OF_MILESTONES-1)
		{
			$scope.milestones[i].daysUntilMilestone = 0;
			$scope.milestones[i].name = "Milestone 10";
			$scope.milestones[i].date = $scope.startDate;
		}
	
	}

}

// PURPOSE: This function displays or hides the all countdowns sidebar (depending on the boolean parameter), allowing the user to switch to a different countdown
// USE: This function is triggered when the user clicks on the countdowns menu icon (the top-left hamburger menu icon), the close button in the all countdowns sidebar or the switchCountdown function
$scope.showAllCountdowns = function(shouldShowMenu)
{
	if(shouldShowMenu == true)
	{
		$scope.closeMilestoneCountdowns();
		
		document.getElementById('countdownsMenu').style.boxShadow = "rgba(148, 148, 148, 0.6) 12px 12px 33px 2px, rgba(255, 255, 255, 0.6) -12px -12px 33px 2px";
		document.getElementById('countdownsMenu').style.left = "0px";
	}
	else if(shouldShowMenu == false)
	{
		document.getElementById('countdownsMenu').style.left = "-250px";
		document.getElementById('countdownsMenu').style.boxShadow = "none";
	}

	// Re-running the setTheme function in order to apply the appropriate colours to the countdown name list items (it doesn't run on startup)
	$scope.setTheme($scope.theme);

	// Highlighting the currently selected countdown in blue
	var selectedCountdown = document.getElementById('countdown' + $scope.currentCountdown);
	selectedCountdown.style.backgroundColor = $scope.HIGHLIGHTED_ITEM;
	selectedCountdown.style.color = $scope.WHITE;
}

// PURPOSE: This function is used to save the values of the current countdown into the saved countdowns array, and assign the values of the selected countdown to the countdown variables (i.e. currentDay, daysUntilEnd) so that the selected countdown can be used
// USE: This function is run each time the user selects a countdown in the all countdowns pane, and is also used in the addCountdown and deleteCountdown functions
$scope.switchCountdown = function(selectedCountdown, isCountdownDeleted)
{	
	// Returning -1 (indicating error) if the index number of the selected countdown is out of bounds
	if(selectedCountdown >= $scope.savedCountdowns.length || selectedCountdown < 0){ return -1; }
	
	// Fetching current date
	var currentSessionDate = new Date();
	    currentSessionDate.setHours(0, 0, 0, 0); // Ignoring time from calculation
	
	// The previous countdown values will only be saved back into the savedCountdowns array if the previous countdown was NOT deleted
	if(isCountdownDeleted == undefined)
	{
		// Saving the values of the current countdown to savedCountdowns array
		$scope.savedCountdowns[$scope.currentCountdown] = {dateSaved:	    	currentSessionDate,
						      	     countdownName: 	    	  $scope.countdownName,
						      	     countdownEndMessage: 	  $scope.countdownEndMessage,
						      	     currentDay: 	    	  $scope.currentDay,
						      	     daysUntilEnd:	    	  $scope.daysUntilEnd,
						      	     numberOfActiveMilestones: $scope.numberOfActiveMilestones,
						      	     milestones: 	    	  $scope.milestones
						     	    };
	
	}

	// Retrieving values of the selected countdown and assigning them to the application variables
	var selectedCountdownValues = $scope.savedCountdowns[selectedCountdown];
	$scope.countdownName = selectedCountdownValues.countdownName;
	$scope.countdownEndMessage = selectedCountdownValues.countdownEndMessage;
	$scope.daysUntilEnd = parseInt(selectedCountdownValues.daysUntilEnd);
	$scope.numberOfActiveMilestones = parseInt(selectedCountdownValues.numberOfActiveMilestones);
	$scope.milestones = selectedCountdownValues.milestones;
	
	// Converting the milestone date attributes from a string type to date objects so that they can be used with date functions
	var totalNumberOfMilestones = 10;
	for(var i=0;i<totalNumberOfMilestones;i++)
	{
		$scope.milestones[i].date = new Date($scope.milestones[i].date);
	}
	// Calculating the current day by taking the difference (in days) between the current date and the date the countdown was saved, and adding this on to the saved current day value (to take into account multiple days passing between the countdown being selected)
	$scope.currentDay = Math.round(parseInt(selectedCountdownValues.currentDay) + (currentSessionDate - selectedCountdownValues.dateSaved)/86400000);
	
	
	// Converting the number and daysUntil values from Strings to Integers (they are stored as Strings in the JSON)
	milestonesAsInteger();
	
	// Indicating that the countdown selected by the user is now the currently displayed countdown
	$scope.currentCountdown = selectedCountdown;
	localStorage.currentCountdown = $scope.currentCountdown; // Saving the current countdown value to web storage in case the browser is refreshed
	
	// Re-initialising the UI with the new countdown values so the selected countdown is displayed to the user, and saving the new countdown variables to local storage
	initialiseUI();
	
	// Re-initialising the start and end dates so that the HTML model displays the new values
	$scope.startDate = new Date($scope.startDate);
	$scope.endDate = new Date($scope.endDate);

	$scope.showAllCountdowns(false);

}
// PURPOSE: This function creates a new set of countdown values, adds them to the overall saveCountdowns array, and then switches to that countdown
// USE: This method is triggered by the add / plus button in the All Countdowns sidebar
$scope.addCountdown = function()
{
	// A maximum of 10 countdowns can be created
	if($scope.numberOfCountdowns < 10)
	{
		// Fetching current date
		var currentSessionDate = new Date();
		    currentSessionDate.setHours(0, 0, 0, 0); // Ignoring time from calculation
		
		// Creating new object containing default countdown variables to the array of all countdowns
		$scope.savedCountdowns.push({			     dateSaved:	    		currentSessionDate,
						      	     countdownName: 	    	  "",
						      	     countdownEndMessage: 	  "",
						      	     currentDay: 	    	  0,
						      	     daysUntilEnd:	    	  10,
						      	     numberOfActiveMilestones:   1,
						      	     milestones: 	    	  [  {milestone: 1, daysUntilMilestone: 0, name: "Milestone 1", date: currentSessionDate},
		     					{milestone: 2, daysUntilMilestone: 0, name: "Milestone 2", date: currentSessionDate},
		  					{milestone: 3, daysUntilMilestone: 0, name: "Milestone 3", date: currentSessionDate},
		   					{milestone: 4, daysUntilMilestone: 0, name: "Milestone 4", date: currentSessionDate},
		   					{milestone: 5, daysUntilMilestone: 0, name: "Milestone 5", date: currentSessionDate},
		    					{milestone: 6, daysUntilMilestone: 0, name: "Milestone 6", date: currentSessionDate},
		     					{milestone: 7, daysUntilMilestone: 0, name: "Milestone 7", date: currentSessionDate},
		     					{milestone: 8, daysUntilMilestone: 0, name: "Milestone 8", date: currentSessionDate},
		     					{milestone: 9, daysUntilMilestone: 0, name: "Milestone 9", date: currentSessionDate},
		    					{milestone: 10, daysUntilMilestone: 0, name: "Milestone 10", date: currentSessionDate}]
						     	    });
		// Indicating the increase in the number of countdowns
		$scope.numberOfCountdowns = $scope.numberOfCountdowns + 1;
		localStorage.numberOfCountdowns = $scope.numberOfCountdowns; // Saving the current number of countdowns value to web storage in case the browser is refreshed
		
		// Displaying this new countdown to the user
		$scope.switchCountdown($scope.savedCountdowns.length-1);
	}
	// If there are 10 milestones then the plus button in the All Countdowns pane is greyed out
	else{ $scope.plusButtonAllCountdowns = "Icons/plusGreyedOut.svg"; }
}

// PURPOSE: This is used to delete a countdown from the saved countdowns array (specified by the array index) and switch back to the first countdown
// USE: This function is executed when the user clicks either yes or no on the confirm delete dialog
$scope.deleteCountdown = function(confirmDelete)
{
	// A user can only delete a countdown if there is at least 2 countdowns (minimum 1 countdown allowed)
	if($scope.numberOfCountdowns > 1 && confirmDelete == true && $scope.countdownToDelete != -1) // deletion only takes place if the user clicks yes on the confirm dialog
	{	
		$scope.savedCountdowns.splice($scope.countdownToDelete, 1);
		
		// Indicating the decrease in the number of countdowns
		$scope.numberOfCountdowns = $scope.numberOfCountdowns - 1;
		localStorage.numberOfCountdowns = $scope.numberOfCountdowns; // Saving the current number of countdowns value to web storage in case the browser is refreshed
		
		// Switching back to the first countdown once the selected countdown has been deleted
		$scope.switchCountdown(0, true);
		
		// Changing the plus button back to blue when the number of countdowns is below the limit of 10
		if($scope.numberOfCountdowns < 10){ $scope.plusButtonAllCountdowns = "Icons/plus.svg"; }
	}

	// Hiding confirmation dialog
	$scope.showDeleteDialog = false;
	document.getElementById('greyedOutBackgroundInfo').style.display = "none";
}

// PURPOSE: To display the delete countdown confirmation dialog and set the number of the countdown to be deleted
// USE: This function is executed when the user clicks on an X button next to a countdown name in the All Countdowns pane
$scope.confirmDeleteCountdown = function(countdownToDelete)
{
	// Assigning the number of the selected countdown to be deleted to a variable so that the countdown number is passed to the deleteCountdown function
	$scope.countdownToDelete = countdownToDelete;
	
	// Displaying dialog
	$scope.showDeleteDialog = true;
	document.getElementById('greyedOutBackgroundInfo').style.display = "block";
}

// PURPOSE: This function takes in the number of days remaining as an input and calculates the message to be shown to the end user based on the countdown format (days, weeks, or months), i.e. 1 week 2 days until new year
// USE: This function is used in the UI initialisation function when the web app is loaded, and is used everytime the user changes the countdown format.
//	 This function is also used in the HTML to re-calculate the message as the user changes the countdown value
$scope.labelText = function(numberToPresent)
{
	
	// This variable will contain the entire message to be displayed in the label
	var labelMessage = "";
	

	// If the user has set to display remaining time in days only
	if($scope.timeRemainingFormat == $scope.DAYS)
	{
		// if the number to present is 1 then the " Day" string is appended onto it along with any additional text
		if(numberToPresent == 1){ labelMessage = numberToPresent + " " + $scope.Day; }
		// if the number to present is anything other than 1 then the " Days" string is appended onto it along with any additional text
		else{ labelMessage = numberToPresent + " " + $scope.Days; }
	}
	// If the user has set to display in week and days (i.e. 1 week 6 days rather than 13 days)
	if($scope.timeRemainingFormat == $scope.WEEKS)
	{
		labelMessage = $scope.calculateWeeksRemainingMessage(numberToPresent);
	}
	// If the user has set to display in months, weeks, and days
	if($scope.timeRemainingFormat == $scope.MONTHS)
	{
		// If less than 1 month then only weeks,days are displayed
		if(numberToPresent < 30)
		{
			labelMessage = $scope.calculateWeeksRemainingMessage(numberToPresent); // reusing same functionality as in the week-day format
		}
		else
		{
			var numberOfMonths = Math.floor(numberToPresent/30); // number of whole months
				var daysRemainder = numberToPresent%30;	// calculating the number of days left after you remove all months
			var numberOfWeeks = Math.floor(daysRemainder/7);	// weeks remaining
			var numberOfDays = daysRemainder%7;			// days remaining
	
			// If number of months is only one then the singular "Month" is used
			if(numberOfMonths == 1)
			{
				labelMessage = numberOfMonths + " " + $scope.Month;
			}
			else{ labelMessage = numberOfMonths + " " + $scope.Months; } // otherwise the plural "Months" is used
			
			// If number of weeks is only one then the singular "Week" is used
			if(numberOfWeeks == 1)
			{
				labelMessage = labelMessage + ", " + numberOfWeeks + " " + $scope.Week;
			}
			// If the number of weeks is more than one the plural " Weeks" is used
			else if(numberOfWeeks > 1)
			{
				labelMessage = labelMessage + ", " + numberOfWeeks + " " + $scope.Weeks;
			}
			// if there are no weeks then no week text is displayed
			
			// Additional text added on at the end
			if(numberOfDays == 0)
			{
				labelMessage = labelMessage;
			}
			else if(numberOfDays == 1) // Adding on the singular "Day" if remaining days are 1
			{
				labelMessage = labelMessage + ", " + numberOfDays + " " + $scope.Day;
			}
			else if(numberOfDays > 1) // Adding on the plural "Days" if remaining days more than 1
			{
				labelMessage = labelMessage + ", " + numberOfDays + " " + $scope.Days;
			}
		}
	}
	// If the user has set to display in months and just days
	if($scope.timeRemainingFormat == $scope.MONTHS_DAYS)
	{	
		// If less than 1 month then only days are displayed
		if(numberToPresent < 30)
		{
			// if the number to present is 1 then the " Day" string is appended onto it along with any additional text
			if(numberToPresent == 1){ labelMessage = numberToPresent + " " + $scope.Day; }
			// if the number to present is anything other than 1 then the " Days" string is appended onto it along with any additional text
			else{ labelMessage = numberToPresent + " " + $scope.Days; }
		}
		else
		{
			var numberOfMonths = Math.floor(numberToPresent/30); // number of whole months
			var numberOfDays = numberToPresent%30;		// calculating the number of days left after you remove all months
	
			// If number of months is only one then the singular "Month" is used
			if(numberOfMonths == 1)
			{
				labelMessage = numberOfMonths + " " + $scope.Month;
			}
			else{ labelMessage = numberOfMonths + " " + $scope.Months; } // otherwise the plural "Months" is used
			
			// Additional text added on at the end
			if(numberOfDays == 0)
			{
				labelMessage = labelMessage;
			}
			else if(numberOfDays == 1) // If the number of days in only one then the singular "Day" is used
			{
				labelMessage = labelMessage + ", " + numberOfDays + " " + $scope.Day;
			}
			else if(numberOfDays > 1) // Adding on plural "Days" if remaining days more than 1
			{
				labelMessage = labelMessage + ", " + numberOfDays + " " + $scope.Days;
			}
		}
	}

	// If the user has entered a valid name for the countdown then this will be displayed in the time remaining text
	if($scope.countdownName != "" && $scope.countdownName.length <= 60)
	{
		labelMessage = labelMessage + " " + $scope.REMAINING_UNTIL + " " + $scope.countdownName; 
	}
	else 	// Otherwise only the word "remaining" is displayed at the end of the countdown message
	{
		labelMessage = labelMessage + " " + $scope.REMAINING; 
	}
	
	// If the countdown has ended and the user has entered a valid end message then it will be displayed in place of the time remaining text
	if(numberToPresent < 1 && $scope.countdownEndMessage != "" && $scope.countdownEndMessage.length <= 60)
	{
		labelMessage = $scope.countdownEndMessage;
	}
	
	document.getElementById('daysRemaining').innerHTML = labelMessage + "<img id=\"downArrow\" src=\"Icons\/downArrow.svg\">";

	return labelMessage;
}

// PURPOSE: This generates the text to be displayed in the status bar at the top of the web app, and assigns this text to statusBarDisplayText, which is displayed in the HTML view. The
//	     text by default is the current day plus the days until the next milestone, and if the user clicks on a milestone then the number of days until that milestone.
// USE: During initialisation, in the calculateProgressBar function (i.e. when the user presses done on the main window), and whenever the user clicks on a milestone marker
$scope.statusBarText = function(currentDay, milestoneNum)
{
	// This variable holds the entire message to be displayed in the status bar
	var statusBarText = "";
	
	// If this function was not invoked while clicking on a milestone marker then the default text is displayed 
	if(milestoneNum <= 0)
	{
		// Generating the current day text
		var currentDayText = "";
		if(currentDay == 1){ currentDayText = currentDay + " " + $scope.Day + " " + $scope.SINCE_START; } // Singular Day
		else{ currentDayText = currentDay + " " + $scope.Days + " " + $scope.SINCE_START; }		    	// Plural   Days
		
		// Generating text displaying the next soonest milestone (if there is one)
		var nextSoonestMilestoneText = "";
		
		// These variables will hold the name and daysUntil values of the next soonest milestone happening in the future
		var nextSoonestMilestoneName = -1;
		var nextSoonestMilestoneDaysUntil = -1;
		
		// Initialising the next soonest milestone name and daysUntil with a milestone that happens in the future
		for(var i=0;i<$scope.numberOfActiveMilestones;i++)
		{ 	
			if($scope.milestones[i].daysUntilMilestone > $scope.currentDay)
			{
				var nextSoonestMilestoneName = $scope.milestones[i].name;
				var nextSoonestMilestoneDaysUntil = $scope.milestones[i].daysUntilMilestone;
			}
		}
		
		// going through every milestone and search for the one that has the smallest daysUntil value (while still also happening in the future)
		for(var i=0;i<$scope.numberOfActiveMilestones;i++)
		{
			// if the current milestone has a smaller days until value and has not yet been reached then it is assigned as the new soonest milestone
			if(nextSoonestMilestoneName != -1 && $scope.milestones[i].daysUntilMilestone < nextSoonestMilestoneDaysUntil && $scope.milestones[i].daysUntilMilestone > currentDay)
			{
				nextSoonestMilestoneName = $scope.milestones[i].name;
				nextSoonestMilestoneDaysUntil = $scope.milestones[i].daysUntilMilestone;	
			}
		}
		if(nextSoonestMilestoneName != -1) // Something will only be displayed if a future milestone was found (it will be -1 if no future milestones were found)
		{
			if((nextSoonestMilestoneDaysUntil - $scope.currentDay) == 1)
			{ nextSoonestMilestoneText = " - " + (nextSoonestMilestoneDaysUntil - $scope.currentDay) + " " + $scope.Day + " " + $scope.REMAINING_UNTIL + " " + nextSoonestMilestoneName; } 	// Singular Day
			else{ nextSoonestMilestoneText = " - " + (nextSoonestMilestoneDaysUntil - $scope.currentDay) + " " + $scope.Days + " " + $scope.REMAINING_UNTIL + " " + nextSoonestMilestoneName; }	// Plural Days
		}
		
		
		// Concatenating both the current day and next soonest milestone text into one message
		statusBarText = currentDayText + nextSoonestMilestoneText;
	}
	else // Otherwise the days until the selected milestone and it's name are displayed
	{
		// Days remaining until selected milestone
		var daysUntilMilestone = $scope.milestones[milestoneNum-1].daysUntilMilestone - $scope.currentDay;
		
		// selected milestone name
		var milestoneName = $scope.milestones[milestoneNum-1].name;
		
		if(daysUntilMilestone > 1){ statusBarText = daysUntilMilestone + " " + $scope.Days + " " + $scope.REMAINING_UNTIL + " " + milestoneName; } 	// Plural Days
		else if(daysUntilMilestone == 1){ statusBarText = daysUntilMilestone + " " + $scope.Day + " " + $scope.REMAINING_UNTIL + " " + milestoneName; } // Singular Day
		else if(daysUntilMilestone < 1){ statusBarText = milestoneName + ": " + $scope.COMPLETED; }							// Completed (0 or less days until milestone)
	}
	

	// calculating the current number of days as a proportion of the total days until the end date for the below for loop
	var progressBarProportion = ($scope.currentDay / $scope.daysUntilEnd);

	// Going through each milestone to check if the current day is at a specific milestone, if so this is indicated in the status bar text
	for(var i=1;i<=$scope.TOTAL_NUMBER_OF_MILESTONES;i++)
	{
		// if the milestone marker is in the current range of active milestones (milestone 1 to milestone N)
		if(i<=$scope.numberOfActiveMilestones && milestoneNum <= 0) // only displayed if no milestones are selected
		{ 
			// calculating the milestone day as a proportion of the total days until the end date
			var milestoneMarkerProportion = $scope.milestones[i-1].daysUntilMilestone / $scope.daysUntilEnd;
			
			// if the current length of the progress bar is at the same position as a milestone marker (i.e. the user reached a milestone) then text indicating this milestone is reached will be displayed in the status bar
			if(progressBarProportion == milestoneMarkerProportion){ statusBarText = statusBarText + (" - " + $scope.milestones[i-1].name + " " + $scope.COMPLETED); }
		}
	}
	

	// Assigning the final result to the variable on display in the status bar
	$scope.statusBarDisplayText = statusBarText;
}

// This function will hide / show the dialog box that displays all status bar text (to help small screen users see all the text at once)
$scope.showStatusBarDialog = function(isShow)
{
	if(isShow == true)
	{
		document.getElementById('statusBarDialog').style.display="block";
		document.getElementById('greyedOutBackgroundInfo').style.display = "block";
	}
	else
	{
		document.getElementById('statusBarDialog').style.display="none";
		document.getElementById('greyedOutBackgroundInfo').style.display = "none";
	}
}

// PURPOSE: This function is used to calculate the time remaining message for the week-days format
// USE: This is used in the labelText function so that the same code is reused for both the week-day format and the month-week-day format (in cases where days<30)
$scope.calculateWeeksRemainingMessage = function(numberToPresent)
{

	var labelMessage = "";
		// If less than 1 week then only days are displayed
		if(numberToPresent < 7)
		{
			// if the number to present is 1 then the " Day" string is appended onto it along with any additional text
			if(numberToPresent == 1){ labelMessage = numberToPresent + " " + $scope.Day; }
			// if the number to present is anything other than 1 then the " Days" string is appended onto it along with any additional text
			else{ labelMessage = numberToPresent + " " + $scope.Days; }
		}
		else // otherwise the number of months is calculates, and then the remaining days
		{
			var numberOfWeeks = Math.floor(numberToPresent / 7); // number of whole weeks
			var numberOfDays = numberToPresent % 7;		// remaining days if any
			
			// if the number of weeks is 1 then the " Week" string is appended onto it
			if(numberOfWeeks == 1){ labelMessage = numberOfWeeks + " " + $scope.Week; }
			// if the number of weeks is greater than 1 then the " Weeks" string is appended onto it
			else{ labelMessage = numberOfWeeks + " " + $scope.Weeks; }

			if(numberOfDays == 0){ labelMessage = labelMessage; }
			// if the number to present is 1 then the " Day" string is appended onto it
			else if(numberOfDays == 1){ labelMessage = labelMessage + ", " + numberOfDays + " " + $scope.Day; }
			// if the number of days is greater than 1 then the " Days" string is appended onto it
			else{ labelMessage = labelMessage + ", " + numberOfDays + " " + $scope.Days; }
		}
	return labelMessage;
}



// this method returns true if the argument value is an integer
$scope.isInteger = function(value)
{
	return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}


// PURPOSE: This method ensures that all user input is valid before being used, and displays any explanatory error messages
// USE: This function is used in the calculateProgressBar function, so that the progress bar parameters are only set if the input is valid
$scope.isInputValid = function()
{
	// this variable indicates whether any of the user input was valid
	var isValid = true;
	// this array variable contains all error messages
	var errorMessages = new Array();
	
	// This variable indicates that milestone errors should be suppressed when they are redundant
	var suppressMilestoneErrors = false;
	

	// TESTING if the total days until end date is valid
	if($scope.isInteger($scope.daysUntilEnd) == false)	// test for integer data type
	{
		isValid = false;
		errorMessages.push("Input was not an integer for number of days from start to end date.");		
	}	
	else if($scope.daysUntilEnd < 1 || $scope.daysUntilEnd > 5000)	// test for range between 1 to 5000
	{
		isValid = false;
		
		if($scope.daysUntilEnd > 5000){ errorMessages.push("The end date (" + $scope.endDate.toDateString() + ") cannot be more than 5000 days after the start date (" + $scope.startDate.toDateString() + ")."); }
		else
		{
			errorMessages.push("The end date (" + $scope.endDate.toDateString() + ") must come after the start date (" + $scope.startDate.toDateString() + ").");
			
			// If the daysUntilEnd is <= 0 then the daysUntilMilestone > daysUntilEnd error message is suppressed as it becomes redundant as the end date will always be before or equal to milestone days if it is <= 0
			if($scope.daysUntilEnd <= 0){suppressMilestoneErrors = true;}
		}
	}


	// TESTING if the current day is valid
	if($scope.isInteger($scope.currentDay) == false)	// test for integer data type
	{
		isValid = false;
		errorMessages.push("Input was not an integer for current day.");		
	}
	else // if currentDay is an integer then value checks are made on it
	{
		if($scope.currentDay < 0 || $scope.currentDay > 5000)	// test for range between 0 to 5000
		{
			isValid = false;
			if($scope.currentDay > 5000){ errorMessages.push("The start date (" + $scope.startDate.toDateString() + ") cannot be more than 5000 days ago."); }
			else{ errorMessages.push("The start date (" + $scope.startDate.toDateString() + ") cannot come after the current date"); }
		}
		if($scope.currentDay > $scope.daysUntilEnd)	// test for being greater than days until end
		{
			isValid = false;
			errorMessages.push("The end date (" + $scope.endDate.toDateString() + ") cannot be before the current date.");
		}
	}


	// CHECKING every milestone day number for validity
	for(var i=0;i<$scope.numberOfActiveMilestones;i++)
	{
		if($scope.isInteger($scope.milestones[i].daysUntilMilestone) == false)	// test for integer data type
		{
			isValid = false;
			errorMessages.push("The input was not an integer for the total days until the milestone " + $scope.milestones[i].name + ".");		
		}
		else // if daysUntilMilestone is an integer then value checks are made on it
		{
			if($scope.milestones[i].daysUntilMilestone < 0 || $scope.milestones[i].daysUntilMilestone > 5000)	// test for range between 0 to 5000
			{
				isValid = false;

				if($scope.milestones[i].daysUntilMilestone > 5000){ errorMessages.push("Milestone " + $scope.milestones[i].name + " date (" + $scope.milestones[i].date.toDateString() + ") cannot be more than 5000 days after the start date (" + $scope.startDate.toDateString() + ")."); }
				else{ errorMessages.push("Milestone " + $scope.milestones[i].name + " date (" + $scope.milestones[i].date.toDateString() + ") cannot be before the start date (" + $scope.startDate.toDateString() + ")."); }
			}
			if($scope.milestones[i].daysUntilMilestone > $scope.daysUntilEnd && suppressMilestoneErrors == false)	// test for being greater than days until end date
			{
				isValid = false;
				errorMessages.push("Milestone " + $scope.milestones[i].name + " date (" + $scope.milestones[i].date.toDateString() + ")  cannot be after the end date (" + $scope.endDate.toDateString() + ").");
			}
		}

		// test for the milestone name being more than 50 characters
		if($scope.milestones[i].name.length > 50)
		{
			isValid = false;
			errorMessages.push("Milestone '" + $scope.milestones[i].name + "' name cannot be longer than 50 characters, it is currently " + $scope.milestones[i].name.length + " characters long.");
		}
	}


	// CHECKING if the user has entered a valid (at most 60 character) countdown name
	if($scope.countdownName.length > 60)
	{
		isValid = false;
		errorMessages.push("Countdown name over 60 character limit (currently " + $scope.countdownName.length + " characters). Choose a shorter name.");
	}
	
	// CHECKING if the user has entered a valid (at most 60 character) countdown end message
	if($scope.countdownEndMessage.length > 60)
	{
		isValid = false;
		errorMessages.push("Countdown end message over 60 character limit (currently " + $scope.countdownEndMessage.length + " characters). Choose a shorter message.");
	}
	
	
	// Grouping all error messages into one string
	var overallErrorMessage = "The input caused the following errors: <br>";
	for(var i=0;i<errorMessages.length;i++)
	{
		overallErrorMessage = overallErrorMessage + "<br> * " + errorMessages[i];
	}
	
	// If there were any errors then the error dialog containing all error messages is displayed
	if(errorMessages.length > 0)
	{
		document.getElementById('errorDialog').style.display = "block";
		document.getElementById('greyedOutBackgroundInfo').style.display = "block";
		document.getElementById('errorDialogText').innerHTML = overallErrorMessage;
	}
	
	return isValid;
}


// This function shows and hides the about message
$scope.showInfo = function(isShow)
{
	// shows about message if isShow is true
	if(isShow == true)
	{
		document.getElementById('infoMessage').style.display = "block";
		document.getElementById('greyedOutBackgroundInfo').style.display = "block";
	}
	else // otherwise it will be hidden
	{
		document.getElementById('infoMessage').style.display = "none";
		document.getElementById('greyedOutBackgroundInfo').style.display = "none";
	}
}

// This method just closes the error dialog after being triggered by errors in the configure window
$scope.closeErrorDialog = function()
{
	document.getElementById('errorDialog').style.display = "none";
	document.getElementById('greyedOutBackgroundInfo').style.display = "none";
}

// PURPOSE: This method changes which time remaining format is used (days, weeks and days, or months, weeks, and days) for the countdown text at the top
// USE: This is executed whenever the user clicks on one of the items in the Time Remaining Format settings menu. This function is also executed in the resetSettings function.
$scope.switchTimeRemainingFormat = function(format)
{	
	// Changing time remaining to specified value
	$scope.timeRemainingFormat = format;

	// Hiding all tick graphics then showing the tick next to the selected format
	document.getElementById('tickDays').style.display="none";
	document.getElementById('tickWeeks').style.display="none";
	document.getElementById('tickMonths').style.display="none";
	document.getElementById('tickMonthsDays').style.display="none";

	
	// The tick graphic indicating the countdown format is set in the appropriate list item
	if($scope.timeRemainingFormat == $scope.DAYS)
	{
		document.getElementById('tickDays').style.display="block";
	}
	else if($scope.timeRemainingFormat == $scope.WEEKS)
	{
		document.getElementById('tickWeeks').style.display="block";
	}
	else if($scope.timeRemainingFormat == $scope.MONTHS)
	{
		document.getElementById('tickMonths').style.display="block";
	}
	else if($scope.timeRemainingFormat == $scope.MONTHS_DAYS)
	{
		document.getElementById('tickMonthsDays').style.display="block";
	}

	// Modifying the time remaining label to have the selected format
	$scope.labelText($scope.daysUntilEnd - $scope.currentDay, " Remaining");
}

// PURPOSE: The purpose of this function is to change the words used in the time remaining text to the user selected language
// USE: This function is triggered whenever the user clicks one of the four languages at the bottom of the settings menu, and is triggered in the initialiseUI function on startup. This function is also used in the resetSettings function.
$scope.switchCountdownLanguage = function(language)
{
	// Setting the milestone countdown pane title to normal font size (will shrink if Italian or Portuguese is selected)
	document.getElementById('milestoneCountdownsHeader').style.fontSize="13pt";
	
	// Hiding all tick graphics initially then displaying the one next to the selected language
	document.getElementById('tickEN').style.display="none";
	document.getElementById('tickFR').style.display="none";
	document.getElementById('tickDE').style.display="none";
	document.getElementById('tickES').style.display="none";
	document.getElementById('tickPT').style.display="none";
	document.getElementById('tickIT').style.display="none";

	if(language == $scope.ENGLISH)
	{
		
		// These variables contain the words of the selected language for the time remaining text
		$scope.Days = "Days";
		$scope.Day = "Day";
		$scope.Weeks = "Weeks";
		$scope.Week = "Week";
		$scope.Months = "Months";
		$scope.Month = "Month";
		$scope.REMAINING = "Remaining";
		$scope.REMAINING_UNTIL = "Remaining Until";
		$scope.COMPLETED = "Completed";
		$scope.SINCE_START = "since start";
		$scope.MILESTONE_COUNTDOWNS_HEADER = "Milestone Countdowns";
		$scope.statusBarDialogTitle = "Status Bar Message";
		
		// Indicating that the countdown text should be displayed in English (used to initialise language on startup)
		$scope.countdownLang = $scope.ENGLISH;
		
		// Showing the tick graphic next to English
		document.getElementById('tickEN').style.display="block";
	}
	else if(language == $scope.FRENCH)
	{
		// These variables contain the words of the selected language for the time remaining text
		$scope.Days = "Jours";
		$scope.Day = "Jour";
		$scope.Weeks = "Semaines";
		$scope.Week = "Semaine";
		$scope.Months = "Mois";
		$scope.Month = "Mois";
		$scope.REMAINING = "Restant";
		$scope.REMAINING_UNTIL = "Restant Jusqu'à";
		$scope.COMPLETED = "Terminé";
		$scope.SINCE_START = "depuis le début";
		$scope.MILESTONE_COUNTDOWNS_HEADER = "Comptes à rebours d’étape";
		$scope.statusBarDialogTitle = "Message de la Barre d'État";
		
		// Indicating that the countdown text should be displayed in French (used to initialise language on startup)
		$scope.countdownLang = $scope.FRENCH;

		// Showing the tick graphic next to French
		document.getElementById('tickFR').style.display="block";
	}
	else if(language == $scope.GERMAN)
	{
		// These variables contain the words of the selected language for the time remaining text
		$scope.Days = "Tage";
		$scope.Day = "Tag";
		$scope.Weeks = "Wochen";
		$scope.Week = "Woche";
		$scope.Months = "Monate";
		$scope.Month = "Monat";
		$scope.REMAINING = "Verbleibende";
		$scope.REMAINING_UNTIL = "Verbleibende Bis";
		$scope.COMPLETED = "Abgeschlossen";
		$scope.SINCE_START = "seit dem start";
		$scope.MILESTONE_COUNTDOWNS_HEADER = "Meilenstein Countdowns";
		$scope.statusBarDialogTitle = "Statusleiste Meldung";

		// Indicating that the countdown text should be displayed in German (used to initialise language on startup)
		$scope.countdownLang = $scope.GERMAN;

		// Showing the tick graphic next to German
		document.getElementById('tickDE').style.display="block";
	}
	else if(language == $scope.SPANISH)
	{
		// These variables contain the words of the selected language for the time remaining text
		$scope.Days = "Días";
		$scope.Day = "Día";
		$scope.Weeks = "Semanas";
		$scope.Week = "Semana";
		$scope.Months = "Meses";
		$scope.Month = "Mes";
		$scope.REMAINING = "Restantes";
		$scope.REMAINING_UNTIL = "Restantes Hasta";
		$scope.COMPLETED = "Terminado";
		$scope.SINCE_START = "desde el comienzo";
		$scope.MILESTONE_COUNTDOWNS_HEADER = "Cuenta atrás de hitos";
		$scope.statusBarDialogTitle = "Mensaje de la Barra de Estado";

		// Indicating that the countdown text should be displayed in Spanish (used to initialise language on startup)
		$scope.countdownLang = $scope.SPANISH;

		// Showing the tick graphic next to Spanish
		document.getElementById('tickES').style.display="block";
	}
	else if(language == $scope.PORTUGUESE)
	{
		// These variables contain the words of the selected language for the time remaining text
		$scope.Days = "Dias";
		$scope.Day = "Dia";
		$scope.Weeks = "Semanas";
		$scope.Week = "Semana";
		$scope.Months = "Meses";
		$scope.Month = "Mês";
		$scope.REMAINING = "Restantes";
		$scope.REMAINING_UNTIL = "Restantes até";
		$scope.COMPLETED = "Completado";
		$scope.SINCE_START = "desde o começo";
		$scope.MILESTONE_COUNTDOWNS_HEADER = "Contagem regressiva de marco";
		$scope.statusBarDialogTitle = "Mensagem da Barra de Status";

		// Indicating that the countdown text should be displayed in Portuguese (used to initialise language on startup)
		$scope.countdownLang = $scope.PORTUGUESE;

		// Modifying the CSS of milestone countdown pane title to fit the words in Portuguese
		document.getElementById('milestoneCountdownsHeader').style.fontSize="11pt";

		// Showing the tick graphic next to Portuguese
		document.getElementById('tickPT').style.display="block";
	}
	else if(language == $scope.ITALIAN)
	{
		// These variables contain the words of the selected language for the time remaining text
		$scope.Days = "Giorni";
		$scope.Day = "Giorno";
		$scope.Weeks = "Settimane";
		$scope.Week = "Settimana";
		$scope.Months = "Mesi";
		$scope.Month = "Mese";
		$scope.REMAINING = "Rimanenti";
		$scope.REMAINING_UNTIL = "Rimanenti fino a";
		$scope.COMPLETED = "Completato";
		$scope.SINCE_START = "dall'inizio";
		$scope.MILESTONE_COUNTDOWNS_HEADER = "Conto alla rovescia pietra miliare";
		$scope.statusBarDialogTitle = "Messaggio Nella Barra di Stato";

		// Indicating that the countdown text should be displayed in Italian (used to initialise language on startup)
		$scope.countdownLang = $scope.ITALIAN;
	
		// Modifying the CSS of milestone countdown pane title to fit the words in Italian
		document.getElementById('milestoneCountdownsHeader').style.fontSize="11pt";

		// Showing the tick graphic next to Italian
		document.getElementById('tickIT').style.display="block";
	}
	
	// Hiding language selection list panel
	document.getElementById('unselectedLangs').style.visibility = "hidden";
	document.getElementById('unselectedLangs').style.opacity = "0";
}

// This method shows the list of languages when the user clicks on the language text box in settings
$scope.showLangList = function()
{
	// Hiding the background selection panel before the language list is shown
	document.getElementById('backgroundSelectionPanel').style.opacity = "0";
	document.getElementById('backgroundSelectionPanel').style.visibility = "hidden";
	
	document.getElementById('unselectedLangs').style.visibility = "visible";
	document.getElementById('unselectedLangs').style.opacity = "1";
}

// This method returns the currently selected language as a string
$scope.getLang = function()
{
	var langString = "";
	
	switch($scope.countdownLang)
	{
	  case 0: langString = "English"; break;
	  case 1: langString = "Francais"; break;
	  case 2: langString = "Deutsch"; break;
	  case 3: langString = "Español"; break;
	  case 4: langString = "Português"; break;
	  case 5: langString = "Italiano"; break;
	}
	
	return langString;
}

// This method shows the list of backgrounds when the user clicks the dark / light mode options in settings
$scope.showBackgroundList = function(darkOrLight)
{
	// Setting the setBackground theme parameter to the appropriate theme, meaning that the background list items in the HTML call setBackground with either light or dark mode
	if(darkOrLight == $scope.DARK_MODE){ $scope.setBackgroundHTMLParam = $scope.DARK_MODE; $scope.displayBackgroundSelectionTick($scope.darkModeBackground); $scope.selectedBackground = $scope.darkModeBackground; }
	else if(darkOrLight == $scope.LIGHT_MODE){ $scope.setBackgroundHTMLParam = $scope.LIGHT_MODE; $scope.displayBackgroundSelectionTick($scope.lightModeBackground); $scope.selectedBackground = $scope.lightModeBackground; }
	
	// Hiding the languages list before the background selection panel is shown
	document.getElementById('unselectedLangs').style.opacity = "0";
	document.getElementById('unselectedLangs').style.visibility = "hidden";
	
	document.getElementById('backgroundSelectionPanel').style.visibility = "visible";
	document.getElementById('backgroundSelectionPanel').style.opacity = "1";
}

// PURPOSE: This method sets the theme for the application (dark mode, light mode, or auto)
// USE: This function is run whenever the user selects a dark / light theme icon in settings, during initialisation, or when the resetSettings function is executed
$scope.setTheme = function(theme)
{
	// Turning on dark mode
	if(theme == $scope.DARK_MODE)
	{	
		// Indicating to other parts of the application that the current theme is dark mode
		$scope.theme = $scope.DARK_MODE;
		
		// When changing to dark mode the saved dark mode background image will become the currently selected background (which will be highlighted in the UI)
		$scope.selectedBackground = $scope.darkModeBackground;

		// Setting the dark mode tick box to be ticked (and un-ticking the light mode tick box)
		$scope.darkModeTickBox = "Icons/tickedTheme.svg"; $scope.lightModeTickBox = "Icons/untickedTheme.svg";
		
		// If the user has set a background image for dark mode then this will be displayed
		if($scope.darkModeBackground != "N/A")
		{ document.body.style.backgroundImage = 'url(' + $scope.darkModeBackground + ')'; }
		// Otherwise the default black background is used
		else{ document.body.style.backgroundImage = 'none'; document.body.style.backgroundColor = $scope.BLACK; }
		
		// Modifying the appropriate CSS to create a dark mode appearance
		document.getElementById('daysRemaining').style.color = $scope.WHITE;
		document.getElementById('daysRemaining').style.textShadow = "1px 1px 7px #000000, -1px -1px 7px #000000";

		// If the progress bar has reached a milestone it is set to blue, if the countdown has ended it is set to green, otherwise the default colour is grey
		if($scope.progressBarIsBlue == false && $scope.progressBarIsGreen == false){ document.getElementById('innerProgressBar').style.backgroundColor = $scope.INNER_PROGRESS_BAR_GREY; }
		else if($scope.progressBarIsBlue == true){ document.getElementById('innerProgressBar').style.backgroundColor = "DodgerBlue"; }
		else if($scope.progressBarIsGreen == true){ document.getElementById('innerProgressBar').style.backgroundColor = "#40c350"; }

		document.getElementById('outerProgressBar').style.boxShadow = "rgba(0, 0, 0, 0.6) 12px 12px 33px 2px, rgba(0, 0, 0, 0.6) -12px -12px 33px 2px";
		document.getElementById('setupWindowHeader').style.backgroundColor = $scope.DARK_GREY;
		document.getElementById('setupWindowHeader').style.color = $scope.WHITE;
		document.getElementById('setupWindow').style.backgroundColor = $scope.BLACK;
		document.getElementById('setupWindowHeader').style.borderBottom = "1px solid rgb(90, 90, 90)";
		document.getElementById('settingsWindowHeader').style.backgroundColor = $scope.DARK_GREY;
		document.getElementById('settingsWindowHeader').style.color = $scope.WHITE;
		document.getElementById('settingsWindow').style.backgroundColor = $scope.BLACK;
		document.getElementById('settingsWindowHeader').style.borderBottom = "1px solid rgb(90, 90, 90)";
		document.getElementById('greyedOutBackground').style.backgroundColor = "rgba(90, 90, 90, 0.5)";
				if($scope.numberOfActiveMilestones < $scope.TOTAL_NUMBER_OF_MILESTONES) // Will be grey if milestone count is at limit
				{ document.getElementById('addMilestone').style.color = $scope.WHITE; }
				else{ document.getElementById('addMilestone').style.color = $scope.GREY; }

		document.getElementById('milestoneCountdownsHeader').style.backgroundColor = $scope.DARK_GREY;
		document.getElementById('milestoneCountdownsHeader').style.color = $scope.WHITE;
		document.getElementById('milestoneCountdownsHeader').style.borderBottom = "1px solid rgb(90, 90, 90)";
		document.getElementById('milestoneCountdownsContent').style.backgroundColor = $scope.BLACK;
		document.getElementById('milestoneCountdownsContent').style.color = $scope.WHITE;
		document.getElementById('milestoneCountdowns').style.boxShadow = "7px 7px 30px 0px rgba(255, 255, 255, 0.6), -7px -7px 30px 0px rgba(255, 255, 255, 0.4)";
		document.getElementById('infoMessage').style.backgroundColor = $scope.DARK_GREY;
		document.getElementById('infoMessage').style.color = $scope.WHITE;
		document.getElementById('closeInfo').style.borderTop = "1px solid rgb(90, 90, 90)";
		document.getElementById('confirmMessage').style.backgroundColor = $scope.DARK_GREY;
		document.getElementById('confirmMessage').style.color = $scope.WHITE;
		document.getElementById('confirmDeleteDialog').style.backgroundColor = $scope.DARK_GREY;
		document.getElementById('confirmDeleteDialog').style.color = $scope.WHITE;
		document.getElementById('noButton').style.borderTop = "1px solid rgb(90, 90, 90)";
		document.getElementById('yesButton').style.borderTop = "1px solid rgb(90, 90, 90)";
		document.getElementById('yesButton').style.borderLeft = "1px solid rgb(90, 90, 90)";
		document.getElementById('noButtonDeleteDialog').style.borderTop = "1px solid rgb(90, 90, 90)";
		document.getElementById('yesButtonDeleteDialog').style.borderTop = "1px solid rgb(90, 90, 90)";
		document.getElementById('yesButtonDeleteDialog').style.borderLeft = "1px solid rgb(90, 90, 90)";

		document.getElementById('confirmMessageResetSettings').style.backgroundColor = $scope.DARK_GREY;
		document.getElementById('confirmMessageResetSettings').style.color = $scope.WHITE;
		document.getElementById('noButtonSettings').style.borderTop = "1px solid rgb(90, 90, 90)";
		document.getElementById('yesButtonSettings').style.borderTop = "1px solid rgb(90, 90, 90)";
		document.getElementById('yesButtonSettings').style.borderLeft = "1px solid rgb(90, 90, 90)";

		document.getElementById('errorDialog').style.backgroundColor = $scope.DARK_GREY;
		document.getElementById('errorDialog').style.color = $scope.WHITE;
		document.getElementById('okButtonErrorDialog').style.borderTop = "1px solid rgb(90, 90, 90)";
		document.getElementById('errorDialogTitle').style.color = $scope.WHITE;
		document.getElementById('errorDialogText').style.color = $scope.WHITE;

		document.getElementById('statusBarDialog').style.backgroundColor = $scope.DARK_GREY;
		document.getElementById('statusBarDialog').style.color = $scope.WHITE;
		document.getElementById('closeInfoStatusBar').style.borderTop = "1px solid rgb(90, 90, 90)";
		document.getElementById('statusBarTitle').style.color = $scope.WHITE;
		document.getElementById('statusBarText').style.color = $scope.WHITE;
		
		document.getElementById('themeMenu').style.backgroundColor = $scope.DARK_GREY;
		document.getElementById('themeMenu').style.color = $scope.WHITE;
		document.getElementById('backgroundSelectionHeader').style.backgroundColor = $scope.DARK_GREY;
		document.getElementById('backgroundSelectionHeader').style.color = $scope.WHITE;
		document.getElementById('backgroundSelectionHeader').style.borderBottom = "1px solid rgb(90, 90, 90)";

		document.getElementById('unselectedLangsHeader').style.backgroundColor = $scope.DARK_GREY;
		document.getElementById('unselectedLangsHeader').style.color = $scope.WHITE;
		document.getElementById('unselectedLangsHeader').style.borderBottom = "1px solid rgb(90, 90, 90)";
		
		document.getElementById('countdownsMenuIcon').style.backgroundColor = $scope.INNER_PROGRESS_BAR_GREY;
		document.getElementById('countdownsMenu').style.backgroundColor = $scope.BLACK;
		var allCountdownsHeader = document.getElementById('countdownsMenuHeader').querySelectorAll('p');
		allCountdownsHeader[0].style.borderBottom = "1px solid rgb(90, 90, 90)";
		
		// Making every input elements dark
		var inputTags = document.getElementsByTagName('input');
		for(var i=0;i<inputTags.length;i++)
		{
			inputTags[i].style.backgroundColor = $scope.DARK_GREY;
			inputTags[i].style.color = $scope.WHITE;
		}

		// Making every paragraph element (i.e. elements which contain input forms in the configure window) dark
		var paragraphTags = document.querySelectorAll('p');
		for(var i=0;i<paragraphTags.length;i++)
		{
			paragraphTags[i].style.backgroundColor = $scope.DARK_GREY;
			paragraphTags[i].style.color = $scope.WHITE;
		}

	}
	// Turning on light mode
	else if(theme == $scope.LIGHT_MODE)
	{
		// Indicating to other parts of the application that the current theme is light mode
		$scope.theme = $scope.LIGHT_MODE;

		// When changing to dark mode the saved dark mode background image will become the currently selected background (which will be highlighted in the UI)
		$scope.selectedBackground = $scope.lightModeBackground;
		
		// Setting the light mode tick box to be ticked (and un-ticking the dark mode tick box)
		$scope.lightModeTickBox = "Icons/tickedTheme.svg"; $scope.darkModeTickBox = "Icons/untickedTheme.svg";
		
		// If the user has set a background image for light mode then this will be displayed
		if($scope.lightModeBackground != "N/A")
		{ document.body.style.backgroundImage = 'url(' + $scope.lightModeBackground + ')'; }
		// Otherwise the default white background is used
		else{ document.body.style.backgroundImage = 'none'; document.body.style.backgroundColor = $scope.WHITE; }

		// Modifying the appropriate CSS to create a dark mode appearance
		document.getElementById('daysRemaining').style.color = $scope.BLACK;
		document.getElementById('daysRemaining').style.textShadow = "1px 1px 7px #ffffff, -1px -1px 7px #ffffff";
		
		// If the progress bar has reached a milestone it is set to blue, if the countdown has ended it is set to green, otherwise the default colour is black
		if($scope.progressBarIsBlue == false && $scope.progressBarIsGreen == false){ document.getElementById('innerProgressBar').style.backgroundColor = $scope.BLACK; }
		else if($scope.progressBarIsBlue == true){ document.getElementById('innerProgressBar').style.backgroundColor = "DodgerBlue"; }
		else if($scope.progressBarIsGreen == true){ document.getElementById('innerProgressBar').style.backgroundColor = "#40c350"; }
		
		document.getElementById('outerProgressBar').style.boxShadow = "rgba(255, 255, 255, 0.6) 12px 12px 33px 2px, rgba(255, 255, 255, 0.6) -12px -12px 33px 2px";
		document.getElementById('setupWindowHeader').style.backgroundColor = $scope.WHITE;
		document.getElementById('setupWindowHeader').style.color = $scope.BLACK;
		document.getElementById('setupWindow').style.backgroundColor = $scope.LIGHT_GREY;
		document.getElementById('setupWindowHeader').style.borderBottom = "1px solid lightGray";
		document.getElementById('settingsWindowHeader').style.backgroundColor = $scope.WHITE;
		document.getElementById('settingsWindowHeader').style.color = $scope.BLACK;
		document.getElementById('settingsWindow').style.backgroundColor = $scope.LIGHT_GREY;
		document.getElementById('settingsWindowHeader').style.borderBottom = "1px solid lightGray";
		document.getElementById('greyedOutBackground').style.backgroundColor = "rgba(0, 0, 0, 0.5)";
				if($scope.numberOfActiveMilestones < $scope.TOTAL_NUMBER_OF_MILESTONES) // Will be grey if milestone count is at limit
				{ document.getElementById('addMilestone').style.color = $scope.BLACK; }
				else{ document.getElementById('addMilestone').style.color = $scope.GREY; }

		document.getElementById('milestoneCountdownsHeader').style.backgroundColor = $scope.WHITE;
		document.getElementById('milestoneCountdownsHeader').style.color = $scope.BLACK;
		document.getElementById('milestoneCountdownsHeader').style.borderBottom = "1px solid lightGray";
		document.getElementById('milestoneCountdownsContent').style.backgroundColor = $scope.LIGHT_GREY;
		document.getElementById('milestoneCountdownsContent').style.color = $scope.BLACK;
		document.getElementById('milestoneCountdowns').style.boxShadow = "7px 7px 30px 0px rgba(0, 0, 0, 0.4), -7px -7px 30px 0px rgba(0, 0, 0, 0.4)";
		document.getElementById('infoMessage').style.backgroundColor = $scope.WHITE;
		document.getElementById('infoMessage').style.color = $scope.BLACK;
		document.getElementById('closeInfo').style.borderTop = "1px solid lightGrey";
		document.getElementById('confirmMessage').style.backgroundColor = $scope.WHITE;
		document.getElementById('confirmMessage').style.color = $scope.BLACK;
		document.getElementById('confirmDeleteDialog').style.backgroundColor = $scope.WHITE;
		document.getElementById('confirmDeleteDialog').style.color = $scope.BLACK;
		document.getElementById('noButton').style.borderTop = "1px solid lightGrey";
		document.getElementById('yesButton').style.borderTop = "1px solid lightGrey";
		document.getElementById('yesButton').style.borderLeft = "1px solid lightGrey";
		document.getElementById('noButtonDeleteDialog').style.borderTop = "1px solid lightGrey";
		document.getElementById('yesButtonDeleteDialog').style.borderTop = "1px solid lightGrey";
		document.getElementById('yesButtonDeleteDialog').style.borderLeft = "1px solid lightGrey";

		document.getElementById('confirmMessageResetSettings').style.backgroundColor = $scope.WHITE;
		document.getElementById('confirmMessageResetSettings').style.color = $scope.BLACK;
		document.getElementById('noButtonSettings').style.borderTop = "1px solid lightGrey";
		document.getElementById('yesButtonSettings').style.borderTop = "1px solid lightGrey";
		document.getElementById('yesButtonSettings').style.borderLeft = "1px solid lightGrey";

		document.getElementById('errorDialog').style.backgroundColor = $scope.WHITE;
		document.getElementById('errorDialog').style.color = $scope.BLACK;
		document.getElementById('okButtonErrorDialog').style.borderTop = "1px solid lightGrey";
		document.getElementById('errorDialogTitle').style.color = $scope.BLACK;
		document.getElementById('errorDialogText').style.color = $scope.BLACK;

		document.getElementById('statusBarDialog').style.backgroundColor = $scope.WHITE;
		document.getElementById('statusBarDialog').style.color = $scope.BLACK;
		document.getElementById('closeInfoStatusBar').style.borderTop = "1px solid lightGrey";
		document.getElementById('statusBarTitle').style.color = $scope.BLACK;
		document.getElementById('statusBarText').style.color = $scope.BLACK;

		document.getElementById('themeMenu').style.backgroundColor = $scope.WHITE;
		document.getElementById('themeMenu').style.color = $scope.BLACK;
		document.getElementById('backgroundSelectionHeader').style.backgroundColor = $scope.WHITE;
		document.getElementById('backgroundSelectionHeader').style.color = $scope.BLACK;
		document.getElementById('backgroundSelectionHeader').style.borderBottom = "1px solid lightGray";
		
		document.getElementById('unselectedLangsHeader').style.backgroundColor = $scope.WHITE;
		document.getElementById('unselectedLangsHeader').style.color = $scope.BLACK;
		document.getElementById('unselectedLangsHeader').style.borderBottom = "1px solid lightGray";

		document.getElementById('countdownsMenuIcon').style.backgroundColor = $scope.BLACK;
		document.getElementById('countdownsMenu').style.backgroundColor = $scope.LIGHT_GREY;
		var allCountdownsHeader = document.getElementById('countdownsMenuHeader').querySelectorAll('p');
		allCountdownsHeader[0].style.borderBottom = "1px solid lightGray";
		
		// Making every input elements light
		var inputTags = document.getElementsByTagName('input');
		for(var i=0;i<inputTags.length;i++)
		{
			inputTags[i].style.backgroundColor = $scope.WHITE;
			inputTags[i].style.color = $scope.BLACK;
		}
		
		// Making every paragraph element (i.e. elements which contain input forms in the configure window) light
		var paragraphTags = document.querySelectorAll('p');
		for(var i=0;i<paragraphTags.length;i++)
		{
			paragraphTags[i].style.backgroundColor = $scope.WHITE;
			paragraphTags[i].style.color = $scope.BLACK;
		}
	}
	
	// Setting the auto theme setting on / off position depending on it's state
	if($scope.autoTheme == true){ $scope.toggleSwitchAutoTheme = "Icons/toggleOn.svg"; }
	else if($scope.autoTheme == false){ $scope.toggleSwitchAutoTheme = "Icons/toggleOff.svg"; }
}

// PURPOSE: This function toggles a variable to indicate whether the theme should automatically change with the time
// USE: This function executes whenever the user clicks the automatic toggle in appearance
$scope.toggleAutoTheme = function()
{
	// change auto theme variable to true/false
	if($scope.autoTheme == true){ $scope.autoTheme = false; $scope.toggleSwitchAutoTheme = "Icons/toggleOff.svg"; }
	else if($scope.autoTheme == false){ $scope.autoTheme = true; $scope.toggleSwitchAutoTheme = "Icons/toggleOn.svg"; }
		
}

// PURPOSE: This function will assign a value to one of the two background URL variables, indicating the wallpaper to use for dark mode and light mode, or alternatively "N/A" for no background
// USE: This method is executed when the user clicks on a background option in the background selection panel
$scope.setBackground = function(URL, darkOrLight)
{

	// Setting dark mode background
	if(darkOrLight == $scope.DARK_MODE)
	{
		// Assigning image URL value from the method parameter, unless the user has selected the custom option, in which case the URL is edited by the user directly
		if(URL != "CUSTOM"){ $scope.darkModeBackground = URL; }
		else if(URL == "CUSTOM"){ $scope.darkModeBackground = $scope.customBackgroundImage; }
		
		// if the given URL value isn't N/A then this is set as the current background image
		if(URL != "N/A" && $scope.theme == $scope.DARK_MODE)
		{
			document.body.style.backgroundImage = 'url(' + $scope.darkModeBackground + ')';
			$scope.selectedBackground = $scope.darkModeBackground;
		}
		// else the default solid black background is used
		else if(URL == "N/A" && $scope.theme == $scope.DARK_MODE)
		{
			document.body.style.backgroundImage = "none";
			document.body.style.backgroundColor = $scope.BLACK;
			$scope.selectedBackground = $scope.darkModeBackground;
		}
	}
	// Setting light mode background
	else if(darkOrLight == $scope.LIGHT_MODE)
	{
		// Assigning image URL value from the method parameter, unless the user has selected the custom option, in which case the URL is edited by the user directly
		if(URL != "CUSTOM"){ $scope.lightModeBackground = URL; }
		else if(URL == "CUSTOM"){ $scope.lightModeBackground = $scope.customBackgroundImage; }

		// if the given URL value isn't N/A then this is set as the current background image
		if(URL != "N/A" && $scope.theme == $scope.LIGHT_MODE)
		{
			document.body.style.backgroundImage = 'url(' + $scope.lightModeBackground + ')';
			$scope.selectedBackground = $scope.lightModeBackground;
		}
		// else the default solid white background is used
		else if(URL == "N/A" && $scope.theme == $scope.LIGHT_MODE)
		{
			document.body.style.backgroundImage = "none";
			document.body.style.backgroundColor = $scope.WHITE;
			$scope.selectedBackground = $scope.lightModeBackground;
		}
	}
	
	// Displaying a tick next to the selected background image option
	$scope.displayBackgroundSelectionTick(URL);
	
	// Hiding background selection panel
	document.getElementById('backgroundSelectionPanel').style.opacity = "0";
	document.getElementById('backgroundSelectionPanel').style.visibility = "hidden";
}

// PURPOSE: This function displays a tick icon next to a background selection option with the same value as the given URL, and hides all other tick icons
// USE: This function is used in the setBackground method when the user clicks on a background option, and in the showBackgroundList function when switching between dark and light mode background panels
$scope.displayBackgroundSelectionTick = function(URL)
{
	// Showing the tick icon next to the background option that was selected (and hiding the tick icons for all other options)
	for(var i=1;i<=$scope.NUM_OF_BACKGROUNDS;i++){ document.getElementById('tickBG'+i).style.display = "none"; } // Hiding all tick icons first
	if(URL == "N/A")
	{
		// showing the tick icon for the background that has been selected
		document.getElementById('tickBG1').style.display = "block";
	}
	else if(URL == "https://upload.wikimedia.org/wikipedia/commons/a/aa/Herrsching_am_Ammersee_Bootshaus_351.jpg")
	{
		// showing the tick icon for the background that has been selected
		document.getElementById('tickBG2').style.display = "block";
	}
	else if(URL == "https://upload.wikimedia.org/wikipedia/commons/5/57/Building_in_Floyd_Bennett_Field_%2840715h%29.jpg")
	{
		// showing the tick icon for the background that has been selected
		document.getElementById('tickBG3').style.display = "block";
	}
	else if(URL == "https://upload.wikimedia.org/wikipedia/commons/6/6c/London_Eye_at_night_2.jpg")
	{
		// showing the tick icon for the background that has been selected
		document.getElementById('tickBG4').style.display = "block";
	}
	else if(URL == "https://upload.wikimedia.org/wikipedia/commons/6/66/Bamberg_Bavaria_80_.jpg")
	{
		// showing the tick icon for the background that has been selected
		document.getElementById('tickBG5').style.display = "block";
	}
	else if(URL == "https://upload.wikimedia.org/wikipedia/commons/a/a1/Gunzesried_Bavaria_Germany_Konraedler-Hof-01.jpg")
	{
		// showing the tick icon for the background that has been selected
		document.getElementById('tickBG6').style.display = "block";
	}
	else if(URL == "https://upload.wikimedia.org/wikipedia/commons/3/3d/Thurnau%2C_Marktplatz_10%2C_006.jpg")
	{	
		// showing the tick icon for the background that has been selected
		document.getElementById('tickBG7').style.display = "block";
	}
	else // For custom backgrounds that do not match the fixed background URLs
	{	
		// showing the tick icon for the background that has been selected
		document.getElementById('tickBG8').style.display = "block";
	}
}


// PURPOSE: This function calculates the number of days until a specified milestone (along with the current day as a percentage of the milestone day), and displays this in the HTML UI
// USE: This function is used in the displayMilestoneCountdowns function, and is executed in a loop for each active milestone so that the countdowns are only displayed for the active milestones
$scope.calculateMilestoneCountdown = function(milestoneNumber)
{
	// If the total days until the milestone day is less than or equal to zero then no countdown is created
	if($scope.milestones[milestoneNumber].daysUntilMilestone <= 0)
	{	
		// Displaying the corresponding milestone name alongside it's countdown
		document.getElementById('milestone'+milestoneNumber+'Name').innerHTML = $scope.milestones[milestoneNumber].name;
		
		document.getElementById('milestone'+milestoneNumber+'Countdown').style.display = "block";
		document.getElementById('milestone'+milestoneNumber+'ProgressBar').style.display = "block";
		document.getElementById('daysUntilMilestone'+milestoneNumber).innerHTML = $scope.COMPLETED;
		document.getElementById('milestone'+milestoneNumber+'ProgressBar').style.width = "100%";
		 
		return;
	}

	// Calculating the current number of days until the milestone day
	$scope.currentDaysUntilMilestone = $scope.milestones[milestoneNumber].daysUntilMilestone - $scope.currentDay;
	
	// Calculating the current day as a percentage of the milestone day
	$scope.percentageUntilMilestone = ($scope.currentDay / $scope.milestones[milestoneNumber].daysUntilMilestone) * 100;
	

	// Setting the countdown message
	// If there is more than 1 day to go then the plural " days" is used, if only one day left then singular " day" is used, and if the milestone is reached then this is mentioned explicitly
	$scope.countdownMessage = "";
	if($scope.currentDaysUntilMilestone > 1){ $scope.countdownMessage = $scope.currentDaysUntilMilestone + " " + $scope.Days; }
	else if($scope.currentDaysUntilMilestone == 1){ $scope.countdownMessage = $scope.currentDaysUntilMilestone + " " + $scope.Day; }
	else if($scope.currentDaysUntilMilestone < 1){ $scope.countdownMessage = $scope.COMPLETED; }

	document.getElementById('milestone'+milestoneNumber+'Countdown').style.display = "block";
	document.getElementById('daysUntilMilestone'+milestoneNumber).innerHTML = $scope.countdownMessage;


	// Displaying the corresponding milestone name alongside it's countdown
	document.getElementById('milestone'+milestoneNumber+'Name').innerHTML = $scope.milestones[milestoneNumber].name;

	// Setting the milestone progress bar width
	document.getElementById('milestone'+milestoneNumber+'ProgressBar').style.display = "block";
		// If the current day is less then the milestone day the percentage is displayed, otherwise the percentage is capped at 100%
	if($scope.currentDay < $scope.milestones[milestoneNumber].daysUntilMilestone)
	{ document.getElementById('milestone'+milestoneNumber+'ProgressBar').style.width = $scope.percentageUntilMilestone + "%"; }
	else{ document.getElementById('milestone'+milestoneNumber+'ProgressBar').style.width = "100%"; }
	
}

// PURPOSE: This function displays the countdown for every active milestone inside the milestone countdowns panel
// USE: This function is run whenever the user clicks on the time remaining text at the top
$scope.displayMilestoneCountdowns = function()
{
	// Initially clearing all milestone countdown displays
	for(var i=0;i<$scope.TOTAL_NUMBER_OF_MILESTONES;i++)
	{
		// Hiding all milestone countdown elements (name, progress bar, and countdown)
		document.getElementById('milestone'+i+'Countdown').style.display = "none";
		document.getElementById('milestone'+i+'ProgressBar').style.display = "none";
		document.getElementById('daysUntilMilestone'+i).innerHTML = "";
		document.getElementById('milestone'+i+'Name').innerHTML = "";
	}
	// Displaying the countdown for every active milestone
	for(var i=0;i<$scope.numberOfActiveMilestones;i++)
	{
		$scope.calculateMilestoneCountdown(i);
	}
	
	$scope.showAllCountdowns(false);
	document.getElementById('milestoneCountdowns').style.display = "block";
}



// This method closes the panel containing the individual milestone countdowns
$scope.closeMilestoneCountdowns = function()
{
	document.getElementById('milestoneCountdowns').style.display = "none";
}


// This method shows and hides the settings pane
$scope.showSettings = function(isShowSettings)
{
	// Showing Settings window (and hiding configure window)
	if(isShowSettings == true)
	{
		document.getElementById('settingsWindow').style.display = "block";
		document.getElementById('settingsWindowHeader').style.display = "block";

		document.getElementById('setupWindow').style.display = "none";
		document.getElementById('setupWindowHeader').style.display = "none";
	}
	// Hiding Settings window (and showing configure window)
	else if(isShowSettings == false)
	{
		document.getElementById('settingsWindow').style.display = "none";
		document.getElementById('settingsWindowHeader').style.display = "none";

		document.getElementById('setupWindow').style.display = "block";
		document.getElementById('setupWindowHeader').style.display = "block";
	}
}

// PURPOSE: This function modifies a selected milestone label so that it moves below all other milestone labels, overcoming the issue of overlapping labels
// USE: This function is triggered whenever the user clicks on a milestone label
$scope.standOutLabel = function(milestoneNum)
{
	if(milestoneNum <=0){ return; } // rejecting invalid input (milestone number starts at 1 in HTML DOM element names)
	
	// Retrieving the corresponding milestone label and marker HTML elements to be modified
	var labelMarker = document.getElementById("milestoneMarker" + milestoneNum); // This is the line that connects to the label
	var labelText = document.getElementById("milestoneLabel" + milestoneNum);	 // This is the label that contains the milestone day

	// Resetting the height and top properties of all markers before moving the selected marker
	for(var i=1;i<=$scope.numberOfActiveMilestones;i++)
	{
		document.getElementById('milestoneMarker' + i).style.height = $scope.STANDARD_LABEL_HEIGHT;
		document.getElementById('milestoneLabel' + i).style.top = $scope.STANDARD_LABEL_HEIGHT;
	}
	
	// If the label is at normal height then it will be moved down by 30 pixels
	if(window.getComputedStyle(labelText).getPropertyValue("top") === $scope.STANDARD_LABEL_HEIGHT)
	{
		labelMarker.style.height=$scope.LOWER_LABEL_HEIGHT;
		labelText.style.top = $scope.LOWER_LABEL_HEIGHT;
		
		// Setting the status bar text to display the days until the selected milestone
		$scope.statusBarText($scope.currentDay, milestoneNum);
	}
	// If the label has already been moved down then it will be moved back to normal height again
	else if(window.getComputedStyle(labelText).getPropertyValue("top") === $scope.LOWER_LABEL_HEIGHT)
	{
		labelMarker.style.height=$scope.STANDARD_LABEL_HEIGHT;
		labelText.style.top = $scope.STANDARD_LABEL_HEIGHT;
		
		// Setting the status bar text to revert back to showing the current day
		$scope.statusBarText($scope.currentDay, -1);
	}
	
}

// PURPOSE: This function returns either the current day, percentage, or date of a given milestone
// USE: This is used in each milestone marker on the progress bar in the HTML view
$scope.milestoneMarkerText = function(milestoneNum)
{
	// Nothing is returned if the milestone number is invalid
	if(milestoneNum < 0 || milestoneNum >= $scope.milestones.length){ return -1; }
	
	// By default each milestone marker on the progress bar will display X% (percentage until end date)
	if($scope.milestoneMarkerFormat == $scope.PERCENTAGE && $scope.daysUntilEnd > 0)
	{	
		// Calculating the milestone percentage and rounding it to one decimal point for presentation
		var milestonePercentage = (($scope.milestones[milestoneNum].daysUntilMilestone / $scope.daysUntilEnd)*100);
		milestonePercentage = Math.round(milestonePercentage * 10) / 10;
		
		return (milestonePercentage + "%");
	}
	// If the user has set the format to day number then each milestone marker will display Day X
	else if($scope.milestoneMarkerFormat == $scope.DAY_NUM)
	{
		return $scope.Day + " " + $scope.milestones[milestoneNum].daysUntilMilestone;
	}
	// If the user has set the format to date then each milestone marker will display the date the milestone is reached
	else if($scope.milestoneMarkerFormat == $scope.DATE)
	{
		var theDate = $scope.milestones[milestoneNum].date;
		
		return (theDate.getDate() + "-" + (theDate.getMonth()+1) + "-" + theDate.getFullYear());
	}
	
	// If non of the above values are provided then the day number is used by default in order to prevent a divide by zero error if total days until end is zero
	return $scope.Day + " " + $scope.milestones[milestoneNum].daysUntilMilestone;
}

// PURPOSE: This function is used to change the format of the milestone markers on the progress bar
// USE: This function is invoked on one of the three (percentage, day number, date) list items representing each format in the HTML view
$scope.switchMilestoneMarkerFormat = function(format)
{
	$scope.milestoneMarkerFormat = format;
	
	// Initially hiding all tick graphics
	document.getElementById('tickPercentage').style.display = "none";
	document.getElementById('tickDayNum').style.display = "none";
	document.getElementById('tickDate').style.display = "none";
	
	// Displaying a tick graphic next to the selected format
	if($scope.milestoneMarkerFormat == $scope.PERCENTAGE)
	{ document.getElementById('tickPercentage').style.display = "block"; }
	else if($scope.milestoneMarkerFormat == $scope.DAY_NUM)
	{ document.getElementById('tickDayNum').style.display = "block"; }
	else if($scope.milestoneMarkerFormat == $scope.DATE)
	{ document.getElementById('tickDate').style.display = "block"; }
}

// This function displays the confirm dialog whenever the user clicks on the reset settings button
$scope.confirmResetSettings = function()
{
	document.getElementById('confirmMessageResetSettings').style.display="block";
	document.getElementById('greyedOutBackgroundInfo').style.display = "block";
}

// PURPOSE: This function will reset all settings values back to their original defaults if the user clicks yes, and hides the confirm dialog in either case (note that the reset is not permanent until the user clicks the done button)
// USE: This function is triggered whenever the user clicks No or Yes in the confirm dialog window for resetting settings
$scope.resetSettings = function(confirm)
{
	// If the user has clicked yes on the confirm dialog then all three settings are reset back to their default values
	if(confirm == true)
	{
		// Resetting backgrounds to the default values
		$scope.darkModeBackground = "N/A";
		$scope.lightModeBackground = "N/A";

		$scope.switchTimeRemainingFormat($scope.DAYS);	     // Resetting time remaining format back to just days
		$scope.setTheme($scope.LIGHT_MODE); 			     // Resetting theme back to light mode
		$scope.switchCountdownLanguage($scope.ENGLISH);	     // Resetting the countdown language back to English
		$scope.switchMilestoneMarkerFormat($scope.PERCENTAGE);    // Resetting the milestone marker format to percentage
	}
	
	// Hiding the confirm dialog
	document.getElementById('confirmMessageResetSettings').style.display="none";
	document.getElementById('greyedOutBackgroundInfo').style.display = "none";
}


// This function displays the confirm dialog whenever the user clicks on the reset countdown values button
$scope.confirmResetValues = function()
{
	document.getElementById('confirmMessage').style.display="block";
	document.getElementById('greyedOutBackgroundInfo').style.display = "block";
}

// PURPOSE: This function will reset all countdown values back to their original defaults if the user clicks yes, and hides the confirm dialog in either case (note that the reset is not permanent until the user clicks the done button)
// USE: This function is triggered whenever the user clicks No or Yes in the confirm dialog window for resetting countdown values
$scope.resetValues = function(confirm)
{
	// If the user has clicked yes on the confirm dialog then all countdown values are reset back to their default values
	if(confirm == true)
	{
		// Fetching current date
		var currentSessionDate = new Date();
	    	currentSessionDate.setHours(0, 0, 0, 0); // Ignoring time from calculation
		
		$scope.currentDay = 0;
		$scope.daysUntilEnd = 10;
		$scope.milestones = [  {milestone: 1, daysUntilMilestone: 0, name: "Milestone 1", date: currentSessionDate},
		     					{milestone: 2, daysUntilMilestone: 0, name: "Milestone 2", date: currentSessionDate},
		  					{milestone: 3, daysUntilMilestone: 0, name: "Milestone 3", date: currentSessionDate},
		   					{milestone: 4, daysUntilMilestone: 0, name: "Milestone 4", date: currentSessionDate},
		   					{milestone: 5, daysUntilMilestone: 0, name: "Milestone 5", date: currentSessionDate},
		    					{milestone: 6, daysUntilMilestone: 0, name: "Milestone 6", date: currentSessionDate},
		     					{milestone: 7, daysUntilMilestone: 0, name: "Milestone 7", date: currentSessionDate},
		     					{milestone: 8, daysUntilMilestone: 0, name: "Milestone 8", date: currentSessionDate},
		     					{milestone: 9, daysUntilMilestone: 0, name: "Milestone 9", date: currentSessionDate},
		    					{milestone: 10, daysUntilMilestone: 0, name: "Milestone 10", date: currentSessionDate}];
		$scope.countdownName = "";
		$scope.countdownEndMessage = "";
		
		// Setting the start date to be the current date
		$scope.startDate = currentSessionDate;
	
		// Setting the end date to be the start date + 10 days
		var newEndDate = new Date();
		newEndDate.setFullYear($scope.startDate.getFullYear());
		newEndDate.setMonth($scope.startDate.getMonth());
		newEndDate.setDate( $scope.startDate.getDate() + $scope.daysUntilEnd );
		newEndDate.setHours(0, 0, 0, 0); 

		$scope.endDate = newEndDate;
	}
	
	// Hiding the confirm dialog
	document.getElementById('confirmMessage').style.display="none";
	document.getElementById('greyedOutBackgroundInfo').style.display = "none";
}


//					----STARTUP FUNCTIONS----

// PURPOSE: This function modifies the countdown day values (current day, daysUntilEnd, and milestone daysUntil) based on the start date, end date, and milestone dates
// USE: This function is run in the calculateProgressBar function after the user may have modified the date values
$scope.initialiseCountdownVariables = function()
{
	// Fetching current date
	var currentSessionDate = new Date();
	    currentSessionDate.setHours(0, 0, 0, 0); // Ignoring time from calculation

	// currentDay = Current_Date - Start_Date
	$scope.currentDay = Math.round( (currentSessionDate - $scope.startDate)/86400000 );
									
	// daysUntilEnd = End_Date - Start_Date
	$scope.daysUntilEnd = Math.round( ($scope.endDate - $scope.startDate)/86400000 );
									
	// daysUntilMilestone = milestone_date - startDate
	for(var i=0;i<$scope.milestones.length;i++)
	{
		$scope.milestones[i].daysUntilMilestone = Math.round( ($scope.milestones[i].date - $scope.startDate)/86400000 );
	}
}

// PURPOSE: This function initialises the values for the start date, end date, and milestone date values, used to modify the countdown day values (current day, daysUntilEnd, and milestone daysUntil)
// USE: This function is run on startup to initialise the countdown date values
$scope.initialiseCountdownDates = function()
{
	// Fetching current date
	var currentSessionDate = new Date();
	    currentSessionDate.setHours(0, 0, 0, 0); // Ignoring time from calculation
	
	// Calculating the date the countdown would of started (currentDate - currentDay)
	$scope.startDate.setFullYear(currentSessionDate.getFullYear());
	$scope.startDate.setMonth(currentSessionDate.getMonth());
	$scope.startDate.setDate(currentSessionDate.getDate() - $scope.currentDay);
	
	// Calculating the date the countdown will end (startDate + daysUntilEnd)
	$scope.endDate.setFullYear($scope.startDate.getFullYear());
	$scope.endDate.setMonth($scope.startDate.getMonth());
	$scope.endDate.setDate($scope.startDate.getDate() + $scope.daysUntilEnd);
}

// This method converts a string milestones array into an integer milestones array (used because it is stored as a string in web storage)
var milestonesAsInteger = function()
{
	// for each milestone in the milestones array the element is assigned the integer versions of their attribute values
	for(var i = 0;i<$scope.milestones.length;i++)
	{
		$scope.milestones[i].milestone = parseInt($scope.milestones[i].milestone);
		$scope.milestones[i].daysUntilMilestone = parseInt($scope.milestones[i].daysUntilMilestone);
	}
}
milestonesAsInteger();

// This method is used to set the correct theme (dark or light) on startup
var initialiseTheme = function()
{
	//			Automatically setting the theme to dark or light depending on the time of day (if auto is enabled)
	// Creating variables to represent the hours 18:00, 00:00, and 06:00, as well as the current time
	var currentTime = new Date();
	var evening = new Date();
	    evening.setHours(18, 0, 0);
	var morning = new Date();
	    morning.setHours(6, 0, 0);
	var midnight = new Date();
	    midnight.setHours(0, 0, 0);
		
	// This boolean represents if the current time is between 00:00 - 06:00
	var midnightToMorning = (currentTime.getHours() >= midnight.getHours() && currentTime.getHours() < morning.getHours());
	
	// This boolean represents if the current time is between 18:00 - 00:00
	var eveningToMidnight = (currentTime.getHours() >= evening.getHours() && currentTime.getHours() < 24);
		
	// If auto mode is on then it will set theme to dark mode if the time is between 18:00 - 06:00
	if($scope.autoTheme == true && (eveningToMidnight || midnightToMorning)){ $scope.theme = $scope.DARK_MODE; }
	// Otherwise if the time is between 06:00 - 18:00 light mode is used
	else if($scope.autoTheme == true){ $scope.theme = $scope.LIGHT_MODE; }

	// Changing the UI to the appropriate theme (and displaying a tick next to the selected background image)
	if($scope.theme == $scope.DARK_MODE){ $scope.setTheme($scope.DARK_MODE); }
	else if($scope.theme == $scope.LIGHT_MODE){ $scope.setTheme($scope.LIGHT_MODE); }
}
initialiseTheme();

// this function sets up the UI according to the previous user input values (i.e. how many milestones the user has set)
var initialiseUI = function()
{
	// The tick graphic indicating the countdown format is set in the appropriate list item
	if($scope.timeRemainingFormat == $scope.DAYS)
	{
		document.getElementById('tickDays').style.display="block";
	}
	else if($scope.timeRemainingFormat == $scope.WEEKS)
	{
		document.getElementById('tickWeeks').style.display="block"; 
	}
	else if($scope.timeRemainingFormat == $scope.MONTHS)
	{
		document.getElementById('tickMonths').style.display="block";
	}
	else if($scope.timeRemainingFormat == $scope.MONTHS_DAYS)
	{
		document.getElementById('tickMonthsDays').style.display="block";
	}
	
	// Setting the countdown language to be whatever was previously set
	$scope.switchCountdownLanguage($scope.countdownLang);

	// Setting the milestone marker format to whatever was previously set
	$scope.switchMilestoneMarkerFormat($scope.milestoneMarkerFormat);
	
	// Only displaying the input UI for all active milestones in the setup window (the input boxes for inactive milestones are hidden)
	for(var i=0;i<$scope.TOTAL_NUMBER_OF_MILESTONES;i++){ var milestoneNum = i+1; document.getElementById('milestone' + milestoneNum).style.display="none"; }
	for(var i=0;i<$scope.numberOfActiveMilestones;i++)
	{
		var milestoneNum = i+1;
		document.getElementById('milestone' + milestoneNum).style.display="block";
	}
	
		// INITIALISING CURRENT DAY
	// Fetching current date
	var currentDate = new Date();
	    currentDate.setHours(0, 0, 0, 0); // Ignoring time from calculation
	
	// If there is a previous session date then the total number of days passed is calculated and added onto the current day
	if(localStorage.previousSessionDate !== undefined)
	{	
		// Fetching the date of the previous session
		var previousSessionDate = Date.parse(localStorage.previousSessionDate);
		
		// Subtracting the two dates to get the difference in milliseconds
		var dateDifference = Math.abs(currentDate - previousSessionDate);
				
		// Dividing the date difference by the number of milliseconds in one day to calculate how many days have passed since the previous session
		var daysSincePreviousSession = parseInt(dateDifference/86400000);
	
		// Adding on the number of days that have passed to the current day value
		$scope.currentDay = Math.round($scope.currentDay + daysSincePreviousSession);
		if($scope.currentDay > $scope.daysUntilEnd){ $scope.currentDay = $scope.daysUntilEnd; } // Limiting the current day value to be the end day value at the very most
		
		// Assigning the current date as the new previous date for the next time the web app is loaded
		localStorage.previousSessionDate = currentDate;
	}
	else // if the previous session date was not recorded then the current date is set as the next previous session date
	{
		localStorage.previousSessionDate = currentDate;
	}
	
	// If there are 10 milestones then the plus button in the All Countdowns pane is greyed out
	if($scope.numberOfCountdowns >= 10){ $scope.plusButtonAllCountdowns = "Icons/plusGreyedOut.svg"; }


	$scope.initialiseCountdownDates();

	// Correcting the milestone dates to be relative to the start date if the countdown has ended (which causes the start and end dates to increase each day so that the end date is not before the current date)
	if($scope.currentDay == $scope.daysUntilEnd)
		{
			for(var i=0;i<$scope.numberOfActiveMilestones;i++)
			{
				$scope.milestones[i].date.setFullYear($scope.startDate.getFullYear());
				$scope.milestones[i].date.setMonth($scope.startDate.getMonth());
				$scope.milestones[i].date.setDate($scope.startDate.getDate() + $scope.milestones[i].daysUntilMilestone);
			}
		}
	
	// setting up the progress bar with the user input values from the previous session
	$scope.calculateProgressBar();
	
	// Setting the time remaining to be in the correct format on load
	$scope.labelText($scope.daysUntilEnd - $scope.currentDay, " Remaining");
}
initialiseUI();


});