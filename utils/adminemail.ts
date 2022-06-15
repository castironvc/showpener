import emailTemplate from "../templates/EmailTemplate";
export const newUserAdminEmail = async (type: string, content: any) => {
  let emailTemplateObj = {};
  if (type === "promoter") {
    emailTemplateObj = {
      content: emailTemplate({
        name: content.adminName,
        phone: content.mobilePhone,
        promoterEmail: content.email,
        adminEmail: "mike@gamaroff.net",
        message: content.message,
        type: "promoter",
      }),
      email: content.adminEmail,
      name: content.adminName,
      subject: "New Promoter Sign up",
      type: "promoter",
    };
  } else if (type === "new_enduser") {
    /*     emailTemplate = {
      content:
        "Hello Cool " +
        content.name +
        " would like to say hello. His phone number is " +
        content.mobilePhone +
        " and lives in " +
        content.state +
        " and here is what I have to say: ",
      email: "mike@gamaroff.net",
      name: content.name,
      subject: "New Music Fan Sign Up",
    }; */
    /*     EmailTemplate({myuser: emailTemplate, type: "new_enduser"}) */
  }

  const events = await fetch("/api/email/mailgun", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emailTemplateObj),
  });

  const result = await events.json();

  return result;
};
