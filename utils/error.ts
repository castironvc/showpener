export const getError = (error: any, message: string) => {
  return {
    server: error,
    details: {
      message:
        "Code: " + error.status + " (" + error.message + ") - " + message,
    },
    error: true,
  };
};

export const getTicketMasterError = (error: any, message: string) => {
  return {
    server: error,
    details: {
      message: "Code: " + error.code + " (" + error.message + ") - " + message,
    },
    error: true,
  };
};
