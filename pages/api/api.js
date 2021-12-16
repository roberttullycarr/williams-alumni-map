const { GoogleSpreadsheet } = require("google-spreadsheet");
// credentials you have generated when creating the service account. TIP: DO NOT check this into your Git repo and it to your .gitignore file
// Create a document object using the ID of the spreadsheet - obtained from its URL.
const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

export async function getAlumniData() {
    try {
    // google sheets
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] -- get first sheet in the document

    const rows = await sheet.getRows(); // return the rows from the 1st sheet
      // this returns the videos
    const alumni = rows.map((row) => {
      // return the data for each video (or whatever each row is in your sheet)
    if (row !== null) {
        return {
          type: "Feature",
          properties: {
            color: row.color,
            name: row.name,
            class: row.class,
            employer: row.employer,
            type: row.type,
            title: row.title,
            cluster: false,
          },
          geometry: {
            type: 'Point',
            coordinates: [row.longitude, row.latitude]
          },
      };
    }
    });
    const alumniJSON = JSON.parse(JSON.stringify(alumni));

    return alumniJSON.filter(point => point.geometry.coordinates[0] !== null  || undefined || '');
  } catch (error) {
    //   log any errors to the console
    console.log(error);
  }
}