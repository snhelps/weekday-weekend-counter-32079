document.addEventListener("DOMContentLoaded", () => {
  const yearsSelect = document.getElementById("years");
  const currentYear = new Date().getFullYear();
  const startYear = 1900;
  const endYear = 2100;

  for (let y = startYear; y <= endYear; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearsSelect.appendChild(option);
  }

  // Preselect the current year
  yearsSelect.value = currentYear;
});

function calculateDays() {
  const monthsSelect = document.getElementById("months");
  const yearsSelect = document.getElementById("years");

  const selectedMonths = Array.from(monthsSelect.selectedOptions).map(opt => parseInt(opt.value));
  const selectedYears = Array.from(yearsSelect.selectedOptions).map(opt => parseInt(opt.value));

  if (selectedMonths.length === 0) {
    alert("Please select at least one month.");
    return;
  }
  if (selectedYears.length === 0) {
    alert("Please select at least one year.");
    return;
  }

  let weekdays = { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 };
  let weekends = 0;
  let totalDays = 0;

  selectedYears.forEach(year => {
    selectedMonths.forEach(month => {
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        weekdays[dayName]++;
        totalDays++;

        if (dayName === "Saturday" || dayName === "Sunday") {
          weekends++;
        }
      }
    });
  });

  const monthsNames = selectedMonths
    .map(m => new Date(0, m).toLocaleString('en-US', { month: 'long' }))
    .join(", ");
  const yearsList = selectedYears.join(", ");

  let resultHTML = `<h2>Results for Months: ${monthsNames} | Years: ${yearsList}</h2>`;
  resultHTML += `<p><strong>Total Days Counted:</strong> ${totalDays}</p>`;
  resultHTML += "<ul>";
  for (let day in weekdays) {
    resultHTML += `<li>${day}: ${weekdays[day]}</li>`;
  }
  resultHTML += `<li><strong>Total Weekends:</strong> ${weekends}</li>`;
  resultHTML += "</ul>";

  document.getElementById("results").innerHTML = resultHTML;
}
