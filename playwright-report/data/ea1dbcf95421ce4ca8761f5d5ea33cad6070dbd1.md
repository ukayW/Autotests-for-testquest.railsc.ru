# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.test.ts >> Авторизация с валидными данными
- Location: tests\auth.test.ts:6:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /about/
Received string:  "https://testquest.railsc.ru/login"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × unexpected value "https://testquest.railsc.ru/login"

```

```yaml
- navigation:
  - link:
    - /url: /
    - img
  - link "Прайс-лист":
    - /url: https://testquest.railsc.ru/products
  - link "Описание":
    - /url: https://testquest.railsc.ru/about
- banner:
  - heading "Вход" [level=1]
- main:
  - paragraph: Login failed
  - heading "Введите данные для входа" [level=2]
  - text: Email
  - textbox "Email"
  - text: Пароль
  - textbox "Пароль"
  - button "Войти"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const email = 'test@mail.ru'; //заменить на зарегистрированную почту
  4  | const password = 'password'; //заменить на пароль от почты
  5  | 
  6  | test('Авторизация с валидными данными', async ({ page }) => {
  7  |     await page.goto('https://testquest.railsc.ru/login');
  8  |     await page.getByRole('textbox', { name: 'Email' }).fill(email);
  9  |     await page.getByRole('textbox', { name: 'Пароль' }).fill(password);
  10 |     await page.getByRole('button', { name: 'Войти' }).click();
  11 | 
> 12 |     await expect(page).toHaveURL(/about/);
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  13 | });
  14 | 
  15 | test('Авторизация с пробелами в начале и конце email', async ({ page }) => {
  16 |     await page.goto('https://testquest.railsc.ru/login');
  17 |     await page.getByRole('textbox', { name: 'Email' }).fill(`           ${email}         `);
  18 |     await page.getByRole('textbox', { name: 'Пароль' }).fill(password);
  19 |     await page.getByRole('button', { name: 'Войти' }).click();
  20 | 
  21 |     await expect(page).toHaveURL(/about/);
  22 | });
  23 | 
  24 | test('Авторизация с неверным паролем', async ({ page }) => {
  25 |     await page.goto('https://testquest.railsc.ru/login');
  26 |     await page.getByRole('textbox', { name: 'Email' }).fill(email);
  27 |     await page.getByRole('textbox', { name: 'Пароль' }).fill('неверный пароль');
  28 |     await page.getByRole('button', { name: 'Войти' }).click();
  29 | 
  30 |     await expect(page.getByText('Login failed')).toBeVisible();
  31 | });
  32 | 
  33 | test('Авторизация с пустыми полями', async ({ page }) => {
  34 |     await page.goto('https://testquest.railsc.ru/login');
  35 |     await page.getByRole('button', { name: 'Войти' }).click();
  36 | 
  37 |     await expect(page.getByText('Login failed')).toBeVisible();
  38 | });
  39 | 
  40 | test('Авторизация с несуществующим email', async ({ page }) => {
  41 |     await page.goto('https://testquest.railsc.ru/login');
  42 |     await page.getByRole('textbox', { name: 'Email' }).fill('test@mail.ru');
  43 |     await page.getByRole('textbox', { name: 'Пароль' }).fill(password);
  44 |     await page.getByRole('button', { name: 'Войти' }).click();
  45 | 
  46 |     await expect(page.getByText('Login failed')).toBeVisible();
  47 | });
```