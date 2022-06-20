import emailTemplate from "../templates/EmailTemplate";
export const newUserAdminEmail = async (type: string, content: any) => {
  let emailTemplateObj = {};
  if (type === "promoter") {
    emailTemplateObj = {
      content: emailTemplate({
        name: content.adminName,
        phone: content.mobilePhone,
        email: content.adminEmail,
        adminEmail: "mike@gamaroff.net",
        message: content.adminMessage,
        type: "promoter",
        emailTitle: "New Promoter Sign up!",
      }),
      name: content.adminName,
      subject: "New Promoter Sign up",
      message: content.adminMessage,
      type: "promoter",
    };
  } else if (type === "new_enduser") {
    /*     name: state.userProfile.session.name,
    mobilePhone: state.userProfile.mobilePhone,
    state: state.userProfile.state, */
    emailTemplateObj = {
      content: emailTemplate({
        name: content.name,
        phone: content.mobilePhone,
        email: "",
        adminEmail: "mike@gamaroff.net",
        message: content.state,
        type: "new_enduser",
        emailTitle: "New Music Fan Sign up!",
      }),
      name: content.adminName,
      subject: "New Music Fan Sign up!",
      message: "",
      type: "new_enduser",
    };
  }

  const events = await fetch("/api/email/mailgun_admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emailTemplateObj),
  });

  const result = await events.json();

  return result;
};
