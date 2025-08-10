function calculateDays() {
    let month = parseInt(document.getElementById("month").value);
    let year = parseInt(document.getElementById("year").value);

    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let weekdays = { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 };
    let weekends = 0;

    for (let day = 1; day <= daysInMonth; day++) {
        let date = new Date(year, month, day);
        let dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        weekdays[dayName]++;

        if (dayName === "Saturday" || dayName === "Sunday") {
            weekends++;
        }
    }

    let resultHTML = `<h2>Results for ${new Date(year, month).toLocaleString('en-US', { month: 'long' })} ${year}</h2>`;
    resultHTML += "<ul>";
    for (let day in weekdays) {
        resultHTML += `<li>${day}: ${weekdays[day]}</li>`;
    }
    resultHTML += `<li><strong>Total Weekends:</strong> ${weekends}</li>`;
    resultHTML += "</ul>";

    document.getElementById("results").innerHTML = resultHTML;
}
