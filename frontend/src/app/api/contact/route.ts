import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json()

    const emailData = {
      sender: {
        name: "Beton Kegna Contact Form",
        email: process.env.BREVO_SENDER_EMAIL
      },
      to: [
        {
          email: process.env.CONTACT_RECIPIENT_EMAIL,
          name: "Beton Kegna"
        }
      ],
      subject: `New Contact Form Message from ${name}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">New Contact Form Message</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 5px;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px;">Sent from Beton Kegna website contact form</p>
        </div>
      `
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!
      },
      body: JSON.stringify(emailData)
    })

    if (!response.ok) {
      throw new Error(`Brevo API error: ${response.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}