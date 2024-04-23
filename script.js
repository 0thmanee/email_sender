let mails = [];
let currentIndex = 0;
const btn = document.querySelector(".send_btn");
const email_input = document.querySelector(".email");

const extractName = function (email) {
  const atIndex = email.indexOf("@");
  const dotIndex = email.indexOf(".");

  if (atIndex !== -1 && dotIndex !== -1 && dotIndex > atIndex + 1) {
    return email.slice(atIndex + 1, dotIndex);
  } else {
    return email;
  }
};

const sendEmail = function (emailAdress) {
  return new Promise((resolve, reject) => {
    Email.send({
      SecureToken: "0c863a8d-50ea-419e-86de-0791a546954c",
      To: emailAdress,
      From: "contact@bugbeat.tech",
      Subject: "Join BugBeat's Bug Bounty Program",
      Body: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    .email-content {
      line-height: 1.6;
      margin: 0 auto;
      max-width: 600px;
      padding: 20px;
    }
    .header {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .paragraph {
      margin-bottom: 15px;
    }
    .signature {
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="email-content">
    <div class="header">Enhance Security with BugBeat's Bug Bounty Program</div>
    <div class="paragraph">
      Dear ${extractName(emailAdress)},
    </div>
    <div class="paragraph">
      I hope this email finds you well. My name is Simon, and I am the founder of BugBeat, a leading bug bounty programs website. I am reaching out to you today because I believe our organizations can collaborate to enhance the security of your domains and protect your valuable user data.
    </div>
    <div class="paragraph">
      BugBeat is committed to promoting top-notch cybersecurity by connecting ethical hackers with organizations like yours. Through our platform, security experts can identify vulnerabilities and report them to website owners, who can then address these issues to improve overall security.
    </div>
    <div class="paragraph">
      Your network of websites managed by ${extractName(
        emailAdress
      )} is extensive, and ensuring their security is paramount. BugBeat can play a crucial role in safeguarding your platforms and users' sensitive data.
    </div>
    <div class="paragraph">
      By joining BugBeat's free bug bounty program, you'll gain access to a global community of skilled ethical hackers. They excel in discovering vulnerabilities in websites and applications, enabling you to address security risks proactively.
    </div>
    <div class="paragraph">
      <strong>Benefits of BugBeat's Bug Bounty Program:</strong>
      <ol>
        <li>Enhanced Security: Identify and address vulnerabilities, bolstering your defenses against cyber threats.</li>
        <li>Reputation Protection: Demonstrate your commitment to cybersecurity, enhancing your industry reputation and user trust.</li>
        <li>Cost-Effectiveness: Our "pay-per-vulnerability" model ensures cost savings compared to traditional audits.</li>
        <li>Collaboration Opportunities: Collaborate with ethical hackers, gaining insights and relationships with security professionals.</li>
      </ol>
    </div>
    <div class="paragraph">
      To get started with BugBeat's bug bounty program, <a class="cta-button" href="https://bugbeat.tech">visit our website</a>. Our team is ready to guide you through the process.
    </div>
    <div class="paragraph signature">
      I'd be delighted to discuss our bug bounty program further and answer any questions you may have. Your dedication to security aligns perfectly with BugBeat's mission, and together we can create a safer digital landscape.
    </div>
    <div class="paragraph">
      Thank you for considering our proposal. I look forward to collaborating with ${extractName(
        emailAdress
      )} to enhance cybersecurity.
    </div>
    <div class="paragraph signature">
      Best regards,<br>
      Simon<br>
      Founder, BugBeat
    </div>
  </div>
</body>
</html>`,
    })
      .then((msg) => {
        resolve(msg);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const sendNextEmail = async function () {
  if (currentIndex < mails.length) {
    try {
      await sendEmail(mails[currentIndex]);
      email_input.textContent = `Email sent to ${mails[currentIndex]}`;
    } catch (error) {
      email_input.textContent = `Error sending email`;
      console.error(`Error sending email to ${mails[currentIndex]}:`, error);
    } finally {
      currentIndex++;
      sendNextEmail();
    }
  } else {
    email_input.textContent = `All emails sent`;
    btn.innerText = "Send Now!";
  }
};

const fileURL = "./emails.txt";

fetch(fileURL)
  .then((response) => response.text())
  .then((fileContent) => {
    mails = fileContent.split("\n").map((line) => line.trim());

    btn.addEventListener("click", function (e) {
      btn.disabled = true;
      btn.innerText = "Processing...";

      sendNextEmail();
    });
  })
  .catch((error) => {
    console.error("Error fetching the file:", error);
  });
