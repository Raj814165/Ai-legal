export const documentCatalog = [
  {
    key: 'rti',
    title: 'RTI Application',
    desc: 'Right to Information request with department and fee details',
    questions: [
      { key: 'applicant_name', q: 'Full name' },
      { key: 'applicant_father_name', q: "Father's/Husband's name" },
      { key: 'applicant_address', q: 'Address' },
      { key: 'applicant_contact', q: 'Contact details' },
      { key: 'department_name', q: 'Public authority / department name' },
      { key: 'office_address', q: 'Department office address' },
      { key: 'rti_question_1', q: 'Main information requested' },
      { key: 'rti_question_2', q: 'Additional information requested (optional)' },
      { key: 'fee_details', q: 'RTI fee details / postal order / court fee details' },
      { key: 'info_delivery_mode', q: 'How should the information be delivered?' }
    ]
  },
  {
    key: 'fir',
    title: 'FIR Draft',
    desc: 'Police complaint format with incident, accused, and witness details',
    questions: [
      { key: 'police_station', q: 'Police station name' },
      { key: 'complainant_name', q: 'Your name' },
      { key: 'complainant_address', q: 'Your address' },
      { key: 'date_of_incident', q: 'Date of incident' },
      { key: 'time_of_incident', q: 'Time of incident' },
      { key: 'location', q: 'Location of incident' },
      { key: 'description', q: 'Describe the incident in detail' },
      { key: 'accused_names', q: 'Accused / suspect details (if known)' },
      { key: 'witness_details', q: 'Witness details (if any)' },
      { key: 'contact', q: 'Your contact details' }
    ]
  },
  {
    key: 'complaint',
    title: 'Consumer Complaint Notice',
    desc: 'Notice for defective product, service deficiency, or fraud',
    questions: [
      { key: 'consumer_name', q: 'Your name' },
      { key: 'consumer_address', q: 'Your address' },
      { key: 'vendor_name', q: 'Seller / service provider name' },
      { key: 'vendor_address', q: 'Seller / service provider address' },
      { key: 'product_or_service', q: 'Product or service involved' },
      { key: 'purchase_date', q: 'Purchase / booking date' },
      { key: 'issues', q: 'What went wrong?' },
      { key: 'losses', q: 'Financial loss or inconvenience caused' },
      { key: 'remedy_requested', q: 'What remedy are you demanding?' },
      { key: 'response_deadline', q: 'Response timeline to give (for example 15 days)' },
      { key: 'contact', q: 'Your contact details' }
    ]
  },
  {
    key: 'legal_notice',
    title: 'Legal Notice',
    desc: 'Formal lawyer-style notice before taking legal action',
    questions: [
      { key: 'sender_name', q: 'Sender / client name' },
      { key: 'sender_address', q: 'Sender address' },
      { key: 'recipient_name', q: 'Recipient name' },
      { key: 'recipient_address', q: 'Recipient address' },
      { key: 'subject_matter', q: 'Subject of the dispute' },
      { key: 'background_facts', q: 'Background facts and events' },
      { key: 'breach_details', q: 'What breach / wrongful act occurred?' },
      { key: 'legal_demand', q: 'What action or payment is demanded?' },
      { key: 'compliance_deadline', q: 'Deadline for compliance (for example 7 days)' },
      { key: 'legal_consequences', q: 'What legal action follows if ignored?' }
    ]
  },
  {
    key: 'tenant_complaint',
    title: 'Rental / Tenant Complaint',
    desc: 'Complaint for deposit disputes, eviction issues, or landlord misconduct',
    questions: [
      { key: 'tenant_name', q: 'Tenant name' },
      { key: 'tenant_address', q: 'Tenant current address' },
      { key: 'landlord_name', q: 'Landlord / property manager name' },
      { key: 'property_address', q: 'Rented property address' },
      { key: 'tenancy_start', q: 'Tenancy start date' },
      { key: 'tenancy_issue', q: 'Main issue (deposit, eviction, lockout, repairs, etc.)' },
      { key: 'incident_details', q: 'Describe what happened' },
      { key: 'deposit_amount', q: 'Security deposit amount involved (if any)' },
      { key: 'relief_requested', q: 'What relief are you asking for?' },
      { key: 'response_deadline', q: 'Timeline for response / resolution' }
    ]
  },
  {
    key: 'affidavit',
    title: 'Affidavit Generator',
    desc: 'Basic sworn declaration format',
    questions: [
      { key: 'deponent_name', q: 'Full name of deponent' },
      { key: 'deponent_age', q: 'Age' },
      { key: 'deponent_occupation', q: 'Occupation' },
      { key: 'deponent_address', q: 'Residential address' },
      { key: 'declaration_subject', q: 'Subject / purpose of affidavit' },
      { key: 'statement_1', q: 'Main declaration point 1' },
      { key: 'statement_2', q: 'Main declaration point 2 (optional)' },
      { key: 'statement_3', q: 'Main declaration point 3 (optional)' },
      { key: 'place', q: 'Place of execution' },
      { key: 'id_proof', q: 'Identity proof details (optional)' }
    ]
  },
  {
    key: 'employment_complaint',
    title: 'Employment Complaint',
    desc: 'Complaint for unpaid salary or workplace issues',
    questions: [
      { key: 'employee_name', q: 'Employee name' },
      { key: 'employee_address', q: 'Employee address' },
      { key: 'employer_name', q: 'Employer / company name' },
      { key: 'designation', q: 'Your designation / role' },
      { key: 'employment_period', q: 'Employment period' },
      { key: 'grievance_type', q: 'Type of issue (salary, termination, harassment, etc.)' },
      { key: 'issue_details', q: 'Describe the issue in detail' },
      { key: 'amount_due', q: 'Amount due / compensation sought (if any)' },
      { key: 'prior_requests', q: 'Any prior requests or complaints made?' },
      { key: 'relief_requested', q: 'What action are you demanding?' }
    ]
  },
  {
    key: 'cyber_complaint',
    title: 'Online Fraud / Cyber Complaint',
    desc: 'Complaint for UPI fraud, scams, or account compromise',
    questions: [
      { key: 'complainant_name', q: 'Your name' },
      { key: 'complainant_address', q: 'Your address' },
      { key: 'contact', q: 'Your contact details' },
      { key: 'incident_date', q: 'Date of fraud / cyber incident' },
      { key: 'incident_time', q: 'Time of incident' },
      { key: 'platform_used', q: 'Platform / app / website used' },
      { key: 'fraud_mode', q: 'Type of fraud (UPI, phishing, OTP scam, etc.)' },
      { key: 'transaction_details', q: 'Transaction ID / UPI ID / payment details' },
      { key: 'loss_amount', q: 'Amount lost' },
      { key: 'incident_details', q: 'Describe exactly what happened' },
      { key: 'suspect_details', q: 'Fraudster details, links, or phone numbers (if any)' }
    ]
  },
  {
    key: 'accident_complaint',
    title: 'Accident Complaint',
    desc: 'Road accident complaint or FIR-style report',
    questions: [
      { key: 'police_station', q: 'Police station name' },
      { key: 'complainant_name', q: 'Complainant name' },
      { key: 'complainant_address', q: 'Complainant address' },
      { key: 'accident_date', q: 'Date of accident' },
      { key: 'accident_time', q: 'Time of accident' },
      { key: 'accident_location', q: 'Location of accident' },
      { key: 'vehicle_details', q: 'Vehicle details involved' },
      { key: 'injury_details', q: 'Injuries / damage caused' },
      { key: 'accused_details', q: 'Other driver / accused details (if known)' },
      { key: 'incident_details', q: 'Describe how the accident happened' },
      { key: 'witness_details', q: 'Witness details (if any)' }
    ]
  },
  {
    key: 'court_application',
    title: 'Court Application',
    desc: 'Simple petition, leave application, or adjournment request',
    questions: [
      { key: 'court_name', q: 'Court / authority name' },
      { key: 'case_number', q: 'Case number (if any)' },
      { key: 'applicant_name', q: 'Applicant / petitioner name' },
      { key: 'respondent_name', q: 'Respondent / opposite party name' },
      { key: 'application_type', q: 'Type of application (leave, adjournment, exemption, etc.)' },
      { key: 'background_facts', q: 'Brief facts of the matter' },
      { key: 'grounds', q: 'Grounds for the application' },
      { key: 'prayer', q: 'Prayer / relief sought from the court' },
      { key: 'hearing_date', q: 'Next hearing date (if any)' },
      { key: 'place', q: 'Place' }
    ]
  }
];

export const documentByType = Object.fromEntries(
  documentCatalog.map((document) => [document.key, document])
);
