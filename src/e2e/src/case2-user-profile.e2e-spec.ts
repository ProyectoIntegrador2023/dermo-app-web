import { browser, by, element, protractor } from 'protractor';

describe('Dermo App User profile', function() {

  beforeAll(() => {
    // browser.get(browser.baseUrl);
  });

  const name = 'Andres Lopez';
  const age = '32';
  const country = 'España';
  const city = 'Valencia';

  it('check user profile', async () => {

    browser.actions().mouseMove(element(by.className("image-profile"))).perform()
    browser.sleep(1000)

    const expectedLinkUserProfileTitle = "Perfil general";
    const linkUserProfileElement = element(by.xpath('//li[@routerlink="/home-in/crear-perfil"]'));
    const linkUserProfileTitle = (await linkUserProfileElement.getText()).toString();
    browser.sleep(1000);
    expect(linkUserProfileTitle).toBe(expectedLinkUserProfileTitle);
    browser.sleep(1000);

    linkUserProfileElement.click();
    browser.sleep(1000);

    const nameInputElement = element(by.xpath('//input[@formcontrolname="name"]'));
    nameInputElement.clear();
    browser.sleep(1000);
    nameInputElement.sendKeys(name);
    browser.sleep(1000);

    const ageInputElement = element(by.xpath('//input[@formcontrolname="age"]'));
    ageInputElement.clear();
    browser.sleep(1000);
    ageInputElement.sendKeys(age);
    browser.sleep(1000);

    const selectCountryElement = element(by.css("#pais [value='"+country+"']"));
    selectCountryElement.click();
    browser.sleep(2000);

    const selectCityElement = element(by.css("#ciudad [value='"+city+"']"));
    selectCityElement.click();
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
});
