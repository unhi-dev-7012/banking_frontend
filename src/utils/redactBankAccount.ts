export const redactBankAccount = (cardNumber: string): string => {
  if (!cardNumber) return ""; // Kiểm tra nếu không có số tài khoản

  const cardLength = cardNumber.length;

  // Nếu số tài khoản có ít hơn 4 chữ số, không thay đổi gì
  if (cardLength <= 4) {
    return cardNumber;
  }

  // Giữ lại 4 chữ số cuối, thay thế phần còn lại bằng dấu '*'
  return `${"*".repeat(cardLength - 4)}${cardNumber.slice(-4)}`;
};
