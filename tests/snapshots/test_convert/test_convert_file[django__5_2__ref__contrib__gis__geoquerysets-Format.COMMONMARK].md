# GIS QuerySet API Reference

## Spatial Lookups

The spatial lookups in this section are available for [`GeometryField`](model-api.md#django.contrib.gis.db.models.GeometryField)
and [`RasterField`](model-api.md#django.contrib.gis.db.models.RasterField).

For an introduction, see the [spatial lookups introduction](db-api.md#spatial-lookups-intro). For an overview of what lookups are
compatible with a particular spatial backend, refer to the
[spatial lookup compatibility table](db-api.md#spatial-lookup-compatibility).

### Lookups with rasters

All examples in the reference below are given for geometry fields and inputs,
but the lookups can be used the same way with rasters on both sides. Whenever
a lookup doesn’t support raster input, the input is automatically
converted to a geometry where necessary using the [ST\_Polygon](https://postgis.net/docs/RT_ST_Polygon.md) function. See also the
[introduction to raster lookups](db-api.md#spatial-lookup-raster).

The database operators used by the lookups can be divided into three categories:

- Native raster support `N`: the operator accepts rasters natively on both
  sides of the lookup, and raster input can be mixed with geometry inputs.
- Bilateral raster support `B`: the operator supports rasters only if both
  sides of the lookup receive raster inputs. Raster data is automatically
  converted to geometries for mixed lookups.
- Geometry conversion support `C`. The lookup does not have native raster
  support, all raster data is automatically converted to geometries.

The examples below show the SQL equivalent for the lookups in the different
types of raster support. The same pattern applies to all spatial lookups.

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Case</p></th>
<th class="head"><p>Lookup</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>N, B</p></td>
<td><p><code>rast__contains=rst</code></p></td>
<td><p><code>ST_Contains(rast, rst)</code></p></td>
</tr>
<tr class="row-odd"><td><p>N, B</p></td>
<td><p><code>rast__1__contains=(rst, 2)</code></p></td>
<td><p><code>ST_Contains(rast, 1, rst, 2)</code></p></td>
</tr>
<tr class="row-even"><td><p>B, C</p></td>
<td><p><code>rast__contains=geom</code></p></td>
<td><p><code>ST_Contains(ST_Polygon(rast), geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>B, C</p></td>
<td><p><code>rast__1__contains=geom</code></p></td>
<td><p><code>ST_Contains(ST_Polygon(rast, 1), geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>B, C</p></td>
<td><p><code>poly__contains=rst</code></p></td>
<td><p><code>ST_Contains(poly, ST_Polygon(rst))</code></p></td>
</tr>
<tr class="row-odd"><td><p>B, C</p></td>
<td><p><code>poly__contains=(rst, 1)</code></p></td>
<td><p><code>ST_Contains(poly, ST_Polygon(rst, 1))</code></p></td>
</tr>
<tr class="row-even"><td><p>C</p></td>
<td><p><code>rast__crosses=rst</code></p></td>
<td><p><code>ST_Crosses(ST_Polygon(rast), ST_Polygon(rst))</code></p></td>
</tr>
<tr class="row-odd"><td><p>C</p></td>
<td><p><code>rast__1__crosses=(rst, 2)</code></p></td>
<td><p><code>ST_Crosses(ST_Polygon(rast, 1), ST_Polygon(rst, 2))</code></p></td>
</tr>
<tr class="row-even"><td><p>C</p></td>
<td><p><code>rast__crosses=geom</code></p></td>
<td><p><code>ST_Crosses(ST_Polygon(rast), geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>C</p></td>
<td><p><code>poly__crosses=rst</code></p></td>
<td><p><code>ST_Crosses(poly, ST_Polygon(rst))</code></p></td>
</tr>
</tbody>
</table>

Spatial lookups with rasters are only supported for PostGIS backends
(denominated as PGRaster in this section).

### `bbcontains`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Contain.md),
MariaDB, MySQL, SpatiaLite, PGRaster (Native)

Tests if the geometry or raster field’s bounding box completely contains the
lookup geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__bbcontains=geom)
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>poly ~ geom</code></p></td>
</tr>
<tr class="row-odd"><td><p>MariaDB</p></td>
<td><p><code>MBRContains(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>MySQL</p></td>
<td><p><code>MBRContains(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>SpatiaLite</p></td>
<td><p><code>MbrContains(poly, geom)</code></p></td>
</tr>
</tbody>
</table>

### `bboverlaps`

*Availability*: [PostGIS](https://postgis.net/docs/geometry_overlaps.md),
MariaDB, MySQL, SpatiaLite, PGRaster (Native)

Tests if the geometry field’s bounding box overlaps the lookup geometry’s
bounding box.

Example:

```python
Zipcode.objects.filter(poly__bboverlaps=geom)
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>poly &amp;&amp; geom</code></p></td>
</tr>
<tr class="row-odd"><td><p>MariaDB</p></td>
<td><p><code>MBROverlaps(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>MySQL</p></td>
<td><p><code>MBROverlaps(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>SpatiaLite</p></td>
<td><p><code>MbrOverlaps(poly, geom)</code></p></td>
</tr>
</tbody>
</table>

### `contained`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Contained.md),
MariaDB, MySQL, SpatiaLite, PGRaster (Native)

Tests if the geometry field’s bounding box is completely contained by the
lookup geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__contained=geom)
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>poly @ geom</code></p></td>
</tr>
<tr class="row-odd"><td><p>MariaDB</p></td>
<td><p><code>MBRWithin(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>MySQL</p></td>
<td><p><code>MBRWithin(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>SpatiaLite</p></td>
<td><p><code>MbrWithin(poly, geom)</code></p></td>
</tr>
</tbody>
</table>

### `contains`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Contains.md),
Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field spatially contains the lookup geometry.

Example:

```python
Zipcode.objects.filter(poly__contains=geom)
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>ST_Contains(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>Oracle</p></td>
<td><p><code>SDO_CONTAINS(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>MariaDB</p></td>
<td><p><code>ST_Contains(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>MySQL</p></td>
<td><p><code>ST_Contains(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>SpatiaLite</p></td>
<td><p><code>Contains(poly, geom)</code></p></td>
</tr>
</tbody>
</table>

### `contains_properly`

*Availability*: [PostGIS](https://postgis.net/docs/ST_ContainsProperly.md),
PGRaster (Bilateral)

Returns true if the lookup geometry intersects the interior of the
geometry field, but not the boundary (or exterior).

Example:

```python
Zipcode.objects.filter(poly__contains_properly=geom)
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>ST_ContainsProperly(poly, geom)</code></p></td>
</tr>
</tbody>
</table>

### `coveredby`

*Availability*: [PostGIS](https://postgis.net/docs/ST_CoveredBy.md),
Oracle, MySQL, PGRaster (Bilateral), SpatiaLite

Tests if no point in the geometry field is outside the lookup geometry.
[[3]](#fncovers)

Example:

```python
Zipcode.objects.filter(poly__coveredby=geom)
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>ST_CoveredBy(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>Oracle</p></td>
<td><p><code>SDO_COVEREDBY(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>MySQL</p></td>
<td><p><code>MBRCoveredBy(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>SpatiaLite</p></td>
<td><p><code>CoveredBy(poly, geom)</code></p></td>
</tr>
</tbody>
</table>

> **Changed in Django 5.2:**
>
> MySQL support was added.

### `covers`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Covers.md),
Oracle, MySQL, PGRaster (Bilateral), SpatiaLite

Tests if no point in the lookup geometry is outside the geometry field.
[[3]](#fncovers)

Example:

```python
Zipcode.objects.filter(poly__covers=geom)
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>ST_Covers(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>Oracle</p></td>
<td><p><code>SDO_COVERS(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>MySQL</p></td>
<td><p><code>MBRCovers(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>SpatiaLite</p></td>
<td><p><code>Covers(poly, geom)</code></p></td>
</tr>
</tbody>
</table>

> **Changed in Django 5.2:**
>
> MySQL support was added.

### `crosses`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Crosses.md),
MariaDB, MySQL, SpatiaLite, PGRaster (Conversion)

Tests if the geometry field spatially crosses the lookup geometry.

Example:

```python
Zipcode.objects.filter(poly__crosses=geom)
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>ST_Crosses(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>MariaDB</p></td>
<td><p><code>ST_Crosses(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>MySQL</p></td>
<td><p><code>ST_Crosses(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>SpatiaLite</p></td>
<td><p><code>Crosses(poly, geom)</code></p></td>
</tr>
</tbody>
</table>

### `disjoint`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Disjoint.md),
Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field is spatially disjoint from the lookup geometry.

Example:

```python
Zipcode.objects.filter(poly__disjoint=geom)
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>ST_Disjoint(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>Oracle</p></td>
<td><p><code>SDO_GEOM.RELATE(poly, 'DISJOINT', geom, 0.05)</code></p></td>
</tr>
<tr class="row-even"><td><p>MariaDB</p></td>
<td><p><code>ST_Disjoint(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>MySQL</p></td>
<td><p><code>ST_Disjoint(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>SpatiaLite</p></td>
<td><p><code>Disjoint(poly, geom)</code></p></td>
</tr>
</tbody>
</table>

### `equals`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Equals.md),
Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Conversion)

Tests if the geometry field is spatially equal to the lookup geometry.

Example:

```python
Zipcode.objects.filter(poly__equals=geom)
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>ST_Equals(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>Oracle</p></td>
<td><p><code>SDO_EQUAL(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>MariaDB</p></td>
<td><p><code>ST_Equals(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>MySQL</p></td>
<td><p><code>ST_Equals(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>SpatiaLite</p></td>
<td><p><code>Equals(poly, geom)</code></p></td>
</tr>
</tbody>
</table>

### `exact`, `same_as`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Same.md),
Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field is “equal” to the lookup geometry. On Oracle,
MySQL, and SpatiaLite, it tests spatial equality, while on PostGIS it tests
equality of bounding boxes.

Example:

```python
Zipcode.objects.filter(poly=geom)
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>poly ~= geom</code></p></td>
</tr>
<tr class="row-odd"><td><p>Oracle</p></td>
<td><p><code>SDO_EQUAL(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>MariaDB</p></td>
<td><p><code>ST_Equals(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>MySQL</p></td>
<td><p><code>ST_Equals(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>SpatiaLite</p></td>
<td><p><code>Equals(poly, geom)</code></p></td>
</tr>
</tbody>
</table>

### `intersects`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Intersects.md),
Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field spatially intersects the lookup geometry.

Example:

```python
Zipcode.objects.filter(poly__intersects=geom)
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>ST_Intersects(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>Oracle</p></td>
<td><p><code>SDO_OVERLAPBDYINTERSECT(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>MariaDB</p></td>
<td><p><code>ST_Intersects(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>MySQL</p></td>
<td><p><code>ST_Intersects(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>SpatiaLite</p></td>
<td><p><code>Intersects(poly, geom)</code></p></td>
</tr>
</tbody>
</table>

### `isempty`

*Availability*: [PostGIS](https://postgis.net/docs/ST_IsEmpty.md)

Tests if the geometry is empty.

Example:

```python
Zipcode.objects.filter(poly__isempty=True)
```

### `isvalid`

*Availability*: MySQL, [PostGIS](https://postgis.net/docs/ST_IsValid.md),
Oracle, SpatiaLite

Tests if the geometry is valid.

Example:

```python
Zipcode.objects.filter(poly__isvalid=True)
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>MySQL, PostGIS, SpatiaLite</p></td>
<td><p><code>ST_IsValid(poly)</code></p></td>
</tr>
<tr class="row-odd"><td><p>Oracle</p></td>
<td><p><code>SDO_GEOM.VALIDATE_GEOMETRY_WITH_CONTEXT(poly, 0.05) = 'TRUE'</code></p></td>
</tr>
</tbody>
</table>

### `overlaps`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Overlaps.md),
Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field spatially overlaps the lookup geometry.

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>ST_Overlaps(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>Oracle</p></td>
<td><p><code>SDO_OVERLAPS(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>MariaDB</p></td>
<td><p><code>ST_Overlaps(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>MySQL</p></td>
<td><p><code>ST_Overlaps(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>SpatiaLite</p></td>
<td><p><code>Overlaps(poly, geom)</code></p></td>
</tr>
</tbody>
</table>

### `relate`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Relate.md),
MariaDB, Oracle, SpatiaLite, PGRaster (Conversion)

Tests if the geometry field is spatially related to the lookup geometry by
the values given in the given pattern. This lookup requires a tuple parameter,
`(geom, pattern)`; the form of `pattern` will depend on the spatial backend:

#### MariaDB, PostGIS, and SpatiaLite

On these spatial backends the intersection pattern is a string comprising
nine characters, which define intersections between the interior, boundary,
and exterior of the geometry field and the lookup geometry.
The intersection pattern matrix may only use the following characters:
`1`, `2`, `T`, `F`, or `*`. This lookup type allows users to “fine tune”
a specific geometric relationship consistent with the DE-9IM model. [[1]](#fnde9im)

Geometry example:

```python
# A tuple lookup parameter is used to specify the geometry and
# the intersection pattern (the pattern here is for 'contains').
Zipcode.objects.filter(poly__relate=(geom, "T*T***FF*"))
```

PostGIS and MariaDB SQL equivalent:

```sql
SELECT ... WHERE ST_Relate(poly, geom, 'T*T***FF*')
```

SpatiaLite SQL equivalent:

```sql
SELECT ... WHERE Relate(poly, geom, 'T*T***FF*')
```

Raster example:

```python
Zipcode.objects.filter(poly__relate=(rast, 1, "T*T***FF*"))
Zipcode.objects.filter(rast__2__relate=(rast, 1, "T*T***FF*"))
```

PostGIS SQL equivalent:

```sql
SELECT ... WHERE ST_Relate(poly, ST_Polygon(rast, 1), 'T*T***FF*')
SELECT ... WHERE ST_Relate(ST_Polygon(rast, 2), ST_Polygon(rast, 1), 'T*T***FF*')
```

#### Oracle

Here the relation pattern is comprised of at least one of the nine relation
strings: `TOUCH`, `OVERLAPBDYDISJOINT`, `OVERLAPBDYINTERSECT`,
`EQUAL`, `INSIDE`, `COVEREDBY`, `CONTAINS`, `COVERS`, `ON`, and
`ANYINTERACT`. Multiple strings may be combined with the logical Boolean
operator OR, for example, `'inside+touch'`. [[2]](#fnsdorelate) The relation
strings are case-insensitive.

Example:

```python
Zipcode.objects.filter(poly__relate=(geom, "anyinteract"))
```

Oracle SQL equivalent:

```sql
SELECT ... WHERE SDO_RELATE(poly, geom, 'anyinteract')
```

### `touches`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Touches.md),
Oracle, MariaDB, MySQL, SpatiaLite

Tests if the geometry field spatially touches the lookup geometry.

Example:

```python
Zipcode.objects.filter(poly__touches=geom)
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>ST_Touches(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>MariaDB</p></td>
<td><p><code>ST_Touches(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>MySQL</p></td>
<td><p><code>ST_Touches(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>Oracle</p></td>
<td><p><code>SDO_TOUCH(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>SpatiaLite</p></td>
<td><p><code>Touches(poly, geom)</code></p></td>
</tr>
</tbody>
</table>

### `within`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Within.md),
Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field is spatially within the lookup geometry.

Example:

```python
Zipcode.objects.filter(poly__within=geom)
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>ST_Within(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>MariaDB</p></td>
<td><p><code>ST_Within(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>MySQL</p></td>
<td><p><code>ST_Within(poly, geom)</code></p></td>
</tr>
<tr class="row-odd"><td><p>Oracle</p></td>
<td><p><code>SDO_INSIDE(poly, geom)</code></p></td>
</tr>
<tr class="row-even"><td><p>SpatiaLite</p></td>
<td><p><code>Within(poly, geom)</code></p></td>
</tr>
</tbody>
</table>

### `left`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Left.md),
PGRaster (Conversion)

Tests if the geometry field’s bounding box is strictly to the left of the
lookup geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__left=geom)
```

PostGIS equivalent:

```sql
SELECT ... WHERE poly << geom
```

### `right`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Right.md),
PGRaster (Conversion)

Tests if the geometry field’s bounding box is strictly to the right of the
lookup geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__right=geom)
```

PostGIS equivalent:

```sql
SELECT ... WHERE poly >> geom
```

### `overlaps_left`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Overleft.md),
PGRaster (Bilateral)

Tests if the geometry field’s bounding box overlaps or is to the left of the lookup
geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__overlaps_left=geom)
```

PostGIS equivalent:

```sql
SELECT ... WHERE poly &< geom
```

### `overlaps_right`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Overright.md),
PGRaster (Bilateral)

Tests if the geometry field’s bounding box overlaps or is to the right of the lookup
geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__overlaps_right=geom)
```

PostGIS equivalent:

```sql
SELECT ... WHERE poly &> geom
```

### `overlaps_above`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Overabove.md),
PGRaster (Conversion)

Tests if the geometry field’s bounding box overlaps or is above the lookup
geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__overlaps_above=geom)
```

PostGIS equivalent:

```sql
SELECT ... WHERE poly |&> geom
```

### `overlaps_below`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Overbelow.md),
PGRaster (Conversion)

Tests if the geometry field’s bounding box overlaps or is below the lookup
geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__overlaps_below=geom)
```

PostGIS equivalent:

```sql
SELECT ... WHERE poly &<| geom
```

### `strictly_above`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Above.md),
PGRaster (Conversion)

Tests if the geometry field’s bounding box is strictly above the lookup
geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__strictly_above=geom)
```

PostGIS equivalent:

```sql
SELECT ... WHERE poly |>> geom
```

### `strictly_below`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Below.md),
PGRaster (Conversion)

Tests if the geometry field’s bounding box is strictly below the lookup
geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__strictly_below=geom)
```

PostGIS equivalent:

```sql
SELECT ... WHERE poly <<| geom
```

## Distance Lookups

*Availability*: PostGIS, Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Native)

For an overview on performing distance queries, please refer to
the [distance queries introduction](db-api.md#distance-queries).

Distance lookups take the following form:

```text
<field>__<distance lookup>=(<geometry/raster>, <distance value>[, "spheroid"])
<field>__<distance lookup>=(<raster>, <band_index>, <distance value>[, "spheroid"])
<field>__<band_index>__<distance lookup>=(<raster>, <band_index>, <distance value>[, "spheroid"])
```

The value passed into a distance lookup is a tuple; the first two
values are mandatory, and are the geometry to calculate distances to,
and a distance value (either a number in units of the field, a
[`Distance`](measure.md#django.contrib.gis.measure.Distance) object, or a [query
expression](../../models/expressions.md)). To pass a band index to the lookup, use
a 3-tuple where the second entry is the band index.

On every distance lookup except [`dwithin`](#std-fieldlookup-dwithin), an optional element,
`'spheroid'`, may be included to use the more accurate spheroid distance
calculation functions on fields with a geodetic coordinate system.

On PostgreSQL, the `'spheroid'` option uses [ST\_DistanceSpheroid](https://postgis.net/docs/ST_Distance_Spheroid.md) instead of
[ST\_DistanceSphere](https://postgis.net/docs/ST_DistanceSphere.md). The
simpler [ST\_Distance](https://postgis.net/docs/ST_Distance.md) function is
used with projected coordinate systems. Rasters are converted to geometries for
spheroid based lookups.

### `distance_gt`

Returns models where the distance to the geometry field from the lookup
geometry is greater than the given distance value.

Example:

```python
Zipcode.objects.filter(poly__distance_gt=(geom, D(m=5)))
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>ST_Distance/ST_Distance_Sphere(poly, geom) &gt; 5</code></p></td>
</tr>
<tr class="row-odd"><td><p>MariaDB</p></td>
<td><p><code>ST_Distance(poly, geom) &gt; 5</code></p></td>
</tr>
<tr class="row-even"><td><p>MySQL</p></td>
<td><p><code>ST_Distance(poly, geom) &gt; 5</code></p></td>
</tr>
<tr class="row-odd"><td><p>Oracle</p></td>
<td><p><code>SDO_GEOM.SDO_DISTANCE(poly, geom, 0.05) &gt; 5</code></p></td>
</tr>
<tr class="row-even"><td><p>SpatiaLite</p></td>
<td><p><code>Distance(poly, geom) &gt; 5</code></p></td>
</tr>
</tbody>
</table>

### `distance_gte`

Returns models where the distance to the geometry field from the lookup
geometry is greater than or equal to the given distance value.

Example:

```python
Zipcode.objects.filter(poly__distance_gte=(geom, D(m=5)))
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>ST_Distance/ST_Distance_Sphere(poly, geom) &gt;= 5</code></p></td>
</tr>
<tr class="row-odd"><td><p>MariaDB</p></td>
<td><p><code>ST_Distance(poly, geom) &gt;= 5</code></p></td>
</tr>
<tr class="row-even"><td><p>MySQL</p></td>
<td><p><code>ST_Distance(poly, geom) &gt;= 5</code></p></td>
</tr>
<tr class="row-odd"><td><p>Oracle</p></td>
<td><p><code>SDO_GEOM.SDO_DISTANCE(poly, geom, 0.05) &gt;= 5</code></p></td>
</tr>
<tr class="row-even"><td><p>SpatiaLite</p></td>
<td><p><code>Distance(poly, geom) &gt;= 5</code></p></td>
</tr>
</tbody>
</table>

### `distance_lt`

Returns models where the distance to the geometry field from the lookup
geometry is less than the given distance value.

Example:

```python
Zipcode.objects.filter(poly__distance_lt=(geom, D(m=5)))
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>ST_Distance/ST_Distance_Sphere(poly, geom) &lt; 5</code></p></td>
</tr>
<tr class="row-odd"><td><p>MariaDB</p></td>
<td><p><code>ST_Distance(poly, geom) &lt; 5</code></p></td>
</tr>
<tr class="row-even"><td><p>MySQL</p></td>
<td><p><code>ST_Distance(poly, geom) &lt; 5</code></p></td>
</tr>
<tr class="row-odd"><td><p>Oracle</p></td>
<td><p><code>SDO_GEOM.SDO_DISTANCE(poly, geom, 0.05) &lt; 5</code></p></td>
</tr>
<tr class="row-even"><td><p>SpatiaLite</p></td>
<td><p><code>Distance(poly, geom) &lt; 5</code></p></td>
</tr>
</tbody>
</table>

### `distance_lte`

Returns models where the distance to the geometry field from the lookup
geometry is less than or equal to the given distance value.

Example:

```python
Zipcode.objects.filter(poly__distance_lte=(geom, D(m=5)))
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>ST_Distance/ST_Distance_Sphere(poly, geom) &lt;= 5</code></p></td>
</tr>
<tr class="row-odd"><td><p>MariaDB</p></td>
<td><p><code>ST_Distance(poly, geom) &lt;= 5</code></p></td>
</tr>
<tr class="row-even"><td><p>MySQL</p></td>
<td><p><code>ST_Distance(poly, geom) &lt;= 5</code></p></td>
</tr>
<tr class="row-odd"><td><p>Oracle</p></td>
<td><p><code>SDO_GEOM.SDO_DISTANCE(poly, geom, 0.05) &lt;= 5</code></p></td>
</tr>
<tr class="row-even"><td><p>SpatiaLite</p></td>
<td><p><code>Distance(poly, geom) &lt;= 5</code></p></td>
</tr>
</tbody>
</table>

### `dwithin`

Returns models where the distance to the geometry field from the lookup
geometry are within the given distance from one another. Note that you can only
provide [`Distance`](measure.md#django.contrib.gis.measure.Distance) objects if the targeted
geometries are in a projected system. For geographic geometries, you should use
units of the geometry field (e.g. degrees for `WGS84`) .

Example:

```python
Zipcode.objects.filter(poly__dwithin=(geom, D(m=5)))
```

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Backend</p></th>
<th class="head"><p>SQL Equivalent</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p>PostGIS</p></td>
<td><p><code>ST_DWithin(poly, geom, 5)</code></p></td>
</tr>
<tr class="row-odd"><td><p>Oracle</p></td>
<td><p><code>SDO_WITHIN_DISTANCE(poly, geom, 5)</code></p></td>
</tr>
<tr class="row-even"><td><p>SpatiaLite</p></td>
<td><p><code>PtDistWithin(poly, geom, 5)</code></p></td>
</tr>
</tbody>
</table>

### Aggregate Functions

Django provides some GIS-specific aggregate functions. For details on how to
use these aggregate functions, see [the topic guide on aggregation](../../../topics/db/aggregation.md).

<table class="docutils">
<thead>
<tr class="row-odd"><th class="head"><p>Keyword Argument</p></th>
<th class="head"><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p><code>tolerance</code></p></td>
<td><p>This keyword is for Oracle only.  It is for the
tolerance value used by the <code>SDOAGGRTYPE</code>
procedure; the  <a class="reference external" href="https://docs.oracle.com/en/database/oracle/oracle-database/21/spatl/spatial-concepts.md#GUID-CE10AB14-D5EA-43BA-A647-DAC9EEF41EE6">Oracle documentation</a> has more
details.</p></td>
</tr>
</tbody>
</table>

Example:

```python
>>> from django.contrib.gis.db.models import Extent, Union
>>> WorldBorder.objects.aggregate(Extent("mpoly"), Union("mpoly"))
```

#### `Collect`

`classCollect(geo_field,filter=None)`[[source]](https://github.com/django/django/blob/stable/5.2.x/django/contrib/gis/db/models/aggregates.py#L61)

*Availability*: [PostGIS](https://postgis.net/docs/ST_Collect.md), MySQL,
SpatiaLite

Returns a `GEOMETRYCOLLECTION` or a `MULTI` geometry object from the geometry
column. This is analogous to a simplified version of the [`Union`](#django.contrib.gis.db.models.Union)
aggregate, except it can be several orders of magnitude faster than performing
a union because it rolls up geometries into a collection or multi object, not
caring about dissolving boundaries.

> **Changed in Django 5.1:**
>
> MySQL 8.0.24+ support was added.

#### `Extent`

`classExtent(geo_field,filter=None)`[[source]](https://github.com/django/django/blob/stable/5.2.x/django/contrib/gis/db/models/aggregates.py#L66)

*Availability*: [PostGIS](https://postgis.net/docs/ST_Extent.md),
Oracle, SpatiaLite

Returns the extent of all `geo_field` in the `QuerySet` as a 4-tuple,
comprising the lower left coordinate and the upper right coordinate.

Example:

```python
>>> qs = City.objects.filter(name__in=("Houston", "Dallas")).aggregate(Extent("poly"))
>>> print(qs["poly__extent"])
(-96.8016128540039, 29.7633724212646, -95.3631439208984, 32.782058715820)
```

#### `Extent3D`

`classExtent3D(geo_field,filter=None)`[[source]](https://github.com/django/django/blob/stable/5.2.x/django/contrib/gis/db/models/aggregates.py#L77)

*Availability*: [PostGIS](https://postgis.net/docs/ST_3DExtent.md)

Returns the 3D extent of all `geo_field` in the `QuerySet` as a 6-tuple,
comprising the lower left coordinate and upper right coordinate (each with x, y,
and z coordinates).

Example:

```python
>>> qs = City.objects.filter(name__in=("Houston", "Dallas")).aggregate(Extent3D("poly"))
>>> print(qs["poly__extent3d"])
(-96.8016128540039, 29.7633724212646, 0, -95.3631439208984, 32.782058715820, 0)
```

#### `MakeLine`

`classMakeLine(geo_field,filter=None)`[[source]](https://github.com/django/django/blob/stable/5.2.x/django/contrib/gis/db/models/aggregates.py#L88)

*Availability*: [PostGIS](https://postgis.net/docs/ST_MakeLine.md),
SpatiaLite

Returns a `LineString` constructed from the point field geometries in the
`QuerySet`. Currently, ordering the queryset has no effect.

Example:

```python
>>> qs = City.objects.filter(name__in=("Houston", "Dallas")).aggregate(MakeLine("poly"))
>>> print(qs["poly__makeline"])
LINESTRING (-95.3631510000000020 29.7633739999999989, -96.8016109999999941 32.7820570000000018)
```

#### `Union`

`classUnion(geo_field,filter=None)`[[source]](https://github.com/django/django/blob/stable/5.2.x/django/contrib/gis/db/models/aggregates.py#L93)

*Availability*: [PostGIS](https://postgis.net/docs/ST_Union.md),
Oracle, SpatiaLite

This method returns a [`GEOSGeometry`](geos.md#django.contrib.gis.geos.GEOSGeometry) object
comprising the union of every geometry in the queryset. Please note that use of
`Union` is processor intensive and may take a significant amount of time on
large querysets.

> **NOTE:**
>
> If the computation time for using this method is too expensive, consider
> using [`Collect`](#django.contrib.gis.db.models.Collect) instead.

Example:

```python
>>> u = Zipcode.objects.aggregate(Union(poly))  # This may take a long time.
>>> u = Zipcode.objects.filter(poly__within=bbox).aggregate(
...     Union(poly)
... )  # A more sensible approach.
```

Footnotes
