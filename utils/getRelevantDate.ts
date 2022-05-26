import moment from "moment";

const getRelevantDate = (date: string) => {
  const nowDate = moment();

  if (date && date !== "TBD") {
    const tmpDate = moment(date, "YYYY-MM-DDTHH:mm:ss.SSSZ");

    // check to see if the date is before right now meaning that we are rejecting this event
    if (tmpDate.isBefore(nowDate)) {
      console.log(tmpDate + " --- DATE MISMATCH");
      return null;
    } else {
      console.log(tmpDate + " --- DATE MATCH");
      return tmpDate;
    }
  } else {
    console.log("NO DATE FOUND");
    return null;
  }
};

export default getRelevantDate;
