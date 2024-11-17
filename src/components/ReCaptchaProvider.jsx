import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export function ReCaptchaProvider({ children }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}