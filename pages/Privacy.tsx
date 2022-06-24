import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AppContext, DispatchContext } from "../context/StateContext";

function Terms() {
  const router = useRouter();
  const { dispatch } = useContext(DispatchContext);
  const goHome = async (e: any) => {
    e.preventDefault();
    router.push({
      pathname: `/`,
    });
  };
  useEffect(() => {
    dispatch({
      type: "setLoader",
      payload: false,
    });
  }, []);

  return (
    <div className="centerColumnContent">
      <h1 className="mainTitle">Privacy Policy</h1>
      <div className="body-text">
        <div>Last Modified: June 17, 2022</div>

        <h3 className="subTitle-left">INTRODUCTION</h3>
        <p>
          Showpener LLC (“Company” or “we”) respects your privacy and is
          committed to protecting it through compliance with this policy. This
          policy describes”
        </p>

        <ul>
          <li>
            The types of information we may collect or that you may provide when
            you register with, access, or use the Showpener mobile application,
            website at showpener.com, or other services provided by Showpener
            (collectively, the “Services”).
          </li>{" "}
          <li>
            Our practices for collecting, using, maintaining, and protecting,
            and disclosing that information.{" "}
          </li>
        </ul>

        <p>
          Log in through Spotify is required to access and use many of the
          Services. We are not affiliated with or endorsed by Spotify. Spotify
          is a registered trademark of Spotify AB. Certain information we use
          may be provided by Spotify and is governed by their Privacy Policy
          (https://www.spotify.com/us/legal/privacy-policy/) and Terms of Use
          (https://www.spotify.com/us/legal/end-user-agreement/).
        </p>

        <p>
          Phone numbers and text communications are managed by Twilio, a
          third-party service provider. Their terms of service
          (https://www.twilio.com/legal/tos) and privacy policy
          (https://www.twilio.com/legal/privacy) govern use and disclosure of
          certain information you may provide.{" "}
        </p>

        <p>
          Please read this policy carefully to understand our policies and
          practices regarding your information and how we will treat it. If you
          do not agree with our policies and practices, do not download,
          register with, or use the Services. By downloading, registering with,
          or using the Services, you agree to this privacy policy. This policy
          may change from time to time (see Changes to Our Privacy Policy). Your
          continued use of the Services after we revise this policy means you
          accept those changes, so please check the policy periodically for
          updates.
        </p>

        <h3 className="subTitle-left">CHILDREN UNDER THE AGE OF 13</h3>
        <p>
          The Services are not intended for children under 13 years of age, and
          we do not knowingly collect personal information from children under
          13. If we learn we have collected or received personal information
          from a child under 13 without verification of parental consent, we
          will delete that information. If you believe we might have any
          information from or about a child under 13, please contact us at
          contact@showpener.com.
        </p>

        <h3 className="subTitle-left">
          INFORMATION WE COLLECT AND HOW WE COLLECT IT
        </h3>

        <p>We collect information from and about users of our Services:</p>

        <ul>
          <li>Directly from you when you provide it to us. </li>
          <li>Automatically when you use the Services. </li>
          <li>
            Via third party providers such as Spotify in accordance with the
            terms of their own privacy policies and terms of use.
          </li>
        </ul>

        <h3 className="subTitle-left">Information You Provide to Us</h3>

        <p>
          When you download, register with, or use the Services, we may ask you
          to provide information:
        </p>

        <ul>
          <li>
            By which you may be personally identified such as name, postal
            address, email address, and telephone number (“personal
            information”).
          </li>
          <li>That is about you but individually does not identify you. </li>
        </ul>

        <p>This information includes:</p>

        <ul>
          <li>
            Information that you provide by filling in forms via the Services
            including information provided at the time of registering to use the
            Services and requesting further services. We may also ask you for
            information when you enter a contest or promotion sponsored by us
            and when you report a problem with the Services.
          </li>
          <li>
            Records and copies of your correspondence (including email addresses
            and phone numbers), if you contact us.
          </li>
          <li>
            Your responses to surveys that we might ask you to complete for
            research purposes.
          </li>
          <li>
            Details of transactions you carry out through the Services and of
            the fulfillment of your orders.
          </li>
        </ul>

        <h3 className="subTitle-left">Automatic Information Collection</h3>

        <p>
          When you download, access, and use the Services, we may use technology
          to automatically collect:
        </p>

        <ul>
          <li>
            Usage Details. When you access and use the Services, we may
            automatically collect certain details of your access to and use of
            the Services, including traffic data, location data, logs, and other
            communication data and the resources that you access and use on or
            through the Services.
          </li>
          <li>
            Device Information. We may collect information about your device and
            internet connection, including the device&apos;s unique device
            identifier, IP address, operating system, browser type, network
            information, and the device&apos;s telephone number.
          </li>
        </ul>

        <p>
          If you do not want us to collect this information do not access or
          download the Services or delete them from your device.
        </p>

        <h3 className="subTitle-left">Automatic Information Collection</h3>

        <p>
          When you download, access, and use the Services, we may use technology
          to automatically collect:{" "}
        </p>

        <ul>
          <li>
            Usage Details. When you access and use the Services, we may
            automatically collect certain details of your access to and use of
            the Services, including traffic data, location data, logs, and other
            communication data and the resources that you access and use on or
            through the Services.
          </li>
          <li>
            Device Information. We may collect information about your device and
            internet connection, including the device&apos;s unique device
            identifier, IP address, operating system, browser type, network
            information, and the device&apos;s telephone number.
          </li>
        </ul>

        <p>
          If you do not want us to collect this information do not access or
          download the Services or delete them from your device.
        </p>

        <h3 className="subTitle-left">Information Collection Technologies</h3>
        <p>
          The technologies we use for automatic information collection may
          include:
        </p>
        <ul>
          <li>
            Cookies (or mobile cookies). A cookie is a small file placed on your
            device. It may be possible to refuse to accept cookies by activating
            the appropriate setting on your device. However, if you select this
            setting, you may be unable to access certain parts of our Services.
          </li>
          <li>
            Web Beacons. Pages of the Services may contain small electronic
            files known as web beacons (also referred to as clear gifs, pixel
            tags, and single-pixel gifs) that permit the Company, for example,
            to count users who have visited those pages and for other related
            app statistics (for example, recording the popularity of certain app
            content and verifying system and server integrity).
          </li>
        </ul>

        <h3 className="subTitle-left">Third-Party Information Collection</h3>
        <p>
          When you use the Services, certain third parties may provide us
          information about you such as Spotify which provides us with your
          listener profiles and artist interests. Third parties may use tracking
          technologies to collect information about you when you use the
          Services. We do not control these third parties’ tracking technologies
          or how they may be used.
        </p>

        <h3 className="subTitle-left">HOW WE USE YOUR INFORMATION</h3>

        <p>
          We use information that we collect about you or that you provide to
          us, including any personal information, to:
        </p>

        <ul>
          <li>
            Provide you with the Services and any other information, products or
            services that you request from us.
          </li>
          <li>Fulfill any other purpose for which you provide it.</li>

          <li>
            Notify you when updates are available, and of changes to any
            products or services we offer or provide.
          </li>
        </ul>

        <p>
          The usage information we collect helps us to improve our Services and
          to deliver a better and more personalized experience by enabling us
          to:
        </p>

        <ul>
          <li>Estimate our audience size and usage patterns. </li>
          <li>
            Store information about your preferences, allowing us to customize
            our Services according to your individual interests.
          </li>

          <li>Speed up your searches.</li>
          <li>Recognize you when you use the Services.</li>
        </ul>
        <p>
          We may also use your information to contact you about our own and
          third parties&apos; goods and services that may be of interest to you.
          If you do not want us to use your information in this way, you can opt
          out by sending us an email stating your request to
          contact@showpener.com or reply STOP to text messages to be
          unsubscribed. For more information, see Your Choices About Our
          Collection, Use, and Disclosure of Your Information.
        </p>
        <p>
          We may use the information we collect to display advertisements to our
          advertisers&apos; target audiences. Even though we do not disclose
          your personal information for these purposes without your consent, if
          you click on or otherwise interact with an advertisement, the
          advertiser may assume that you meet its target criteria.
        </p>

        <h3 className="subTitle-left">DISCLOSURE OF YOUR INFORMATION</h3>

        <p>
          We may disclose aggregated information about our users, and
          information that does not identify any individual or device, without
          restriction.
        </p>

        <p>
          In addition, we may disclose personal information that we collect or
          you provide:
        </p>

        <ul>
          <li>To our subsidiaries and affiliates. </li>
          <li>
            To a buyer or other successor in the event of a merger, divestiture,
            restructuring, reorganization, dissolution, or other sale or
            transfer of some or all of the Company&apos;s assets, whether as a
            going concern or as part of bankruptcy, liquidation, or similar
            proceeding.
          </li>
          <li>To fulfill the purpose for which you provide it.</li>

          <li>
            For any other purpose disclosed by us when you provide the
            information.
          </li>

          <li>With your consent.</li>

          <li>
            To comply with any court order, law, or legal process, including to
            respond to any government or regulatory request.
          </li>

          <li>
            To enforce our rights arising from any contracts entered into
            between you and us.
          </li>

          <li>
            If we believe disclosure is necessary or appropriate to protect the
            rights, property, or safety of the Company, our customers or others.
          </li>
        </ul>
        <h3 className="subTitle-left">
          YOUR CHOICES ABOUT OUR COLLECTION, USE, AND DISCLOSURE OF YOUR
          INFORMATION
        </h3>
        <p>
          We strive to provide you with choices regarding the personal
          information you provide to us. This section describes mechanisms we
          provide for you to control certain uses and disclosures of over your
          information.
        </p>
        <ul>
          <li>To our subsidiaries and affiliates. </li>
          <li>
            Tracking Technologies. You can set your browser to refuse all or
            some browser cookies, or to alert you when cookies are being sent.
            If you disable or refuse cookies or block the use of other tracking
            technologies, some parts of the Services may then be inaccessible or
            not function properly.
          </li>
          <li>
            Location Information. You can choose whether or not to allow the
            Services to collect and use real-time information about your
            device&apos;s location through the device&apos;s privacy settings.
            If you block the use of location information, some parts of the
            Services may become inaccessible or not function properly.
          </li>

          <li>
            For any other purpose disclosed by us when you provide the
            information.
          </li>

          <li>
            Promotion by the Company. If you do not want us to use your email
            address or telephone number to promote our own or third
            parties&apos; products or services, you can opt-out by sending us an
            email stating your request to contact@showpener.com or reply STOP to
            text messages to be unsubscribed.
          </li>

          <li>
            Targeted Advertising by the Company. If you do not want us to use
            information that we collect or that you provide to us to deliver
            advertisements according to our advertisers&apos; target-audience
            preferences, you can opt-out by sending us an email stating your
            request to contact@showpener.com or reply STOP to text messages to
            be unsubscribed.
          </li>
        </ul>

        <p>
          We do not control third parties&apos; collection or use of your
          information to serve interest-based advertising. However, these third
          parties may provide you with ways to choose not to have your
          information collected or used in this way. You can opt out of
          receiving targeted ads from members of the Network Advertising
          Initiative (&quot;;NAI&quot;) on the NAI&apos;s website.
        </p>

        <p>
          Residents in certain states, such as California, may have additional
          personal information rights and choices. Please see Your State Privacy
          Rights for more information.
        </p>

        <h3 className="subTitle-left">
          ACCESSING AND CORRECTING YOUR PERSONAL INFORMATION
        </h3>

        <p>
          You can review and change your personal information by logging into
          the Services and visiting your account profile page.
        </p>

        <p>
          You may also send us an email at contact@showpener.com to request
          access to, correct, or delete any personal information that you have
          provided to us. We may not accommodate a request to change information
          if we believe the change would violate any law or legal requirement or
          cause the information to be incorrect.
        </p>

        <p>
          Residents in certain states, such as California, may have additional
          personal information rights and choices. Please see Your State Privacy
          Rights for more information.
        </p>

        <h3 className="subTitle-left">YOUR STATE PRIVACY RIGHTS</h3>

        <p>
          State consumer privacy laws may provide their residents with
          additional rights regarding our use of their personal information. To
          learn more about California residents&apos; privacy rights, see the
          California Privacy Notice below. California&apos;s &quot;Shine the
          Light&quot; law (Civil Code Section § 1798.83) permits users of our
          Services that are California residents to request certain information
          regarding our disclosure of personal information to third parties for
          their direct marketing purposes. To make such a request, please send
          an email to contact@showpener.com.
        </p>

        <p>
          Colorado, Connecticut, Virginia, and Utah each provide their state
          residents with rights to:
        </p>

        <ul>
          <li>To our subsidiaries and affiliates. </li>
          <li>Confirm whether we process their personal information.</li>
          <li>Access and delete certain personal information.</li>

          <li>
            For any other purpose disclosed by us when you provide the
            information.
          </li>

          <li>Data portability.</li>

          <li>
            Opt-out of personal data processing for targeted advertising and
            sales.
          </li>
        </ul>
        <p>
          Colorado, Connecticut, and Virginia also provide their state residents
          with rights to:
        </p>
        <ul>
          <li>
            Correct inaccuracies in their personal information, taking into
            account the information&apos;s nature processing purpose.{" "}
          </li>
          <li>
            Opt-out of profiling in furtherance of decisions that produce legal
            or similarly significant effects.
          </li>
        </ul>
        <p>
          To exercise any of these rights please send an email to
          contact@showpener.com.
        </p>
        <p>
          Nevada provides its residents with a limited right to opt-out of
          certain personal information sales. Residents who wish to exercise
          this sale opt-out rights may submit a request to
          contact@showpener.com. However, please know we do not currently sell
          data triggering that statute&apos;s opt-out requirements.
        </p>

        <h3 className="subTitle-left">CANADA SPECIFIC PRIVACY RIGHTS</h3>

        <p>
          If you reside in Canada, the following provisions apply and supersede
          conflicting terms elsewhere in this policy:
        </p>

        <p>
          We will only process your personal information where required to
          generally operate our Services, for marketing and analytics purposes,
          provide you with products and services, and to operate our business,
          including for the purposes outlined in this policy. We may also
          collect, use, and disclose your personal information in other ways,
          and where we do so, we will obtain your further consent.
        </p>

        <p>
          By using our websites or otherwise providing us with your personal
          information, you agree to the collection, use, and disclosure of your
          personal information as set out in this policy.
        </p>

        <p>
          We may collect, use, and disclose your personal information without
          your consent, as required or permitted by applicable law, such as to
          use or disclose your personal information in the case of an emergency
          that threatens the life, health, or security of you or another
          individual.
        </p>

        <p>
          While you will generally not be required to pay a fee to access your
          personal information or to exercise any of your other statutory
          rights, where permitted by applicable law, we may charge a reasonable
          fee if your request for access would require an exceptional amount of
          effort or may decline to comply with frivolous or vexatious requests.
        </p>

        <p>
          We operate businesses in multiple jurisdictions, some of which are not
          located in your country of residence. The personal information that we
          collect from users may be stored in the United States of America and
          might also be stored or processed through third-party service
          providers in other countries. Therefore, the personal information that
          you provide to us may be transferred internationally to countries
          other than the country in which you initially provided your data.
        </p>

        <p>
          When transferring personal information to a third-party service
          provider, or outside of your home country, we take measures to protect
          your personal information as described in this policy and in
          compliance with applicable law. However, when stored or processed in
          another country, your personal information will be subject to the
          applicable law of that country, which may not provide the same
          protections as the applicable law in your country of residence. If you
          have further questions about this or would like to request to view
          copies of the applicable safeguards (where required), please contact
          us.
        </p>

        <h3 className="subTitle-left">CHANGES TO OUR PRIVACY POLICY</h3>

        <p>
          We may update our privacy policy from time to time. If we make
          material changes to how we treat our users&apos; personal information,
          we will post the new privacy policy on this page with a notice that
          the privacy policy has been updated.
        </p>

        <p>
          The date the privacy policy was last revised is identified at the top
          of the page. You are responsible for periodically visiting this
          privacy policy to check for any changes.
        </p>

        <h3 className="subTitle-left">CONTACT INFORMATION</h3>

        <p>
          To ask questions or comment about this privacy policy and our privacy
          practices, contact us at: contact@showpener.com
        </p>

        <h3 className="subTitle-left-secondary">
          {" "}
          CALIFORNIA RESIDENT PRIVACY NOTICE (“California Notice”)
        </h3>

        <h3 className="subTitle-left">DATE REVIEWED</h3>

        <p>
          This California Notice was last reviewed and modified on June 17,
          2022.
        </p>

        <h3 className="subTitle-left">THE CALIFORNIA CONSUMER PRIVACY ACT</h3>

        <p>
          The provisions in this California Notice are intended to fulfil the
          requirements of the California Consumer Privacy Act (&quot;CCPA&quot;)
          and shall apply to users of the Services who are residents of
          California.
        </p>

        <h3 className="subTitle-left">PERSONAL INFORMATION</h3>

        <p>
          The terms used in this California Notice which are defined in the CCPA
          will have the definitions as provided in the CCPA. The term “personal
          information,” “your information” or other similar uses implying
          private information belonging to you as used in the privacy policy and
          this California Notice include “Personal Information” as defined in
          the CCPA. All other capitalized terms have the meaning provided in the
          privacy policy.
        </p>
        <h3 className="subTitle-left">SHINE THE LIGHT</h3>

        <p>
          California Civil Code Section 1798.83 permits California residents to
          request certain information regarding and/or opt-out of our disclosure
          of their personal information to third parties for direct marketing
          purposes. To make such a request, please contact us at
          contact@showpener.com.
        </p>

        <h3 className="subTitle-left">CATEGORIES OF PERSONAL INFORMATION</h3>

        <p>
          The categories of personal information that we may have collected in
          the last 12 months are described in “INFORMATION WE COLLECT AND HOW WE
          COLLECT IT” of the privacy policy and, for the purposes of the CCPA,
          correspond to the following categories of Personal Information listed
          in the CCPA:
        </p>

        <div className="table">
          <div className="row col3">
            <div id="row-title">Category</div>
            <div id="row-title">Examples</div>
            <div id="row-title">Collected</div>
          </div>
          <div className="row col3">
            <div>A. Identifiers.</div>
            <div>
              A real name, alias, postal address, unique personal identifier,
              online identifier, Internet Protocol address, email address,
              account name, Social Security number, driver&apos;s license
              number, passport number, or other similar identifiers.
            </div>
            <div>YES</div>
          </div>
          <div className="row col3">
            <div>
              B. Personal information categories listed in the California
              Customer Records statute (Cal. Civ. Code § 1798.80(e)).
            </div>
            <div>
              A name, signature, Social Security number, physical
              characteristics or description, address, telephone number,
              passport number, driver&apos;s license or state identification
              card number, insurance policy number, education, employment,
              employment history, bank account number, credit card number, debit
              card number, or any other financial information, medical
              information, or health insurance information. Some personal
              information included in this category may overlap with other
              categories.{" "}
            </div>
            <div>YES</div>
          </div>
          <div className="row col3">
            <div>
              C. Protected classification characteristics under California or
              federal law.{" "}
            </div>
            <div>
              Age (40 years or older), race, color, ancestry, national origin,
              citizenship, religion or creed, marital status, medical condition,
              physical or mental disability, sex (including gender, gender
              identity, gender expression, pregnancy or childbirth and related
              medical conditions), sexual orientation, veteran or military
              status, genetic information (including familial genetic
              information).{" "}
            </div>
            <div>NO</div>
          </div>
          <div className="row col3">
            <div>D. Commercial information.</div>
            <div>
              Records of personal property, products or services purchased,
              obtained, or considered, or other purchasing or consuming
              histories or tendencies.
            </div>
            <div>NO</div>
          </div>
          <div className="row col3">
            <div>E. Biometric information.</div>
            <div>
              Genetic, physiological, behavioral, and biological
              characteristics, or activity patterns used to extract a template
              or other identifier or identifying information, such as,
              fingerprints, faceprints, and voiceprints, iris or retina scans,
              keystroke, gait, or other physical patterns, and sleep, health, or
              exercise data.
            </div>
            <div>NO</div>
          </div>
          <div className="row col3">
            <div>F. Internet or other similar network activity.</div>
            <div>
              Browsing history, search history, information on a consumer&apos;s
              interaction with a website, application, or advertisement.{" "}
            </div>
            <div>YES</div>
          </div>
          <div className="row col3">
            <div>G. Geolocation data.</div>
            <div>Physical location or movements. </div>
            <div>YES</div>
          </div>

          <div className="row col3">
            <div>H. Sensory data.</div>
            <div>
              Audio, electronic, visual, thermal, olfactory, or similar
              information.
            </div>
            <div>NO</div>
          </div>

          <div className="row col3">
            <div>I. Professional or employment-related information.</div>
            <div>Current or past job history or performance evaluations. </div>
            <div>NO</div>
          </div>

          <div className="row col3">
            <div>
              J. Non-public education information (per the Family Educational
              Rights and Privacy Act (20 U.S.C. Section 1232g, 34 C.F.R. Part
              99)).
            </div>
            <div>
              Education records directly related to a student maintained by an
              educational institution or party acting on its behalf, such as
              grades, transcripts, class lists, student schedules, student
              identification codes, student financial information, or student
              disciplinary records.{" "}
            </div>{" "}
            <div>NO</div>
          </div>

          <div className="row col3">
            <div>K. Inferences drawn from other personal information.</div>
            <div>
              Profile reflecting a person&apos;s preferences, characteristics,
              psychological trends, predispositions, behavior, attitudes,
              intelligence, abilities, and aptitudes.{" "}
            </div>
            <div>NO</div>
          </div>
        </div>

        <h3 className="subTitle-left">PROCESSING PERSONAL DATA</h3>

        <p>
          We will not process your personal information for purposes which are
          materially different, unrelated, or incompatible with the purposes set
          out in the privacy policy without providing you notice.
        </p>

        <h3 className="subTitle-left">
          DISCLOSURE OF PERSONAL DATA TO THIRD PARTIES
        </h3>

        <p>
          In the last 12 months, to the extent that we have your personal
          information, we have only disclosed this Personal Data to third
          parties for business purposes or with your consent.{" "}
        </p>

        <h3 className="subTitle-left">
          SALE OF PERSONAL DATA TO THIRD PARTIES
        </h3>

        <p>
          In the last 12 months, we have not sold your personal information to
          third parties.
        </p>

        <h3 className="subTitle-left">ADDITIONAL RIGHTS UNDER THE CCPA</h3>

        <p>
          California residents may have the following rights under the CCPA in
          addition to the rights set out in the privacy policy.{" "}
        </p>

        <ol>
          <li>
            Access: Once we receive and confirm your verifiable consumer
            request, we will disclose the following to you:{" "}
            <ul>
              <li>
                the categories of your personal information and the specific
                personal information that we have collected;
              </li>
              <li>
                the categories of sources from which your personal information
                was collected;
              </li>
              <li>
                our business or commercial purpose for collecting your personal
                information; and
              </li>
              <li>
                the categories of third parties with whom we share your personal
                information, and where such third parties received your personal
                information from us for a business purpose, the categories of
                your personal information that we disclosed to such third
                parties.
              </li>
            </ul>
            Under the CCPA, you are only entitled to exercise the personal
            information access right set out in the foregoing paragraph twice a
            year.
          </li>
          <li>
            <p>
              Deletion: Once we receive and confirm your verifiable consumer
              request, we will (and will direct our service providers to whom we
              have disclosed your personal information to) delete your personal
              information unless an exception under the CCPA applies.
            </p>
            <p>
              The rights set out in the foregoing paragraphs do not apply to
              personal information collected from our employees as part of their
              employment with us or personal information collected as part of a
              business-to-business transaction.
            </p>
          </li>
        </ol>

        <p>
          If you would like to exercise any of your rights in this section,
          please contact us in writing (see “CONTACT INFORMATION” in the privacy
          policy). You must include your full name, mailing address, and
          username (if applicable), in addition to the rights you are exercising
          and which information you are exercising your rights on. Please also
          state that you are requesting access pursuant to the California
          Consumer Privacy Act. We will do our best to respond promptly to any
          request.
        </p>

        <p>
          Only you, or someone legally authorized to act on your behalf, may
          make a verifiable consumer request related to your personal
          information. We may need to request specific information from you to
          help us confirm that your request is a verifiable consumer request.
        </p>

        <h3 className="subTitle-left">NON-DISCRIMINATION</h3>

        <p>
          We will not discriminate against you for exercising any of your rights
          under the CCPA. Specifically, unless permitted by the CCPA, we will
          not:
        </p>

        <ol>
          <li>deny you access to services provided by us;</li>
          <li>
            charge you different prices or rates for the goods and/or services
            provided by us or impose penalties on you;
          </li>

          <li>
            provide you with a different level or quality of goods and/or
            services than otherwise generally provided by us; or
          </li>

          <li>
            suggest that you will receive a different price or rate for, or a
            different level or quality of, the goods and/or services generally
            provided by us.
          </li>
        </ol>
      </div>

      <button className="submitButton" onClick={goHome}>
        <span>Go back</span>
      </button>
    </div>
  );
}

export default Terms;
