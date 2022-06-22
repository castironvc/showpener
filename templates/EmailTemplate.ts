type adminEmailProps = {
  name: string;
  phone: string;
  email: string;
  adminEmail: string;
  message: string;
  type: string;
  emailTitle: string;
};

const EmailTemplate = ({
  name,
  phone,
  email,
  adminEmail,
  message,
  type,
  emailTitle,
}: adminEmailProps) => {
  const customFooter = `This email was sent to ${adminEmail} because it is the
registered administrative email address for
Showpener.com`;

  let customContent;

  const emailHeadHtml = `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office" lang="en" xml:lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <style type="text/css">
        @import url("https://use.typekit.net/mly7gim.css");

        html {
            background: #3b3b3b;
            font-family: "fieldwork", sans-serif !important;
        }

        /* WINDOWS 10 MAIL LINK FIX */
        a {
            text-decoration: none;
        }

        /* iOS GMAIL WEB FONT SIZE FIX */
        .gmail-fix {
            display: none;
            display: none !important;
        }

        /* iOS GMAIL APP WIDTH FIX */
        u+#new-gmail-fix {
            display: block !important;
        }

        /* /////////////////// FIX */
        .cta-hover:hover {
            background-color: #639420 !important;
            color: #ffffff !important;
        }

        /* /////////////////// FIX */
        /* CTA ROLLOVER IF SUPPORTED */
        .cta-hover:hover {
            color: #ffffff !important;
            background-color: #639420 !important;
        }

        .overline {
            font-family: "fieldwork", sans-serif !important;
            font-size: 10px;
            padding: 0;
            margin: 0;
            color: #202124;
            letter-spacing: 1px;
            text-transform: capitalize;
        }

        h1 {
            font-family: "Inter", sans-serif;
            font-weight: 700;
            font-size: 36px;
            color: #202124;
            letter-spacing: -0.02px;
            margin: 0;
        }

        .body1 {
            font-family: "fieldwork", sans-serif !important;
            font-size: 16px;
            color: #3c4043;
            letter-spacing: -0.02px;
            line-height: 24px;
        }

        h2 {
            font-family: "fieldwork", sans-serif !important;
            font-weight: 700;
            font-size: 28px;
            color: #202124;
            letter-spacing: -0.02px;
            margin: 38px 0 0 0;
        }

        @media screen and (min-width: 600px) {
            .side-padding {
                padding: 0 92px 0 92px;
                margin: 0;
            }
        }

        @media screen and (max-width: 600px) {
            .side-padding {
                padding: 0 24px 0 24px;
                margin: 0;
            }
        }
    </style>

    <!--[if mso]>
      <style type="text/css">
        table {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        table td {
          border-collapse: collapse;
        }
        .mso-cta {
          padding: 10px 0 10px 0 !important;
          font-weight: bold !important;
        }
      </style>
    <![endif]-->
</head>

<body bgcolor="#F5F5F5" style="padding: 0; margin: 0; background: #f5f5f5">
    <center>
        <!-- OUTER WRAPPER -->
        <table align="center" bgcolor="#F5F5F5" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td align="center" style="padding: 0px 0 0 0">
                        <!-- CONTENT CONTAINER -->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                            <tbody>
                                <tr bgcolor="#F5F5F5" height="20">
                                    <td style="padding: 0 0 0 0; height: 20px"></td>
                                </tr>
                                <tr bgcolor="#F5F5F5">
                                    <td align="center" style="padding: 0 0 0 0" width="600px">
                                    <img width="137" height="97"
                                    src="https://showpener.com/images/logoPurple.png" alt="Showpener" />
                                           </td>
                                </tr>
                                <tr bgcolor="#F5F5F5" height="20">
                                    <td style="padding: 0 0 0 0; height: 20px"></td>
                                </tr>
                                <!-- TEXT CONTENT CONTAINER -->
                                <tr bgcolor="#FFFFFF">
                                    <td align="center" style="padding: 0 0 0 0" width="600px">
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                                            <tbody>
                                                <tr bgcolor="#FFFFFF" height="56">
                                                    <td style="padding: 0 0 0 0; height: 56px"></td>
                                                </tr>
                                                <tr bgcolor="#FFFFFF">
                                                    <td class="side-padding">
                                                        <span style="
                                  font-family: 'fieldwork', sans-serif;
                                  font-weight: 500;
                                  font-size: 10px;
                                  padding: 0;
                                  margin: 0;
                                  color: #202124;
                                  letter-spacing: 1px;
                                  text-transform: uppercase;
                                ">Never Miss A Show</span>
                                                        <h1 style="
                                  font-family: 'fieldwork', sans-serif;
                                  font-weight: 700;
                                  font-size: 36px;
                                  color: #202124;
                                  letter-spacing: -0.02px;
                                  margin: 0;
                                ">${emailTitle}</h1>`;

  const emailFootHtml = `
</td>
</tr>
</tbody>
</table>
</td>
</tr>

<tr bgcolor=" #FFFFFF" height="22">
<td style="padding: 0 0 0 0; height: 22px"></td>
</tr>
<tr bgcolor="#FFFFFF">
<td align="center">
<div>
<!--[if mso]>
<v:roundrect
xmlns:v="urn:schemas-microsoft-com:vml"
xmlns:w="urn:schemas-microsoft-com:office:word"
href="http://"
style="
height: 36px;
v-text-anchor: middle;
width: 200px;
"
arcsize="50%"
strokecolor="#e6e6e8"
fillcolor="#fafafb"
>
<w:anchorlock />
<center
style="
color: #2f353e;
font-family: sans-serif;
font-size: 13px;
font-weight: bold;
"
>
Show me the button!
</center>
</v:roundrect> <!
[endif]--><a href="http://showpener.com" style="
background-color: #000000;
padding: 11px 24px 11px 24px;
margin: 10px 0 0px 0;
border-radius: 8px;
font-family: 'fieldwork', sans-serif;
font-weight: 600;
font-size: 14px;
color: #ffffff;
letter-spacing: 0;
display: inline-block;
text-align: center;
text-decoration: none;
-webkit-text-size-adjust: none;
">Go to Showpener.com</a>
</div>
</td>
</tr>

<tr bgcolor="#FFFFFF" height="32">
<td style="padding: 0 0 0 0; height: 32px"></td>
</tr>

<tr bgcolor="#FFFFFF">
<td align="center">
<table cellpadding="0" cellspacing="0 0 0 0" border="0" width="520">
<tbody>
<tr width="520" style="width: 520px">
<td bgcolor="#FFFFFF" style="
border-bottom: solid 1px #dadce0;
background: #ffffff;
width: 520px;
">
    &nbsp;
</td>
</tr>
</tbody>
</table>
</td>
</tr>

<tr bgcolor="#FFFFFF" height="32">
<td style="padding: 0 0 0 0; height: 32px"></td>
</tr>
<tr bgcolor="#FFFFFF">
<td class="side-padding">
<p style="
font-family: 'fieldwork', sans-serif;
font-weight: 500;
font-size: 16px;
color: #3c4043;
letter-spacing: -0.02px;
line-height: 24px;
">
Thank you,
</p>
<p style="
font-family: 'fieldwork', sans-serif;
font-weight: 500;
font-size: 16px;
padding-bottom: 40px;
color: #3c4043;
letter-spacing: -0.02px;
line-height: 24px;
">
Showpener.com
</p>
</td>
</tr>

<tr>
<td class="side-padding">
<p style="
font-family: 'fieldwork', sans-serif;
font-weight: 500;
font-size: 12px;
color: #5f6368;
padding-top: 30px;
letter-spacing: 0;
text-align: center;
line-height: 20px;
">
Showpener Inc, 1600 Pennsylvania Ave, D.C
</p>
<p style="
font-family: 'fieldwork', sans-serif;
font-weight: 500;
font-size: 12px;
color: #5f6368;
letter-spacing: 0;
text-align: center;
line-height: 20px;
">
${customFooter}
</p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</center>
</body>

</html>`;

  if (type === "promoter") {
    customContent = `
    
<p style="
font-family: 'fieldwork', sans-serif;
font-weight: 500;
font-size: 16px;
color: #3c4043;
letter-spacing: -0.02px;
line-height: 24px;
margin-top: 30px;
">
    A Promoter has signed up on Showpener.com and
    they submitted the following information:
</p>

<h3>Name:</h3>
<p style="
font-family: 'fieldwork', sans-serif;
font-weight: 500;
font-size: 16px;
color: #3c4043;
letter-spacing: -0.02px;
line-height: 24px;
">
    ${name}
</p>
<h3>Phone number:</h3>
<p style="
font-family: 'fieldwork', sans-serif;
font-weight: 500;
font-size: 16px;
color: #3c4043;
letter-spacing: -0.02px;
line-height: 24px;
">
    ${phone}
</p>
<h3>Email address:</h3>
<p style="
font-family: 'fieldwork', sans-serif;
font-weight: 500;
font-size: 16px;
color: #3c4043;
letter-spacing: -0.02px;
line-height: 24px;
">
    ${email}
</p>
<h3>Message:</h3>
<p style="
font-family: 'fieldwork', sans-serif;
font-weight: 500;
font-size: 16px;
color: #3c4043;
letter-spacing: -0.02px;
line-height: 24px;
">
    ${message}
</p>
<div style="height: 2px; background: lightgray; margin-top:
    40px"></div>
<p style=" font-family: 'fieldwork' , sans-serif; font-weight:
    500; font-size: 16px; color: #3c4043; letter-spacing:
    -0.02px; line-height: 24px; ">
    Go to Showpener.com, or contact the promoter for
    next steps.
</p>
`;
  } else if (type === "new_enduser") {
    customContent = `
    
    <p style="
    font-family: 'fieldwork', sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #3c4043;
    letter-spacing: -0.02px;
    line-height: 24px;
    margin-top: 30px;
    ">
       A new user has signed up on Showpener.com and
        they submitted the following information:
    </p>
    
    <h3>Name:</h3>
    <p style="
    font-family: 'fieldwork', sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #3c4043;
    letter-spacing: -0.02px;
    line-height: 24px;
    ">
        ${name}
    </p>
    <h3>Phone number:</h3>
    <p style="
    font-family: 'fieldwork', sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #3c4043;
    letter-spacing: -0.02px;
    line-height: 24px;
    ">
        ${phone}
    </p>
    <h3>Who lives in:</h3>
    <p style="
    font-family: 'fieldwork', sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #3c4043;
    letter-spacing: -0.02px;
    line-height: 24px;
    ">
        ${message}
    </p>
    <div style="height: 2px; background: lightgray; margin-top:
        40px"></div>
    <p style=" font-family: 'fieldwork' , sans-serif; font-weight:
        500; font-size: 16px; color: #3c4043; letter-spacing:
        -0.02px; line-height: 24px; ">
        Go to Showpener.com, or contact the promoter for
        next steps.
    </p>
    `;
  } else if (type === "contact_form") {
    customContent = `
    
    <p style="
    font-family: 'fieldwork', sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #3c4043;
    letter-spacing: -0.02px;
    line-height: 24px;
    margin-top: 30px;
    ">
       A user has submitted the contact form on the web site and
        they submitted the following information:
    </p>
    
    <h3>Name:</h3>
    <p style="
    font-family: 'fieldwork', sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #3c4043;
    letter-spacing: -0.02px;
    line-height: 24px;
    ">
        ${name}
    </p>
    <h3>Phone number:</h3>
    <p style="
    font-family: 'fieldwork', sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #3c4043;
    letter-spacing: -0.02px;
    line-height: 24px;
    ">
        ${phone}
    </p>
    <h3>And they said:</h3>
    <p style="
    font-family: 'fieldwork', sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #3c4043;
    letter-spacing: -0.02px;
    line-height: 24px;
    ">
        ${message}
    </p>
    <div style="height: 2px; background: lightgray; margin-top:
        40px"></div>
    <p style=" font-family: 'fieldwork' , sans-serif; font-weight:
        500; font-size: 16px; color: #3c4043; letter-spacing:
        -0.02px; line-height: 24px; ">
        Go to Showpener.com, or contact the promoter for
        next steps.
    </p>
    `;
  }
  return `${emailHeadHtml}${customContent}${emailFootHtml}`;
};

export default EmailTemplate;
