// deno-lint-ignore-file no-explicit-any

import _ from "npm:lodash@4.17";

// interface Notification {
//   date: string | undefined;
//   time: string | undefined;
//   neighborhood: string | undefined;
//   beat: string | undefined;
//   comments: string;
// }


const response = await fetch('https://services5.arcgis.com/54falWtcpty3V47Z/arcgis/rest/services/SalesForce311_View/FeatureServer/0/query?f=json&where=DateUpdated BETWEEN CURRENT_TIMESTAMP - 2 AND CURRENT_TIMESTAMP&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=OBJECTID%2CReferenceNumber%2CCategoryLevel1%2CCategoryLevel2%2CCategoryName%2CCouncilDistrictNumber%2CSourceLevel1%2CNeighborhood%2CDateCreated%2CDateUpdated%2CDateClosed%2CZIP%2CAddress%2CPublicStatus&orderByFields=OBJECTID ASC&outSR=4326')
// const response = await fetch('https://services5.arcgis.com/54falWtcpty3V47Z/arcgis/rest/services/SalesForce311_View/FeatureServer/0/query?f=json&where=DateCreated BETWEEN CURRENT_TIMESTAMP - 4 AND CURRENT_TIMESTAMP - 2&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=OBJECTID%2CReferenceNumber%2CCategoryLevel1%2CCategoryLevel2%2CCategoryName%2CCouncilDistrictNumber%2CSourceLevel1%2CNeighborhood%2CDateCreated%2CDateUpdated%2CDateClosed%2CZIP%2CAddress%2CPublicStatus&orderByFields=OBJECTID ASC&outSR=4326')
const json = await response.json()
const { features } = json
const transformed = features.map(feature => {
  const { attributes, geometry } = feature
  const { DateCreated, DateUpdated, DateClosed } = attributes
  return {
    ...attributes,
    DateCreated: new Date(DateCreated),
    DateUpdated: new Date(DateUpdated),
    DateClosed: new Date(DateClosed),
    ...geometry
  }
})
const existingFile = await Deno.readTextFile("./calls.json");
const existing = JSON.parse(existingFile);
const all = [...transformed]
existing.forEach(d => {
  const isInCurrentScrape = all.find(dd => dd.ReferenceNumber === d.ReferenceNumber)
  if (isInCurrentScrape) return
  all.push(d)
})
const sorted = _.orderBy(all, ["ReferenceNumber"]);
console.log(`Saving to a file`);
await Deno.writeTextFile("./calls.json", JSON.stringify(sorted, null, 2));
console.log(`All done`);
