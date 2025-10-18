---
id: 4467739a33ffa607
source_file_id: django__5_2__ref__checks.html
headings: ["System check framework"]
level: 1
order: 0
tokens: 98
char_count: 794
---
# System check framework

The system check framework is a set of static checks for validating Django
projects. It detects common problems and provides hints for how to fix them.
The framework is extensible so you can easily add your own checks.

For details on how to add your own checks and integrate them with Django’s
system checks, see the [System check topic guide](../topics/checks.md).

## API reference

### `CheckMessage`

`classCheckMessage(level,msg,hint=None,obj=None,id=None)`[[source]](https://github.com/django/django/blob/stable/5.2.x/django/core/checks/messages.py#L9)

The warnings and errors raised by system checks must be instances of
`CheckMessage`. An instance encapsulates a single reportable error or
warning. It also provides context and hints applicable to the messag
