# Automation Testing Project - Group 02

## Mục lục

1. [Project Overview](#1-project-overview)
2. [Website được kiểm thử](#2-website-được-kiểm-thử)
3. [Danh sách thành viên](#3-danh-sách-thành-viên)
4. [Công nghệ và công cụ sử dụng](#4-công-nghệ-và-công-cụ-sử-dụng)
5. [Cấu trúc thư mục](#5-cấu-trúc-thư-mục)
6. [Hướng dẫn cài đặt và cấu hình](#6-hướng-dẫn-cài-đặt-và-cấu-hình)
7. [Hướng dẫn chạy Test Scripts của từng thành viên](#7-hướng-dẫn-chạy-test-scripts-của-từng-thành-viên)
8. [Hướng dẫn chạy toàn bộ Test Suite](#8-hướng-dẫn-chạy-toàn-bộ-test-suite)
9. [Hướng dẫn xem Test Reports và Screenshots](#9-hướng-dẫn-xem-test-reports-và-screenshots)
10. [Debug và xử lý lỗi thường gặp](#10-debug-và-xử-lý-lỗi-thường-gặp)
11. [Tài liệu tham khảo](#11-tài-liệu-tham-khảo)

---

## 1. Project Overview

Dự án **Automation Testing Project - Group 02** được xây dựng nhằm kiểm thử tự động các chức năng của website MahoCommerce bằng **Playwright Test**.

Các test script được viết bằng TypeScript và tổ chức theo từng thành viên để thuận tiện cho việc phát triển, bảo trì, chạy kiểm thử độc lập cũng như tích hợp thành một Test Suite chung.

Mục tiêu của dự án:

- Tự động hóa các luồng kiểm thử chức năng trên website.
- Kiểm tra kết quả thực tế so với kết quả mong đợi.
- Phát hiện và ghi nhận lỗi trong quá trình kiểm thử.
- Tổng hợp kết quả kiểm thử thông qua HTML Report, screenshots và trace.

## 2. Website được kiểm thử

| Thông tin | Chi tiết |
| --- | --- |
| Tên website | MahoCommerce |
| Địa chỉ website | https://mahocommerce.com/about/demo/ |
| Công cụ kiểm thử | Playwright Test |
| Trình duyệt mặc định | Chromium |

Các chức năng được kiểm thử được tổ chức theo từng nhóm test script trong thư mục `tests/`. Phạm vi chi tiết của từng thành viên được trình bày tại mục [Danh sách thành viên](#3-danh-sách-thành-viên) và thể hiện qua tên các thư mục, file test tương ứng.

## 3. Danh sách thành viên

| STT | MSSV     | Họ và tên          | Chức năng phụ trách                                                                                                                                                                                                                                                     |
|:---:|----------|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  1  | 23130314 | Võ Văn Thiệt       | 1. Cấu trúc danh mục & Lựa chọn biến thể<br>2. Thanh toán một trang & Xử lý đơn hàng<br>3. Đánh giá quy tắc khuyến mãi                                                                                                                                                  |
|  2  | 23130117 | Phan Bá Huy Hoàng  | 4. Quản trị quản lý sản phẩm<br>5. Quản lý thẻ quà tặng<br>6. Quản lý khách hàng                                                                                                                                                                                        |
|  3  | 23130238 | Vũ Châu Hoài Phong | 7. Danh mục & Sản phẩm (Hệ thống Tìm kiếm & Bộ lọc nâng cao - Search & Faceted Filters)<br>8. Khách hàng & Tài khoản (Quản lý Hồ sơ cá nhân & Sổ địa chỉ - Profile & Address Book)<br>9. Giỏ hàng & Thanh toán (Quản lý Đặt hàng & Hóa đơn - Order Placement & Invoice) |
|  4  | 23130397 | Thòng Lý Tiểu Yến  | 10. Quản lý đánh giá<br>11. Đánh giá & Nhận xét sản phẩm (Product Reviews & Ratings)<br>12. Danh sách yêu thích & So sánh (Wishlist & Comparison)                                                                                                                       |
|  5  | 23130327 | Nguyễn Hoài Thương | 13. Báo cáo Thống kê Doanh thu (Sales Analytics & Reports)<br>14. Quản lý Mã giảm giá (Coupon/Discount Code System)<br>15. Quản lý Giỏ hàng (Shopping Cart Management)                                                                                                  |

> Thay các nội dung trong dấu `<...>` bằng thông tin thực tế của nhóm; thêm hoặc xóa dòng tùy theo số lượng thành viên.

## 4. Công nghệ và công cụ sử dụng

| Công nghệ / Công cụ | Mục đích sử dụng |
| --- | --- |
| TypeScript | Ngôn ngữ lập trình sử dụng để viết test script. |
| Node.js | Môi trường chạy JavaScript/TypeScript. |
| npm | Quản lý package và dependencies của dự án. |
| Playwright Test | Framework thực hiện kiểm thử tự động E2E. |
| Chromium | Trình duyệt thực hiện kiểm thử mặc định. |
| dotenv | Đọc các biến môi trường từ file `.env` (nếu được cấu hình trong project). |
| Git / GitHub | Quản lý phiên bản và cộng tác nhóm. |
| Playwright HTML Reporter | Tạo báo cáo kết quả kiểm thử dạng HTML. |
| Playwright Trace Viewer | Xem lại các bước thực thi để hỗ trợ debug. |

### Yêu cầu hệ thống

| Công cụ | Phiên bản / yêu cầu |
| --- | --- |
| Node.js | 18 trở lên |
| npm | Đi kèm Node.js |
| Git | Đã cài đặt và có thể sử dụng từ terminal |
| Hệ điều hành | Windows / macOS / Linux |
| Website kiểm thử | Có thể truy cập được từ máy chạy test |

Kiểm tra Node.js và npm:

```bash
node -v
npm -v
```

## 5. Cấu trúc thư mục

Cấu trúc dưới đây mô tả các thành phần chính của project. 
```text
Software-Testing-Group02/
│
├── group02.txt
├── README.md
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── .env.example
│
├── test-scripts/
│   ├── Member01/
│   │   ├── Function01/
│   │   ├── Function02/
│   │   └── Function03/
│   │
│   ├── Member02/
│   │   ├── Function04/
│   │   ├── Function05/
│   │   └── Function06/
│   │
│   └── Member03/
│       ├── Function07/
│       ├── Function08/
│       └── Function09/
│
├── test-data/
├── reports/
└── screenshots/
```

> Nếu bạn đã đổi tên thư mục sau khi clone, hãy `cd` vào đúng thư mục project trên máy của mình.

**Ý nghĩa các thư mục và file chính:**

- `tests/`: Chứa các test script, được chia thành thư mục riêng theo từng thành viên.
- `playwright.config.ts`: Cấu hình thư mục test, timeout, browser, reporter và các thiết lập khi chạy test.
- `.env`: Chứa URL hoặc thông tin cấu hình môi trường cần thiết. Không đưa file này lên Git.
- `.env.example`: Cung cấp cấu trúc biến môi trường mẫu để thành viên mới có thể tự tạo `.env`.
- `playwright-report/`: Chứa báo cáo HTML sau khi chạy test.
- `test-results/`: Chứa artifacts do Playwright tạo ra, chẳng hạn screenshot, trace hoặc video tùy cấu hình.

## 6. Hướng dẫn cài đặt và cấu hình

### 6.1. Clone project

```bash
git clone https://github.com/vthiet/group02-mahocommerce-testing.git
cd group02-mahocommerce-testing
```
### 6.2. Cài đặt dependencies

```bash
npm install
```

### 6.3. Cài đặt trình duyệt Playwright

Cài đặt các trình duyệt được Playwright hỗ trợ:

```bash
npx playwright install
```

Nếu project chỉ chạy trên Chromium, có thể cài riêng:

```bash
npx playwright install chromium
```

Trên Linux, nếu thiếu thư viện hệ thống:

```bash
npx playwright install --with-deps
```

### 6.4. Cấu hình biến môi trường

Tạo file `.env` tại thư mục gốc của project. Có thể sao chép từ `.env.example`:

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**macOS / Linux:**

```bash
cp .env.example .env
```

Ví dụ nội dung `.env` tối thiểu:

```env
BASE_URL=https://mahocommerce.com/about/demo/
```

Nếu test script có sử dụng tài khoản đăng nhập hoặc biến môi trường khác, hãy bổ sung các biến tương ứng theo tên được sử dụng trong code. Không tự ý đổi tên biến nếu chưa cập nhật code đọc biến đó.

> Không commit `.env` hoặc thông tin tài khoản/mật khẩu lên GitHub. Chỉ commit `.env.example` với giá trị mẫu không chứa thông tin bí mật.

### 6.5. Kiểm tra cấu hình Playwright

Trong `playwright.config.ts`, project sử dụng `tests/` làm thư mục chứa test và đọc `BASE_URL` từ biến môi trường. Cấu hình tham khảo:

```ts
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  retries: 0,
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

Các thiết lập quan trọng:

| Tham số | Ý nghĩa |
| --- | --- |
| `testDir` | Thư mục chứa test script. |
| `baseURL` | URL gốc của website kiểm thử. |
| `fullyParallel` | Cho phép chạy test song song. |
| `retries` | Số lần chạy lại test khi thất bại. |
| `reporter` | Các định dạng reporter được sử dụng. |
| `trace` | Cấu hình ghi trace để hỗ trợ phân tích lỗi. |
| `screenshot` | Cấu hình chụp screenshot khi test thất bại. |
| `video` | Cấu hình ghi video khi test thất bại. |

> Đoạn code trên là cấu hình tham khảo. Hãy đối chiếu với `playwright.config.ts` thực tế của repository trước khi thay thế, vì các tùy chọn chạy test phụ thuộc vào cấu hình hiện tại của nhóm.

## 7. Hướng dẫn chạy Test Scripts của từng thành viên

Mở terminal tại thư mục gốc của project trước khi chạy các lệnh bên dưới.

### 7.1. Chạy toàn bộ test của một thành viên

Thay `<MSSV_HoTen>` bằng tên thư mục thực tế của thành viên:

```bash
npx playwright test tests/<MSSV_HoTen>
```

Ví dụ:

```bash
npx playwright test tests/22123456_NguyenVanA
```

### 7.2. Chạy một file test cụ thể

```bash
npx playwright test tests/<MSSV_HoTen>/<ten-file>.spec.ts
```

Ví dụ:

```bash
npx playwright test tests/22123456_NguyenVanA/product-management.spec.ts
```

### 7.3. Chạy một test case cụ thể

Sử dụng `-g` để chạy test có tên khớp với chuỗi được cung cấp:

```bash
npx playwright test -g "PROD_MGT_Create_01"
```

Tên test phải khớp với nội dung được khai báo trong `test()` của script.

### 7.4. Chạy test có giao diện trình duyệt

```bash
npx playwright test tests/<MSSV_HoTen> --headed
```

### 7.5. Chạy test trong UI Mode

```bash
npx playwright test tests/<MSSV_HoTen> --ui
```

UI Mode cho phép chọn test, chạy lại test và quan sát quá trình thực thi trực quan.

## 8. Hướng dẫn chạy toàn bộ Test Suite

Để chạy tất cả test script của các thành viên trong project, sử dụng:

```bash
npx playwright test
```

Một số lệnh hữu ích:

| Lệnh | Chức năng |
| --- | --- |
| `npx playwright test` | Chạy toàn bộ Test Suite. |
| `npx playwright test --headed` | Chạy test và hiển thị cửa sổ trình duyệt. |
| `npx playwright test --ui` | Mở Playwright UI Mode. |
| `npx playwright test --debug` | Chạy debug bằng Playwright Inspector. |
| `npx playwright test --project=chromium` | Chỉ chạy trên Chromium. |
| `npx playwright test --workers=1` | Chạy tuần tự với một worker. |
| `npx playwright test --retries=2` | Chạy lại test thất bại tối đa 2 lần. |
| `npx playwright test --last-failed` | Chạy lại những test thất bại ở lần chạy trước. |

**Lưu ý khi chạy toàn bộ Test Suite:**

- Đảm bảo website kiểm thử có thể truy cập và các biến môi trường đã được cấu hình.
- Kiểm tra tài khoản kiểm thử còn hợp lệ nếu test cần đăng nhập.
- Một số test có thể tạo, sửa hoặc xóa dữ liệu. Việc chạy song song có thể khiến các test ảnh hưởng lẫn nhau nếu dùng chung dữ liệu.
- Nếu test không ổn định do xung đột dữ liệu, thử chạy tuần tự bằng `npx playwright test --workers=1`.
- Sau khi chạy, kiểm tra terminal để xem tổng số test Passed, Failed và Skipped.

## 9. Hướng dẫn xem Test Reports và Screenshots

### 9.1. Xem HTML Test Report

Sau khi chạy test, mở báo cáo HTML bằng lệnh:

```bash
npx playwright show-report
```

HTML Report cung cấp thông tin về:

- Tổng số test Passed, Failed, Flaky và Skipped.
- Kết quả của từng test case.
- Thời gian thực thi.
- Thông tin lỗi khi test thất bại.
- Các attachments được lưu cùng test result, nếu có.

Thư mục báo cáo mặc định:

```text
playwright-report/
```

### 9.2. Xem screenshots

Với cấu hình `screenshot: 'only-on-failure'`, Playwright chỉ tự động chụp screenshot khi test thất bại.

Screenshot được lưu trong thư mục kết quả test, thường có dạng:

```text
test-results/
└── <ten-test>/
    └── test-failed-1.png
```

Tên thư mục và file thực tế do Playwright tạo ra, có thể khác ví dụ trên.

Có thể mở trực tiếp file `.png` bằng trình xem ảnh trên máy tính. Nếu screenshot được đính kèm trong HTML Report, bạn cũng có thể mở report và chọn test tương ứng để xem attachment.

> Nếu cần screenshot cho cả test Passed, hãy cấu hình `screenshot` phù hợp hoặc chủ động chụp ảnh trong test script. Cấu hình hiện tại `only-on-failure` không tự động chụp ảnh cho test Passed.

### 9.3. Xem Trace

Nếu trace đã được ghi lại, mở bằng lệnh:

```bash
npx playwright show-trace test-results/<ten-thu-muc-test>/trace.zip
```

Trace Viewer hỗ trợ xem lại:

- Các thao tác theo timeline.
- Screenshot tại từng bước.
- Locator và hành động tương ứng.
- Thông tin lỗi trong quá trình thực thi.
- Network và console information (nếu có trong trace).

Với cấu hình `trace: 'on-first-retry'`, trace được ghi khi test được chạy lại lần đầu sau khi thất bại.

### 9.4. Xem video

Nếu video được tạo theo cấu hình `video: 'retain-on-failure'`, file video của test thất bại sẽ được lưu trong thư mục kết quả tương ứng bên trong `test-results/`.

### 9.5. Ghi lại thao tác bằng Codegen

Có thể sử dụng Playwright Codegen để ghi lại thao tác trên website và sinh code tham khảo:

```bash
npx playwright codegen https://mahocommerce.com/about/demo/
```

## 10. Debug và xử lý lỗi thường gặp

### 10.1. Debug một file test

```bash
npx playwright test tests/<MSSV_HoTen>/<ten-file>.spec.ts --debug
```

### 10.2. Một số lỗi thường gặp

| Lỗi | Nguyên nhân / Cách xử lý |
| --- | --- |
| `Executable doesn't exist ... run npx playwright install` | Chưa cài browser của Playwright. Chạy `npx playwright install`. |
| `page.goto: net::ERR_CONNECTION_REFUSED` | Website không truy cập được hoặc `BASE_URL` sai. Kiểm tra website và file `.env`. |
| `Cannot find module 'dotenv'` | Chưa cài `dotenv` trong khi project có import package này. Chạy `npm install dotenv`. |
| `Timeout 30000ms exceeded` | Website tải chậm, locator không đúng hoặc phần tử chưa xuất hiện. Kiểm tra locator và timeout. |
| Test lúc Passed, lúc Failed | Có thể do chạy song song, dữ liệu dùng chung hoặc website phản hồi không ổn định. Thử `--workers=1`. |
| `'npx' is not recognized` (Windows) | Node.js chưa được cài hoặc chưa được thêm vào PATH. Cài Node.js và mở lại terminal. |
| Không tìm thấy test | Kiểm tra đường dẫn file, phần mở rộng `.spec.ts`, `testDir` và tên thư mục. |
| Không tạo được HTML Report | Kiểm tra reporter trong `playwright.config.ts` và chạy test trước khi dùng `npx playwright show-report`. |

## 11. Tài liệu tham khảo

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Test CLI](https://playwright.dev/docs/test-cli)
- [Playwright HTML Reporter](https://playwright.dev/docs/test-reporters)
- [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer)
- [Playwright Configuration](https://playwright.dev/docs/test-configuration)
