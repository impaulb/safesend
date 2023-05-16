const helper = require('./Helper.gs');

// Test: Verify that valid SSN numbers are detected correctly.
test("Verify valid SSN positive matches", () => {
    const valid_ssn = [
        "123-45-6789",
        "544-45-6789",
        "001815293",
        "159-12-9273",
        "252-65-1954",
        "429-89-5729",
        "575 42 8931",
        "575 42-8931",
        "575-42 8931",
        "575 428931",
        "57542-8931"
    ];
    const expected = ['SSN'];
    
    valid_ssn.forEach(ssn => {
        expect(helper.getTokenTypes(ssn)).toEqual(expect.arrayContaining(expected));
    });
});

// Test: Verify that valid phone numbers are detected correctly.
test("Verify valid phone positive matches", () => {
    const valid_phone = [
        "555-555-5555",
        "(555) 555 5555",
        "(555)5555555",
        "(555)5555555",
        "555 555 5555",
        "555 555-5555",
        "555-555 5555",
        "(555)-555-5555",
    ];
    const expected = ['PHONE'];
    
    valid_phone.forEach(phone => {
        expect(helper.getTokenTypes(phone)).toEqual(expect.arrayContaining(expected));
    });
});

// Test: Verify that valid dates are detected correctly.
test("Verify valid dates positive matches", () => {
    const valid_date = [
        "1/1/2002",
        "01/01/2002",
        "1.1.2002",
        "01.01.2002",
        "1 1 2002",
        "01 01 2002",
        "01/01 2002",
        "1/1/02",
        "01/01/02"
    ];
    const expected = ['DATE'];
    
    valid_date.forEach(date => {
        expect(helper.getTokenTypes(date)).toEqual(expect.arrayContaining(expected));
    });
});

// Test: Verify that valid email addresses are detected correctly.
test("Verify valid email positive matches", () => {
    const valid_email = [
        "helloworld@gmail.com",
        "anything@outlook.com",
        "student@scu.edu",
        "someone@yahoo.com",
    ];
    const expected = ['EMAIL'];
    
    valid_email.forEach(email => {
        expect(helper.getTokenTypes(email)).toEqual(expect.arrayContaining(expected));
    });
});

// Test: Verify that valid VINs are detected correctly.
test("Verify valid VIN positive matches", () => {
    const valid_vin = [
        "4S3BK4358V7310025",
        "JH4KA2650HC000268",
        "1FMZK04185GA30815",
        "3D7KU28C04G254161",
        "WBAVB13506PT22180"
    ];
    const expected = ['VIN'];
    
    valid_vin.forEach(vin => {
        expect(helper.getTokenTypes(vin)).toEqual(expect.arrayContaining(expected));
    });
});

// Test: Verify that the list of supported types is up to date.
test("Verify supported types are up to date", () => {
    const expected = ['SSN', 'PHONE', 'EMAIL'];
    expect(helper.getSupportedTypes()).toEqual(expect.arrayContaining(expected));
});

// Test: Verify that the Redact function returns an empty string when given an empty string.
test("Verify redact function returns an emtpy dictionary", () => {
    expect(helper.redactString("").length).toEqual(0);
});

// Test: Verify that the Redact function returns a redacted string with a single PII snippet.
test("Verify redact function returns a dictionary with PII snippets and single type", () => {
    var expected = "Hello world [REDACTED]";
    expect(helper.redactString("Hello world (123)456-7890")).toEqual(expected);
});

// Test: Verify that the Redact function returns a redacted string with multiple PII types but a single snippet.
test("Verify redact function returns a dictionary with PII snippets and multiple types", () => {
    var expected = "Hello world [REDACTED]";
    expect(helper.redactString("Hello world 1234567890")).toEqual(expected);
});

// Test: Verify that the Redact function returns a dictionary with multiple PII snippets and types.
test("Verify redact function returns a dictionary with multiple PII snippets", () => {
    var expected = "Hello world [REDACTED] and my email is [REDACTED]";
    expect(helper.redactString("Hello world 1234567890 and my email is hello@world.com")).toEqual(expected);
});

// Test: Verify that the Redact function detects only a certain type of PII.
test("Verify redact function returns a dictionary with only the prompted type of PII", () => {
    var expected = "Hello world 1234567890 and my email is [REDACTED]";
    expect(helper.redactString("Hello world 1234567890 and my email is hello@world.com", ['EMAIL'])).toEqual(expected);
});