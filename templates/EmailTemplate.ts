type adminEmailProps = {
  name: string;
  phone: string;
  promoterEmail: string;
  adminEmail: string;
  message: string;
  type: string;
};
const EmailTemplate = ({
  name,
  phone,
  promoterEmail,
  adminEmail,
  message,
  type,
}: adminEmailProps) => {
  return `<!DOCTYPE html>
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
                                        src="https://showpener.vercel.app/images/Showpener_logo.svg" alt="Showpener" />
                                        Poo
                                        <div style="height: 97px; width: 137px; display: block; background: url("https://showpener.vercel.app/images/Showpener_logo.svg"); background-size: contain;"></div>
                    
                                        Wee
                                        <div style="height: 97px; width: 137px; display: block; background: url('data:image/png;base64,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'); background-size: contain;"></div>
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
                                    ">Showpener Promoter Portal</span>
                                                            <h1 style="
                                      font-family: 'fieldwork', sans-serif;
                                      font-weight: 700;
                                      font-size: 36px;
                                      color: #202124;
                                      letter-spacing: -0.02px;
                                      margin: 0;
                                    ">
                                                                New Promoter Sign Up!
                                                            </h1>
    
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
                                                                ${promoterEmail}
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
    
                                                            <!--       <h2
                                    style=" font-family: 'Inter' , sans-serif; font-weight: 700; font-size: 28px; color:
                                                                #202124; letter-spacing: -0.02px; margin: 38px 0 0 0; "
                                  >
                                    Section header if you need it
                                  </h2>
                                  <p
                                    style=" font-family: 'Inter' , sans-serif; font-weight: 500; font-size: 16px; color:
                                                                #3c4043; letter-spacing: -0.02px; line-height: 24px; "
                                  >
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                  </p>
    
                               
                                  -->
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
                                                This email was sent to ${adminEmail} because it is the
                                                registered administrative email address for
                                                Showpener.com
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
};

export default EmailTemplate;
