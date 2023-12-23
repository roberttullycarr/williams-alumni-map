

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// credentials you have generated when creating the service account. TIP: DO NOT check this into your Git repo and it to your .gitignore file
// Create a document object using the ID of the spreadsheet - obtained from its URL.
const clientEmail = `${process.env.NEXT_PUBLIC_CLIENT_EMAIL}`;
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

export const getAlumniData = async () =>{
    try {
      const serviceAccountAuth = new JWT({
        // env var values here are copied from service account credentials generated by google
        // see "Authentication" section in docs for more info
        email: clientEmail,
        key: privateKey,
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
        ],
      }); 
    // google sheets

    const doc = new GoogleSpreadsheet(`${process.env.NEXT_PUBLIC_SPREADSHEET_ID}`, serviceAccountAuth);
 
    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] -- get first sheet in the document

    const rows = await sheet.getRows(); // return the rows from the 1st sheet
    // this returns the videos
    const alumni = rows.map((row: any) => {
      // return the data for each video (or whatever each row is in your sheet)
    if (row !== null) {
        return {
          type: "Feature",
          properties: {
            color: row.get("color"),
            name: row.get("name"),
            class: row.get("class"),
            employer: row.get("employer"),
            type: row.get("type"),
            title: row.get("title"),
            cluster: false,
          },
          geometry: {
            type: 'Point',
            coordinates: [row.get("longitude"), row.get("latitude")]
          },
      };
    }
    });
    const alumniJSON = JSON.parse(JSON.stringify(alumni));
    // console.log('alumniJSON[25].geometry.coordinates :>> ', alumniJSON[25].geometry.coordinates);
    const finalData = alumniJSON.filter((point: any) => point.geometry.coordinates[0] !== null  || undefined || '')
    // console.log('finalData :>> ', finalData);
    return finalData;
  } catch (error) {
    //   log any errors to the console
    console.log(error);
  }
}
