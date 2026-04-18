import { test, expect, Page } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';
import { validCheckoutData, invalidCheckoutData } from '../data/checkout.data';
import { AddToCartPage } from '@pages/AddToCartPage';

let page: Page;
let addToCartPage: AddToCartPage;
let checkoutPage: CheckoutPage;

test.describe('@checkout', () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    addToCartPage = new AddToCartPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test.beforeEach(async () => {
    // Setup: Agregar productos al carrito ANTES de cada test
    await addToCartPage.goto();
    await addToCartPage.clickFirstTwoAddToCartButtons();

    // Ir al checkout
    await addToCartPage.clickCartTotal();
    await addToCartPage.gotoCheckout();
    await page.waitForURL('**/index.php?route=checkout/checkout');
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Happy path - Completar checkout como invitado', async () => {
    await test.step('Iniciar checkout como invitado', async () => {
      await checkoutPage.clickGuestCheckout();
      await checkoutPage.clickContinueAccount();
    });

    await test.step('Completar información de facturación', async () => {
      await checkoutPage.fillFirstName(validCheckoutData.firstName);
      await checkoutPage.fillLastName(validCheckoutData.lastName);
      await checkoutPage.fillEmail(validCheckoutData.email);
      await checkoutPage.fillTelephone(validCheckoutData.telephone);
      await checkoutPage.fillCompany(validCheckoutData.company!);
      await checkoutPage.fillAddress1(validCheckoutData.address1);
      await checkoutPage.fillAddress2(validCheckoutData.address2!);
      await checkoutPage.fillCity(validCheckoutData.city);
      await checkoutPage.fillPostcode(validCheckoutData.postcode);
      await checkoutPage.selectCountry(validCheckoutData.country);
      await checkoutPage.selectZone(validCheckoutData.zone);
      await checkoutPage.clickContinueGuest();
    });

    await test.step('Agregar metodo de entrega', async () => {
      await checkoutPage.fillComment(validCheckoutData.comment);
      await checkoutPage.continueShippingMethod();
    });

    await test.step('Agregar metodo de pago', async () => {
      await checkoutPage.fillComment(validCheckoutData.comment);
      await checkoutPage.clickAgreeCheckbox();
      await checkoutPage.clickContinuePaymentMethod();
    });

    await test.step('Confirmar orden', async () => {
      await expect(checkoutPage.totalText()).toBeVisible();
      await checkoutPage.clickConfirmOrder();
    });

    await test.step('Validar orden completada', async () => {
      await expect(checkoutPage.orderPlacedText()).toBeVisible();
    });
  });

  test('Datos inválidos - Campos obligatorios vacíos', async () => {
    await test.step('Iniciar checkout como invitado', async () => {
      await checkoutPage.clickGuestCheckout();
      await checkoutPage.clickContinueAccount();
    });

    await test.step('Intentar continuar sin datos', async () => {
      await checkoutPage.clickContinueGuest();
    });

    await test.step('Validar que no se avanza', async () => {
      await expect(checkoutPage.firstNameInput()).toBeVisible();
    });
  });

  test('Flujo alternativo - Solo campos obligatorios (sin company, sin address2)', async () => {
    const dataWithoutOptional = { ...validCheckoutData };
    delete dataWithoutOptional.company;
    delete dataWithoutOptional.address2;

    await test.step('Iniciar checkout como invitado', async () => {
      await checkoutPage.clickGuestCheckout();
      await checkoutPage.clickContinueAccount();
    });

    await test.step('Completar solo campos obligatorios', async () => {
      await checkoutPage.fillFirstName(dataWithoutOptional.firstName);
      await checkoutPage.fillLastName(dataWithoutOptional.lastName);
      await checkoutPage.fillEmail(dataWithoutOptional.email);
      await checkoutPage.fillTelephone(dataWithoutOptional.telephone);
      await checkoutPage.fillAddress1(dataWithoutOptional.address1);
      // No llenar address2 (opcional)
      await checkoutPage.fillCity(dataWithoutOptional.city);
      await checkoutPage.fillPostcode(dataWithoutOptional.postcode);
      await checkoutPage.selectCountry(dataWithoutOptional.country);
      await checkoutPage.selectZone(dataWithoutOptional.zone);
      await checkoutPage.clickContinueGuest();
    });

    await test.step('Agregar método de entrega', async () => {
      await checkoutPage.continueShippingMethod();
    });

    await test.step('Agregar método de pago y comentario', async () => {
      await checkoutPage.fillComment(dataWithoutOptional.comment);
      await checkoutPage.clickAgreeCheckbox();
      await checkoutPage.clickContinuePaymentMethod();
    });

    await test.step('Confirmar orden', async () => {
      await expect(checkoutPage.totalText()).toBeVisible();
      await checkoutPage.clickConfirmOrder();
    });

    await test.step('Validar orden completada', async () => {
      await expect(checkoutPage.orderPlacedText()).toBeVisible();
    });
  });
});