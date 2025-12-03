Feature: Sanity Test Cases - Menu Navigation
  As a logged-in user
  I want to navigate through all menu options
  So that I can verify all screens are accessible and working

  Background:
    Given the user is already logged in

  @customer @sanity @first @oops
  Scenario: Customer Menu - Home Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Customer" menu
    When clicks on "Home"
    Then Home Screen should be open on new tab

  @customer @sanity @first
  Scenario: Customer Menu - Customer Preferences Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Customer" menu
    When clicks on "Customer Preferences"
    Then Customer Preferences Screen should be open on new tab

  @customer @sanity
  Scenario: Customer Menu - Add New Customer Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Customer" menu
    When clicks on "Add New"
    Then Add New Customer Screen should be open on new tab

  @customer @sanity
  Scenario: Customer Menu - Merge Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Customer" menu
    When clicks on "Merge"
    Then Merge Screen should be open on new tab

  @customer @sanity
  Scenario: Customer Menu - Send Promotional Sms Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Customer" menu
    When clicks on "Send Promotional Sms"
    Then Send Promotional Sms Screen should be open on new tab

  @customer @sanity
  Scenario: Customer Menu - Customers Rating Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Customer" menu
    When clicks on "Customers Rating"
    Then Customers Rating Screen should be open on new tab

  @customer @sanity @advance
  Scenario: Customer Menu - Customer Advances Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Customer" menu
    When clicks on "Customer Advances"
    Then Customer Advances Screen should be open on new tab

  @customer @sanity
  Scenario: Customer Menu - Active/Passive Customer Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Customer" menu
    When clicks on "Active/Passive Customer"
    Then Active/Passive Customer Screen should be open on new tab

  @customer @sanity @all
  Scenario: Customer Menu - All Customers Screen (All)
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Customer" menu
    When clicks on "All"
    Then All Customers Screen should be open on new tab

  @customer @sanity
  Scenario: Customer Menu - All Customers Screen (All Customers)
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Customer" menu
    When clicks on "All Customers"
    Then All Customers Screen should be open on new tab

  @drop @sanity
  Scenario: Drop Menu - Edit Order Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Drop" menu
    When clicks on "Edit Order"
    Then Edit Order Screen should be open on new tab

  @drop @sanity
  Scenario: Drop Menu - Cancel Order Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Drop" menu
    When clicks on "Cancel Order"
    Then Cancel Order Screen should be open on new tab

  @drop @sanity
  Scenario: Drop Menu - Delete Order Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Drop" menu
    When clicks on "Delete Order"
    Then Delete Order Screen should be open on new tab

  @process @sanity
  Scenario: Process Menu - Print QR Tags Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Process" menu
    When clicks on "Print QR Tags"
    Then Print QR Tags Screen should be open on new tab

  @process @sanity
  Scenario: Process Menu - Send to Workshop Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Process" menu
    When clicks on "Send to Workshop"
    Then Send to Workshop Screen should be open on new tab

  @process @sanity
  Scenario: Process Menu - Receive from Workshop Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Process" menu
    When clicks on "Receive from Workshop"
    Then Receive from Workshop Screen should be open on new tab

  @process @sanity
  Scenario: Process Menu - Pending for Finishing Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Process" menu
    When clicks on "Pending for Finishing"
    Then Pending for Finishing Screen should be open on new tab

  @process @sanity
  Scenario: Process Menu - Packing Stickers Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Process" menu
    When clicks on "Packing Stickers"
    Then Packing Stickers Screen should be open on new tab

  @process @sanity
  Scenario: Process Menu - Workshop Note Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Process" menu
    When clicks on "Workshop Note"
    Then Workshop Note Screen should be open on new tab

  @process @sanity
  Scenario: Process Menu - Garment Inspection Report Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Process" menu
    When clicks on "Garment Inspection Report"
    Then Garment Inspection Report Screen should be open on new tab

  @pickup @sanity
  Scenario: PickUp Menu - Multiple Payment And Delivery Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "PickUp" menu
    When clicks on "Multiple Payment And Delivery"
    Then Multiple Payment And Delivery Screen should be open on new tab

  @pickup @sanity
  Scenario: PickUp Menu - Order Log Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "PickUp" menu
    When clicks on "Order Log"
    Then Order Log Screen should be open on new tab

  @pickup @sanity
  Scenario: PickUp Menu - Home Pick Up Scheduler Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "PickUp" menu
    When clicks on "Home Pick Up Scheduler"
    Then Home Pick Up Scheduler Screen should be open on new tab

  @pickup @sanity
  Scenario: PickUp Menu - Home Pick Up Scheduler old Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "PickUp" menu
    When clicks on "Home Pick Up Scheduler old"
    Then Home Pick Up Scheduler old Screen should be open on new tab

  @pickup @sanity
  Scenario: PickUp Menu - Home Drop Off Scheduler Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "PickUp" menu
    When clicks on "Home Drop Off Scheduler"
    Then Home Drop Off Scheduler Screen should be open on new tab

  @pickup @sanity
  Scenario: PickUp Menu - Assign To Driver Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "PickUp" menu
    When clicks on "Assign To Driver"
    Then Assign To Driver Screen should be open on new tab

  @account @sanity
  Scenario: Account Menu - Cash/Day Book Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Account" menu
    When clicks on "Cash/Day Book"
    Then Cash/Day Book Screen should be open on new tab

  @account @sanity
  Scenario: Account Menu - Detail Cash/Day Book Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Account" menu
    When clicks on "Detail Cash/Day Book"
    Then Detail Cash/Day Book Screen should be open on new tab

  @account @sanity
  Scenario: Account Menu - Expenses Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Account" menu
    When clicks on "Expenses"
    Then Expenses Screen should be open on new tab

  @account @sanity
  Scenario: Account Menu - Income Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Account" menu
    When clicks on "Income"
    Then Income Screen should be open on new tab

  @account @sanity
  Scenario: Account Menu - Payment Type Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Account" menu
    When clicks on "Payment Type"
    Then Payment Type Screen should be open on new tab

  @account @sanity
  Scenario: Account Menu - Tax Report Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Account" menu
    When clicks on "Tax Report"
    Then Tax Report Screen should be open on new tab

  @account @sanity
  Scenario: Account Menu - Accounts Receiveable Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Account" menu
    When clicks on "Accounts Receiveable"
    Then Accounts Receiveable Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Royalty Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Royalty"
    Then Royalty Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Orders Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Orders"
    Then Orders Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Sales and Delivery Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Sales and Delivery"
    Then Sales and Delivery Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Sales and Delivery Old Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Sales and Delivery Old"
    Then Sales and Delivery Old Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Old order report Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Old order report"
    Then Old order report Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Service Wise Order Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Service Wise Order"
    Then Service Wise Order Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Service And Garment Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Service And Garment"
    Then Service And Garment Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Category Wise Report Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Category Wise Report"
    Then Category Wise Report Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Garment Wise Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Garment Wise"
    Then Garment Wise Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Garment Status Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Garment Status"
    Then Garment Status Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Payment Adjustment Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Payment Adjustment"
    Then Payment Adjustment Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Garment details Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Garment details"
    Then Garment details Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Daily Customer Addition Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Daily Customer Addition"
    Then Daily Customer Addition Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Garment details Old Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Garment details Old"
    Then Garment details Old Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Invoice Statement Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Invoice Statement"
    Then Invoice Statement Screen should be open on new tab

  @reports @sanity @oops
  Scenario: Reports Menu - Marked Ready by User Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Marked Ready by User"
    Then Marked Ready by User Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Without Ticket Delivery Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Without Ticket Delivery"
    Then Without Ticket Delivery Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Order by locality Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Order by locality"
    Then Order by locality Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Pending Stock Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Pending Stock"
    Then Pending Stock Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Sales Return Report Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Sales Return Report"
    Then Sales Return Report Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Stock Reconcillation Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Stock Reconcillation"
    Then Stock Reconcillation Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - App Customer Feedback Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "App Customer Feedback"
    Then App Customer Feedback Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Customers at Risk Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Customers at Risk"
    Then Customers at Risk Screen should be open on new tab

  @reports @sanity
  Scenario: Reports Menu - Feedback Report Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Reports" menu
    When clicks on "Feedback Report"
    Then Feedback Report Screen should be open on new tab

  @masterdata @sanity
  Scenario: Master Data Menu - Store Information Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Master Data" menu
    When clicks on "Store Information"
    Then Store Information Screen should be open on new tab

  @masterdata @sanity
  Scenario: Master Data Menu - Price List Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Master Data" menu
    When clicks on "Price List"
    Then Price List Screen should be open on new tab

  @masterdata @sanity
  Scenario: Master Data Menu - Garment Descriptions Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Master Data" menu
    When clicks on "Garment Descriptions"
    Then Garment Descriptions Screen should be open on new tab

  @masterdata @sanity
  Scenario: Master Data Menu - Brand Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Master Data" menu
    When clicks on "Brand"
    Then Brand Screen should be open on new tab

  @masterdata @sanity
  Scenario: Master Data Menu - Colours Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Master Data" menu
    When clicks on "Colours"
    Then Colours Screen should be open on new tab

  @masterdata @sanity
  Scenario: Master Data Menu - Garment Return Cause Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Master Data" menu
    When clicks on "Garment Return Cause"
    Then Garment Return Cause Screen should be open on new tab

  @masterdata @sanity
  Scenario: Master Data Menu - Payment Adjustment Type Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Master Data" menu
    When clicks on "Payment Adjustment Type"
    Then Payment Adjustment Type Screen should be open on new tab

  @masterdata @sanity
  Scenario: Master Data Menu - Payment Mode Types Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Master Data" menu
    When clicks on "Payment Mode Types"
    Then Payment Mode Types Screen should be open on new tab

  @masterdata @sanity
  Scenario: Master Data Menu - Garment Checking Staff Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Master Data" menu
    When clicks on "Garment Checking Staff"
    Then Garment Checking Staff Screen should be open on new tab

  @masterdata @sanity
  Scenario: Master Data Menu - Holidays Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Master Data" menu
    When clicks on "Holidays"
    Then Holidays Screen should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - Change Password Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "Change Password"
    Then Change Password Screen should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - Access Authentication Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "Access Authentication"
    Then Access Authentication Screen should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - Set Up Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "Set Up"
    Then Set Up Screen should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - Design Tag Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "Design Tag"
    Then Design Tag Screen should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - Search Invoice Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "Search Invoice"
    Then Search Invoice Screen should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - Daily Dashboard Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "Daily Dashboard"
    Then Daily Dashboard Screen should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - SMS Configuration Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "SMS Configuration"
    Then SMS Configuration Screen should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - Email and Mobile App Notifications Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "Email and Mobile App Notifications"
    Then Email and Mobile App Notifications should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - Mobile App Content Setup Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "Mobile App Content Setup"
    Then Mobile App Content Setup should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - Payment Gateway Setup Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "Payment Gateway Setup"
    Then Payment Gateway Setup should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - Email Configuration Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "Email Configuration"
    Then Email Configuration should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - Referral-Statistics Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "Referral-Statistics"
    Then Referral-Statistics should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - Discount Restriction Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "Discount Restriction"
    Then Discount Restriction should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - Sticker Configuration Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "Sticker Configuration"
    Then Sticker Configuration should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - Package Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "Package"
    Then Package should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - Old Package Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "Old Package"
    Then Old Package should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - QDC Marketplace Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "QDC Marketplace"
    Then QDC Marketplace should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - Subscription Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "Subscription"
    Then Subscription should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - Growth Mate Engage (Live Agent) Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "Growth Mate Engage (Live Agent)"
    Then Growth Mate Engage (Live Agent) should be open on new tab

  @admin @sanity
  Scenario: Admin Menu - Tag Configuration Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Admin" menu
    When clicks on "Tag Configuration"
    Then Tag Configuration should be open on new tab

  @coupon @sanity
  Scenario: Coupon Menu - Redemption Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Coupon" menu
    When clicks on "Redemption"
    Then Redemption should be open on new tab

  @attendance @sanity
  Scenario: Attendance Menu - Attendance Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Attendance" menu
    When clicks on "Attendance"
    Then Attendance should be open on new tab

  @attendance @sanity
  Scenario: Attendance Menu - Salary/Payout Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Attendance" menu
    When clicks on "Salary/Payout"
    Then Salary/Payout should be open on new tab

  @attendance @sanity
  Scenario: Attendance Menu - Employees Screen
    When the user clicks on "Add New Customer"
    Then the user should be redirected to the Add New Customer Screen
    And clicks on "Attendance" menu
    When clicks on "Employees"
    Then Employees should be open on new tab

