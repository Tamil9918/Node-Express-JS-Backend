const { exec } = require("child_process");
const publishVectorToDb = async (lyrPath, lyrName, schema) => {
  console.log(lyrPath, lyrName, schema);
  const ogr2ogrPath = process.env.OGR2OGRCMD;
  const ogrCommand = `"${ogr2ogrPath}" -f "PostgreSQL" "PG:host=host.docker.internal port=5432 user=postgres dbname=postgres password=postgres" "${lyrPath}" -lco GEOMETRY_NAME=geom -lco FID=gid -lco SPATIAL_INDEX=GIST -nlt PROMOTE_TO_MULTI -nln "${schema}.${lyrName}" -overwrite`;
  let err;
  return new Promise((resolve, reject) => {
    exec(ogrCommand, (error, stdout, stderr) => {
      if (error) {
        err = {
          layerUploaded: false,
          message: `${error}`,
        };
        resolve(err);
      }
      if (stdout.includes("failure")) {
        err = {
          layerUploaded: false,
          message: "Error in uploading layer to database",
        };
        resolve(err);
      }
      const resp = {
        layerUploaded: true,
        message: "success",
      };
      resolve(resp);
    });
  });
};
module.exports = { publishVectorToDb };
