import * as brevo from '@getbrevo/brevo'

export const sendOTPEmail = async (email: string, otp: string) => {
  const apiInstance = new brevo.TransactionalEmailsApi()
  apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '')
  
  const sendSmtpEmail = new brevo.SendSmtpEmail()
  
  sendSmtpEmail.subject = 'Password Reset OTP - Beton Kegna'
  sendSmtpEmail.to = [{ email }]
  sendSmtpEmail.sender = { name: 'Beton Kegna', email: 'bkfan1221@gmail.com' }
  sendSmtpEmail.htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #6366f1;">Password Reset Request</h2>
      <p>You requested to reset your password for Beton Kegna Admin Panel.</p>
      <p>Your OTP code is:</p>
      <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #6366f1;">
        ${otp}
      </div>
      <p>This code will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 12px;">Beton Kegna - Real Estate Sales</p>
    </div>
  `
  
  await apiInstance.sendTransacEmail(sendSmtpEmail)
}
