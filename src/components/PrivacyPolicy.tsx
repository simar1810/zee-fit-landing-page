import React from 'react';
import { Footer } from './Footer';

export function PrivacyPolicy() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -0.5, color: '#111827', margin: 0 }}>Privacy Policy</h1>
          <p style={{ color: '#6b7280', marginTop: 8 }}>Last Updated: [Date]</p>
        </div>
      </div>

      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>
          {/* Introduction */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Introduction</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 12 }}>
              Welcome to Zeefit! Zeefit (operated by Mohi Lifestile Solutions Private Limited) is committed to protecting your privacy and handling your personal information with care. This Privacy Policy explains what information we collect, how we use and share it, and your rights regarding your data. We comply with applicable data protection laws including the EU General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
            </p>
            <p style={{ color: '#374151', lineHeight: 1.7 }}>
              By using the Zeefit app or website, you agree to the practices described in this Privacy Policy. If you do not agree, please discontinue use of our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Information We Collect (Data Collection)</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 16 }}>
              We collect several types of information from and about Zeefit users:
            </p>
            
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Personal Identifiers</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Information that identifies you, such as your name, email address, phone number, date of birth, and account login credentials. This is collected when you register an account or voluntarily provide it.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Contact and Profile Data</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Information like your username, profile photo (if you add one), and any biography or preferences you provide in your profile.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Health and Fitness Data</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Information related to your wellness that you log into Zeefit, such as workouts, exercise routines, nutrition/diet details, weight, height, or other fitness metrics. This may include data imported from third-party apps or devices with your permission (for example, syncing with Apple HealthKit or Google Fit). We handle any health data in compliance with platform rules – for instance, HealthKit data is used only to provide our services and not for advertising or data mining purposes, per Apple's policies.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Usage Data</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Information automatically collected about how you use our app/website. This includes technical information (device type, operating system, browser type, IP address) and usage logs (features you use, pages or screens viewed, clicks, and session duration). We may also collect general location information (e.g. city) based on IP or if you enable precise location for features like finding nearby trainers (you will be asked for consent if precise location is collected).
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Transactional Data</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                If our services include paid features or subscriptions, we collect data about purchases or subscriptions you make. This includes payment method information (such as a credit card token or payment service ID), billing address, and transaction history on Zeefit. Note: Payment details are processed securely by our payment processors; we do not store your full credit card number or banking credentials on our servers.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Cookies and Similar Technologies</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                When you visit our website or use the app, we (and authorized third parties) use cookies, pixels, and similar tracking technologies to collect data. These may collect information about your browsing actions and usage patterns (see Cookies and Tracking below for details).
              </p>
            </div>

            <p style={{ color: '#374151', lineHeight: 1.7, marginTop: 16, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
              <strong>Note:</strong> We only collect what is necessary to provide and improve the Zeefit services. You may choose not to provide certain information; however, this might limit your ability to use some features (for example, not providing your email may prevent account registration).
            </p>
          </section>

          {/* How We Use Your Information */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>How We Use Your Information (Data Usage)</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 16 }}>
              Zeefit uses the collected information for various legitimate purposes, including:
            </p>
            
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Providing and Improving Services</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                We use personal and fitness data to operate Zeefit's core functionalities – for example, to log your workouts and meals, calculate your fitness progress, and deliver personalized workout or meal plans. We analyze usage data and feedback to understand how users interact with Zeefit and to improve our app's performance and features.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Personalization</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Your data helps us tailor your experience. For instance, health data you provide allows Zeefit to show customized workout recommendations, progress insights, or meal suggestions suited to your goals. We may also use your past activity to suggest new features or content you might be interested in.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Communications</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                We use contact information (like email or in-app notifications) to send you service-related messages such as account confirmations, password resets, workout reminders, and updates about new features. We may also send newsletters, fitness tips, or promotional offers if you have opted to receive them. You can opt out of marketing emails at any time. (Transactional/service emails cannot be fully opted out as they are necessary for service delivery.)
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Access to Trainers</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                If Zeefit connects users with personal trainers, we use your data to facilitate that service. For example, if you sign up for a coaching plan, your relevant profile and fitness data may be shared with your chosen trainer so they can provide personalized guidance.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Analytics and Product Research</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                We may use aggregated, de-identified data to understand trends and user demographics. This helps us research and innovate new features or wellness insights. For example, analyzing how many users achieved certain goals can help improve our programs.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Security and Fraud Prevention</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Information (like device IDs, IP addresses, and usage patterns) is used to maintain the security of our platform, verify accounts, and detect/prevent fraudulent or unauthorized activity.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Legal Compliance</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                In certain cases, we may need to use your data to comply with legal obligations, such as maintaining transaction records for tax/audit purposes or responding to verified law enforcement requests.
              </p>
            </div>

            <p style={{ color: '#374151', lineHeight: 1.7, marginTop: 16, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
              <strong>Legal Basis:</strong> We will only process your personal information when we have a valid legal basis to do so. Under GDPR, our legal bases include: to fulfill our contract with you (providing the app's services you signed up for), your consent (for optional data like health integrations or marketing communications), compliance with a legal obligation, or our legitimate interests in improving our services (balanced with your data protection rights).
            </p>
          </section>

          {/* How We Share Your Information */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>How We Share Your Information (Data Sharing)</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 16 }}>
              Zeefit respects your privacy – we do not sell your personal information to third parties. However, in order to run our business and provide the services, we do share information in the following situations:
            </p>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Service Providers</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                We share data with trusted third-party vendors who perform services on our behalf. This includes, for example: cloud hosting providers (for data storage), email/SMS delivery services (to send verification codes or notifications), payment processors (to handle subscription payments securely), analytics tools (to understand app performance), and customer support software. These providers are given access only to the information necessary for them to perform their functions, and they are contractually obligated to protect it and use it only for our purposes.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Personal Trainers or Coaches</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                If you participate in a program that involves a personal trainer via Zeefit, we will share with that trainer the information required to effectively coach you. This may include your profile data and relevant fitness/health data (workout logs, goals, etc.). Trainers are also bound by confidentiality and required to use your data only for providing you services through Zeefit. (Note: Trainers may be independent professionals or affiliates of Zeefit; they should have their own privacy practices for data you share directly with them. Zeefit's sharing of your data with a trainer is covered by this Policy, but we are not responsible for a trainer's handling of your information once they have it outside our platform.)
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Business Partners (Limited)</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                We might partner with other companies to offer combined services, promotions or integrations (for example, a diet tracking partner or an equipment retailer offering a discount to our users). If you choose to participate in such offerings, we will disclose to you if any data transfer will occur and ask for your consent as required. We will not share your personal data with third-party partners for their own marketing purposes unless you explicitly agree.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Legal Requirements and Protection</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                We may disclose personal information if required to do so by law or in the good-faith belief that such action is necessary to comply with applicable laws, regulations, legal process, or enforceable governmental requests. We may also share data when necessary to enforce our Terms & Conditions or other agreements, or to protect the rights, property, or safety of Zeefit, our users, or others. This includes exchanging information with other companies and organizations for fraud protection or security threats.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Corporate Transactions</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                In the event that Zeefit (Mohi Lifestile Solutions Pvt. Ltd.) undergoes a business transaction such as a merger, acquisition by another company, reorganization, or sale of all or part of its assets, your personal information may be among the assets transferred. We will ensure the acquiring entity is bound to respect your rights and privacy in line with this Policy. You will be notified via email and/or a prominent notice in our app/website of any change in ownership or uses of your personal information, as well as any choices you may have regarding your personal information in such an event.
              </p>
            </div>

            <p style={{ color: '#374151', lineHeight: 1.7, marginTop: 16, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
              Aside from the situations above, Zeefit will not share your identifiable personal information with any third party without your consent. We may share aggregated or de-identified information (which cannot be linked back to you) publicly and with partners – for example, publishing trends about exercise habits or average progress metrics – for research or marketing, but this data cannot identify any individual.
            </p>
          </section>

          {/* Data Security */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Data Security (Protection of Your Data)</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 16 }}>
              We take the security of your personal information seriously. Zeefit implements a variety of technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction:
            </p>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Encryption</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                All communications between your app/website and our servers are encrypted using Secure Socket Layer (SSL) or equivalent encryption technology in transit. Sensitive data (like passwords and payment info) is encrypted at rest or tokenized.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Access Controls</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Personal data is stored on secure servers with strict access controls. Only authorized personnel with a valid business need are permitted to access user data, and they are bound by confidentiality obligations. We employ authentication safeguards (such as hashed passwords and, where applicable, two-factor authentication for administrative access) to prevent unauthorized logins.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Security Monitoring</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Our systems are routinely monitored for potential vulnerabilities and attacks. We use firewalls, anti-malware, and intrusion detection systems to guard against security threats. Software and libraries are kept up-to-date to mitigate risks.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Employee Training</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Our staff is trained on data protection best practices and we have internal policies in place to handle user data safely and prevent any unauthorized use.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Anonymization</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                When possible, we anonymize or pseudonymize personal data, especially for analytics and development purposes, so that it cannot be easily tied back to individual identities.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Payment Security</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                All payment transactions are handled through PCI-DSS compliant payment processors. For example, if you enter credit card details, that information is transmitted directly to the payment gateway over an encrypted connection and is not stored on our systems beyond what is necessary (such as a token or reference).
              </p>
            </div>

            <p style={{ color: '#374151', lineHeight: 1.7, marginTop: 16, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
              Despite our efforts, please note that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security. You can help keep your data safe by using a strong, unique password for your Zeefit account and by safeguarding your devices. If you suspect any unauthorized access to your account or any security breaches, please notify us immediately.
            </p>
          </section>

          {/* Your Rights and Choices */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Your Rights and Choices (User Rights)</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 16 }}>
              You have significant control over your personal data. Depending on your jurisdiction, these rights may include:
            </p>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Access Your Data</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                You have the right to request a copy of the personal information we hold about you and to obtain information about how we process it. We will provide this data in a structured, commonly used format (and for EU users, in a machine-readable format to facilitate data portability, if applicable).
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Correct/Update Your Data</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                If any of your personal information is inaccurate or incomplete, you have the right to request correction or update it. You can often do this directly through the app (e.g., editing your profile information). We encourage you to keep your information up to date, and we will honor legitimate requests to rectify any inaccuracies.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Delete Your Data</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                You may request deletion of your personal information. This is also known as the "right to be forgotten." Upon request, we will delete the information we hold about you, provided we do not have a legal obligation or other valid reason to retain it (for example, some data may be retained for compliance with financial regulations or to prevent fraud). Do note that deleting certain data (or your account entirely) will likely mean you can no longer use Zeefit services that rely on that data.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Data Portability</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                For data you have provided to us, you have the right to obtain and reuse it for your own purposes across different services. We can provide your data in a commonly used, machine-readable format upon request, so you can transfer it to other platforms if desired.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Withdraw Consent</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                If we process any of your data based on your consent (e.g., you gave consent to connect Zeefit with a health app or to receive promotional emails), you have the right to withdraw that consent at any time. Withdrawing consent will not affect the lawfulness of processing based on consent before its withdrawal. For example, you can unsubscribe from marketing emails through the "unsubscribe" link or by adjusting your app settings.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Object to Processing</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                You may have the right to object to certain processing activities. For instance, if we are processing your data based on legitimate interests or for direct marketing, you can object to that processing and we will review your request. If you object to direct marketing, we will cease processing your data for those purposes.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Restrict Processing</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                You can request that we restrict processing of your data in certain circumstances – for example, while we verify your data correction request or if you contest the legality of our processing. Restricting means we will store your data but not actively process it until the issue is resolved.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Automated Decision-Making</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Zeefit generally does not make decisions that produce legal or similarly significant effects solely based on automated processing of personal data (without human involvement). If we ever implement such features, you have the right not to be subject to a decision based only on automated processing, and to request human review.
              </p>
            </div>

            <p style={{ color: '#374151', lineHeight: 1.7, marginTop: 16, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
              <strong>To exercise any of these rights, please contact us</strong> (see Contact section below). We will respond to your request within the timeframe required by law (generally within 30 days for most requests). We will need to verify your identity before fulfilling requests – for example, by confirming control of your account email – to protect your privacy. Note that these rights are not absolute; they can be subject to conditions or limitations under applicable law.
            </p>

            <div style={{ marginTop: 24, padding: 20, background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 12 }}>CCPA Rights (for California Residents)</h3>
              <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 12 }}>
                If you are a California resident, the CCPA (as amended by the CPRA) provides you specific rights regarding your personal information. These include the right to know what personal information we collect, the right to delete your personal information (with exceptions), the right to opt-out of the sale or sharing of personal information, the right to correct inaccurate information, the right to limit use of sensitive personal information, and the right to non-discrimination for exercising these rights.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                In summary, you may request that we disclose the categories and specific pieces of personal info we have about you, the categories of sources of that info, our business purpose for collecting it, and any third parties with whom we share it. You can also request that we delete the personal info we collected from you and tell our service providers to do the same (unless an exception applies). Zeefit does not sell personal information, so the opt-out right regarding sale is not applicable as we do not exchange data for money or other valuable consideration. To exercise California privacy rights, you or your authorized agent can contact us with your request (see Contact section). We will verify and respond as required by CCPA. We will not discriminate against you for exercising any CCPA rights.
              </p>
            </div>

            <div style={{ marginTop: 24, padding: 20, background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 12 }}>GDPR Rights (for EU/EEA Users)</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                If you are located in the European Union or a similar jurisdiction with GDPR-equivalent laws, your rights as described above (access, correction, deletion, etc.) fully apply. You also have the right to lodge a complaint with a supervisory data protection authority in your country if you believe we have violated your data protection rights. We encourage you to contact us first, so we can address your concerns. We have appointed a Data Protection Officer (or equivalent) to oversee GDPR compliance – you can reach them via the contact information provided.
              </p>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Cookies and Tracking Technologies</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 16 }}>
              Zeefit uses cookies and similar tracking technologies to provide and enhance our services:
            </p>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>What Cookies Are</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Cookies are small text files placed on your browser or device by websites or apps. They allow the site/app to recognize your device and store certain information about your preferences or past actions. Similarly, our mobile app may use device identifiers or SDKs that function like cookies.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Types of Cookies We Use</h3>
              <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 12 }}>
                We use both session cookies (which expire when you close your app/browser) and persistent cookies (which remain for a set period or until deleted). Cookies on Zeefit can be categorized as:
              </p>
              <ul style={{ color: '#374151', lineHeight: 1.7, paddingLeft: 24, marginBottom: 12 }}>
                <li style={{ marginBottom: 8 }}><strong>Strictly Necessary Cookies:</strong> These are essential for the operation of our service. For example, they help authenticate your login and keep your session active, or remember your settings. Without these, the app or site might not function properly.</li>
                <li style={{ marginBottom: 8 }}><strong>Analytics/Performance Cookies:</strong> We use these to collect information about how users interact with Zeefit. For instance, Google Analytics may set cookies to track page load times, user navigation, or other performance metrics. This helps us diagnose technical issues and understand usage patterns so we can improve the user experience.</li>
                <li style={{ marginBottom: 8 }}><strong>Functional Cookies:</strong> These help enhance functionality and personalization, such as remembering your preferences (e.g., your preferred units of measurement, language selection, or whether you completed an intro tutorial).</li>
                <li style={{ marginBottom: 8 }}><strong>Advertising Cookies:</strong> Currently, Zeefit does not host third-party ads. If this changes, such cookies might be used by advertising partners to show you relevant ads on our site or elsewhere. We will update this policy and obtain necessary consents if we introduce advertising cookies.</li>
              </ul>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Similar Technologies</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                In addition to cookies, we might use local storage or in-app tracking tools that gather information for the purposes stated above. For example, our email newsletters might contain a "web beacon" (a tiny graphic file) that tells us if you opened the email, which helps us improve our communications.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Your Choices</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                When you use the Zeefit website, we will request your consent for non-essential cookies (such as analytics cookies) if required by law (for example, for EU users). You can always manage cookies through your browser settings – for instance, you can set your browser to refuse all or some cookies, or to alert you when cookies are being set. If you disable or refuse cookies, please note that some parts of our service (especially the web-based features) might become inaccessible or not function optimally (e.g., you may need to log in each time as cookies are used for session management).
              </p>
              <p style={{ color: '#374151', lineHeight: 1.7, marginTop: 12 }}>
                For the mobile app, your device operating system may offer options to reset advertising identifiers or limit tracking. Additionally, you can opt out of Google Analytics tracking by using the official Google opt-out browser add-on, or by enabling "Limit Ad Tracking" on iOS or "Opt out of Ads Personalization" on Android for mobile analytics.
              </p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Do-Not-Track Signals</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Some browsers offer a "Do Not Track" (DNT) feature that signals to websites that you do not want to be tracked across sites. There is currently no consensus on how to interpret DNT signals. Like many services, Zeefit does not respond to DNT browser signals. Instead, we allow you to manage tracking through the controls described above.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Children's Privacy</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 16 }}>
              Protecting children's privacy is extremely important to us. Zeefit is not intended for use by children under the age of 13, and we do not knowingly collect personal information from children under 13. If you are under 13, please do not register or submit any personal data to Zeefit. If we learn that we have inadvertently collected personal information from a child under 13, we will take prompt steps to delete such information from our records.
            </p>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 16 }}>
              For users between 13 and 18 years old (or the age of majority in your jurisdiction), you should only use Zeefit with the involvement and consent of a parent or legal guardian. Some features (for example, purchasing a subscription or engaging a personal trainer) may be restricted to users who are 18 or older. We reserve the right to ask for proof of age or parental consent for teen users if needed.
            </p>
            <p style={{ color: '#374151', lineHeight: 1.7 }}>
              Parents or guardians who believe that their child under 13 may have provided us personal information should contact us immediately so that we can delete the data. We encourage parents to supervise their children's online activities and help enforce this Privacy Policy.
            </p>
          </section>

          {/* Data Retention */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Data Retention</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 16 }}>
              We will retain your personal information for as long as needed to fulfill the purposes for which it was collected, unless a longer retention period is required or permitted by law. In practice, this means:
            </p>
            <ul style={{ color: '#374151', lineHeight: 1.7, paddingLeft: 24, marginBottom: 16 }}>
              <li style={{ marginBottom: 12 }}><strong>Account information and profile data</strong> are kept as long as your account is active. If you delete your account or request deletion, we will remove or anonymize your personal data within a reasonable period (except as noted below for legal requirements).</li>
              <li style={{ marginBottom: 12 }}><strong>Fitness and wellness logs</strong> (workouts, meals, etc.) are retained to provide you ongoing access to your history and progress. If you delete your account, these logs will be deleted or disassociated from your identity.</li>
              <li style={{ marginBottom: 12 }}><strong>Transaction records</strong> are kept for the duration required by financial regulations and tax laws – for example, purchase history may be retained for several years for accounting and audit purposes.</li>
              <li style={{ marginBottom: 12 }}><strong>Communications</strong> you have with us (like support emails) may be kept as long as necessary to address your inquiry and maintain records of our correspondence.</li>
              <li style={{ marginBottom: 12 }}><strong>Backup copies of data:</strong> Our systems regularly back up data to ensure reliability. These backups are stored securely and are rotated and deleted on a schedule. There may be a short delay (typically no more than 30-60 days) between when you delete information and when backups are purged. During that period, your data would not be accessible to anyone actively using our services.</li>
            </ul>
            <p style={{ color: '#374151', lineHeight: 1.7 }}>
              Even after you delete your account, some residual data may remain in our logs or archives but will be disassociated from personal identifiers. We maintain these logs for security and system integrity (for example, to investigate fraud or abuse).
            </p>
          </section>

          {/* International Data Transfers */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>International Data Transfers</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 16 }}>
              Zeefit is a global service. Your information may be stored and processed in countries other than your own, for example on cloud servers located in the United States, the European Union, or India. When we transfer personal data out of its country of origin, we take steps to ensure that appropriate safeguards are in place in accordance with applicable data protection laws. This may include using standard contractual clauses approved by the European Commission for data transfers from the EU to non-EU countries, or ensuring the recipient country has an adequacy decision from the EU (for EU user data).
            </p>
            <p style={{ color: '#374151', lineHeight: 1.7 }}>
              By using Zeefit, you understand that your information may be transferred to our facilities and those third parties with whom we share it as described in this Policy, even if they are located in a different country. Those countries may have data protection rules that are different from your country. However, we will always protect your personal data as described in this Policy, wherever it is processed.
            </p>
            <p style={{ color: '#374151', lineHeight: 1.7, marginTop: 16 }}>
              If you have questions about our international data practices, please contact us.
            </p>
          </section>

          {/* Changes to This Privacy Policy */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Changes to This Privacy Policy</h2>
            <p style={{ color: '#374151', lineHeight: 1.7 }}>
              We may update this Privacy Policy from time to time as our services and legal requirements evolve. We will post any changes on this page with an updated revision date. If we make material changes (for example, if we start collecting additional categories of personal data or change how we use data in a way that affects your rights), we will provide a more prominent notice – such as an in-app alert, pop-up, or email notification – to inform you. We encourage you to periodically review this Policy for the latest information on our privacy practices. Your continued use of Zeefit after any changes to this Privacy Policy constitutes your acceptance of the updated terms.
            </p>
          </section>

          {/* Contact Us */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Contact Us</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 16 }}>
              If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please do not hesitate to contact us:
            </p>
            <div style={{ background: '#f9fafb', padding: 20, borderRadius: 8, marginBottom: 16 }}>
              <p style={{ color: '#111827', fontWeight: 600, marginBottom: 8 }}>Mohi Lifestile Solutions Private Limited (Zeefit)</p>
              <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 4 }}><strong>Registered Office:</strong></p>
              <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 12 }}>A-279, A-Block, New Amritsar, Punjab – 143001, India</p>
              <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 4 }}><strong>Corporate Office:</strong></p>
              <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 12 }}>A-197, TC Coworks Space, Office No. S-04, 2nd Floor, Sector 63, Noida, Uttar Pradesh – 201301, India</p>
              <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 4 }}><strong>Email:</strong></p>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>support@zeefit.com</p>
              <p style={{ color: '#374151', lineHeight: 1.7, marginTop: 12, marginBottom: 4 }}><strong>Data Protection Officer (for GDPR):</strong></p>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>[DPO Contact Email, if applicable]</p>
            </div>
            <p style={{ color: '#374151', lineHeight: 1.7 }}>
              We will respond to your inquiries as soon as possible, and in any event within any timeframes required by law. Your privacy is important to us, and we welcome your feedback.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
