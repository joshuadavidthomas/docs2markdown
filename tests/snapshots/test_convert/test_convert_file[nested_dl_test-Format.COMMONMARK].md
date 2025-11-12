# CharField

*class* CharField(*\*\*kwargs*)[[source]](https://example.com/source)[¶](#django.forms.CharField "Link to this definition")
:   - Default widget: `TextInput`
    - Empty value: Whatever you've given as `empty_value`.
    - Normalizes to: A string.
    - Error message keys: `required`, `max_length`

    Has the following optional arguments for validation:

    max\_length [¶](#django.forms.CharField.max_length "Link to this definition")

    min\_length [¶](#django.forms.CharField.min_length "Link to this definition")
    :   If provided, these arguments ensure that the string is at most or at least the given length.

    strip [¶](#django.forms.CharField.strip "Link to this definition")
    :   If `True` (default), the value will be stripped of leading and trailing whitespace.
