import React from 'react';
import { Footer } from './Footer';

export function TermsAndConditions() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -0.5, color: '#111827', margin: 0 }}>Terms & Conditions</h1>
          <p style={{ color: '#6b7280', marginTop: 8 }}>Last Updated: [Date]</p>
        </div>
      </div>

      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>
          {/* Introduction */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Introduction</h2>
            <p style={{ color: '#374151', lineHeight: 1.7 }}>
              PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE USING THE ZEEFIT APPLICATION OR WEBSITE. This document ("Terms and Conditions" or "Terms") is a legal agreement between you (the user of Zeefit services) and Mohi Lifestile Solutions Private Limited ("Zeefit", "we", "us", or "the Company"). By accessing or using Zeefit's mobile application, website, and related services (collectively, the "Services"), you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use the Services.
            </p>
          </section>

          {/* Section 1: Acceptance of Terms & Updates */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>1. Acceptance of Terms & Updates</h2>
            
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Acceptance</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                By creating an account or otherwise using the Services, you confirm that you accept these Terms and our Privacy Policy (which is incorporated by reference). You represent that you have the legal capacity to enter into this agreement. If you are using Zeefit on behalf of an organization, you are agreeing to these Terms for that organization and promising that you have the authority to bind that organization to these Terms.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Eligibility</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                You must be at least 18 years old (or the age of majority in your jurisdiction) to create a Zeefit account or make use of the Services. Users under 18 may only use Zeefit under the supervision and with the consent of a parent or legal guardian. In addition, certain features (such as purchasing a subscription or engaging with a personal trainer) may not be available to minors. By using the Services, you represent and warrant that you meet the applicable age requirements, and that all information you submit is truthful and accurate. Zeefit reserves the right to ask for proof of age or to disable accounts that appear to be used by minors under 13 years of age.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Changes to Terms</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Zeefit may modify or update these Terms occasionally (for example, to reflect changes in our Services or for legal reasons). We reserve the right to amend these Terms at any time. If we make material changes, we will notify you by posting the updated Terms on our website and/or through in-app notifications, and by updating the "Effective Date" at the top. It is your responsibility to review the Terms periodically. Your continued use of the Services after the Terms have been updated constitutes your acceptance of the revised Terms. If you do not agree to the new terms, you must stop using the Services.
              </p>
            </div>
          </section>

          {/* Section 2: Account Registration and Security */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>2. Account Registration and Security</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 16 }}>
              To access most Zeefit features, you need to create an account. Here are the rules concerning accounts:
            </p>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Registration Information</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                When creating an account, you must provide accurate, current, and complete information (including your full name, a valid email address, and any other information requested). You agree to update your information as needed to keep it accurate. You must not impersonate any other person or entity, or use an email or name that you are not authorized to use. If we discover that your information is inaccurate or violates these Terms, we may suspend or terminate your account.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Account Security</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                You are responsible for maintaining the confidentiality of your login credentials (username and password or any other secure access method) ("Access IDs"). Do not share your account or password with anyone else. You must notify us immediately at support@zeefit.com if you suspect any unauthorized access to or use of your account. Zeefit will not be liable for any loss or damage arising from your failure to safeguard your account. You are responsible for all activities that occur under your account, whether or not you know about them.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Use of Another's Account</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                You must not use anyone else's account or allow anyone else to use your account. Each user should have their own account. You may not sell, transfer, or assign your account to any other person.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Multiple Accounts</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                You agree to have only one active account at any time, unless explicitly permitted by Zeefit (for example, if we offer separate accounts for trainers vs. clients, which will be clearly indicated). Creating multiple accounts without permission, or creating an account for someone other than yourself without their authorization, is prohibited.
              </p>
            </div>

            <p style={{ color: '#374151', lineHeight: 1.7, marginTop: 16, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
              Zeefit cares about the security of our users. While we implement security measures to protect your account, you also play a crucial role. Always log out at the end of each session, especially when using a shared device.
            </p>
          </section>

          {/* Section 3: Services and Subscription Plans */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>3. Services and Subscription Plans</h2>
            
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Services Description</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Zeefit provides a platform for fitness and wellness, including features to track workouts and meals, monitor fitness progress, and access personal training or coaching services. The exact features may evolve over time; refer to our website or app for the current list of functionalities and offerings.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Subscription Plans and Payments</h3>
              <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 12 }}>
                Some features of Zeefit may be offered free of charge, while premium features (such as personalized coaching, advanced analytics, or exclusive content) may require a paid subscription or one-time purchase ("Premium Services"). If you choose to subscribe to a paid plan or make in-app purchases:
              </p>
              <ul style={{ color: '#374151', lineHeight: 1.7, paddingLeft: 24 }}>
                <li style={{ marginBottom: 8 }}><strong>Pricing and Billing:</strong> Zeefit's premium subscription options (e.g., monthly, quarterly, annual plans) and their prices are described in the app or website at the time of purchase. When you subscribe, you authorize us (or our third-party payment processor) to charge your provided payment method for the recurring subscription fee and any applicable taxes. All prices are shown in [applicable currency] and exclude taxes unless stated otherwise.</li>
                <li style={{ marginBottom: 8 }}><strong>Free Trials:</strong> We may offer new users a free trial of a Premium Service. The duration of free trials will be specified (e.g., 7 days or 1 month). Unless you cancel before the trial ends, your trial will automatically convert to a paid subscription and your payment method will be charged on the day the free trial expires (for the subscription term indicated). You can cancel at any time before the trial ends to avoid charges. Each user is limited to one free trial (additional restrictions may apply).</li>
                <li style={{ marginBottom: 8 }}><strong>Auto-Renewal:</strong> Subscriptions automatically renew at the end of each billing cycle (monthly or annually, etc.) and you will be charged in advance for the next cycle, unless you cancel. For example, if you purchase a monthly plan, it will renew each month on the same calendar day you subscribed. You must cancel before the renewal date to avoid being charged for the next period. We will make the auto-renewal terms clear at sign-up and may send a reminder for annual plans.</li>
                <li style={{ marginBottom: 8 }}><strong>Cancellation:</strong> You can cancel your subscription at any time via your account settings or the app store (for in-app subscription). If you cancel, you will continue to have access to Premium Services until the end of your current paid term, but no refunds will be given for the remaining period except where required by law or explicitly stated otherwise.</li>
                <li style={{ marginBottom: 8 }}><strong>Refund Policy:</strong> Fees are generally non-refundable. However, we may grant refunds or credits in our sole discretion in extenuating circumstances or if required by local consumer protection laws. For instance, users in some jurisdictions may be entitled to a refund if they cancel a subscription shortly after purchase (e.g., within 14 days in the EU, under certain conditions).</li>
                <li style={{ marginBottom: 8 }}><strong>Payment Failures:</strong> If a subscription payment fails (due to expiration of card, insufficient funds, or otherwise), we may attempt to charge again within a short period. If payment continues to fail, we may downgrade or suspend your premium access.</li>
                <li style={{ marginBottom: 8 }}><strong>Changes in Fees:</strong> Our subscription fees may change over time. Any fee change will be communicated to you in advance. For existing subscriptions, changes will apply at the start of the next renewal term after the effective date of the change.</li>
                <li style={{ marginBottom: 8 }}><strong>Promotional Offers:</strong> Zeefit or third-party partners may occasionally offer promotions or discounts. These may be subject to additional terms. If you received a promotional price, once the promo period ends, your subscription will renew at the standard rate unless otherwise specified.</li>
              </ul>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>No Resale of Subscription</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Purchased subscriptions or accounts are for your personal use only. Reselling or transferring your subscription or any premium account access to others is strictly prohibited. If we detect that you have attempted to sell or transfer paid access, we may terminate your account without refund.
              </p>
            </div>
          </section>

          {/* Section 4: User Responsibilities and Acceptable Use */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>4. User Responsibilities and Acceptable Use</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 16 }}>
              When you use Zeefit, you agree to do so in a lawful and respectful manner. You are responsible for your own conduct on the platform and for any content (such as comments, profile information, or other materials) that you contribute ("User Content"). By using the Services, you agree NOT to engage in any of the following prohibited activities:
            </p>

            <ul style={{ color: '#374151', lineHeight: 1.7, paddingLeft: 24 }}>
              <li style={{ marginBottom: 12 }}><strong>Violation of Law or Rights:</strong> Do not use Zeefit in a way that violates any applicable law or regulation, or infringes upon the rights of anyone else. This includes not posting anything that violates privacy rights, publicity rights, intellectual property rights, or other legal rights of others.</li>
              <li style={{ marginBottom: 12 }}><strong>Inappropriate or Unsafe Content:</strong> Do not upload, post, or share any content that is illegal, obscene, pornographic, hateful, or otherwise objectionable. Content promoting self-harm or eating disorders is also not allowed.</li>
              <li style={{ marginBottom: 12 }}><strong>No Spam or Unauthorized Solicitations:</strong> You shall not use the platform to send spam, chain letters, junk mail, or engage in any unsolicited advertising or marketing activities.</li>
              <li style={{ marginBottom: 12 }}><strong>Impersonation and Misrepresentation:</strong> You must not impersonate any person or entity, or falsely state or otherwise misrepresent your identity or affiliations.</li>
              <li style={{ marginBottom: 12 }}><strong>Interference with Services:</strong> Do not interfere with or disrupt the operation of Zeefit. This includes not introducing viruses, worms, malware, or any other harmful code into our app or systems.</li>
              <li style={{ marginBottom: 12 }}><strong>Automated Access and Data Harvesting:</strong> You may not use bots, scrapers, spiders, or other automated means to access or collect data from Zeefit without our prior permission.</li>
              <li style={{ marginBottom: 12 }}><strong>Reverse Engineering and Tampering:</strong> You must not reverse engineer, decompile, or disassemble the Zeefit app, nor attempt to extract the source code or create derivative works from the software.</li>
              <li style={{ marginBottom: 12 }}><strong>Unauthorized Commercial Use:</strong> The Services are for your personal use. You agree not to exploit Zeefit for commercial purposes without authorization.</li>
              <li style={{ marginBottom: 12 }}><strong>Posting Others' Personal Information:</strong> Do not share anyone's personal or sensitive information without consent.</li>
            </ul>

            <p style={{ color: '#374151', lineHeight: 1.7, marginTop: 16, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
              Zeefit has the right (but not the obligation) to review, monitor, and remove any User Content or activity that violates these rules or that we find inappropriate, at our sole discretion. We may also terminate or suspend your account for such violations.
            </p>

            <p style={{ color: '#374151', lineHeight: 1.7, marginTop: 16 }}>
              <strong>Health and Safety:</strong> You acknowledge that you will use the fitness and wellness content on Zeefit responsibly. Do not attempt exercises beyond your capability. You agree not to do anything that would put yourself, other users, or Zeefit's community at risk.
            </p>
          </section>

          {/* Section 5: User Content and Intellectual Property */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>5. User Content and Intellectual Property</h2>
            
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>5.1 User Content You Provide</h3>
              <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 12 }}>
                Zeefit may allow you to create, upload, or share content such as your profile information, photos, workout comments, forum posts, or other materials ("User Content"). You retain ownership of the content that you create and share on Zeefit. However, by submitting User Content, you grant Zeefit certain rights to that content, as described below.
              </p>
              <div style={{ marginBottom: 12 }}>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 8 }}>License Grant to Zeefit</h4>
                <p style={{ color: '#374151', lineHeight: 1.7 }}>
                  By posting or uploading User Content on the Services, you hereby grant Zeefit a worldwide, non-exclusive, royalty-free, fully paid-up, sub-licensable and transferable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, publicly perform and display your User Content, solely in connection with providing and promoting the Zeefit Services. This license ends when your User Content is deleted from our Services in a manner that we can no longer retrieve or use it.
                </p>
              </div>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                You represent and warrant that you have all necessary rights to the User Content you upload, and that sharing your content on Zeefit does not violate any third-party rights or laws.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>5.2 Zeefit's Intellectual Property</h3>
              <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 12 }}>
                The Zeefit Services and all materials included therein (excluding User Content) are owned by or licensed to Mohi Lifestile Solutions Pvt. Ltd. and are protected by intellectual property laws. This includes the software, design, text, graphics, images, logos, trademarks, videos, and any content created or provided by Zeefit ("Zeefit Content").
              </p>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Subject to your compliance with these Terms, Zeefit grants you a limited, revocable, non-transferable, non-exclusive license to download and use our mobile application and to access our website, solely for your personal, non-commercial use of the Services as intended.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>5.3 Third-Party Content and Links</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Zeefit may contain links to third-party websites or resources, or interoperable features with third-party platforms. Such third-party content and links are provided for your convenience only. Zeefit does not endorse and is not responsible for third-party resources or their content, privacy policies, or practices.
              </p>
            </div>
          </section>

          {/* Section 6: Health Disclaimers and No Medical Advice */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>6. Health Disclaimers and No Medical Advice</h2>
            
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Not Medical or Professional Advice</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                The content and features on Zeefit (including workouts, exercises, nutrition guidance, articles, and any advice from trainers) are for informational and educational purposes only, and are not intended as medical advice. Zeefit is not a medical or healthcare provider. We do not diagnose, treat, or prescribe any health program. Always consult a qualified physician or healthcare provider before starting any new exercise regimen, diet program, or if you have any health-related questions or concerns.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Individual Variations</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Every individual has unique physical capabilities and health conditions. Workouts and nutritional needs vary from person to person. Use of Zeefit is at your own risk. If at any time you feel pain, dizziness, or shortness of breath during a workout, stop immediately and consult a medical professional.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>No Doctor-Patient Relationship</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Your use of Zeefit does not create a doctor-patient, therapist-patient, or other healthcare professional relationship between you and Zeefit or any of its personnel. Any communications from Zeefit or its trainers are for general support and motivational purposes and do not constitute personalized healthcare advice.
              </p>
            </div>

            <p style={{ color: '#374151', lineHeight: 1.7, marginTop: 16, padding: 16, background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 8 }}>
              By using Zeefit, you agree that you understand these disclaimers. You assume all risks associated with physical activity or dietary changes. Zeefit and its trainers are not responsible for any injuries or health issues you may experience as a result of using the platform.
            </p>
          </section>

          {/* Section 7: Limitation of Liability */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>7. Limitation of Liability</h2>
            
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Use at Your Own Risk</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Zeefit strives to provide a safe and reliable experience, but we cannot eliminate all risks. You agree that your use of the Services and any content obtained through it is at your sole risk. The Services are provided on an "as is" and "as available" basis.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Types of Damages Excluded</h3>
              <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 12 }}>
                To the fullest extent permitted by law, Zeefit and its officers, directors, employees, agents, and partners will not be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages. Without limiting the above, we specifically disclaim liability for:
              </p>
              <ul style={{ color: '#374151', lineHeight: 1.7, paddingLeft: 24 }}>
                <li style={{ marginBottom: 8 }}>Any injuries, illnesses, or adverse health outcomes from following workouts or dietary suggestions</li>
                <li style={{ marginBottom: 8 }}>User conduct or content posted by others</li>
                <li style={{ marginBottom: 8 }}>Third-party services or integrations</li>
                <li style={{ marginBottom: 8 }}>Service interruptions, errors, or data loss</li>
              </ul>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Maximum Liability Cap</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                To the extent that we are found liable for anything, our liability to you will be limited to the amount you have paid us in the three (3) months immediately prior to the event giving rise to your claim, or INR 1000 (Indian Rupees One Thousand), whichever is lower.
              </p>
            </div>
          </section>

          {/* Section 8: Disclaimer of Warranties */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>8. Disclaimer of Warranties</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 12 }}>
              To the fullest extent permitted by law, Zeefit disclaims all warranties and conditions (express or implied) regarding the Services. This includes any implied warranties of merchantability, fitness for a particular purpose, non-infringement, and any warranties that might arise from course of dealing or usage of trade.
            </p>
            <p style={{ color: '#374151', lineHeight: 1.7 }}>
              We do not warrant that the Services will meet all of your expectations or that data and content presented are accurate, complete, or up-to-date. We cannot promise that the Services will be available at all times or that operation will be error-free or secure.
            </p>
          </section>

          {/* Section 9: Indemnification */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>9. Indemnification</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 12 }}>
              You agree to indemnify, defend, and hold harmless Zeefit and its affiliates from and against any and all claims, liabilities, damages, losses, and expenses that arise out of or relate to:
            </p>
            <ul style={{ color: '#374151', lineHeight: 1.7, paddingLeft: 24 }}>
              <li style={{ marginBottom: 8 }}>Your use of the Services and any content you post</li>
              <li style={{ marginBottom: 8 }}>Your violation of these Terms</li>
              <li style={{ marginBottom: 8 }}>Your violation of any law or rights</li>
              <li style={{ marginBottom: 8 }}>Your interactions with trainers or third parties</li>
            </ul>
          </section>

          {/* Section 10: Suspension and Termination */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>10. Suspension and Termination</h2>
            
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Voluntary Termination by You</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                You are free to stop using Zeefit at any time. You may delete your account via the app's settings or by contacting support. Please note, deleting the app from your device does not automatically delete your account or cancel subscriptions.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Termination or Suspension by Us</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                We reserve the right to suspend or terminate your access to the Services at our sole discretion if we determine that you have violated these Terms or if your use of the Service could cause harm to other users or us. In severe cases, we might ban without prior warning.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Effect of Termination</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Upon termination, your right to access and use the Services will immediately end. We may permanently delete your User Content and data from our live databases. Any subscription you have will be handled per our cancellation terms.
              </p>
            </div>
          </section>

          {/* Section 11: Governing Law and Dispute Resolution */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>11. Governing Law and Dispute Resolution</h2>
            
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Governing Law</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                These Terms and any dispute arising out of or related to them or the Services will be governed in all respects by the laws of India, without regard to its conflict of law provisions.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Jurisdiction</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                You agree that any legal action or proceeding arising out of or relating to these Terms or the use of the Services shall be brought exclusively in the courts of Amritsar, Punjab, India.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Dispute Resolution</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Before filing a lawsuit, we strongly encourage you to contact us to discuss and hopefully resolve the issue informally. Often, issues can be resolved through our support team. If we cannot resolve through negotiation, we may require disputes to be settled by binding arbitration in accordance with the Arbitration and Conciliation Act, 1996 (India).
              </p>
            </div>

            <p style={{ color: '#374151', lineHeight: 1.7, marginTop: 16, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
              To the extent permitted by law, you and Zeefit agree that each may bring claims against the other only in an individual capacity and not as a plaintiff or class member in any purported class or representative proceeding.
            </p>
          </section>

          {/* Section 12: General Provisions */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>12. General Provisions</h2>
            
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Entire Agreement</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                These Terms (along with the Privacy Policy and any additional guidelines) constitute the entire agreement between you and Zeefit regarding your use of the Service, and supersede any prior agreements relating to your use of Zeefit.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Waiver</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                If we do not enforce a provision of these Terms, that is not a waiver of our right to do so later. Any waiver of any provision of the Terms will be effective only if in writing and signed by an authorized Zeefit representative.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Assignment</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                You may not assign or transfer these Terms or any rights or obligations hereunder to any other person or entity without our prior written consent. Zeefit may freely assign or transfer these Terms or any of our rights or obligations.
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>Force Majeure</h3>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>
                Zeefit will not be liable for any delay or failure in performance of the Services if such delay or failure is caused by unforeseen events beyond our reasonable control, such as war, strikes, natural disasters, pandemic, internet or utility failures, or governmental action.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Contact Information</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 16 }}>
              If you have any questions about these Terms or need to reach us, please contact:
            </p>
            <div style={{ background: '#f9fafb', padding: 20, borderRadius: 8 }}>
              <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 4 }}><strong>Email:</strong></p>
              <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 16 }}>support@zeefit.com</p>
              <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 4 }}><strong>Physical Address:</strong></p>
              <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 4 }}>Mohi Lifestile Solutions Private Limited (Zeefit)</p>
              <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 8 }}>Registered Office: A-279, A-Block, New Amritsar, Punjab – 143001, India</p>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>Corporate Office: A-197, TC Coworks Space, Office No. S-04, 2nd Floor, Sector 63, Noida, Uttar Pradesh – 201301, India</p>
            </div>
            <p style={{ color: '#374151', lineHeight: 1.7, marginTop: 16 }}>
              Thank you for reviewing these Terms and for being a part of Zeefit. By ensuring everyone abides by these guidelines, we can keep Zeefit a safe, enjoyable, and effective platform for all users on their fitness journey. Let's get fit and stay safe together!
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
