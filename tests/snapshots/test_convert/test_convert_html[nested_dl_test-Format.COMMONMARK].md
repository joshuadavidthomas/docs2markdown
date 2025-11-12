# CharField

`class CharField(**kwargs)`[[source]](https://example.com/source)
:   - Default widget: `TextInput`
    - Empty value: Whatever you've given as `empty_value`.
    - Normalizes to: A string.
    - Error message keys: `required`, `max_length`

    Has the following optional arguments for validation:

`max_length`

`min_length`
:   If provided, these arguments ensure that the string is at most or at least the given length.

`strip`
:   If `True` (default), the value will be stripped of leading and trailing whitespace.
