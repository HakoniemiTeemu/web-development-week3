const populationURL = "https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/vaerak/11ra.px";

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
    const populationBody = await (await fetch("/population_query.json")).json();

    const [populationData] = await Promise.all([
        fetchStatFinData(populationUrl, populationBody)
    ]);

    setupTable(populationData, populationBody);
}