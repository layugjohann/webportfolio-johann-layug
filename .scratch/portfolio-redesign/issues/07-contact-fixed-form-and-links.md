# 07: Contact: fixed form and one-click links

**What to build:** A Recruiter can actually reach Johann from the page. The form delivers what they typed, gives clear feedback, and sits next to one-click Email / LinkedIn / GitHub buttons with the line "Philippines (UTC+8) · Open to remote". Restyled in A1.

**Blocked by:** 03

**Status:** done

- [x] The name, email and message fields are bound to the form's state
- [x] Submitting without a reCAPTCHA token sends nothing and shows an error toast
- [x] On success, it posts JSON to Web3Forms (access key, subject, name, email, message), shows a success toast, clears the fields and resets reCAPTCHA
- [x] On a failed response or a network error, it shows an error toast
- [x] Submit is disabled while sending
- [x] The Email / LinkedIn / GitHub buttons use the shared social config from 03
- [x] Tests: no token means no request is sent; with a token, the request body contains exactly the typed name, email and message; the fields clear after success; an error shows on failure
