# STellar Demo

## Thông tin tác giả
- **Họ tên:** Nguyễn Đức Lộc
- **Ngày sinh:** 25/11/2003
- **Lớp:** 48K33
- **Mã sinh viên:** 221122033121

---

## Chi tiết dự án

STellar Demo là một ứng dụng minh họa tích hợp với mạng blockchain **Stellar Testnet** sử dụng thư viện [`@stellar/stellar-sdk`](https://github.com/stellar/js-stellar-sdk).
-** địa chỉ contract: https://stellar.expert/explorer/testnet/tx/c67e6c3e675f04a49f6dd30e24b2ea0605bffa0b8d65db3da65a48e571684fb4
### Tính năng chính
- Tạo và nạp tiền cho tài khoản thử nghiệm qua **Friendbot**
- Kiểm tra số dư tài khoản (XLM và các token khác)
- Thực hiện giao dịch chuyển tiền (Payment) giữa các tài khoản trên Testnet

### Công nghệ sử dụng
- **Runtime:** Node.js (ES Module)
- **SDK:** `@stellar/stellar-sdk` v14.x
- **Mạng:** Stellar Testnet (`horizon-testnet.stellar.org`)

### Cách chạy

```bash
# Cài đặt dependencies
npm install

# Chạy demo
npm run demo
```

---

## Tầm nhìn

Dự án hướng tới việc xây dựng nền tảng hiểu biết về công nghệ blockchain Stellar — một nền tảng thanh toán phi tập trung, nhanh và chi phí thấp. Thông qua demo này, người dùng có thể nắm bắt các khái niệm cơ bản như tạo tài khoản, ký giao dịch và tương tác với mạng lưới Stellar, từ đó mở rộng sang các ứng dụng tài chính thực tế trong tương lai.
