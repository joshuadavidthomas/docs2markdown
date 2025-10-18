Total chunks: 44

## Chunk 0
ID: d1040f30084b9566
Headings: GIS QuerySet API Reference
Level: 1
Order: 0
Tokens: 7
Code languages: python

### Content
```markdown
# GIS QuerySet API Reference
```

## Chunk 1
ID: feadb69cc1d2dfda
Headings: GIS QuerySet API Reference > Spatial Lookups
Level: 2
Order: 1
Tokens: 123
Code languages: python
Links: 4

### Content
```markdown
## Spatial Lookups

The spatial lookups in this section are available for [`GeometryField`](model-api.md#django.contrib.gis.db.models.GeometryField)
and [`RasterField`](model-api.md#django.contrib.gis.db.models.RasterField).

For an introduction, see the [spatial lookups introduction](db-api.md#spatial-lookups-intro). For an overview of what lookups are
compatible with a particular spatial backend, refer to the
[spatial lookup compatibility table](db-api.md#spatial-lookup-compatibility).
```

## Chunk 2
ID: d118dde03ba9aa2c
Headings: GIS QuerySet API Reference > Spatial Lookups > Lookups with rasters
Level: 3
Order: 2
Tokens: 518
Links: 2

### Content
```markdown
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

| Case | Lookup | SQL Equivalent |
| --- | --- | --- |
| N, B | `rast__contains=rst` | `ST_Contains(rast, rst)` |
| N, B | `rast__1__contains=(rst, 2)` | `ST_Contains(rast, 1, rst, 2)` |
| B, C | `rast__contains=geom` | `ST_Contains(ST_Polygon(rast), geom)` |
| B, C | `rast__1__contains=geom` | `ST_Contains(ST_Polygon(rast, 1), geom)` |
| B, C | `poly__contains=rst` | `ST_Contains(poly, ST_Polygon(rst))` |
| B, C | `poly__contains=(rst, 1)` | `ST_Contains(poly, ST_Polygon(rst, 1))` |
| C | `rast__crosses=rst` | `ST_Crosses(ST_Polygon(rast), ST_Polygon(rst))` |
| C | `rast__1__crosses=(rst, 2)` | `ST_Crosses(ST_Polygon(rast, 1), ST_Polygon(rst, 2))` |
| C | `rast__crosses=geom` | `ST_Crosses(ST_Polygon(rast), geom)` |
| C | `poly__crosses=rst` | `ST_Crosses(poly, ST_Polygon(rst))` |

Spatial lookups with rasters are only supported for PostGIS backends
(denominated as PGRaster in this section).
```

## Chunk 3
ID: 04be0d270fccc630
Headings: GIS QuerySet API Reference > Spatial Lookups > `bbcontains`
Level: 3
Order: 3
Tokens: 128
Code languages: python
Links: 1

### Content
```markdown
### `bbcontains`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Contain.md),
MariaDB, MySQL, SpatiaLite, PGRaster (Native)

Tests if the geometry or raster field’s bounding box completely contains the
lookup geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__bbcontains=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `poly ~ geom` |
| MariaDB | `MBRContains(poly, geom)` |
| MySQL | `MBRContains(poly, geom)` |
| SpatiaLite | `MbrContains(poly, geom)` |
```

## Chunk 4
ID: 65932438a4c32fa1
Headings: GIS QuerySet API Reference > Spatial Lookups > `bboverlaps`
Level: 3
Order: 4
Tokens: 122
Code languages: python
Links: 1

