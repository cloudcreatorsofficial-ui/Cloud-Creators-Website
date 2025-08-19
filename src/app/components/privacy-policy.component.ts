import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="privacy-policy-container">
      <header class="policy-header">
        <button (click)="goBack()" class="back-button">
          ← Back to Home
        </button>
        <h1>Cloud Creators – Privacy Policy</h1>
        <p class="last-updated">Effective Date: 17/08/2025</p>
      </header>

      <div class="policy-content">
        <section>
          <h2>Introduction</h2>
          <p>
            At Cloud Creators ("Cloud Creators," "we," "our," or "us"), your privacy matters to us. This Privacy Policy explains how we collect, use, share, and safeguard your personal information when you access or use our website https://cloudcreators.in (the "Platform") and our services.
          </p>
          <p>
            You may browse certain areas of the Platform without registering. However, to access specific features or services, some personal information may be required.
          </p>
          <p>
            <strong>Please note:</strong> Our services are currently intended for users within India, and your personal data will primarily be stored and processed in India.
          </p>
          <p>
            By accessing our Platform, sharing your details, or availing any service/product, you consent to the practices outlined in this Privacy Policy, our Terms of Use, and any applicable service conditions. All activities are governed by the laws of India, including data protection and privacy regulations.
          </p>
          <p>
            <strong>If you do not agree, we recommend refraining from using our Platform.</strong>
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          <p>
            We may collect information directly from you, automatically through your interaction with our Platform, or from third parties when required. This includes but is not limited to:
          </p>
          <ul>
            <li><strong>Personal Information</strong> – name, date of birth, address, contact details, and identity/address proof.</li>
            <li><strong>Sensitive Information (with consent)</strong> – payment details (bank account, debit/credit card), biometric data (where applicable), and related details for specific services.</li>
            <li><strong>Transaction Data</strong> – details of services availed or transactions conducted through our Platform or partner providers.</li>
            <li><strong>Usage Data</strong> – browsing behaviour, device information, preferences, and analytics (aggregated and anonymised).</li>
          </ul>
          <div class="warning-box">
            <p>
              <strong>⚠️ Important:</strong> Cloud Creators will never ask you for confidential credentials such as PINs, passwords, or OTPs. If you encounter such a request claiming to be from us, please ignore it and report immediately.
            </p>
          </div>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>Your personal data helps us provide and improve our services. We may use it for:</p>
          <ul>
            <li>Delivering and enhancing the services you request.</li>
            <li>Processing orders, payments, and supporting business partners.</li>
            <li>Personalising your experience and providing tailored interactions.</li>
            <li>Communicating important updates, offers, and service-related information (with opt-out options).</li>
            <li>Detecting, investigating, and preventing fraudulent or unlawful activities.</li>
            <li>Handling disputes, troubleshooting issues, and ensuring compliance with our policies.</li>
            <li>Conducting surveys, research, and analysis for service improvements.</li>
          </ul>
          <p>
            <strong>Note:</strong> Certain permissions may be required for full access to services. Refusing permissions could limit functionality.
          </p>
        </section>

        <section>
          <h2>Sharing of Information</h2>
          <p>We do not sell or rent your personal data. However, we may share it under these circumstances:</p>
          <ul>
            <li><strong>Affiliates & Internal Teams</strong> – for service delivery and operational needs.</li>
            <li><strong>Trusted Partners/Service Providers</strong> – including logistics, payment gateways, technical support, and reward program associates.</li>
            <li><strong>Legal & Regulatory Authorities</strong> – when required by law or in response to valid government requests.</li>
            <li><strong>For Protection & Enforcement</strong> – to prevent harm, enforce terms, or protect Cloud Creators' rights and security.</li>
          </ul>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            We adopt industry-standard security measures (technical and organisational) to safeguard your personal data from unauthorised access, loss, misuse, or disclosure.
          </p>
          <p>
            While we employ encryption and secure systems, no online transmission is 100% secure. You are responsible for keeping your login credentials safe and confidential.
          </p>
        </section>

        <section>
          <h2>Data Retention & Deletion</h2>
          <ul>
            <li>You may delete your account at any time via the Platform settings or by contacting us.</li>
            <li>Deletion requests may be delayed or declined if there are unresolved disputes, obligations, or legal requirements.</li>
            <li>Once deleted, you will lose access to your account and related services.</li>
            <li>We retain personal data only as long as necessary to fulfil the stated purposes or comply with legal obligations.</li>
            <li>Some anonymised data may be kept for fraud prevention, research, or statistical analysis.</li>
          </ul>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>As a user, you have the right to:</p>
          <ul>
            <li>Access and update your personal information through your account settings.</li>
            <li>Request corrections or modifications of inaccurate data.</li>
            <li>Withdraw consent (via written request to our Grievance Officer).</li>
          </ul>
          <p>
            <strong>Note:</strong> Withdrawal of consent is not retrospective and may limit or restrict access to certain services.
          </p>
        </section>

        <section>
          <h2>Consent</h2>
          <p>By using our Platform, you agree to:</p>
          <ul>
            <li>The collection, use, and processing of your information as described in this Privacy Policy.</li>
            <li>Receiving communications from Cloud Creators (via email, SMS, calls, or messaging apps) related to updates, services, or offers.</li>
          </ul>
          <p>
            If you provide information about someone else, you confirm that you have authority and consent to share it.
          </p>
        </section>

        <section>
          <h2>Policy Updates</h2>
          <p>
            This Privacy Policy may be updated periodically. Any significant changes will be communicated as per applicable laws. We encourage you to review this policy from time to time to stay informed.
          </p>
        </section>

        <section>
          <h2>Grievance Officer</h2>
          <p>
            For any questions, concerns, or complaints regarding privacy or data handling, please contact:
          </p>
          <div class="contact-info">
            <p><strong>Name:</strong> Radhi T V J</p>
            <p><strong>Designation:</strong> Founder & CEO</p>
            <p><strong>Company:</strong> Cloud Creators</p>
            <p><strong>Email:</strong> cloud.creators.official&#64;gmail.com</p>
            <p><strong>Phone:</strong> +91 9550546410</p>
            <p><strong>Timings:</strong> Monday – Friday (9:00 AM – 6:00 PM IST)</p>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .privacy-policy-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
    }

    .policy-header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #e0e0e0;
    }

    .back-button {
      background: #7a4df0;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      margin-bottom: 20px;
      font-size: 14px;
      transition: background 0.3s ease;
    }

    .back-button:hover {
      background: #6a3df0;
    }

    h1 {
      color: #2c3e50;
      font-size: 2.5em;
      margin-bottom: 10px;
    }

    .last-updated {
      color: #666;
      font-style: italic;
    }

    .policy-content {
      text-align: left;
    }

    section {
      margin-bottom: 25px;
    }

    h2 {
      color: #34495e;
      font-size: 1.4em;
      margin-bottom: 10px;
      border-left: 4px solid #7a4df0;
      padding-left: 15px;
    }

    p {
      margin-bottom: 10px;
    }

    ul {
      margin-bottom: 15px;
      padding-left: 20px;
    }

    li {
      margin-bottom: 5px;
    }

    .contact-info {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 5px;
      margin-top: 10px;
    }

    .contact-info p {
      margin-bottom: 5px;
    }

    .warning-box {
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 5px;
      padding: 15px;
      margin: 15px 0;
    }

    .warning-box p {
      margin: 0;
      color: #856404;
    }

    @media (max-width: 768px) {
      .privacy-policy-container {
        padding: 15px;
      }

      h1 {
        font-size: 2em;
      }

      h2 {
        font-size: 1.2em;
      }
    }
  `]
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Scroll to top when component loads
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
