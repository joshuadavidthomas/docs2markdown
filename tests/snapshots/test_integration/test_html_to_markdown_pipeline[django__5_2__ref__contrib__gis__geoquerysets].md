<span id="s-gis-queryset-api-reference"></span>

# GIS QuerySet API Reference

<span id="s-spatial-lookups"></span>
<span id="s-id1"></span><span id="id1"></span>

## Spatial Lookups

The spatial lookups in this section are available for [`GeometryField`](model-api.md#django.contrib.gis.db.models.GeometryField) and [`RasterField`](model-api.md#django.contrib.gis.db.models.RasterField).

For an introduction, see the [spatial lookups introduction](db-api.md#spatial-lookups-intro). For an overview of what lookups are compatible with a particular spatial backend, refer to the [spatial lookup compatibility table](db-api.md#spatial-lookup-compatibility).

<span id="s-lookups-with-rasters"></span>

### Lookups with rasters

All examples in the reference below are given for geometry fields and inputs, but the lookups can be used the same way with rasters on both sides. Whenever a lookup doesn’t support raster input, the input is automatically converted to a geometry where necessary using the [ST\_Polygon](https://postgis.net/docs/RT_ST_Polygon.md) function. See also the [introduction to raster lookups](db-api.md#spatial-lookup-raster).

The database operators used by the lookups can be divided into three categories:

- Native raster support `N`: the operator accepts rasters natively on both sides of the lookup, and raster input can be mixed with geometry inputs.
- Bilateral raster support `B`: the operator supports rasters only if both sides of the lookup receive raster inputs. Raster data is automatically converted to geometries for mixed lookups.
- Geometry conversion support `C`. The lookup does not have native raster support, all raster data is automatically converted to geometries.

The examples below show the SQL equivalent for the lookups in the different types of raster support. The same pattern applies to all spatial lookups.

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

Spatial lookups with rasters are only supported for PostGIS backends (denominated as PGRaster in this section).

<span id="s-bbcontains"></span>
<span id="s-std-fieldlookup-bbcontains"></span><span id="std-fieldlookup-bbcontains"></span>

### `bbcontains`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Contain.md), MariaDB, MySQL, SpatiaLite, PGRaster (Native)

Tests if the geometry or raster field’s bounding box completely contains the lookup geometry’s bounding box.

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

<span id="s-bboverlaps"></span>
<span id="s-std-fieldlookup-bboverlaps"></span><span id="std-fieldlookup-bboverlaps"></span>

### `bboverlaps`

*Availability*: [PostGIS](https://postgis.net/docs/geometry_overlaps.md), MariaDB, MySQL, SpatiaLite, PGRaster (Native)

Tests if the geometry field’s bounding box overlaps the lookup geometry’s bounding box.

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

<span id="s-contained"></span>
<span id="s-std-fieldlookup-contained"></span><span id="std-fieldlookup-contained"></span>

### `contained`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Contained.md), MariaDB, MySQL, SpatiaLite, PGRaster (Native)

Tests if the geometry field’s bounding box is completely contained by the lookup geometry’s bounding box.

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

<span id="s-contains"></span>
<span id="s-std-fieldlookup-gis-contains"></span><span id="std-fieldlookup-gis-contains"></span>

### `contains`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Contains.md), Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

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

<span id="s-contains-properly"></span>
<span id="s-std-fieldlookup-contains_properly"></span><span id="contains-properly"></span><span id="std-fieldlookup-contains_properly"></span>

### `contains_properly`

*Availability*: [PostGIS](https://postgis.net/docs/ST_ContainsProperly.md), PGRaster (Bilateral)

Returns true if the lookup geometry intersects the interior of the geometry field, but not the boundary (or exterior).

Example:

```python
Zipcode.objects.filter(poly__contains_properly=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_ContainsProperly(poly, geom)` |

<span id="s-coveredby"></span>
<span id="s-std-fieldlookup-coveredby"></span><span id="std-fieldlookup-coveredby"></span>

### `coveredby`

*Availability*: [PostGIS](https://postgis.net/docs/ST_CoveredBy.md), Oracle, MySQL, PGRaster (Bilateral), SpatiaLite

Tests if no point in the geometry field is outside the lookup geometry. [[3]](#fncovers)

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

> [!NOTE]
>
> **Changed in Django 5.2:**
>
> MySQL support was added.

<span id="s-covers"></span>
<span id="s-std-fieldlookup-covers"></span><span id="std-fieldlookup-covers"></span>

### `covers`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Covers.md), Oracle, MySQL, PGRaster (Bilateral), SpatiaLite

Tests if no point in the lookup geometry is outside the geometry field. [[3]](#fncovers)

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

> [!NOTE]
>
> **Changed in Django 5.2:**
>
> MySQL support was added.

<span id="s-crosses"></span>
<span id="s-std-fieldlookup-crosses"></span><span id="std-fieldlookup-crosses"></span>

### `crosses`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Crosses.md), MariaDB, MySQL, SpatiaLite, PGRaster (Conversion)

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

<span id="s-disjoint"></span>
<span id="s-std-fieldlookup-disjoint"></span><span id="std-fieldlookup-disjoint"></span>

### `disjoint`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Disjoint.md), Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

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

<span id="s-equals"></span>
<span id="s-std-fieldlookup-equals"></span><span id="std-fieldlookup-equals"></span>

### `equals`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Equals.md), Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Conversion)

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

<span id="s-exact-same-as"></span>
<span id="s-std-fieldlookup-same_as"></span><span id="s-std-fieldlookup-exact-noindex"></span><span id="exact-same-as"></span><span id="std-fieldlookup-same_as"></span><span id="std-fieldlookup-exact-noindex"></span>

### `exact`, `same_as`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Same.md), Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field is “equal” to the lookup geometry. On Oracle, MySQL, and SpatiaLite, it tests spatial equality, while on PostGIS it tests equality of bounding boxes.

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

<span id="s-intersects"></span>
<span id="s-std-fieldlookup-intersects"></span><span id="std-fieldlookup-intersects"></span>

### `intersects`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Intersects.md), Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

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

<span id="s-isempty"></span>
<span id="s-std-fieldlookup-isempty"></span><span id="std-fieldlookup-isempty"></span>

### `isempty`

*Availability*: [PostGIS](https://postgis.net/docs/ST_IsEmpty.md)

Tests if the geometry is empty.

Example:

```python
Zipcode.objects.filter(poly__isempty=True)
```

<span id="s-isvalid"></span>
<span id="s-std-fieldlookup-isvalid"></span><span id="std-fieldlookup-isvalid"></span>

### `isvalid`

*Availability*: MySQL, [PostGIS](https://postgis.net/docs/ST_IsValid.md), Oracle, SpatiaLite

Tests if the geometry is valid.

Example:

```python
Zipcode.objects.filter(poly__isvalid=True)
```

| Backend | SQL Equivalent |
| --- | --- |
| MySQL, PostGIS, SpatiaLite | `ST_IsValid(poly)` |
| Oracle | `SDO_GEOM.VALIDATE_GEOMETRY_WITH_CONTEXT(poly, 0.05) = 'TRUE'` |

<span id="s-overlaps"></span>
<span id="s-std-fieldlookup-overlaps"></span><span id="std-fieldlookup-overlaps"></span>

### `overlaps`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Overlaps.md), Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field spatially overlaps the lookup geometry.

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Overlaps(poly, geom)` |
| Oracle | `SDO_OVERLAPS(poly, geom)` |
| MariaDB | `ST_Overlaps(poly, geom)` |
| MySQL | `ST_Overlaps(poly, geom)` |
| SpatiaLite | `Overlaps(poly, geom)` |

<span id="s-relate"></span>
<span id="s-std-fieldlookup-relate"></span><span id="std-fieldlookup-relate"></span>

### `relate`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Relate.md), MariaDB, Oracle, SpatiaLite, PGRaster (Conversion)

Tests if the geometry field is spatially related to the lookup geometry by the values given in the given pattern. This lookup requires a tuple parameter, `(geom, pattern)`; the form of `pattern` will depend on the spatial backend:

<span id="s-mariadb-postgis-and-spatialite"></span>

#### MariaDB, PostGIS, and SpatiaLite

On these spatial backends the intersection pattern is a string comprising nine characters, which define intersections between the interior, boundary, and exterior of the geometry field and the lookup geometry. The intersection pattern matrix may only use the following characters: `1`, `2`, `T`, `F`, or `*`. This lookup type allows users to “fine tune” a specific geometric relationship consistent with the DE-9IM model. [[1]](#fnde9im)

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

<span id="s-oracle"></span>

#### Oracle

Here the relation pattern is comprised of at least one of the nine relation strings: `TOUCH`, `OVERLAPBDYDISJOINT`, `OVERLAPBDYINTERSECT`, `EQUAL`, `INSIDE`, `COVEREDBY`, `CONTAINS`, `COVERS`, `ON`, and `ANYINTERACT`. Multiple strings may be combined with the logical Boolean operator OR, for example, `'inside+touch'`. [[2]](#fnsdorelate) The relation strings are case-insensitive.

Example:

```python
Zipcode.objects.filter(poly__relate=(geom, "anyinteract"))
```

Oracle SQL equivalent:

```sql
SELECT ... WHERE SDO_RELATE(poly, geom, 'anyinteract')
```

<span id="s-touches"></span>
<span id="s-std-fieldlookup-touches"></span><span id="std-fieldlookup-touches"></span>

### `touches`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Touches.md), Oracle, MariaDB, MySQL, SpatiaLite

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

<span id="s-within"></span>
<span id="s-std-fieldlookup-within"></span><span id="std-fieldlookup-within"></span>

### `within`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Within.md), Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

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

<span id="s-left"></span>
<span id="s-std-fieldlookup-left"></span><span id="std-fieldlookup-left"></span>

### `left`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Left.md), PGRaster (Conversion)

Tests if the geometry field’s bounding box is strictly to the left of the lookup geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__left=geom)
```

PostGIS equivalent:

```sql
SELECT ... WHERE poly << geom
```

<span id="s-right"></span>
<span id="s-std-fieldlookup-right"></span><span id="std-fieldlookup-right"></span>

### `right`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Right.md), PGRaster (Conversion)

Tests if the geometry field’s bounding box is strictly to the right of the lookup geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__right=geom)
```

PostGIS equivalent:

```sql
SELECT ... WHERE poly >> geom
```

<span id="s-overlaps-left"></span>
<span id="s-std-fieldlookup-overlaps_left"></span><span id="overlaps-left"></span><span id="std-fieldlookup-overlaps_left"></span>

### `overlaps_left`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Overleft.md), PGRaster (Bilateral)

Tests if the geometry field’s bounding box overlaps or is to the left of the lookup geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__overlaps_left=geom)
```

PostGIS equivalent:

```sql
SELECT ... WHERE poly &< geom
```

<span id="s-overlaps-right"></span>
<span id="s-std-fieldlookup-overlaps_right"></span><span id="overlaps-right"></span><span id="std-fieldlookup-overlaps_right"></span>

### `overlaps_right`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Overright.md), PGRaster (Bilateral)

Tests if the geometry field’s bounding box overlaps or is to the right of the lookup geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__overlaps_right=geom)
```

PostGIS equivalent:

```sql
SELECT ... WHERE poly &> geom
```

<span id="s-overlaps-above"></span>
<span id="s-std-fieldlookup-overlaps_above"></span><span id="overlaps-above"></span><span id="std-fieldlookup-overlaps_above"></span>

### `overlaps_above`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Overabove.md), PGRaster (Conversion)

Tests if the geometry field’s bounding box overlaps or is above the lookup geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__overlaps_above=geom)
```

PostGIS equivalent:

```sql
SELECT ... WHERE poly |&> geom
```

<span id="s-overlaps-below"></span>
<span id="s-std-fieldlookup-overlaps_below"></span><span id="overlaps-below"></span><span id="std-fieldlookup-overlaps_below"></span>

### `overlaps_below`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Overbelow.md), PGRaster (Conversion)

Tests if the geometry field’s bounding box overlaps or is below the lookup geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__overlaps_below=geom)
```

PostGIS equivalent:

```sql
SELECT ... WHERE poly &<| geom
```

<span id="s-strictly-above"></span>
<span id="s-std-fieldlookup-strictly_above"></span><span id="strictly-above"></span><span id="std-fieldlookup-strictly_above"></span>

### `strictly_above`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Above.md), PGRaster (Conversion)

Tests if the geometry field’s bounding box is strictly above the lookup geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__strictly_above=geom)
```

PostGIS equivalent:

```sql
SELECT ... WHERE poly |>> geom
```

<span id="s-strictly-below"></span>
<span id="s-std-fieldlookup-strictly_below"></span><span id="strictly-below"></span><span id="std-fieldlookup-strictly_below"></span>

### `strictly_below`

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Below.md), PGRaster (Conversion)

Tests if the geometry field’s bounding box is strictly below the lookup geometry’s bounding box.

Example:

```python
Zipcode.objects.filter(poly__strictly_below=geom)
```

PostGIS equivalent:

```sql
SELECT ... WHERE poly <<| geom
```

<span id="s-distance-lookups"></span>
<span id="s-id6"></span><span id="id6"></span>

## Distance Lookups

*Availability*: PostGIS, Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Native)

For an overview on performing distance queries, please refer to the [distance queries introduction](db-api.md#distance-queries).

Distance lookups take the following form:

```text
<field>__<distance lookup>=(<geometry/raster>, <distance value>[, "spheroid"])
<field>__<distance lookup>=(<raster>, <band_index>, <distance value>[, "spheroid"])
<field>__<band_index>__<distance lookup>=(<raster>, <band_index>, <distance value>[, "spheroid"])
```

The value passed into a distance lookup is a tuple; the first two values are mandatory, and are the geometry to calculate distances to, and a distance value (either a number in units of the field, a [`Distance`](measure.md#django.contrib.gis.measure.Distance) object, or a [query expression](../../models/expressions.md)). To pass a band index to the lookup, use a 3-tuple where the second entry is the band index.

On every distance lookup except [`dwithin`](#std-fieldlookup-dwithin), an optional element, `'spheroid'`, may be included to use the more accurate spheroid distance calculation functions on fields with a geodetic coordinate system.

On PostgreSQL, the `'spheroid'` option uses [ST\_DistanceSpheroid](https://postgis.net/docs/ST_Distance_Spheroid.md) instead of [ST\_DistanceSphere](https://postgis.net/docs/ST_DistanceSphere.md). The simpler [ST\_Distance](https://postgis.net/docs/ST_Distance.md) function is used with projected coordinate systems. Rasters are converted to geometries for spheroid based lookups.

<span id="s-distance-gt"></span>
<span id="s-std-fieldlookup-distance_gt"></span><span id="distance-gt"></span><span id="std-fieldlookup-distance_gt"></span>

### `distance_gt`

Returns models where the distance to the geometry field from the lookup geometry is greater than the given distance value.

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

<span id="s-distance-gte"></span>
<span id="s-std-fieldlookup-distance_gte"></span><span id="distance-gte"></span><span id="std-fieldlookup-distance_gte"></span>

### `distance_gte`

Returns models where the distance to the geometry field from the lookup geometry is greater than or equal to the given distance value.

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

<span id="s-distance-lt"></span>
<span id="s-std-fieldlookup-distance_lt"></span><span id="distance-lt"></span><span id="std-fieldlookup-distance_lt"></span>

### `distance_lt`

Returns models where the distance to the geometry field from the lookup geometry is less than the given distance value.

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

<span id="s-distance-lte"></span>
<span id="s-std-fieldlookup-distance_lte"></span><span id="distance-lte"></span><span id="std-fieldlookup-distance_lte"></span>

### `distance_lte`

Returns models where the distance to the geometry field from the lookup geometry is less than or equal to the given distance value.

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

<span id="s-dwithin"></span>
<span id="s-std-fieldlookup-dwithin"></span><span id="std-fieldlookup-dwithin"></span>

### `dwithin`

Returns models where the distance to the geometry field from the lookup geometry are within the given distance from one another. Note that you can only provide [`Distance`](measure.md#django.contrib.gis.measure.Distance) objects if the targeted geometries are in a projected system. For geographic geometries, you should use units of the geometry field (e.g. degrees for `WGS84`) .

Example:

```python
Zipcode.objects.filter(poly__dwithin=(geom, D(m=5)))
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_DWithin(poly, geom, 5)` |
| Oracle | `SDO_WITHIN_DISTANCE(poly, geom, 5)` |
| SpatiaLite | `PtDistWithin(poly, geom, 5)` |

<span id="s-aggregate-functions"></span>
<span id="s-gis-aggregation-functions"></span><span id="gis-aggregation-functions"></span>

### Aggregate Functions

Django provides some GIS-specific aggregate functions. For details on how to use these aggregate functions, see [the topic guide on aggregation](../../../topics/db/aggregation.md).

| Keyword Argument | Description |
| --- | --- |
| `tolerance` | This keyword is for Oracle only. It is for the tolerance value used by the `SDOAGGRTYPE` procedure; the [Oracle documentation](https://docs.oracle.com/en/database/oracle/oracle-database/21/spatl/spatial-concepts.md#GUID-CE10AB14-D5EA-43BA-A647-DAC9EEF41EE6) has more details. |

Example:

```python
>>> from django.contrib.gis.db.models import Extent, Union
>>> WorldBorder.objects.aggregate(Extent("mpoly"), Union("mpoly"))
```

<span id="s-collect"></span>

#### `Collect`

<dl>
<dt id="django.contrib.gis.db.models.Collect"><code>classCollect(geo_field,filter=None)</code><a href="https://github.com/django/django/blob/stable/5.2.x/django/contrib/gis/db/models/aggregates.py#L61">[source]</a></dt>
<dd>

</dd>
</dl>

*Availability*: [PostGIS](https://postgis.net/docs/ST_Collect.md), MySQL, SpatiaLite

Returns a `GEOMETRYCOLLECTION` or a `MULTI` geometry object from the geometry column. This is analogous to a simplified version of the [`Union`](#django.contrib.gis.db.models.Union) aggregate, except it can be several orders of magnitude faster than performing a union because it rolls up geometries into a collection or multi object, not caring about dissolving boundaries.

> [!NOTE]
>
> **Changed in Django 5.1:**
>
> MySQL 8.0.24+ support was added.

<span id="s-extent"></span>

#### `Extent`

<dl>
<dt id="django.contrib.gis.db.models.Extent"><code>classExtent(geo_field,filter=None)</code><a href="https://github.com/django/django/blob/stable/5.2.x/django/contrib/gis/db/models/aggregates.py#L66">[source]</a></dt>
<dd>

</dd>
</dl>

*Availability*: [PostGIS](https://postgis.net/docs/ST_Extent.md), Oracle, SpatiaLite

Returns the extent of all `geo_field` in the `QuerySet` as a 4-tuple, comprising the lower left coordinate and the upper right coordinate.

Example:

```python
>>> qs = City.objects.filter(name__in=("Houston", "Dallas")).aggregate(Extent("poly"))
>>> print(qs["poly__extent"])
(-96.8016128540039, 29.7633724212646, -95.3631439208984, 32.782058715820)
```

<span id="s-extent3d"></span>

#### `Extent3D`

<dl>
<dt id="django.contrib.gis.db.models.Extent3D"><code>classExtent3D(geo_field,filter=None)</code><a href="https://github.com/django/django/blob/stable/5.2.x/django/contrib/gis/db/models/aggregates.py#L77">[source]</a></dt>
<dd>

</dd>
</dl>

*Availability*: [PostGIS](https://postgis.net/docs/ST_3DExtent.md)

Returns the 3D extent of all `geo_field` in the `QuerySet` as a 6-tuple, comprising the lower left coordinate and upper right coordinate (each with x, y, and z coordinates).

Example:

```python
>>> qs = City.objects.filter(name__in=("Houston", "Dallas")).aggregate(Extent3D("poly"))
>>> print(qs["poly__extent3d"])
(-96.8016128540039, 29.7633724212646, 0, -95.3631439208984, 32.782058715820, 0)
```

<span id="s-makeline"></span>

#### `MakeLine`

<dl>
<dt id="django.contrib.gis.db.models.MakeLine"><code>classMakeLine(geo_field,filter=None)</code><a href="https://github.com/django/django/blob/stable/5.2.x/django/contrib/gis/db/models/aggregates.py#L88">[source]</a></dt>
<dd>

</dd>
</dl>

*Availability*: [PostGIS](https://postgis.net/docs/ST_MakeLine.md), SpatiaLite

Returns a `LineString` constructed from the point field geometries in the `QuerySet`. Currently, ordering the queryset has no effect.

Example:

```python
>>> qs = City.objects.filter(name__in=("Houston", "Dallas")).aggregate(MakeLine("poly"))
>>> print(qs["poly__makeline"])
LINESTRING (-95.3631510000000020 29.7633739999999989, -96.8016109999999941 32.7820570000000018)
```

<span id="s-union"></span>

#### `Union`

<dl>
<dt id="django.contrib.gis.db.models.Union"><code>classUnion(geo_field,filter=None)</code><a href="https://github.com/django/django/blob/stable/5.2.x/django/contrib/gis/db/models/aggregates.py#L93">[source]</a></dt>
<dd>

</dd>
</dl>

*Availability*: [PostGIS](https://postgis.net/docs/ST_Union.md), Oracle, SpatiaLite

This method returns a [`GEOSGeometry`](geos.md#django.contrib.gis.geos.GEOSGeometry) object comprising the union of every geometry in the queryset. Please note that use of `Union` is processor intensive and may take a significant amount of time on large querysets.

> [!NOTE]
>
> If the computation time for using this method is too expensive, consider using [`Collect`](#django.contrib.gis.db.models.Collect) instead.

Example:

```python
>>> u = Zipcode.objects.aggregate(Union(poly))  # This may take a long time.
>>> u = Zipcode.objects.filter(poly__within=bbox).aggregate(
...     Union(poly)
... )  # A more sensible approach.
```

Footnotes