### Content
```markdown
### `bboverlaps`

*Availability*: [PostGIS](https://postgis.net/docs/geometry_overlaps.md),
MariaDB, MySQL, SpatiaLite, PGRaster (Native)

Tests if the geometry field’s bounding box overlaps the lookup geometry’s
bounding box.

Example:

```python
Zipcode.objects.filter(poly__bboverlaps=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `poly && geom` |
| MariaDB | `MBROverlaps(poly, geom)` |
| MySQL | `MBROverlaps(poly, geom)` |
| SpatiaLite | `MbrOverlaps(poly, geom)` |
```

## Chunk 5
ID: 999d9cfe3178da94
Headings: GIS QuerySet API Reference > Spatial Lookups > `contained`
Level: 3
Order: 5
Tokens: 126
Code languages: python
Links: 1

### Content
```markdown
### `contained`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Contained.md),
MariaDB, MySQL, SpatiaLite, PGRaster (Native)

Tests if the geometry field’s bounding box is completely contained by the
lookup geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__contained=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `poly @ geom` |
| MariaDB | `MBRWithin(poly, geom)` |
| MySQL | `MBRWithin(poly, geom)` |
| SpatiaLite | `MbrWithin(poly, geom)` |
```

## Chunk 6
ID: 5f289d693ff525dc
Headings: GIS QuerySet API Reference > Spatial Lookups > `contains`
Level: 3
Order: 6
Tokens: 130
Code languages: python
Links: 1

### Content
```markdown
### `contains`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Contains.md),
Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field spatially contains the lookup geometry.

Example:

```python
Zipcode.objects.filter(poly__contains=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Contains(poly, geom)` |
| Oracle | `SDO_CONTAINS(poly, geom)` |
| MariaDB | `ST_Contains(poly, geom)` |
| MySQL | `ST_Contains(poly, geom)` |
| SpatiaLite | `Contains(poly, geom)` |
```

## Chunk 7
ID: 4731d0212a707f63
Headings: GIS QuerySet API Reference > Spatial Lookups > `contains_properly`
Level: 3
Order: 7
Tokens: 102
Code languages: python
Links: 1

### Content
```markdown
### `contains_properly`

*Availability*: [PostGIS](https://postgis.net/docs/ST_ContainsProperly.md),
PGRaster (Bilateral)

Returns true if the lookup geometry intersects the interior of the
geometry field, but not the boundary (or exterior).

Example:

```python
Zipcode.objects.filter(poly__contains_properly=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_ContainsProperly(poly, geom)` |
```

## Chunk 8
ID: e2478b483bf7fb3e
Headings: GIS QuerySet API Reference > Spatial Lookups > `coveredby`
Level: 3
Order: 8
Tokens: 139
Code languages: python
Links: 1

### Content
```markdown
### `coveredby`

*Availability*: [PostGIS](https://postgis.net/docs/ST_CoveredBy.md),
Oracle, MySQL, PGRaster (Bilateral), SpatiaLite

Tests if no point in the geometry field is outside the lookup geometry.
[[3]](#fncovers)

Example:

```python
Zipcode.objects.filter(poly__coveredby=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_CoveredBy(poly, geom)` |
| Oracle | `SDO_COVEREDBY(poly, geom)` |
| MySQL | `MBRCoveredBy(poly, geom)` |
| SpatiaLite | `CoveredBy(poly, geom)` |

> **Changed in Django 5.2:**
>
> MySQL support was added.
```

## Chunk 9
ID: fafedcfd25be7a4b
Headings: GIS QuerySet API Reference > Spatial Lookups > `covers`
Level: 3
Order: 9
Tokens: 134
Code languages: python
Links: 1

### Content
```markdown
### `covers`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Covers.md),
Oracle, MySQL, PGRaster (Bilateral), SpatiaLite

Tests if no point in the lookup geometry is outside the geometry field.
[[3]](#fncovers)

Example:

```python
Zipcode.objects.filter(poly__covers=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Covers(poly, geom)` |
| Oracle | `SDO_COVERS(poly, geom)` |
| MySQL | `MBRCovers(poly, geom)` |
| SpatiaLite | `Covers(poly, geom)` |

> **Changed in Django 5.2:**
>
> MySQL support was added.
```

## Chunk 10
ID: 55301361a90769d8
Headings: GIS QuerySet API Reference > Spatial Lookups > `crosses`
Level: 3
Order: 10
Tokens: 116
Code languages: python
Links: 1

### Content
```markdown
### `crosses`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Crosses.md),
MariaDB, MySQL, SpatiaLite, PGRaster (Conversion)

Tests if the geometry field spatially crosses the lookup geometry.

Example:

```python
Zipcode.objects.filter(poly__crosses=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Crosses(poly, geom)` |
| MariaDB | `ST_Crosses(poly, geom)` |
| MySQL | `ST_Crosses(poly, geom)` |
| SpatiaLite | `Crosses(poly, geom)` |
```

## Chunk 11
ID: 9c8bfa3829ab5ddc
Headings: GIS QuerySet API Reference > Spatial Lookups > `disjoint`
Level: 3
Order: 11
Tokens: 137
Code languages: python
Links: 1

### Content
```markdown
### `disjoint`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Disjoint.md),
Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field is spatially disjoint from the lookup geometry.

Example:

```python
Zipcode.objects.filter(poly__disjoint=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Disjoint(poly, geom)` |
| Oracle | `SDO_GEOM.RELATE(poly, 'DISJOINT', geom, 0.05)` |
| MariaDB | `ST_Disjoint(poly, geom)` |
| MySQL | `ST_Disjoint(poly, geom)` |
| SpatiaLite | `Disjoint(poly, geom)` |
```

## Chunk 12
ID: 2044f139a1cfb9ba
Headings: GIS QuerySet API Reference > Spatial Lookups > `equals`
Level: 3
Order: 12
Tokens: 126
Code languages: python
Links: 1

### Content
```markdown
### `equals`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Equals.md),
Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Conversion)

Tests if the geometry field is spatially equal to the lookup geometry.

Example:

```python
Zipcode.objects.filter(poly__equals=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Equals(poly, geom)` |
| Oracle | `SDO_EQUAL(poly, geom)` |
| MariaDB | `ST_Equals(poly, geom)` |
| MySQL | `ST_Equals(poly, geom)` |
| SpatiaLite | `Equals(poly, geom)` |
```

## Chunk 13
ID: b36ad27f844a7e40
Headings: GIS QuerySet API Reference > Spatial Lookups > `exact`, `same_as`
Level: 3
Order: 13
Tokens: 153
Code languages: python
Links: 1

### Content
```markdown
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

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `poly ~= geom` |
| Oracle | `SDO_EQUAL(poly, geom)` |
| MariaDB | `ST_Equals(poly, geom)` |
| MySQL | `ST_Equals(poly, geom)` |
| SpatiaLite | `Equals(poly, geom)` |
```

## Chunk 14
ID: 23cba4a22fcd2dff
Headings: GIS QuerySet API Reference > Spatial Lookups > `intersects`
Level: 3
Order: 14
Tokens: 136
Code languages: python
Links: 1

### Content
```markdown
### `intersects`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Intersects.md),
Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field spatially intersects the lookup geometry.

Example:

```python
Zipcode.objects.filter(poly__intersects=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Intersects(poly, geom)` |
| Oracle | `SDO_OVERLAPBDYINTERSECT(poly, geom)` |
| MariaDB | `ST_Intersects(poly, geom)` |
| MySQL | `ST_Intersects(poly, geom)` |
| SpatiaLite | `Intersects(poly, geom)` |
```

## Chunk 15
ID: ae2efe3349bd752d
Headings: GIS QuerySet API Reference > Spatial Lookups > `isempty`
Level: 3
Order: 15
Tokens: 45
Code languages: python
Links: 1

### Content
```markdown
### `isempty`

*Availability*: [PostGIS](https://postgis.net/docs/ST_IsEmpty.md)

Tests if the geometry is empty.

Example:

```python
Zipcode.objects.filter(poly__isempty=True)
```
```

## Chunk 16
ID: 8b811d453bbfea34
Headings: GIS QuerySet API Reference > Spatial Lookups > `isvalid`
Level: 3
Order: 16
Tokens: 95
Code languages: python
Links: 1

### Content
```markdown
### `isvalid`

*Availability*: MySQL, [PostGIS](https://postgis.net/docs/ST_IsValid.md),
Oracle, SpatiaLite

Tests if the geometry is valid.

Example:

```python
Zipcode.objects.filter(poly__isvalid=True)
```

| Backend | SQL Equivalent |
| --- | --- |
| MySQL, PostGIS, SpatiaLite | `ST_IsValid(poly)` |
| Oracle | `SDO_GEOM.VALIDATE_GEOMETRY_WITH_CONTEXT(poly, 0.05) = 'TRUE'` |
```

## Chunk 17
ID: 29a7bfa22cc11608
Headings: GIS QuerySet API Reference > Spatial Lookups > `overlaps`
Level: 3
Order: 17
Tokens: 112
Links: 1

### Content
```markdown
### `overlaps`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Overlaps.md),
Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field spatially overlaps the lookup geometry.

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Overlaps(poly, geom)` |
| Oracle | `SDO_OVERLAPS(poly, geom)` |
| MariaDB | `ST_Overlaps(poly, geom)` |
| MySQL | `ST_Overlaps(poly, geom)` |
| SpatiaLite | `Overlaps(poly, geom)` |
```

## Chunk 18
ID: bbcecb000fa4a732
Headings: GIS QuerySet API Reference > Spatial Lookups > `relate`
Level: 3
Order: 18
Tokens: 217
Links: 1

### Content
```markdown
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
```

## Chunk 19
ID: 7f9271c2c574c22d
Headings: A tuple lookup parameter is used to specify the geometry and
Level: 1
Order: 19
Tokens: 15

### Content
```markdown
# A tuple lookup parameter is used to specify the geometry and
```

## Chunk 20
ID: f2e8ae680441c644
Headings: the intersection pattern (the pattern here is for 'contains').
Level: 1
Order: 20
Tokens: 164
Code languages: python, sql, text

### Content
```markdown
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
```

## Chunk 21
ID: e31291cf56aea953
Headings: the intersection pattern (the pattern here is for 'contains'). > Oracle
Level: 4
Order: 21
Tokens: 142
Code languages: python, sql

### Content
```markdown
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
```

## Chunk 22
ID: 2b8e85096098385f
Headings: the intersection pattern (the pattern here is for 'contains'). > `touches`
Level: 3
Order: 22
Tokens: 121
Code languages: python
Links: 1

### Content
```markdown
### `touches`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Touches.md),
Oracle, MariaDB, MySQL, SpatiaLite

Tests if the geometry field spatially touches the lookup geometry.

Example:

```python
Zipcode.objects.filter(poly__touches=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Touches(poly, geom)` |
| MariaDB | `ST_Touches(poly, geom)` |
| MySQL | `ST_Touches(poly, geom)` |
| Oracle | `SDO_TOUCH(poly, geom)` |
| SpatiaLite | `Touches(poly, geom)` |
```

## Chunk 23
ID: 15b99722269bb211
Headings: the intersection pattern (the pattern here is for 'contains'). > `within`
Level: 3
Order: 23
Tokens: 126
Code languages: python
Links: 1

### Content
```markdown
### `within`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Within.md),
Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field is spatially within the lookup geometry.

Example:

```python
Zipcode.objects.filter(poly__within=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Within(poly, geom)` |
| MariaDB | `ST_Within(poly, geom)` |
| MySQL | `ST_Within(poly, geom)` |
| Oracle | `SDO_INSIDE(poly, geom)` |
| SpatiaLite | `Within(poly, geom)` |
```

## Chunk 24
ID: 30eeb2fbac3ccad6
Headings: the intersection pattern (the pattern here is for 'contains'). > `left`
Level: 3
Order: 24
Tokens: 85
Code languages: python, sql
Links: 1

### Content
```markdown
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
```

## Chunk 25
ID: af6ca6b157d034f0
Headings: the intersection pattern (the pattern here is for 'contains'). > `right`
Level: 3
Order: 25
Tokens: 86
Code languages: python, sql
Links: 1

### Content
```markdown
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
```

## Chunk 26
ID: 31a1a1300262cce0
Headings: the intersection pattern (the pattern here is for 'contains'). > `overlaps_left`
Level: 3
Order: 26
Tokens: 91
Code languages: python, sql
Links: 1

### Content
```markdown
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
```

## Chunk 27
ID: fa02acc4ad06f371
Headings: the intersection pattern (the pattern here is for 'contains'). > `overlaps_right`
Level: 3
Order: 27
Tokens: 92
Code languages: python, sql
Links: 1

### Content
```markdown
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
```

## Chunk 28
ID: 1bdecb08d118d363
Headings: the intersection pattern (the pattern here is for 'contains'). > `overlaps_above`
Level: 3
Order: 28
Tokens: 90
Code languages: python, sql
Links: 1

### Content
```markdown
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
```

## Chunk 29
ID: f44d6af52e38248a
Headings: the intersection pattern (the pattern here is for 'contains'). > `overlaps_below`
Level: 3
Order: 29
Tokens: 90
Code languages: python, sql
Links: 1

### Content
```markdown
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
```

## Chunk 30
ID: 5b461061174b4cf4
Headings: the intersection pattern (the pattern here is for 'contains'). > `strictly_above`
Level: 3
Order: 30
Tokens: 88
Code languages: python, sql
Links: 1

### Content
```markdown
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
```

## Chunk 31
ID: 18b70aab785085d0
Headings: the intersection pattern (the pattern here is for 'contains'). > `strictly_below`
Level: 3
Order: 31
Tokens: 88
Code languages: python, sql
Links: 1

### Content
```markdown
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
```

## Chunk 32
ID: 5ecdfe7b7f7f17e5
Headings: the intersection pattern (the pattern here is for 'contains'). > Distance Lookups
Level: 2
Order: 32
Tokens: 394
Code languages: python, text
Links: 7

### Content
```markdown
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
```

## Chunk 33
ID: 885ddd34610564aa
Headings: the intersection pattern (the pattern here is for 'contains'). > Distance Lookups > `distance_gt`
Level: 3
Order: 33
Tokens: 129
Code languages: python

### Content
```markdown
### `distance_gt`

Returns models where the distance to the geometry field from the lookup
geometry is greater than the given distance value.

Example:

```python
Zipcode.objects.filter(poly__distance_gt=(geom, D(m=5)))
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Distance/ST_Distance_Sphere(poly, geom) > 5` |
| MariaDB | `ST_Distance(poly, geom) > 5` |
| MySQL | `ST_Distance(poly, geom) > 5` |
| Oracle | `SDO_GEOM.SDO_DISTANCE(poly, geom, 0.05) > 5` |
| SpatiaLite | `Distance(poly, geom) > 5` |
```

## Chunk 34
ID: 2e34015335f707cb
Headings: the intersection pattern (the pattern here is for 'contains'). > Distance Lookups > `distance_gte`
Level: 3
Order: 34
Tokens: 134
Code languages: python

### Content
```markdown
### `distance_gte`

Returns models where the distance to the geometry field from the lookup
geometry is greater than or equal to the given distance value.

Example:

```python
Zipcode.objects.filter(poly__distance_gte=(geom, D(m=5)))
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Distance/ST_Distance_Sphere(poly, geom) >= 5` |
| MariaDB | `ST_Distance(poly, geom) >= 5` |
| MySQL | `ST_Distance(poly, geom) >= 5` |
| Oracle | `SDO_GEOM.SDO_DISTANCE(poly, geom, 0.05) >= 5` |
| SpatiaLite | `Distance(poly, geom) >= 5` |
```

## Chunk 35
ID: d75b39e5a7dac8ac
Headings: the intersection pattern (the pattern here is for 'contains'). > Distance Lookups > `distance_lt`
Level: 3
Order: 35
Tokens: 129
Code languages: python

### Content
```markdown
### `distance_lt`

Returns models where the distance to the geometry field from the lookup
geometry is less than the given distance value.

Example:

```python
Zipcode.objects.filter(poly__distance_lt=(geom, D(m=5)))
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Distance/ST_Distance_Sphere(poly, geom) < 5` |
| MariaDB | `ST_Distance(poly, geom) < 5` |
| MySQL | `ST_Distance(poly, geom) < 5` |
| Oracle | `SDO_GEOM.SDO_DISTANCE(poly, geom, 0.05) < 5` |
| SpatiaLite | `Distance(poly, geom) < 5` |
```

## Chunk 36
ID: 5827f31498c7daee
Headings: the intersection pattern (the pattern here is for 'contains'). > Distance Lookups > `distance_lte`
Level: 3
Order: 36
Tokens: 133
Code languages: python

### Content
```markdown
### `distance_lte`

Returns models where the distance to the geometry field from the lookup
geometry is less than or equal to the given distance value.

Example:

```python
Zipcode.objects.filter(poly__distance_lte=(geom, D(m=5)))
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Distance/ST_Distance_Sphere(poly, geom) <= 5` |
| MariaDB | `ST_Distance(poly, geom) <= 5` |
| MySQL | `ST_Distance(poly, geom) <= 5` |
| Oracle | `SDO_GEOM.SDO_DISTANCE(poly, geom, 0.05) <= 5` |
| SpatiaLite | `Distance(poly, geom) <= 5` |
```

## Chunk 37
ID: 398de6ee23a7a4a8
Headings: the intersection pattern (the pattern here is for 'contains'). > Distance Lookups > `dwithin`
Level: 3
Order: 37
Tokens: 164
Code languages: python
Links: 1

### Content
```markdown
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

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_DWithin(poly, geom, 5)` |
| Oracle | `SDO_WITHIN_DISTANCE(poly, geom, 5)` |
| SpatiaLite | `PtDistWithin(poly, geom, 5)` |
```

## Chunk 38
ID: 8e253d37390bf4b9
Headings: the intersection pattern (the pattern here is for 'contains'). > Distance Lookups > Aggregate Functions
Level: 3
Order: 38
Tokens: 175
Code languages: python
Links: 2

### Content
```markdown
### Aggregate Functions

Django provides some GIS-specific aggregate functions. For details on how to
use these aggregate functions, see [the topic guide on aggregation](../../../topics/db/aggregation.md).

| Keyword Argument | Description |
| --- | --- |
| `tolerance` | This keyword is for Oracle only. It is for the tolerance value used by the `SDOAGGRTYPE` procedure; the [Oracle documentation](https://docs.oracle.com/en/database/oracle/oracle-database/21/spatl/spatial-concepts.md#GUID-CE10AB14-D5EA-43BA-A647-DAC9EEF41EE6) has more details. |

Example:

```python
>>> from django.contrib.gis.db.models import Extent, Union
>>> WorldBorder.objects.aggregate(Extent("mpoly"), Union("mpoly"))
```
```

## Chunk 39
ID: c8d08957f37cc54d
Headings: the intersection pattern (the pattern here is for 'contains'). > Distance Lookups > Aggregate Functions > `Collect`
Level: 4
Order: 39
Tokens: 172
Links: 2

### Content
```markdown
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
```

## Chunk 40
ID: a25c745e29a28c7b
Headings: the intersection pattern (the pattern here is for 'contains'). > Distance Lookups > Aggregate Functions > `Extent`
Level: 4
Order: 40
Tokens: 150
Code languages: python
Links: 1

### Content
```markdown
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
```

## Chunk 41
ID: 543bd67038185a3b
Headings: the intersection pattern (the pattern here is for 'contains'). > Distance Lookups > Aggregate Functions > `Extent3D`
Level: 4
Order: 41
Tokens: 158
Code languages: python
Links: 1

### Content
```markdown
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
```

## Chunk 42
ID: 3321e85b92dc23bd
Headings: the intersection pattern (the pattern here is for 'contains'). > Distance Lookups > Aggregate Functions > `MakeLine`
Level: 4
Order: 42
Tokens: 155
Code languages: python
Links: 1

### Content
```markdown
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
```

## Chunk 43
ID: a8653776389c9fc6
Headings: the intersection pattern (the pattern here is for 'contains'). > Distance Lookups > Aggregate Functions > `Union`
Level: 4
Order: 43
Tokens: 224
Code languages: python
Links: 3

### Content
```markdown
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
```
