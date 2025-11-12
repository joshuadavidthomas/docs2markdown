<span id="charfield"></span>

# CharField

<dl>
<dt id="django.forms.CharField"><code>class CharField(**kwargs)</code><a href="https://example.com/source">[source]</a></dt>
<dd>
- Default widget: <code>TextInput</code>
- Empty value: Whatever you've given as <code>empty_value</code>.
- Normalizes to: A string.
- Error message keys: <code>required</code>, <code>max_length</code>

Has the following optional arguments for validation:
</dd>
</dl>

<dl>
<dt id="django.forms.CharField.max_length"><code>max_length</code></dt>
<dd>

</dd>
</dl>

<dl>
<dt id="django.forms.CharField.min_length"><code>min_length</code></dt>
<dd>
If provided, these arguments ensure that the string is at most or at least the given length.
</dd>
</dl>

<dl>
<dt id="django.forms.CharField.strip"><code>strip</code></dt>
<dd>
If <code>True</code> (default), the value will be stripped of leading and trailing whitespace.
</dd>
</dl>
