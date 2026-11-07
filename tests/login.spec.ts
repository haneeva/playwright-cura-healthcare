import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#menu-toggle').click();
    await page.getByRole('link', {name: 'Login'}).click();
    await expect(page.locator('h2')).toHaveText('Login');
   
  });

test('TC-LOGIN-01: Login with valid credentials', async ({ page }) => {
  await page.getByLabel('Username').fill(process.env.TEST_USERNAME!);
  await page.getByLabel('Password').fill(process.env.TEST_PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/#appointment/);
  await expect(page.locator('h2')).toHaveText('Make Appointment');

  });

test('TC-LOGIN-02: Login with invalid username', async ({ page }) => {
  await page.getByLabel('Username').fill('Tara');
  await page.getByLabel('Password').fill(process.env.TEST_PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/profile.php#login/);
  await expect(page.locator('//p[@class="lead text-danger"]')).toHaveText('Login failed! Please ensure the username and password are valid.');
  
  });

test('TC-LOGIN-03: Login with invalid password', async ({ page }) => {
  await page.getByLabel('Username').fill(process.env.TEST_USERNAME!);
  await page.getByLabel('Password').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/profile.php#login/);
  await expect(page.locator('//p[@class="lead text-danger"]')).toHaveText('Login failed! Please ensure the username and password are valid.');
  
  });

test('TC-LOGIN-04: Login with blank credentials', async ({ page }) => {
  await page.getByLabel('Username').fill('');
  await page.getByLabel('Password').fill('');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/profile.php#login/);
  await expect(page.locator('//p[@class="lead text-danger"]')).toHaveText('Login failed! Please ensure the username and password are valid.');

  });

});