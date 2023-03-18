import { browser, by, element, logging, protractor } from 'protractor';

describe('Dermo App Login', function() {

  beforeAll(() => {
    browser.get(browser.baseUrl);
  });

  const email = 'e2e1@email.com';
  const password = '12345';

  it('check login', async () => {

    const expectedButtonTitle = "Iniciar sesión";
    const loginButtonElement = element(by.className('links links-primary login'));
    const loginButtonTitle = (await loginButtonElement.getText()).toString();
    browser.sleep(1000)
    expect(loginButtonTitle).toBe(expectedButtonTitle);
    browser.sleep(1000)

    loginButtonElement.click();
    browser.sleep(1000)

    const emailInputElement = element(by.xpath('//input[@formcontrolname="email"]'));
    emailInputElement.sendKeys(email);
    browser.sleep(1000)

    const passInputElement = element(by.xpath('//input[@formcontrolname="password"]'));
    passInputElement.sendKeys(password);
    browser.sleep(1000)

    const loginFrmButtonElement = element(by.className('btn btn-primary'));
    loginFrmButtonElement.click();
    browser.sleep(1000)
    expect(loginButtonTitle).toBe(expectedButtonTitle);


    expect(
      browser.wait(
        protractor.ExpectedConditions.urlContains("home-in"), 5000
      )
        .catch(() => {return false})
    ).toBeTruthy();

    browser.sleep(5000)


  });

  afterEach(async () => {
    // const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });

});
