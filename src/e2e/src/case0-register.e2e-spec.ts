import { browser, by, element, logging, protractor } from 'protractor';
import { faker } from '@faker-js/faker';

describe('Dermo App Register', function() {

  beforeAll(() => {
    browser.get(browser.baseUrl);
  });

  const email = 'e2e-'+faker.internet.email();
  const password = '12345';

  it('check title', async () => {

    const expected = "Dermo App";
    const actual = (await browser.getTitle()).toString();

    expect(actual).toEqual(expected);
    browser.sleep(3000)

  });

  it('check registration', async () => {
    const expectedButtonTitle = "Registrarse";
    const registerButtonElement = element(by.className('links links-primary sign-up'));
    const registerButtonTitle = (await registerButtonElement.getText()).toString();
    browser.sleep(1000)
    expect(registerButtonTitle).toBe(expectedButtonTitle);
    browser.sleep(1000)

    registerButtonElement.click();
    browser.sleep(1000)

    const emailInputElement = element(by.xpath('//input[@formcontrolname="email"]'));
    emailInputElement.sendKeys(email);
    browser.sleep(1000)

    const passInputElement = element(by.xpath('//input[@formcontrolname="password"]'));
    passInputElement.sendKeys(password);
    browser.sleep(1000)

    const passConfInputElement = element(by.xpath('//input[@formcontrolname="confirmPassword"]'));
    passConfInputElement.sendKeys(password);
    browser.sleep(1000)

    const registerFrmButtonElement = element(by.className('btn btn-primary'));
    registerFrmButtonElement.click();
    browser.sleep(1000)
    expect(registerButtonTitle).toBe(expectedButtonTitle);


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
