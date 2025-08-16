# Step-by-Step EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Gmail Service
1. In your EmailJS dashboard, click "Email Services" in the left sidebar
2. Click "Add New Service"
3. Select "Gmail" from the list
4. Click "Connect Account"
5. Sign in with your `cloud.creators.official@gmail.com` account
6. Allow EmailJS to access your Gmail
7. Your Service ID will be generated (usually looks like: `service_xxxxxxx`)
8. **COPY THIS SERVICE ID** - you'll need it in Step 4

## Step 3: Create Email Template
1. Click "Email Templates" in the left sidebar
2. Click "Create New Template"
3. Set the template name to: `Contact Form Submission`
4. In the template editor, replace the content with:

### Subject:
```
New Contact Form - {{requirement}}
```

### Content:
```
Hello Cloud Creators Team,

You have received a new contact form submission:

📋 CONTACT DETAILS:
Name: {{name}}
Email: {{email}}
Phone: {{contact_number}}

🔧 PROJECT DETAILS:
Service Required: {{requirement}}
Description: {{description}}

📅 MEETING REQUEST:
Preferred Date: {{schedule_date}}
Preferred Time: {{schedule_time}}

---
Sent via Cloud Creators website contact form
Reply directly to: {{email}}
```

5. Click "Save"
6. Your Template ID will be shown (usually looks like: `template_xxxxxxx`)
7. **COPY THIS TEMPLATE ID** - you'll need it in Step 4

## Step 4: Get Public Key
1. Click on your profile icon (top right)
2. Go to "Account"
3. Find "API Keys" section
4. Copy your **Public Key** (usually looks like: `user_xxxxxxxxxxxxxxx`)

## Step 5: Update Your Code
Replace the placeholder values in your `home.component.ts` file:

Find these lines in the sendEmail method (around line 325):
```typescript
// Replace these lines:
emailjs.init('YOUR_PUBLIC_KEY');

const result = await emailjs.send(
  'YOUR_SERVICE_ID',    // Replace with your Service ID from Step 2
  'YOUR_TEMPLATE_ID',   // Replace with your Template ID from Step 3
  templateParams
);
```

### Example with real values:
```typescript
emailjs.init('user_abc123def456ghi789'); // Your actual public key

const result = await emailjs.send(
  'service_xyz789',     // Your actual service ID
  'template_abc123',    // Your actual template ID
  templateParams
);
```

## Step 6: Test the Setup
1. Save your changes
2. Start your Angular development server: `ng serve`
3. Go to your website and fill out the contact form
4. Check your `cloud.creators.official@gmail.com` inbox
5. You should receive an email with the form data

## Troubleshooting
- Make sure your Service ID, Template ID, and Public Key are correct
- Check the browser console for any error messages
- Verify that Gmail service is properly connected in EmailJS dashboard
- Test with a simple email first to make sure everything works

## Security Notes
- The Public Key is safe to use in client-side code
- EmailJS handles all the secure email sending
- Your Gmail credentials are never exposed in the frontend code
- Rate limiting is automatically applied to prevent spam

## What happens when someone submits the form:
1. Form data is collected and validated
2. EmailJS sends the email to `cloud.creators.official@gmail.com`
3. You receive a formatted email with all the contact details
4. User sees a success message
5. Form is reset for the next submission

## Free Plan Limits:
- 200 emails per month (free plan)
- Upgrade available if you need more

## Quick Reference - What to Replace:
1. **PUBLIC_KEY**: `YOUR_PUBLIC_KEY` → Your actual public key from EmailJS account
2. **SERVICE_ID**: `YOUR_SERVICE_ID` → Your Gmail service ID from EmailJS
3. **TEMPLATE_ID**: `YOUR_TEMPLATE_ID` → Your email template ID from EmailJS
