import bcrypt from 'bcryptjs'

/**
 * Generates a random 6-digit OTP string.
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * Hashes an OTP string for secure storage.
 */
export async function hashOTP(otp: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(otp, salt)
}

/**
 * Verifies a plain text OTP against a hashed OTP.
 */
export async function verifyOTP(otp: string, hashedOtp: string): Promise<boolean> {
  return bcrypt.compare(otp, hashedOtp)
}
