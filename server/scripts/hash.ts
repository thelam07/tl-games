// Tao chuoi bcrypt hash cho 1 mat khau bat ky.
// Dung khi muon them tai khoan admin thu cong vao DB.
// Cach chay:  npm --prefix server run hash matkhaucuaban
import bcrypt from 'bcryptjs';

const password = process.argv[2];
if (!password) {
  console.error('Cach dung: npm run hash <mat-khau>');
  process.exit(1);
}
console.log(bcrypt.hashSync(password, 10));
