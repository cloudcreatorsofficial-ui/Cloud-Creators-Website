# EmailJS Template Configuration

## To ensure emails are sent to cloud.creators.official@gmail.com

Your EmailJS template (`template_zqf4p0n`) should be configured as follows:

### Template Settings:
1. **To Email**: `cloud.creators.official@gmail.com`
2. **From Name**: `{{from_name}}`
3. **From Email**: `{{from_email}}`
4. **Reply To**: `{{from_email}}`

### Subject:
```
New Contact Form - {{requirement}}
```

### Message Content:
```
Hello Cloud Creators Team,

You have received a new contact form submission:

📋 CONTACT DETAILS:
Name: {{name}}
Email: {{from_email}}
Phone: {{contact_number}}

🔧 PROJECT DETAILS:
Service Required: {{requirement}}
Description: {{description}}

📅 MEETING REQUEST:
Preferred Date: {{schedule_date}}
Preferred Time: {{schedule_time}}

---
Sent via Cloud Creators website contact form
Reply directly to: {{from_email}}
```

### Important Template Variables:
Make sure these variables are used in your template:
- {{name}} - Customer's name
- {{from_email}} - Customer's email
- {{contact_number}} - Customer's phone
- {{requirement}} - Service they selected
- {{description}} - Project description
- {{schedule_date}} - Meeting date
- {{schedule_time}} - Meeting time

## Test the Setup:
1. Go to http://localhost:4200
2. Fill out the contact form
3. Submit it
4. Check cloud.creators.official@gmail.com inbox
5. You should receive the formatted email

## If emails are not being received:
1. Check spam folder in cloud.creators.official@gmail.com
2. Verify EmailJS service is connected to the correct Gmail account
3. Check EmailJS dashboard for any error logs
4. Make sure the template "To Email" field is set to cloud.creators.official@gmail.com
