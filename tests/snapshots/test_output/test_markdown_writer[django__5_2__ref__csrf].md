---
id: b9c3c5a865c070a7
source_file_id: django__5_2__ref__csrf.html
headings: ["Cross Site Request Forgery protection"]
level: 1
order: 0
tokens: 255
char_count: 1423
---
# Cross Site Request Forgery protection

The CSRF middleware and template tag provides easy-to-use protection against
[Cross Site Request Forgeries](https://owasp.org/www-community/attacks/csrf#overview). This type of attack occurs when a malicious
website contains a link, a form button or some JavaScript that is intended to
perform some action on your website, using the credentials of a logged-in user
who visits the malicious site in their browser. A related type of attack,
‘login CSRF’, where an attacking site tricks a user’s browser into logging into
a site with someone else’s credentials, is also covered.

The first defense against CSRF attacks is to ensure that GET requests (and other
‘safe’ methods, as defined by [**RFC 9110 Section 9.2.1**](https://datatracker.ietf.org/doc/html/rfc9110.md#section-9.2.1)) are side effect free.
Requests via ‘unsafe’ methods, such as POST, PUT, and DELETE, can then be
protected by the steps outlined in [How to use Django’s CSRF protection](../howto/csrf.md#using-csrf).

## How it works

The CSRF protection is based on the following things:

1. A CSRF cookie that is a random secret value, which other sites will not have
   access to.

   `CsrfViewMiddleware` sends this cookie with the response whenever
   `django.middleware.csrf.get_token()` is called. It can also send it in
   other cases. For security reasons, the value of the secret is changed each
   time a us
