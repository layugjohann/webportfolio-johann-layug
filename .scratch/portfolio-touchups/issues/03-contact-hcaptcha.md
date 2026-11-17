# 03: Contact: replace reCAPTCHA with Web3Forms hCaptcha

**Status:** done

**What to build:** The robot check shows "ERROR for site owner: Invalid domain for site key" (the Google reCAPTCHA key is not registered for the site's domain). Its token was also never sent, and Web3Forms verifies reCAPTCHA only on Pro. Switch to Web3Forms' free hCaptcha, which Web3Forms verifies server-side.

**Human step:** Johann enables hCaptcha in the form's settings at app.web3forms.com.

- [x] hCaptcha widget (Web3Forms free sitekey `50b2fe65-b00b-4b9e-ad62-3ba471098be2`, dark theme) replaces reCAPTCHA; the Google script is removed
- [x] No token: nothing is sent, error toast
- [x] With a token: the JSON body carries `h-captcha-response` alongside access key, subject, name, email, message
- [x] After success the widget resets; on expiry the token clears
- [x] Contact tests updated

## Comments

- Verified the widget renders on localhost (hCaptcha iframe, Web3Forms sitekey, dark theme). Still to do: Johann enables hCaptcha at app.web3forms.com, then sends one real test message from the deployed site.
