var greeting = "";
let currentHour = new Date().getHours();

if (currentHour < 12) {
  greeting = "Good Morning!";
} else if (currentHour >= 12 && currentHour < 17) {
  greeting = "Good Afternoon!";
} else {
  greeting = "Good Evening!";
}

export { greeting };
