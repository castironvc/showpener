const https = require("https");
const url = "https://catfact.ninja/fact";
exports.handler = function (context, event, callback) {
  const twiml = new Twilio.twiml.MessagingResponse();
  const request = https.request(url, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data = data + chunk.toString();
    });

    response.on("end", () => {
      const body = JSON.parse(data);
      twiml.message(`Your quote is: ${body.fact}🎉`);
      callback(null, twiml);
    });
  });

  request.on("error", (error) => {
    console.log("An error", error);
  });

  request.end();
};
