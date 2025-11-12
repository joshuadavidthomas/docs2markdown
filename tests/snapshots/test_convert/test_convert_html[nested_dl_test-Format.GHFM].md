<span id="charfield"></span>

# CharField

<dl>
<dt id="django.forms.CharField"><code>class CharField(**kwargs)</code><a href="https://example.com/source">[source]</a></dt>
<dd>
<ul>
<li><p>Default widget: <code>TextInput</code></p></li>
<li><p>Empty value: Whatever you've given as <code>empty_value</code>.</p></li>
<li><p>Normalizes to: A string.</p></li>
<li><p>Error message keys: <code>required</code>, <code>max_length</code></p></li>
</ul>
</dd>
</dl>

Has the following optional arguments for validation:

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
