import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AppContext, DispatchContext } from "../context/StateContext";

function Terms() {
  const { state } = useContext(AppContext);
  const [loading, stopLoading] = useState(true);
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
      <h1 className="mainTitle">Terms of Service</h1>
      <div className="body-text">
        <div>Last Modified: June 17, 2022</div>

        <h3 className="subTitle-left">ACCEPTANCE OF THE TERMS OF USE</h3>
        <p>
          These terms of use are entered into by and between you and Showpener
          LLC (&quot;Company,&quot; or &quot;we&quot;). The following terms and
          conditions, together with any documents they expressly incorporate by
          reference (collectively, &quot;Terms of Use&quot;), govern your access
          to and use of the Showpener mobile application (the “App”), website at
          showpener.com, and other services provided by Showpener (collectively,
          the &quot;Services&quot;), whether as a guest or a registered user.
        </p>
        <p>
          Please read the Terms of Use carefully before you start to use the
          Services. By using the Services or by clicking to accept or agree to
          the Terms of Use when this option is made available to you, you accept
          and agree to be bound and abide by these Terms of Use and our Privacy
          Policy, found at showpener.com/privacy, incorporated herein by
          reference. If you do not want to agree to these Terms of Use or the
          Privacy Policy, you must not access or use the Services.
        </p>
        <p>
          The Services are offered and available to users who are 13 years of
          age or older, and reside in the United States, Canada, or any of their
          territories or possessions. By using the Services, you represent and
          warrant that you meet all of the foregoing eligibility requirements.
          If you do not meet all of these requirements, you must not access or
          use the Services.
        </p>
        <h3 className="subTitle-left">CHANGES TO THE TERMS OF USE</h3>
        <p>
          We may revise and update these Terms of Use from time to time in our
          sole discretion. All changes are effective immediately when we post
          them, and apply to all access to and use of the Services thereafter.{" "}
        </p>
        <p>
          Your continued use of the Services following the posting of revised
          Terms of Use means that you accept and agree to the changes. You are
          expected to check this page from time to time so you are aware of any
          changes, as they are binding on you.{" "}
        </p>
        <h3 className="subTitle-left">MOBILE APP END USER LICENSE AGREEMENT</h3>
        <p>
          License Grant. Subject to these Terms of Use, the Company grants you a
          limited, non-exclusive, and nontransferable license to download,
          install, and use the App for your personal, non-commercial use on a
          single mobile device owned or otherwise controlled by you
          (&quot;Mobile Device&quot;) strictly in accordance with the App&apos;s
          documentation License Restrictions. You shall not:{" "}
        </p>
        <ul>
          <li>copy the App, except as expressly permitted by this license;</li>
          <li>
            modify, translate, adapt, or otherwise create derivative works or
            improvements, whether or not patentable, of the App;
          </li>
          <li>
            reverse engineer, disassemble, decompile, decode, or otherwise
            attempt to derive or gain access to the source code of the App or
            any part thereof;
          </li>
          <li>
            remove, delete, alter, or obscure any trademarks or any copyright,
            trademark, patent, or other intellectual property or proprietary
            rights notices from the App, including any copy thereof;
          </li>
          <li>
            rent, lease, lend, sell, sublicense, assign, distribute, publish,
            transfer, or otherwise make available the App, or any features or
            functionality of the App, to any third party for any reason,
            including by making the App available on a network where it is
            capable of being accessed by more than one device at any time; or
          </li>
          <li>
            remove, disable, circumvent, or otherwise create or implement any
            workaround to any copy protection, rights management, or security
            features in or protecting the App.
          </li>
        </ul>

        <p>
          Reservation of Rights. You acknowledge and agree that the App is
          provided under license, and not sold, to you. You do not acquire any
          ownership interest in the App under this Agreement, or any other
          rights thereto other than to use the App in accordance with the
          license granted, and subject to all terms, conditions, and
          restrictions, under this Agreement. Company and its licensors and
          service providers reserve and shall retain their entire right, title,
          and interest in and to the App, including all copyrights, trademarks,
          and other intellectual property rights therein or relating thereto,
          except as expressly granted to you in these Terms of Use.
        </p>

        <p>
          Updates. Company may from time to time in its sole discretion develop
          and provide App updates, which may include upgrades, bug fixes,
          patches, other error corrections, and/or new features (collectively,
          including related documentation, “Updates“). Updates may also modify
          or delete in their entirety certain features and functionality. You
          agree that the Company has no obligation to provide any Updates or to
          continue to provide or enable any particular features or
          functionality. Based on your Mobile Device settings, when your Mobile
          Device is connected to the internet either:
        </p>

        <ul>
          <li>
            the Application will automatically download and install all
            available Updates; or
          </li>
          <li>
            you may receive notice of or be prompted to download and install
            available Updates.
          </li>

          <li>
            You shall promptly download and install all Updates and acknowledge
            and agree that the App or portions thereof may not properly operate
            should you fail to do so. You further agree that all Updates will be
            deemed part of the App and be subject to all terms and conditions of
            these Terms of Use.
          </li>
        </ul>

        <p>
          Term and Termination. The term of the license granted to you herein
          commences when you download the App and will continue in effect until
          terminated by you or Company as set forth in this Section.
        </p>
        <p>
          You may terminate the license granted to you herein by deleting the
          App and all copies thereof from your Mobile Device.
        </p>
        <p>
          The Company may terminate the license granted to you herein at any
          time without notice if you violate these Terms of Use or otherwise in
          its sole discretion. In addition, the license granted to you herein
          will terminate immediately and automatically without any notice if you
          violate any of the terms and conditions of these Terms of Use.
        </p>
        <p>
          Upon termination all rights granted to you under this Agreement will
          also terminate, and you must cease all use of the Application and
          delete all copies of the Application from your Mobile Device and
          account.
        </p>
        <p>
          Termination will not limit any of Company&apos;s rights or remedies at
          law or in equity.
        </p>

        <h3 className="subTitle-left">SMS TERMS AND CONDITIONS</h3>
        <p>
          We are using a SMS platform which is subject to the following terms
          and conditions. By opting in for SMS marketing and notifications, you
          agree to these terms and conditions.
        </p>
        <p>
          When you opt-in to communicate with the Company via SMS, you can
          expect messages with exclusive promotional opportunities. The Company
          may also use SMS to respond to customer service requests or other
          requests for assistance.
        </p>
        <p>
          You can cancel the SMS service at any time. Just text “STOP” to the
          short code. After you send the SMS message “STOP” to us, we will send
          you an SMS message to confirm that you have been unsubscribed. After
          this, you will no longer receive SMS messages from us. If you want to
          join again, you can change your delivery preferences in your profile
          back to SMS.
        </p>
        <p>
          If you are experiencing issues with the messaging program you can
          reply with the keyword HELP for more assistance, or you can get help
          directly at contact@showpener.com.
        </p>
        <p>Carriers are not liable for delayed or undelivered messages.</p>
        <p>
          As always, message and data rates may apply for any messages sent to
          you from us and to us from you. Message frequency varies but Showpener
          members typically receive less than ten (10) messages per month. If
          you have any questions about your text plan or data plan, it is best
          to contact your wireless provider.
        </p>
        <h3 className="subTitle-left">
          ACCESSING THE SERVICES AND ACCOUNT SECURITY
        </h3>

        <p>
          We reserve the right to withdraw or amend the Services, and any
          service or material we provide via the Services, in our sole
          discretion without notice. We will not be liable if for any reason all
          or any part of the Services are unavailable at any time or for any
          period. From time to time, we may restrict access to some parts of the
          Services to users, including registered users.
        </p>
        <p>You are responsible for both:</p>
        <ul>
          <li>
            Making all arrangements necessary for you to have access to the
            Services.
          </li>
          <li>
            Ensuring that all persons who access the Services through your
            internet connection are aware of these Terms of Use and comply with
            them.
          </li>
        </ul>

        <p>
          To access the Services or some of the resources they offer, you may be
          asked to provide certain registration details or other information. It
          is a condition of your use of the Services that all the information
          you provide via the Services is correct, current, and complete. You
          agree that all information you provide to register with the Services
          or otherwise, including, but not limited to, through the use of any
          interactive features on the Services, is governed by our Privacy
          Policy at showpener.com/privacy, and you consent to all actions we
          take with respect to your information consistent with our Privacy
          Policy.
        </p>
        <p>
          If you choose, or are provided with, a username, password, or any
          other piece of information as part of our security procedures, you
          must treat such information as confidential, and you must not disclose
          it to any other person or entity. You also acknowledge that your
          account is personal to you and agree not to provide any other person
          with access to the Services using your username, password, or other
          security information. You agree to notify us immediately of any
          unauthorized access to or use of your username or password or any
          other breach of security. You should use particular caution when
          accessing your account from a public or shared computer so that others
          are not able to view or record your password or other personal
          information.
        </p>

        <p>
          We have the right to disable any username, password, or other
          identifier, whether chosen by you or provided by us, at any time in
          our sole discretion for any or no reason, including if, in our
          opinion, you have violated any provision of these Terms of Use.
        </p>

        <h3 className="subTitle-left">INTELLECTUAL PROPERTY RIGHTS</h3>

        <p>
          The Services and all of their contents, features, and functionality
          (including but not limited to all information, software, text,
          displays, images, video, and audio, and the design, selection, and
          arrangement thereof) are owned by the Company, its licensors, or other
          providers of such material and are protected by United States and
          international copyright, trademark, patent, trade secret, and other
          intellectual property or proprietary rights laws.
        </p>

        <p>
          These Terms of Use permit you to use the Services for your personal,
          non-commercial use only. You must not reproduce, distribute, modify,
          create derivative works of, publicly display, publicly perform,
          republish, download, store, or transmit any of the material on our
          Services, except as follows:
        </p>

        <ul>
          <li>
            Your device may temporarily store copies of such materials in RAM
            incidental to your accessing and viewing those materials.
          </li>

          <li>
            You may store files that are automatically cached by your web
            browser for display enhancement purposes.
          </li>

          <li>
            You may print or download one copy of a reasonable number of pages
            of the Services for your own personal, non-commercial use and not
            for further reproduction, publication, or distribution.
          </li>

          <li>
            If we provide desktop, mobile, or other applications for download,
            you may download a single copy to your computer or mobile device
            solely for your own personal, non-commercial use, provided you agree
            to be bound by our end user license agreement for such applications.
          </li>
        </ul>

        <p>You must not:</p>

        <ul>
          <li>Modify copies of any materials from the Services.</li>
          <li>
            Delete or alter any copyright, trademark, or other proprietary
            rights notices from copies of materials from this site.
          </li>
          <li>
            You must not access or use for any commercial purposes any part of
            the Services without our prior written consent.
          </li>
        </ul>
        <p>
          If you wish to make any use of material on the Services other than
          that set out in this section, please address your request to:
          contact@showpener.com.
        </p>
        <p>
          If you print, copy, modify, download, or otherwise use or provide any
          other person with access to any part of the Services in breach of the
          Terms of Use, your right to use the Services will stop immediately and
          you must, at our option, return or destroy any copies of the materials
          you have made. No right, title, or interest in or to the Services or
          any content on the Services is transferred to you, and all rights not
          expressly granted are reserved by the Company. Any use of the Services
          not expressly permitted by these Terms of Use is a breach of these
          Terms of Use and may violate copyright, trademark, and other laws.
        </p>

        <h3 className="subTitle-left">SUBMISSIONS</h3>
        <p>
          You acknowledge and agree that any questions, comments, suggestions,
          ideas, feedback, or other information regarding the Services
          (collectively, “Submissions”) provided by you to us are
          non-confidential and will become our sole property at the time of
          submission. We will own exclusive rights, including all intellectual
          property rights, and will be entitled to the unrestricted use and
          dissemination of these Submissions for any lawful purpose, commercial
          or otherwise, without acknowledgment or compensation to you. You
          hereby waive all moral rights to any such Submissions, and you hereby
          warrant that any such Submissions are original with you or that you
          have the right to submit such Submissions. You agree there shall be no
          recourse against us for any alleged or actual infringement or
          misappropriation of any proprietary right in your Submissions.
        </p>
        <h3 className="subTitle-left">TRADEMARKS</h3>
        <p>
          The Company name, the Company logo, and all related names, logos,
          product and service names, designs, and slogans are trademarks of the
          Company or its affiliates or licensors. You must not use such marks
          without the prior written permission of the Company. All other names,
          logos, product and service names, designs, and slogans on the Services
          are the trademarks of their respective owners.
        </p>

        <h3 className="subTitle-left">PROHIBITED USES</h3>
        <p>
          You may use the Services only for lawful purposes and in accordance
          with these Terms of Use. You agree not to use the Services:
        </p>

        <ul>
          <li>
            In any way that violates any applicable federal, state, local, or
            international law or regulation (including, without limitation, any
            laws regarding the export of data or software to and from the US or
            other countries).
          </li>
          <li>
            For the purpose of exploiting, harming, or attempting to exploit or
            harm minors in any way by exposing them to inappropriate content,
            asking for personally identifiable information, or otherwise.
          </li>
          <li>
            To transmit, or procure the sending of, any advertising or
            promotional material without our prior written consent, including
            any “junk mail,“ “chain letter,“ “spam,“ or any other similar
            solicitation.
          </li>
          <li>
            To impersonate or attempt to impersonate the Company, a Company
            employee, another user, or any other person or entity (including,
            without limitation, by using email addresses or screen names
            associated with any of the foregoing).
          </li>
          <li>
            To engage in any other conduct that restricts or inhibits
            anyone&apos;s use or enjoyment of the Services, or which, as
            determined by us, may harm the Company or users of the Services, or
            expose them to liability.
          </li>
        </ul>

        <p>Additionally, you agree not to:</p>
        <ul>
          <li>
            Use the Services in any manner that could disable, overburden,
            damage, or impair the site or interfere with any other party&apos;s
            use of the Services, including their ability to engage in real time
            activities through the Services.
          </li>
          <li>
            Use any robot, spider, or other automatic device, process, or means
            to access the Services for any purpose, including monitoring or
            copying any of the material on the Services.
          </li>
          <li>
            Use any manual process to monitor or copy any of the material on the
            Services, or for any other purpose not expressly authorized in these
            Terms of Use, without our prior written consent.
          </li>
          <li>
            Use any device, software, or routine that interferes with the proper
            working of the Services.
          </li>
          <li>
            Introduce any viruses, Trojan horses, worms, logic bombs, or other
            material that is malicious or technologically harmful.
          </li>
          <li>
            Attempt to gain unauthorized access to, interfere with, damage, or
            disrupt any parts of the Services, the server on which the Services
            are stored, or any server, computer, or database connected to the
            Services.
          </li>
          <li>
            Attack the Services via a denial-of-service attack or a distributed
            denial-of-service attack.
          </li>
          <li>
            Otherwise attempt to interfere with the proper working of the
            Services.
          </li>
        </ul>

        <h3 className="subTitle-left">COPYRIGHT INFRINGEMENT</h3>
        <p>
          If you believe that any materials on our Services violates your
          copyright, you may request removal of those materials (or access to
          them) from the Services by submitting written notification to our
          copyright agent designated below. In accordance with the Online
          Copyright Infringement Liability Limitation Act of the Digital
          Millennium Copyright Act (17 U.S.C. § 512) (“DMCA“), the written
          notice (the “DMCA Notice“) must include substantially the following:
          Your physical or electronic signature.
        </p>

        <ul>
          <li>
            Identification of the copyrighted work you believe to have been
            infringed or, if the claim involves multiple works on the Services,
            a representative list of such works.
          </li>
          <li>
            Identification of the material you believe to be infringing in a
            sufficiently precise manner to allow us to locate that material.
          </li>
          <li>
            Adequate information by which we can contact you (including your
            name, postal address, telephone number, and, if available, email
            address).
          </li>
          <li>
            A statement that you have a good faith belief that use of the
            copyrighted material is not authorized by the copyright owner, its
            agent, or the law.
          </li>
          <li>
            A statement that the information in the written notice is accurate.
          </li>
          <li>
            A statement, under penalty of perjury, that you are authorized to
            act on behalf of the copyright owner.
          </li>
        </ul>

        <p>Our designated copyright agent to receive DMCA Notices is:</p>
        <div className="pIndent">
          <div>Showpener LLC</div>
          <div>Sc/o Milgrom &amp; Daskam</div>
          <div>S1550 Larimer Street #503</div>
          <div>SDenver, CO 80202</div>
        </div>

        <p>
          If you fail to comply with all of the requirements of Section
          512(c)(3) of the DMCA, your DMCA Notice may not be effective. Please
          be aware that if you knowingly materially misrepresent that material
          or activity on the Services is infringing your copyright, you may be
          held liable for damages (including costs and attorneys&apos; fees)
          under Section 512(f) of the DMCA.
        </p>
        <h3 className="subTitle-left">RELIANCE ON INFORMATION POSTED</h3>
        <p>
          The information presented on or through the Services is made available
          solely for general information purposes. We do not warrant the
          accuracy, completeness, or usefulness of this information. Any
          reliance you place on such information is strictly at your own risk.
          We disclaim all liability and responsibility arising from any reliance
          placed on such materials by you or any other user of the Services, or
          by anyone who may be informed of any of their contents.
        </p>
        <p>
          The Services includes content provided by third parties, including
          materials provided by other users, bloggers, and third-party
          licensors, syndicators, aggregators, and/or reporting services. All
          statements and/or opinions expressed in these materials, and all
          articles and responses to questions and other content, other than the
          content provided by the Company, are solely the opinions and the
          responsibility of the person or entity providing those materials.
          These materials do not necessarily reflect the opinion of the Company.
          We are not responsible, or liable to you or any third party, for the
          content or accuracy of any materials provided by any third parties.
        </p>
        <h3 className="subTitle-left">CHANGES TO THE SERVICES</h3>
        <p>
          We may update the content on the Services from time to time, but their
          content is not necessarily complete or up-to-date. Any of the material
          on the Services may be out of date at any given time, and we are under
          no obligation to update such material.
        </p>
        <h3 className="subTitle-left">
          INFORMATION ABOUT YOU AND YOUR USE OF THE SERVICES
        </h3>
        <p>
          All information we collect via the Services is subject to our Privacy
          Policy at showpener.com/privacy. By using the Services, you consent to
          all actions taken by us with respect to your information in compliance
          with the Privacy Policy.
        </p>
        <h3 className="subTitle-left">
          LINKING TO THE SERVICES AND SOCIAL MEDIA FEATURES
        </h3>
        <p>
          You may link to our Services, provided you do so in a way that is fair
          and legal and does not damage our reputation or take advantage of it,
          but you must not establish a link in such a way as to suggest any form
          of association, approval, or endorsement on our part without our
          express written consent.
        </p>
        <p>
          The Services may provide certain social media features that enable you
          to:
        </p>

        <ul>
          <li>
            Link from your own or certain third-party websites to certain
            content from the Services.
          </li>

          <li>
            Send emails or other communications with certain content, or links
            to certain content, from the Services.
          </li>
          <li>
            Cause limited portions of content from the Services to be displayed
            or appear to be displayed on your own or certain third-party
            websites.
          </li>
        </ul>

        <p>
          You may use these features solely as they are provided by us, solely
          with respect to the content they are displayed with, and otherwise in
          accordance with any additional terms and conditions we provide with
          respect to such features. Subject to the foregoing, you must not:
        </p>

        <ul>
          <li>Establish a link from any website that is not owned by you.</li>
          <li>
            Cause the Services or portions of them to be displayed on, or appear
            to be displayed by, any other site, for example, framing, deep
            linking, or in-line linking.
          </li>
          <li>
            Otherwise take any action with respect to the materials from the
            Services that is inconsistent with any other provision of these
            Terms of Use.
          </li>
        </ul>

        <p>
          You agree to cooperate with us in causing any unauthorized framing or
          linking immediately to stop. We reserve the right to withdraw linking
          permission without notice.
        </p>
        <p>
          We may disable all or any social media features and any links at any
          time without notice in our discretion.
        </p>

        <h3 className="subTitle-left">LINKS FROM THE SERVICES</h3>
        <p>
          If the Services contain links to other sites and resources provided by
          third parties, these links are provided for your convenience only.
          This includes links contained in advertisements, including banner
          advertisements and sponsored links. We have no control over the
          contents of those sites or resources, and accept no responsibility for
          them or for any loss or damage that may arise from your use of them.
          If you decide to access any of the third-party websites linked to the
          Services, you do so entirely at your own risk and subject to the terms
          and conditions of use for such websites.
        </p>

        <h3 className="subTitle-left">GEOGRAPHIC RESTRICTIONS</h3>
        <p>
          The owner of the Services is based in the State of Colorado in the
          United States. We provide the Services for use only by persons located
          in the United States and Canada. We make no claims that the Services
          or any of their content is accessible or appropriate outside of the
          United States or Canada. Access to the Services may not be legal by
          certain persons or in certain countries. If you access the Services
          from outside the United States or Canada, you do so on your own
          initiative and are responsible for compliance with local laws.
        </p>

        <h3 className="subTitle-left">DISCLAIMER OF WARRANTIES</h3>
        <p>
          You understand that we cannot and do not guarantee or warrant that
          files available for downloading from the internet or the Services will
          be free of viruses or other destructive code. You are responsible for
          implementing sufficient procedures and checkpoints to satisfy your
          particular requirements for anti-virus protection and accuracy of data
          input and output, and for maintaining a means external to our site for
          any reconstruction of any lost data. TO THE FULLEST EXTENT PROVIDED BY
          LAW, WE WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE CAUSED BY A
          DISTRIBUTED DENIAL-OF-SERVICE ATTACK, VIRUSES, OR OTHER
          TECHNOLOGICALLY HARMFUL MATERIAL THAT MAY INFECT YOUR COMPUTER
          EQUIPMENT, COMPUTER PROGRAMS, DATA, OR OTHER PROPRIETARY MATERIAL DUE
          TO YOUR USE OF THE SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES OR
          TO YOUR DOWNLOADING OF ANY MATERIAL POSTED VIA THE SERVICES, OR ON ANY
          WEBSITE LINKED TO THE SERVICES.
        </p>
        <p>
          YOUR USE OF THE SERVICES, THEIR CONTENT, AND ANY ITEMS OBTAINED
          THROUGH THE SERVICES IS AT YOUR OWN RISK. THE SERVICES, THEIR CONTENT,
          AND ANY ITEMS OBTAINED THROUGH THE SERVICES ARE PROVIDED ON AN
          &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT ANY
          WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER THE COMPANY
          NOR ANY PERSON ASSOCIATED WITH THE COMPANY MAKES ANY WARRANTY OR
          REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY,
          RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICES.
          WITHOUT LIMITING THE FOREGOING, NEITHER THE COMPANY NOR ANYONE
          ASSOCIATED WITH THE COMPANY REPRESENTS OR WARRANTS THAT THE SERVICES,
          THEIR CONTENT, OR ANY ITEMS OBTAINED THROUGH THE SERVICES WILL BE
          ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE
          CORRECTED, THAT OUR SITE OR THE SERVER THAT MAKES IT AVAILABLE ARE
          FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR THAT THE SERVICES OR
          ITEMS OBTAINED THROUGH THE SERVICES WILL OTHERWISE MEET YOUR NEEDS OR
          EXPECTATIONS.
        </p>

        <p>
          TO THE FULLEST EXTENT PROVIDED BY LAW, THE COMPANY HEREBY DISCLAIMS
          ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR
          OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
          MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.
        </p>

        <p>
          THE FOREGOING DOES NOT AFFECT ANY WARRANTIES THAT CANNOT BE EXCLUDED
          OR LIMITED UNDER APPLICABLE LAW.
        </p>

        <h3 className="subTitle-left">LIMITATION ON LIABILITY</h3>

        <p>
          TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE COMPANY,
          ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES,
          AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND,
          UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE,
          OR INABILITY TO USE, THE SERVICES, ANY WEBSITES LINKED TO THE
          SERVICES, ANY CONTENT ON THE SERVICES OR SUCH OTHER WEBSITES,
          INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR
          PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN
          AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS,
          LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF
          GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING
          NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE.
        </p>

        <p>
          THE FOREGOING DOES NOT AFFECT ANY LIABILITY THAT CANNOT BE EXCLUDED OR
          LIMITED UNDER APPLICABLE LAW.
        </p>

        <h3 className="subTitle-left">INDEMNIFICATION</h3>
        <p>
          You agree to indemnify and hold harmless the Company, its affiliates,
          licensors, and service providers, and its and their respective
          officers, directors, employees, contractors, agents, licensors,
          suppliers, successors, and assigns from and against any claims,
          liabilities, damages, judgments, awards, losses, costs, expenses, or
          fees (including reasonable attorneys&apos; fees) arising out of or
          relating to your violation of these Terms of Use or your use of the
          Services, including, but not limited to any use of the Services’
          content, services, and products other than as expressly authorized in
          these Terms of Use, or your use of any information obtained from the
          Services.
        </p>
        <h3 className="subTitle-left">GOVERNING LAW AND JURISDICTION</h3>

        <p>
          All matters relating to the Services and these Terms of Use, and any
          dispute or claim arising therefrom or related thereto (in each case,
          including non-contractual disputes or claims), shall be governed by
          and construed in accordance with the internal laws of the State of
          Colorado without giving effect to any choice or conflict of law
          provision or rule (whether of the State of Colorado or any other
          jurisdiction).
        </p>
        <p>
          Any legal suit, action, or proceeding arising out of, or related to,
          these Terms of Use or the Services shall be instituted exclusively in
          the federal courts of the United States or the courts of the State of
          Colorado, in each case located in the City and County of Denver,
          although we retain the right to bring any suit, action, or proceeding
          against you for breach of these Terms of Use in your country of
          residence or any other relevant country. You waive any and all
          objections to the exercise of jurisdiction over you by such courts and
          to venue in such courts.
        </p>

        <h3 className="subTitle-left">DISPUTE RESOLUTION</h3>
        <p>
          Informal Negotiations. To expedite resolution and control the cost of
          any dispute, controversy, or claim related to these Terms of Use (each
          a “Dispute” and collectively, the “Disputes”) brought by either you or
          us (individually, a “Party” and collectively, the “Parties”), the
          Parties agree to first attempt to negotiate any Dispute (except those
          Disputes expressly provided below) informally for at least (30) days
          before initiating arbitration. Such informal negotiations commence
          upon written notice from one Party to the other Party.
        </p>
        <p>
          Binding Arbitration. If the Parties are unable to resolve a Dispute
          through informal negotiations, the Dispute (except those Disputes
          expressly excluded below) will be finally and exclusively resolved by
          binding arbitration. YOU UNDERSTAND THAT WITHOUT THIS PROVISION, YOU
          WOULD HAVE THE RIGHT TO SUE IN COURT AND HAVE A JURY TRIAL. The
          arbitration shall be commenced and conducted under the Commercial
          Arbitration Rules of the American Arbitration Association (“AAA“) and,
          where appropriate, the AAA’s Supplementary Procedures for Consumer
          Related Disputes (“AAA Consumer Rules“), both of which are available
          at the AAA website www.adr.org. Your arbitration fees and your share
          of arbitrator compensation will be governed by the AAA Consumer Rules
          and, where appropriate, limited by the AAA Consumer Rules. The
          arbitration may be conducted in person, through the submission of
          documents, by phone, or online. The arbitrator will decide in writing
          but need not provide a statement of reasons unless requested by either
          Party. The arbitrator must follow applicable law, and any award may be
          challenged if the arbitrator fails to do so. Except where otherwise
          required by the applicable AAA rules or applicable law, the
          arbitration will take place in Denver, Colorado. Except as otherwise
          provided herein, the Parties may litigate in court to compel
          arbitration, stay proceedings pending arbitration, or to confirm,
          modify, vacate, or enter judgment on the award entered by the
          arbitrator.
        </p>

        <p>
          If, for any reason, a Dispute proceeds in court rather than
          arbitration, the Dispute must be commenced or prosecuted in the state
          and federal courts located in Denver, Colorado, and the Parties hereby
          consent to, and waive all defenses of lack of personal jurisdiction,
          and forum non conveniens with respect to venue and jurisdiction in
          such state and federal courts.
        </p>

        <p>
          In no event shall any Dispute brought by either Party related in any
          way to the Services be commenced more than one (1) year after the
          cause of action arose. If this provision is found to be illegal or
          unenforceable, then neither Party will elect to arbitrate any Dispute
          falling within that portion of this provision found to be illegal or
          unenforceable and such Dispute will be decided by a court of competent
          jurisdiction within the courts listed for jurisdiction above, and the
          Parties agree to submit to the personal jurisdiction of that court.
        </p>
        <p>
          Restrictions; No Class Action. The Parties agree that any arbitration
          will be limited to the Dispute between the Parties individually. To
          the full extent permitted by law, (a) no arbitration may be joined
          with any other proceeding; (b) there is no right or authority for any
          Dispute to be arbitrated on a class-action basis or to utilize class
          action procedures; and (c) there is no right or authority for any
          Dispute to be brought in a purported representative capacity on behalf
          of the general public or any other persons.
        </p>
        <p>
          Exceptions to Informal Negotiations and Arbitration. The Parties agree
          that the following Disputes are not subject to the above provisions
          concerning informal negotiations and binding arbitration: (a) any
          Disputes seeking to enforce or protect, or concerning the validity of,
          any of the intellectual property rights of a Party; (b) any Dispute
          related to, or arising from, allegations of theft, piracy, invasion of
          privacy, or unauthorized use; and (c) any claim for injunctive relief.
          If this provision is found to be illegal or unenforceable, then
          neither Party will elect to arbitrate any Dispute falling within that
          portion of this provision found to be illegal or unenforceable and
          such Dispute shall be decided by a court of competent jurisdiction
          within the courts listed for jurisdiction above, and the Parties agree
          to submit to the personal jurisdiction of that court. Opt-Out. You may
          opt-out of this arbitration and class action waiver provision by
          notifying us in writing within 30 days of the date you first used the
          Services. To opt-out, you must send a written notification to
          contact@showpener.com that includes (a) your username (if applicable),
          (b) your name, (c) your address, (d) your telephone number, (e) your
          email address, and (f) a clear statement indicating that you do not
          wish to resolve claims through arbitration and demonstrating
          compliance with the 30-day time limit to opt-out of the above
          arbitration and class action waiver provision.
        </p>

        <h3 className="subTitle-left">WAIVER AND SEVERABILITY</h3>

        <p>
          No waiver by the Company of any term or condition set out in these
          Terms of Use shall be deemed a further or continuing waiver of such
          term or condition or a waiver of any other term or condition, and any
          failure of the Company to assert a right or provision under these
          Terms of Use shall not constitute a waiver of such right or provision.
        </p>

        <p>
          If any provision of these Terms of Use is held by a court or other
          tribunal of competent jurisdiction to be invalid, illegal, or
          unenforceable for any reason, such provision shall be eliminated or
          limited to the minimum extent such that the remaining provisions of
          the Terms of Use will continue in full force and effect.
        </p>

        <h3 className="subTitle-left">ENTIRE AGREEMENT</h3>
        <p>
          The Terms of Use and our Privacy Policy constitute the sole and entire
          agreement between you and the Company regarding the Services and
          supersede all prior and contemporaneous understandings, agreements,
          representations, and warranties, both written and oral, regarding the
          Services.
        </p>
        <h3 className="subTitle-left">YOUR COMMENTS AND CONCERNS</h3>
        <p>The Services are operated by Showpener LLC.</p>
        <p>
          All feedback, comments, requests for technical support, and other
          communications relating to the Services should be directed to:
          contact@showpener.com.
        </p>
      </div>

      <button className="submitButton" onClick={goHome}>
        <span>Go back</span>
      </button>
    </div>
  );
}

export default Terms;
