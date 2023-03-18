import { browser, by, element, logging, protractor } from 'protractor';
import path = require('path');

describe('Dermo App Medic profile', function() {

  beforeAll(() => {
    // browser.get(browser.baseUrl);
  });

  const specialty = 'Alergias';
  const licenceId = 'LIC23345434';
  const licenceFile = '../assets/img/licenceImg.png';
  // const licenceValidity = '02/10/2025';
  const licenceValidityYear = '2025';
  const licenceValidityMonth = '10';
  const licenceValidityDay = '02';

  it('check medic profile', async () => {

    browser.actions().mouseMove(element(by.className("image-profile"))).perform()
    browser.sleep(1000)

    const expectedLinkMedicProfileTitle = "Perfil médico";
    const linkMedicProfileElement = element(by.xpath('//li[@routerlink="/home-in/crear-perfil-medico"]'));
    const linkMedicProfileTitle = (await linkMedicProfileElement.getText()).toString();
    browser.sleep(1000);
    expect(linkMedicProfileTitle).toBe(expectedLinkMedicProfileTitle);
    browser.sleep(1000);

    linkMedicProfileElement.click();
    browser.sleep(1000);

    const selectSpecialityElement = element(by.css("#specialty [value='"+specialty+"']"));
    selectSpecialityElement.click();
    browser.sleep(1000);

    const inputLicenceIdElement = element(by.xpath('//input[@formcontrolname="licenceId"]'));
    inputLicenceIdElement.clear();
    browser.sleep(1000);
    inputLicenceIdElement.sendKeys(licenceId);
    browser.sleep(1000);

    const inputLicenceValidityElement = element(by.xpath('//input[@formcontrolname="licenceValidityDate"]'));
    inputLicenceValidityElement.clear();
    browser.sleep(1000);
    inputLicenceValidityElement.click()
      .then(() => inputLicenceValidityElement.sendKeys(licenceValidityDay))
      .then(() => inputLicenceValidityElement.sendKeys(licenceValidityMonth))
      .then(() => inputLicenceValidityElement.sendKeys(licenceValidityYear));
    //inputLicenceIdElement.sendKeys(licenceValidity);
    browser.sleep(1000);

    const absoluteFilePath = path.resolve(__dirname, licenceFile);
    const inputLicenceFileElement = element(by.xpath('//input[@formcontrolname="licenceImage"]'));
    inputLicenceFileElement.clear();
    browser.sleep(1000);
    inputLicenceFileElement.sendKeys(absoluteFilePath);
    browser.sleep(1000);

    const userProfileFrmButtonElement = element(by.xpath('//button[@type="submit"]'))
    userProfileFrmButtonElement.click();
    browser.sleep(2000);

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
