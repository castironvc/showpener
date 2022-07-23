import emailTemplate from "../templates/EmailTemplate";
require("dotenv").config({ path: "../.env" });

const adminEmail = process.env.ADMIN_EMAIL;
export const newUserAdminEmail = async (type: string, content: any) => {
  let emailTemplateObj = {};
  if (type === "promoter") {
    emailTemplateObj = {
      content: emailTemplate({
        name: content.adminName,
        phone: content.mobilePhone,
        email: content.adminEmail,
        adminEmail: adminEmail || "",
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
        adminEmail: adminEmail || "",
        message: content.state,
        type: "new_enduser",
        emailTitle: "New Music Fan Sign up!",
      }),
      name: content.adminName,
      subject: "New Music Fan Sign up!",
      message: "",
      type: "new_enduser",
    };
  } else if (type === "contact") {
    /*     name: state.userProfile.session.name,
    mobilePhone: state.userProfile.mobilePhone,
    state: state.userProfile.state, */
    /// console.log(content.name);
    emailTemplateObj = {
      content: emailTemplate({
        name: content.name,
        phone: content.phone,
        email: content.email,
        adminEmail: adminEmail || "",
        message: content.message,
        type: "contact_form",
        emailTitle: "Contact Form Signup",
      }),
      name: content.name,
      subject: "New Contact Form",
      message: content.message,
      type: "contact_form",
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
