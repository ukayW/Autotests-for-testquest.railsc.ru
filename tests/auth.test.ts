import { test, expect } from '@playwright/test';

const email = 'test@mail.ru'; //заменить на зарегистрированную почту
const password = 'password'; //заменить на пароль от почты

test('Авторизация с валидными данными', async ({ page }) => {
    await page.goto('https://testquest.railsc.ru/login');
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Пароль' }).fill(password);
    await page.getByRole('button', { name: 'Войти' }).click();

    await expect(page).toHaveURL(/about/);
});

test('Авторизация с пробелами в начале и конце email', async ({ page }) => {
    await page.goto('https://testquest.railsc.ru/login');
    await page.getByRole('textbox', { name: 'Email' }).fill(`           ${email}         `);
    await page.getByRole('textbox', { name: 'Пароль' }).fill(password);
    await page.getByRole('button', { name: 'Войти' }).click();

    await expect(page).toHaveURL(/about/);
});

test('Авторизация с неверным паролем', async ({ page }) => {
    await page.goto('https://testquest.railsc.ru/login');
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Пароль' }).fill('неверный пароль');
    await page.getByRole('button', { name: 'Войти' }).click();

    await expect(page.getByText('Login failed')).toBeVisible();
});

test('Авторизация с пустыми полями', async ({ page }) => {
    await page.goto('https://testquest.railsc.ru/login');
    await page.getByRole('button', { name: 'Войти' }).click();

    await expect(page.getByText('Login failed')).toBeVisible();
});

test('Авторизация с несуществующим email', async ({ page }) => {
    await page.goto('https://testquest.railsc.ru/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('test@mail.ru');
    await page.getByRole('textbox', { name: 'Пароль' }).fill(password);
    await page.getByRole('button', { name: 'Войти' }).click();

    await expect(page.getByText('Login failed')).toBeVisible();
});