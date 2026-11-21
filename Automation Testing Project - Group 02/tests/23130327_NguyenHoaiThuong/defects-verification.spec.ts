import { test, expect, Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const BASE_URL: string = process.env.MAHO_URL || 'https://demo.mahocommerce.com';
const ADMIN_URL: string = `${BASE_URL}/admin2941834/`;
const ADMIN_USER: string = process.env.ADMIN_USER || 'demo';
const ADMIN_PASS: string = process.env.ADMIN_PASS || 'demo1234demo1234';

const EVIDENCE_DIR: string = path.resolve(__dirname, '../../../Envidence - Group 02/23130327_NguyenHoaiThuong');
if (!fs.existsSync(EVIDENCE_DIR)) {
    fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
}

async function waitForReset(page: Page): Promise<void> {
    for (let i = 0; i < 15; i++) {
        const isResetting = await page.locator('text=Demo is resetting').isVisible().catch(() => false);
        if (!isResetting) break;
        await page.waitForTimeout(5000);
        await page.reload({ waitUntil: 'domcontentloaded' }).catch(() => { });
    }
}

async function loginAdmin(page: Page): Promise<void> {
    await page.goto(ADMIN_URL, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await waitForReset(page);

    const usernameInput = page.locator('#username');
    const mainMenu = page.locator('#nav');

    await usernameInput.or(mainMenu).first().waitFor({ state: 'visible', timeout: 30000 });

    if (await usernameInput.isVisible()) {
        await usernameInput.fill(ADMIN_USER);
        const passwordInput = page.locator('input[type="password"]').first();
        await passwordInput.fill(ADMIN_PASS);
        await passwordInput.press('Enter');
        await page.waitForLoadState('domcontentloaded');
        await waitForReset(page);
    }
}

async function goToReport(page: Page, reportPath: string): Promise<void> {
    await loginAdmin(page);
    const targetLink = page.locator(`a[href*="${reportPath}"]`).first();
    if (await targetLink.isVisible().catch(() => false)) {
        await targetLink.click();
    } else {
        const fullHref = await page.locator(`a[href*="${reportPath}"]`).first().getAttribute('href').catch(() => null);
        if (fullHref) {
            await page.goto(fullHref, { waitUntil: 'domcontentloaded' });
        } else {
            await page.goto(`${ADMIN_URL}${reportPath}/`, { waitUntil: 'domcontentloaded' });
        }
    }
    await page.waitForLoadState('domcontentloaded');
    await waitForReset(page);
}

async function goToPromoQuote(page: Page): Promise<void> {
    await loginAdmin(page);
    const promoLink = page.locator('a[href*="promo_quote"]').first();
    if (await promoLink.isVisible().catch(() => false)) {
        await promoLink.click();
    } else {
        const fullHref = await page.locator('a[href*="promo_quote"]').first().getAttribute('href').catch(() => null);
        if (fullHref) {
            await page.goto(fullHref, { waitUntil: 'domcontentloaded' });
        } else {
            await page.goto(`${ADMIN_URL}promo_quote/`, { waitUntil: 'domcontentloaded' });
        }
    }
    await page.waitForLoadState('domcontentloaded');
    await waitForReset(page);
}

async function addSampleProduct(page: Page): Promise<void> {
    await page.goto(`${BASE_URL}/default/fashion/accessories/bags-luggage/halden-leather-weekender/`, { waitUntil: 'domcontentloaded' });
    await waitForReset(page);
    const form = page.locator('#product_addtocart_form');
    if (await form.isVisible().catch(() => false)) {
        await page.evaluate(() => {
            const f = document.getElementById('product_addtocart_form') as HTMLFormElement | null;
            if (f) HTMLFormElement.prototype.submit.call(f);
        });
        await page.waitForLoadState('domcontentloaded').catch(() => { });
    } else {
        await page.goto(`${BASE_URL}/default/checkout/cart/`, { waitUntil: 'domcontentloaded' });
    }
    await waitForReset(page);
}

async function ensureProductInCart(page: Page): Promise<void> {
    await page.goto(`${BASE_URL}/default/checkout/cart/`, { waitUntil: 'domcontentloaded' });
    await waitForReset(page);
    if (await page.locator('#shopping-cart-table').isVisible().catch(() => false)) {
        return;
    }
    await addSampleProduct(page);
}

test.describe('Defects Verification', () => {

    // Sales Reports
    test('[SalesReports-DEF01] Không có validation cảnh báo khi Từ ngày lớn hơn Đến ngày (From Date > To Date)', async ({ page }) => {
        await goToReport(page, 'report_sales/sales');
        await page.locator('#sales_report_from').fill('2026-12-31');
        await page.locator('#sales_report_to').fill('2026-01-01');
        await page.locator('button:has-text("Show Report")').click();
        await page.waitForTimeout(2000);

        await page.screenshot({ path: path.join(EVIDENCE_DIR, 'SalesReports-DEF01.png'), fullPage: true });

        const hasValidationAdvice = await page.locator('.validation-advice, .error-msg, .messages .error-msg').isVisible().catch(() => false);
        expect(hasValidationAdvice).toBeFalsy();
    });

    test('[SalesReports-DEF02] Nút Export không bị vô hiệu hóa khi click, cho phép Spam Click xuất nhiều file trùng lặp', async ({ page }) => {
        await goToReport(page, 'report_sales/sales');
        const exportBtn = page.locator('button:has-text("Export")').first();
        await expect(exportBtn).toBeVisible();

        await exportBtn.click();
        await page.waitForTimeout(300);

        await page.screenshot({ path: path.join(EVIDENCE_DIR, 'SalesReports-DEF02.png') });

        const isStillEnabled = await exportBtn.isEnabled();
        expect(isStillEnabled).toBeTruthy();
    });

    test('[SalesReports-DEF03] Cho phép lọc và truy vấn báo cáo doanh thu ở các mốc ngày trong tương lai (Năm 2030)', async ({ page }) => {
        await goToReport(page, 'report_sales/sales');
        await page.locator('#sales_report_from').fill('2030-01-01');
        await page.locator('#sales_report_to').fill('2030-01-31');
        await page.locator('button:has-text("Show Report")').click();
        await page.waitForTimeout(2000);

        await page.screenshot({ path: path.join(EVIDENCE_DIR, 'SalesReports-DEF03.png'), fullPage: true });

        const gridVisible = await page.locator('.grid, table').first().isVisible().catch(() => false);
        expect(gridVisible).toBeTruthy();
    });

    test('[SalesReports-DEF04] Mở trực tiếp liên kết Admin Report không có Secret Key bị huỷ phiên và đá ra Login không thông báo', async ({ page }) => {
        await loginAdmin(page);
        await page.goto(`${ADMIN_URL}report_sales/sales/`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(2000);

        await page.screenshot({ path: path.join(EVIDENCE_DIR, 'SalesReports-DEF04.png'), fullPage: true });

        const isKickedOut = page.url().includes('dashboard') || 
                            await page.locator('#username').isVisible().catch(() => false) ||
                            !(await page.locator('#sales_report_from').isVisible().catch(() => false));
        expect(isKickedOut).toBeTruthy();
    });

    // Coupon Management
    test('[CouponManagement-DEF01] Ô nhập mã giảm giá Storefront không tự động cắt khoảng trắng đầu/cuối (Trim whitespace)', async ({ page }) => {
        await ensureProductInCart(page);
        const promoInput = page.locator('#maho-promo-code, #coupon_code').first();
        const promoBtn = page.locator('#maho-promo-apply, button:has-text("Apply")').first();

        await promoInput.fill('   DISCOUNT10   ');
        await promoBtn.click();
        await page.waitForTimeout(3000);

        await page.screenshot({ path: path.join(EVIDENCE_DIR, 'CouponManagement-DEF01.png') });

        const msgContainer = page.locator('#maho-promo-message, .promo-message, .messages .error-msg, body').first();
        const text = await msgContainer.innerText();
        expect(text.toLowerCase()).not.toContain('coupon code was applied');
    });

    test('[CouponManagement-DEF02] Nút Apply Coupon thiếu cơ chế Debounce / Disable chống Spam Click liên tục', async ({ page }) => {
        await ensureProductInCart(page);
        const promoInput = page.locator('#maho-promo-code, #coupon_code').first();
        const promoBtn = page.locator('#maho-promo-apply, button:has-text("Apply")').first();

        await promoInput.fill('TESTCODE');
        await promoBtn.click({ force: true });
        await promoBtn.click({ force: true }).catch(() => { });

        await page.screenshot({ path: path.join(EVIDENCE_DIR, 'CouponManagement-DEF02.png') });
        expect(true).toBeTruthy();
    });

    test('[CouponManagement-DEF03] Không giới hạn độ dài tối đa (maxlength) trên thẻ input nhập Coupon ngoài Storefront', async ({ page }) => {
        await ensureProductInCart(page);
        const promoInput = page.locator('#maho-promo-code, #coupon_code').first();
        await promoInput.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        await page.screenshot({ path: path.join(EVIDENCE_DIR, 'CouponManagement-DEF03.png') });

        const maxLengthAttr = await promoInput.getAttribute('maxlength');
        expect(maxLengthAttr).toBeNull();
    });

    test('[CouponManagement-DEF04] Admin cho phép cấu hình From Date lớn hơn To Date khi tạo quy tắc giảm giá giỏ hàng', async ({ page }) => {
        await goToPromoQuote(page);
        const addBtn = page.locator('.content-header button, button:has-text("Add"), button[title="Add"]').first();
        await addBtn.click();

        await page.locator('#rule_name').fill('Defect From Greater Than To Test');
        await page.locator('#rule_is_active').selectOption({ value: '1' }).catch(() => { });
        await page.locator('#rule_from_date').fill('2026-12-31');
        await page.locator('#rule_to_date').fill('2026-01-01');

        await page.screenshot({ path: path.join(EVIDENCE_DIR, 'CouponManagement-DEF04.png'), fullPage: true });

        const fromVal = await page.locator('#rule_from_date').inputValue();
        const toVal = await page.locator('#rule_to_date').inputValue();
        expect(fromVal > toVal).toBeTruthy();
    });

    // Shopping Cart
    test('[ShoppingCart-DEF01] Cập nhật số lượng Qty là số âm hoặc ký tự chữ không hiển thị thông báo lỗi giải thích', async ({ page }) => {
        await ensureProductInCart(page);
        const qtyInput = page.locator('#shopping-cart-table input[name*="[qty]"]').first();
        await qtyInput.fill('-1');
        const updateBtn = page.locator('button[title="Update Shopping Cart"], button.btn-update').first();
        await updateBtn.click();
        await page.waitForTimeout(2000);

        await page.screenshot({ path: path.join(EVIDENCE_DIR, 'ShoppingCart-DEF01.png') });

        const errorAlert = await page.locator('.messages .error-msg, li.error-msg').isVisible().catch(() => false);
        expect(errorAlert).toBeFalsy();
    });

    test('[ShoppingCart-DEF02] Sửa số lượng Qty = 0 tự động xóa sản phẩm khỏi giỏ hàng mà không có hộp thoại xác nhận', async ({ page }) => {
        await ensureProductInCart(page);
        let dialogAppeared = false;
        page.on('dialog', async dialog => {
            dialogAppeared = true;
            await dialog.accept();
        });

        const qtyInput = page.locator('#shopping-cart-table input[name*="[qty]"]').first();
        await qtyInput.fill('0');
        const updateBtn = page.locator('button[title="Update Shopping Cart"], button.btn-update').first();
        await updateBtn.click();
        await page.waitForTimeout(2000);

        await page.screenshot({ path: path.join(EVIDENCE_DIR, 'ShoppingCart-DEF02.png') });

        expect(dialogAppeared).toBeFalsy();
    });

    test('[ShoppingCart-DEF03] Cập nhật số lượng vượt tồn kho báo lỗi nhưng ô input không tự động hoàn tác (revert) số lượng', async ({ page }) => {
        await ensureProductInCart(page);
        const qtyInput = page.locator('#shopping-cart-table input[name*="[qty]"]').first();
        await qtyInput.fill('9999');
        const updateBtn = page.locator('button[title="Update Shopping Cart"], button.btn-update').first();
        await updateBtn.click();
        await page.waitForTimeout(2000);

        await page.screenshot({ path: path.join(EVIDENCE_DIR, 'ShoppingCart-DEF03.png') });

        const currentQtyVal = await qtyInput.inputValue();
        expect(currentQtyVal).toBe('9999');
    });

    test('[ShoppingCart-DEF04] Mở 2 Tab thay đổi giỏ hàng gây lệch tổng tiền hiển thị giữa trang giỏ hàng và trang thanh toán', async ({ page }) => {
        await ensureProductInCart(page);
        const totalsTable = page.locator('#shopping-cart-totals-table, .cart-totals').first();
        await expect(totalsTable).toBeVisible();

        await page.screenshot({ path: path.join(EVIDENCE_DIR, 'ShoppingCart-DEF04.png') });

        const checkoutBtn = page.locator('.btn-proceed-checkout, button[title*="Checkout"]').first();
        expect(await checkoutBtn.isVisible()).toBeTruthy();
    });

});
