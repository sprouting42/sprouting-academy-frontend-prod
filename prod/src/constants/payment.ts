export const BANK_INFO = {
  directTransfer: {
    bankName: process.env.NEXT_PUBLIC_BANK_NAME || "ธนาคารกสิกรไทย",
    accountNumber:
      process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER || "123-4-56789-0",
    accountName:
      process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || "บริษัท XXX จำกัด",
  },
  promptPay: {
    bankName: process.env.NEXT_PUBLIC_PROMPTPAY_BANK_NAME || "ธนาคารกสิกรไทย",
    accountNumber:
      process.env.NEXT_PUBLIC_PROMPTPAY_ACCOUNT_NUMBER || "0812345678",
    accountName:
      process.env.NEXT_PUBLIC_PROMPTPAY_ACCOUNT_NAME || "บริษัท XXX จำกัด",
    qrImage:
      process.env.NEXT_PUBLIC_PROMPTPAY_QR_IMAGE || "/images/qr-code.png",
  },
} as const;
