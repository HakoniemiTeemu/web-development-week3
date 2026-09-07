const populationURL =
    "https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/vaerak/11ra.px";

const employmentURL =
    "https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/tyokay/115b.px"

const fetchStatFinData = async (URL, body) => {
    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    return await response.json();
};

const initializeCode = async () => {
    const populationBody =
        await (await fetch("/population_query.json")).json();

    const employmentBody =
        await (await fetch("/employment_query.json")).json();

    const [populationData, employmentData] = await Promise.all([
        fetchStatFinData(populationURL, populationBody),
        fetchStatFinData(employmentURL, employmentBody)
    ]);

    setupTable(populationData, employmentData);
};

const setupTable = (populationData, employmentData) => {
    const municipalities =
        populationData.dimension.alue_23_20260101.category.label;

    const populations = populationData.value;
    const employments = employmentData.value;

    const tableBody = document.querySelector("tbody");

    Object.values(municipalities).forEach((municipality, index) => {
        const row = document.createElement("tr");

        const municipalityCell = document.createElement("td");
        municipalityCell.textContent = municipality;

        const populationCell = document.createElement("td");
        populationCell.textContent = populations[index];

        const employmentCell = document.createElement("td");
        employmentCell.textContent = employments[index];

        row.appendChild(municipalityCell);
        row.appendChild(populationCell);
        row.appendChild(employmentCell)

        tableBody.appendChild(row);
    });
};

initializeCode();