GIS QuerySet API Reference — Django 5.2.8.dev20251011170327 documentation

# [Django 5.2.8.dev20251011170327 documentation](../../../index.md)

[Home](../../../index.md "Home page") |
[Table of contents](../../../contents.md "Table of contents") |
[Index](../../../genindex.md "Global index") |
[Modules](../../../py-modindex.md "Module index")

« [previous](forms-api.md "GeoDjango Forms API")
|
[up](../../index.md "API Reference")
|
[next](functions.md "Geographic Database Functions") »

# GIS QuerySet API Reference[¶](#gis-queryset-api-reference "Link to this heading")

## Spatial Lookups[¶](#spatial-lookups "Link to this heading")

The spatial lookups in this section are available for [`GeometryField`](model-api.md#django.contrib.gis.db.models.GeometryField "django.contrib.gis.db.models.GeometryField") and [`RasterField`](model-api.md#django.contrib.gis.db.models.RasterField "django.contrib.gis.db.models.RasterField").

For an introduction, see the [spatial lookups introduction](db-api.md#spatial-lookups-intro). For an overview of what lookups are compatible with a particular spatial backend, refer to the [spatial lookup compatibility table](db-api.md#spatial-lookup-compatibility).

### Lookups with rasters[¶](#lookups-with-rasters "Link to this heading")

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

### `bbcontains`[¶](#bbcontains "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Contain.md), MariaDB, MySQL, SpatiaLite, PGRaster (Native)

Tests if the geometry or raster field’s bounding box completely contains the lookup geometry’s bounding box.

Example:

```
Zipcode.objects.filter(poly__bbcontains=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `poly ~ geom` |
| MariaDB | `MBRContains(poly, geom)` |
| MySQL | `MBRContains(poly, geom)` |
| SpatiaLite | `MbrContains(poly, geom)` |

### `bboverlaps`[¶](#bboverlaps "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/geometry_overlaps.md), MariaDB, MySQL, SpatiaLite, PGRaster (Native)

Tests if the geometry field’s bounding box overlaps the lookup geometry’s bounding box.

Example:

```
Zipcode.objects.filter(poly__bboverlaps=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `poly && geom` |
| MariaDB | `MBROverlaps(poly, geom)` |
| MySQL | `MBROverlaps(poly, geom)` |
| SpatiaLite | `MbrOverlaps(poly, geom)` |

### `contained`[¶](#contained "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Contained.md), MariaDB, MySQL, SpatiaLite, PGRaster (Native)

Tests if the geometry field’s bounding box is completely contained by the lookup geometry’s bounding box.

Example:

```
Zipcode.objects.filter(poly__contained=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `poly @ geom` |
| MariaDB | `MBRWithin(poly, geom)` |
| MySQL | `MBRWithin(poly, geom)` |
| SpatiaLite | `MbrWithin(poly, geom)` |

### `contains`[¶](#contains "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Contains.md), Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field spatially contains the lookup geometry.

Example:

```
Zipcode.objects.filter(poly__contains=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Contains(poly, geom)` |
| Oracle | `SDO_CONTAINS(poly, geom)` |
| MariaDB | `ST_Contains(poly, geom)` |
| MySQL | `ST_Contains(poly, geom)` |
| SpatiaLite | `Contains(poly, geom)` |

### `contains_properly`[¶](#contains-properly "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_ContainsProperly.md), PGRaster (Bilateral)

Returns true if the lookup geometry intersects the interior of the geometry field, but not the boundary (or exterior).

Example:

```
Zipcode.objects.filter(poly__contains_properly=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_ContainsProperly(poly, geom)` |

### `coveredby`[¶](#coveredby "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_CoveredBy.md), Oracle, MySQL, PGRaster (Bilateral), SpatiaLite

Tests if no point in the geometry field is outside the lookup geometry. [[3]](#fncovers)

Example:

```
Zipcode.objects.filter(poly__coveredby=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_CoveredBy(poly, geom)` |
| Oracle | `SDO_COVEREDBY(poly, geom)` |
| MySQL | `MBRCoveredBy(poly, geom)` |
| SpatiaLite | `CoveredBy(poly, geom)` |

Changed in Django 5.2:

MySQL support was added.

### `covers`[¶](#covers "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Covers.md), Oracle, MySQL, PGRaster (Bilateral), SpatiaLite

Tests if no point in the lookup geometry is outside the geometry field. [[3]](#fncovers)

Example:

```
Zipcode.objects.filter(poly__covers=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Covers(poly, geom)` |
| Oracle | `SDO_COVERS(poly, geom)` |
| MySQL | `MBRCovers(poly, geom)` |
| SpatiaLite | `Covers(poly, geom)` |

Changed in Django 5.2:

MySQL support was added.

### `crosses`[¶](#crosses "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Crosses.md), MariaDB, MySQL, SpatiaLite, PGRaster (Conversion)

Tests if the geometry field spatially crosses the lookup geometry.

Example:

```
Zipcode.objects.filter(poly__crosses=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Crosses(poly, geom)` |
| MariaDB | `ST_Crosses(poly, geom)` |
| MySQL | `ST_Crosses(poly, geom)` |
| SpatiaLite | `Crosses(poly, geom)` |

### `disjoint`[¶](#disjoint "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Disjoint.md), Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field is spatially disjoint from the lookup geometry.

Example:

```
Zipcode.objects.filter(poly__disjoint=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Disjoint(poly, geom)` |
| Oracle | `SDO_GEOM.RELATE(poly, 'DISJOINT', geom, 0.05)` |
| MariaDB | `ST_Disjoint(poly, geom)` |
| MySQL | `ST_Disjoint(poly, geom)` |
| SpatiaLite | `Disjoint(poly, geom)` |

### `equals`[¶](#equals "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Equals.md), Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Conversion)

Tests if the geometry field is spatially equal to the lookup geometry.

Example:

```
Zipcode.objects.filter(poly__equals=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Equals(poly, geom)` |
| Oracle | `SDO_EQUAL(poly, geom)` |
| MariaDB | `ST_Equals(poly, geom)` |
| MySQL | `ST_Equals(poly, geom)` |
| SpatiaLite | `Equals(poly, geom)` |

### `exact`, `same_as`[¶](#exact-same-as "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Same.md), Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field is “equal” to the lookup geometry. On Oracle, MySQL, and SpatiaLite, it tests spatial equality, while on PostGIS it tests equality of bounding boxes.

Example:

```
Zipcode.objects.filter(poly=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `poly ~= geom` |
| Oracle | `SDO_EQUAL(poly, geom)` |
| MariaDB | `ST_Equals(poly, geom)` |
| MySQL | `ST_Equals(poly, geom)` |
| SpatiaLite | `Equals(poly, geom)` |

### `intersects`[¶](#intersects "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Intersects.md), Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field spatially intersects the lookup geometry.

Example:

```
Zipcode.objects.filter(poly__intersects=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Intersects(poly, geom)` |
| Oracle | `SDO_OVERLAPBDYINTERSECT(poly, geom)` |
| MariaDB | `ST_Intersects(poly, geom)` |
| MySQL | `ST_Intersects(poly, geom)` |
| SpatiaLite | `Intersects(poly, geom)` |

### `isempty`[¶](#isempty "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_IsEmpty.md)

Tests if the geometry is empty.

Example:

```
Zipcode.objects.filter(poly__isempty=True)
```

### `isvalid`[¶](#isvalid "Link to this heading")

*Availability*: MySQL, [PostGIS](https://postgis.net/docs/ST_IsValid.md), Oracle, SpatiaLite

Tests if the geometry is valid.

Example:

```
Zipcode.objects.filter(poly__isvalid=True)
```

| Backend | SQL Equivalent |
| --- | --- |
| MySQL, PostGIS, SpatiaLite | `ST_IsValid(poly)` |
| Oracle | `SDO_GEOM.VALIDATE_GEOMETRY_WITH_CONTEXT(poly, 0.05) = 'TRUE'` |

### `overlaps`[¶](#overlaps "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Overlaps.md), Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field spatially overlaps the lookup geometry.

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Overlaps(poly, geom)` |
| Oracle | `SDO_OVERLAPS(poly, geom)` |
| MariaDB | `ST_Overlaps(poly, geom)` |
| MySQL | `ST_Overlaps(poly, geom)` |
| SpatiaLite | `Overlaps(poly, geom)` |

### `relate`[¶](#relate "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Relate.md), MariaDB, Oracle, SpatiaLite, PGRaster (Conversion)

Tests if the geometry field is spatially related to the lookup geometry by the values given in the given pattern. This lookup requires a tuple parameter, `(geom, pattern)`; the form of `pattern` will depend on the spatial backend:

#### MariaDB, PostGIS, and SpatiaLite[¶](#mariadb-postgis-and-spatialite "Link to this heading")

On these spatial backends the intersection pattern is a string comprising nine characters, which define intersections between the interior, boundary, and exterior of the geometry field and the lookup geometry. The intersection pattern matrix may only use the following characters: `1`, `2`, `T`, `F`, or `*`. This lookup type allows users to “fine tune” a specific geometric relationship consistent with the DE-9IM model. [[1]](#fnde9im)

Geometry example:

```
# A tuple lookup parameter is used to specify the geometry and
# the intersection pattern (the pattern here is for 'contains').
Zipcode.objects.filter(poly__relate=(geom, "T*T***FF*"))
```

PostGIS and MariaDB SQL equivalent:

```
SELECT ... WHERE ST_Relate(poly, geom, 'T*T***FF*')
```

SpatiaLite SQL equivalent:

```
SELECT ... WHERE Relate(poly, geom, 'T*T***FF*')
```

Raster example:

```
Zipcode.objects.filter(poly__relate=(rast, 1, "T*T***FF*"))
Zipcode.objects.filter(rast__2__relate=(rast, 1, "T*T***FF*"))
```

PostGIS SQL equivalent:

```
SELECT ... WHERE ST_Relate(poly, ST_Polygon(rast, 1), 'T*T***FF*')
SELECT ... WHERE ST_Relate(ST_Polygon(rast, 2), ST_Polygon(rast, 1), 'T*T***FF*')
```

#### Oracle[¶](#oracle "Link to this heading")

Here the relation pattern is comprised of at least one of the nine relation strings: `TOUCH`, `OVERLAPBDYDISJOINT`, `OVERLAPBDYINTERSECT`, `EQUAL`, `INSIDE`, `COVEREDBY`, `CONTAINS`, `COVERS`, `ON`, and `ANYINTERACT`. Multiple strings may be combined with the logical Boolean operator OR, for example, `'inside+touch'`. [[2]](#fnsdorelate) The relation strings are case-insensitive.

Example:

```
Zipcode.objects.filter(poly__relate=(geom, "anyinteract"))
```

Oracle SQL equivalent:

```
SELECT ... WHERE SDO_RELATE(poly, geom, 'anyinteract')
```

### `touches`[¶](#touches "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Touches.md), Oracle, MariaDB, MySQL, SpatiaLite

Tests if the geometry field spatially touches the lookup geometry.

Example:

```
Zipcode.objects.filter(poly__touches=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Touches(poly, geom)` |
| MariaDB | `ST_Touches(poly, geom)` |
| MySQL | `ST_Touches(poly, geom)` |
| Oracle | `SDO_TOUCH(poly, geom)` |
| SpatiaLite | `Touches(poly, geom)` |

### `within`[¶](#within "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Within.md), Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Bilateral)

Tests if the geometry field is spatially within the lookup geometry.

Example:

```
Zipcode.objects.filter(poly__within=geom)
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Within(poly, geom)` |
| MariaDB | `ST_Within(poly, geom)` |
| MySQL | `ST_Within(poly, geom)` |
| Oracle | `SDO_INSIDE(poly, geom)` |
| SpatiaLite | `Within(poly, geom)` |

### `left`[¶](#left "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Left.md), PGRaster (Conversion)

Tests if the geometry field’s bounding box is strictly to the left of the lookup geometry’s bounding box.

Example:

```
Zipcode.objects.filter(poly__left=geom)
```

PostGIS equivalent:

```
SELECT ... WHERE poly << geom
```

### `right`[¶](#right "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Right.md), PGRaster (Conversion)

Tests if the geometry field’s bounding box is strictly to the right of the lookup geometry’s bounding box.

Example:

```
Zipcode.objects.filter(poly__right=geom)
```

PostGIS equivalent:

```
SELECT ... WHERE poly >> geom
```

### `overlaps_left`[¶](#overlaps-left "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Overleft.md), PGRaster (Bilateral)

Tests if the geometry field’s bounding box overlaps or is to the left of the lookup geometry’s bounding box.

Example:

```
Zipcode.objects.filter(poly__overlaps_left=geom)
```

PostGIS equivalent:

```
SELECT ... WHERE poly &< geom
```

### `overlaps_right`[¶](#overlaps-right "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Overright.md), PGRaster (Bilateral)

Tests if the geometry field’s bounding box overlaps or is to the right of the lookup geometry’s bounding box.

Example:

```
Zipcode.objects.filter(poly__overlaps_right=geom)
```

PostGIS equivalent:

```
SELECT ... WHERE poly &> geom
```

### `overlaps_above`[¶](#overlaps-above "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Overabove.md), PGRaster (Conversion)

Tests if the geometry field’s bounding box overlaps or is above the lookup geometry’s bounding box.

Example:

```
Zipcode.objects.filter(poly__overlaps_above=geom)
```

PostGIS equivalent:

```
SELECT ... WHERE poly |&> geom
```

### `overlaps_below`[¶](#overlaps-below "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Overbelow.md), PGRaster (Conversion)

Tests if the geometry field’s bounding box overlaps or is below the lookup geometry’s bounding box.

Example:

```
Zipcode.objects.filter(poly__overlaps_below=geom)
```

PostGIS equivalent:

```
SELECT ... WHERE poly &<| geom
```

### `strictly_above`[¶](#strictly-above "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Above.md), PGRaster (Conversion)

Tests if the geometry field’s bounding box is strictly above the lookup geometry’s bounding box.

Example:

```
Zipcode.objects.filter(poly__strictly_above=geom)
```

PostGIS equivalent:

```
SELECT ... WHERE poly |>> geom
```

### `strictly_below`[¶](#strictly-below "Link to this heading")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Geometry_Below.md), PGRaster (Conversion)

Tests if the geometry field’s bounding box is strictly below the lookup geometry’s bounding box.

Example:

```
Zipcode.objects.filter(poly__strictly_below=geom)
```

PostGIS equivalent:

```
SELECT ... WHERE poly <<| geom
```

## Distance Lookups[¶](#distance-lookups "Link to this heading")

*Availability*: PostGIS, Oracle, MariaDB, MySQL, SpatiaLite, PGRaster (Native)

For an overview on performing distance queries, please refer to the [distance queries introduction](db-api.md#distance-queries).

Distance lookups take the following form:

```
<field>__<distance lookup>=(<geometry/raster>, <distance value>[, "spheroid"])
<field>__<distance lookup>=(<raster>, <band_index>, <distance value>[, "spheroid"])
<field>__<band_index>__<distance lookup>=(<raster>, <band_index>, <distance value>[, "spheroid"])
```

The value passed into a distance lookup is a tuple; the first two values are mandatory, and are the geometry to calculate distances to, and a distance value (either a number in units of the field, a [`Distance`](measure.md#django.contrib.gis.measure.Distance "django.contrib.gis.measure.Distance") object, or a [query expression](../../models/expressions.md)). To pass a band index to the lookup, use a 3-tuple where the second entry is the band index.

On every distance lookup except [`dwithin`](#std-fieldlookup-dwithin), an optional element, `'spheroid'`, may be included to use the more accurate spheroid distance calculation functions on fields with a geodetic coordinate system.

On PostgreSQL, the `'spheroid'` option uses [ST\_DistanceSpheroid](https://postgis.net/docs/ST_Distance_Spheroid.md) instead of [ST\_DistanceSphere](https://postgis.net/docs/ST_DistanceSphere.md). The simpler [ST\_Distance](https://postgis.net/docs/ST_Distance.md) function is used with projected coordinate systems. Rasters are converted to geometries for spheroid based lookups.

### `distance_gt`[¶](#distance-gt "Link to this heading")

Returns models where the distance to the geometry field from the lookup geometry is greater than the given distance value.

Example:

```
Zipcode.objects.filter(poly__distance_gt=(geom, D(m=5)))
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Distance/ST_Distance_Sphere(poly, geom) > 5` |
| MariaDB | `ST_Distance(poly, geom) > 5` |
| MySQL | `ST_Distance(poly, geom) > 5` |
| Oracle | `SDO_GEOM.SDO_DISTANCE(poly, geom, 0.05) > 5` |
| SpatiaLite | `Distance(poly, geom) > 5` |

### `distance_gte`[¶](#distance-gte "Link to this heading")

Returns models where the distance to the geometry field from the lookup geometry is greater than or equal to the given distance value.

Example:

```
Zipcode.objects.filter(poly__distance_gte=(geom, D(m=5)))
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Distance/ST_Distance_Sphere(poly, geom) >= 5` |
| MariaDB | `ST_Distance(poly, geom) >= 5` |
| MySQL | `ST_Distance(poly, geom) >= 5` |
| Oracle | `SDO_GEOM.SDO_DISTANCE(poly, geom, 0.05) >= 5` |
| SpatiaLite | `Distance(poly, geom) >= 5` |

### `distance_lt`[¶](#distance-lt "Link to this heading")

Returns models where the distance to the geometry field from the lookup geometry is less than the given distance value.

Example:

```
Zipcode.objects.filter(poly__distance_lt=(geom, D(m=5)))
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Distance/ST_Distance_Sphere(poly, geom) < 5` |
| MariaDB | `ST_Distance(poly, geom) < 5` |
| MySQL | `ST_Distance(poly, geom) < 5` |
| Oracle | `SDO_GEOM.SDO_DISTANCE(poly, geom, 0.05) < 5` |
| SpatiaLite | `Distance(poly, geom) < 5` |

### `distance_lte`[¶](#distance-lte "Link to this heading")

Returns models where the distance to the geometry field from the lookup geometry is less than or equal to the given distance value.

Example:

```
Zipcode.objects.filter(poly__distance_lte=(geom, D(m=5)))
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_Distance/ST_Distance_Sphere(poly, geom) <= 5` |
| MariaDB | `ST_Distance(poly, geom) <= 5` |
| MySQL | `ST_Distance(poly, geom) <= 5` |
| Oracle | `SDO_GEOM.SDO_DISTANCE(poly, geom, 0.05) <= 5` |
| SpatiaLite | `Distance(poly, geom) <= 5` |

### `dwithin`[¶](#dwithin "Link to this heading")

Returns models where the distance to the geometry field from the lookup geometry are within the given distance from one another. Note that you can only provide [`Distance`](measure.md#django.contrib.gis.measure.Distance "django.contrib.gis.measure.Distance") objects if the targeted geometries are in a projected system. For geographic geometries, you should use units of the geometry field (e.g. degrees for `WGS84`) .

Example:

```
Zipcode.objects.filter(poly__dwithin=(geom, D(m=5)))
```

| Backend | SQL Equivalent |
| --- | --- |
| PostGIS | `ST_DWithin(poly, geom, 5)` |
| Oracle | `SDO_WITHIN_DISTANCE(poly, geom, 5)` |
| SpatiaLite | `PtDistWithin(poly, geom, 5)` |

### Aggregate Functions[¶](#aggregate-functions "Link to this heading")

Django provides some GIS-specific aggregate functions. For details on how to use these aggregate functions, see [the topic guide on aggregation](../../../topics/db/aggregation.md).

| Keyword Argument | Description |
| --- | --- |
| `tolerance` | This keyword is for Oracle only. It is for the tolerance value used by the `SDOAGGRTYPE` procedure; the [Oracle documentation](https://docs.oracle.com/en/database/oracle/oracle-database/21/spatl/spatial-concepts.md#GUID-CE10AB14-D5EA-43BA-A647-DAC9EEF41EE6) has more details. |

Example:

```
>>> from django.contrib.gis.db.models import Extent, Union
>>> WorldBorder.objects.aggregate(Extent("mpoly"), Union("mpoly"))
```

#### `Collect`[¶](#collect "Link to this heading")

*class* Collect(*geo\_field*, *filter=None*)[[source]](https://github.com/django/django/blob/stable/5.2.x/django/contrib/gis/db/models/aggregates.py#L61)[¶](#django.contrib.gis.db.models.Collect "Link to this definition")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Collect.md), MySQL, SpatiaLite

Returns a `GEOMETRYCOLLECTION` or a `MULTI` geometry object from the geometry column. This is analogous to a simplified version of the [`Union`](#django.contrib.gis.db.models.Union "django.contrib.gis.db.models.Union") aggregate, except it can be several orders of magnitude faster than performing a union because it rolls up geometries into a collection or multi object, not caring about dissolving boundaries.

Changed in Django 5.1:

MySQL 8.0.24+ support was added.

#### `Extent`[¶](#extent "Link to this heading")

*class* Extent(*geo\_field*, *filter=None*)[[source]](https://github.com/django/django/blob/stable/5.2.x/django/contrib/gis/db/models/aggregates.py#L66)[¶](#django.contrib.gis.db.models.Extent "Link to this definition")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Extent.md), Oracle, SpatiaLite

Returns the extent of all `geo_field` in the `QuerySet` as a 4-tuple, comprising the lower left coordinate and the upper right coordinate.

Example:

```
>>> qs = City.objects.filter(name__in=("Houston", "Dallas")).aggregate(Extent("poly"))
>>> print(qs["poly__extent"])
(-96.8016128540039, 29.7633724212646, -95.3631439208984, 32.782058715820)
```

#### `Extent3D`[¶](#extent3d "Link to this heading")

*class* Extent3D(*geo\_field*, *filter=None*)[[source]](https://github.com/django/django/blob/stable/5.2.x/django/contrib/gis/db/models/aggregates.py#L77)[¶](#django.contrib.gis.db.models.Extent3D "Link to this definition")

*Availability*: [PostGIS](https://postgis.net/docs/ST_3DExtent.md)

Returns the 3D extent of all `geo_field` in the `QuerySet` as a 6-tuple, comprising the lower left coordinate and upper right coordinate (each with x, y, and z coordinates).

Example:

```
>>> qs = City.objects.filter(name__in=("Houston", "Dallas")).aggregate(Extent3D("poly"))
>>> print(qs["poly__extent3d"])
(-96.8016128540039, 29.7633724212646, 0, -95.3631439208984, 32.782058715820, 0)
```

#### `MakeLine`[¶](#makeline "Link to this heading")

*class* MakeLine(*geo\_field*, *filter=None*)[[source]](https://github.com/django/django/blob/stable/5.2.x/django/contrib/gis/db/models/aggregates.py#L88)[¶](#django.contrib.gis.db.models.MakeLine "Link to this definition")

*Availability*: [PostGIS](https://postgis.net/docs/ST_MakeLine.md), SpatiaLite

Returns a `LineString` constructed from the point field geometries in the `QuerySet`. Currently, ordering the queryset has no effect.

Example:

```
>>> qs = City.objects.filter(name__in=("Houston", "Dallas")).aggregate(MakeLine("poly"))
>>> print(qs["poly__makeline"])
LINESTRING (-95.3631510000000020 29.7633739999999989, -96.8016109999999941 32.7820570000000018)
```

#### `Union`[¶](#union "Link to this heading")

*class* Union(*geo\_field*, *filter=None*)[[source]](https://github.com/django/django/blob/stable/5.2.x/django/contrib/gis/db/models/aggregates.py#L93)[¶](#django.contrib.gis.db.models.Union "Link to this definition")

*Availability*: [PostGIS](https://postgis.net/docs/ST_Union.md), Oracle, SpatiaLite

This method returns a [`GEOSGeometry`](geos.md#django.contrib.gis.geos.GEOSGeometry "django.contrib.gis.geos.GEOSGeometry") object comprising the union of every geometry in the queryset. Please note that use of `Union` is processor intensive and may take a significant amount of time on large querysets.

Note

If the computation time for using this method is too expensive, consider using [`Collect`](#django.contrib.gis.db.models.Collect "django.contrib.gis.db.models.Collect") instead.

Example:

```
>>> u = Zipcode.objects.aggregate(Union(poly))  # This may take a long time.
>>> u = Zipcode.objects.filter(poly__within=bbox).aggregate(
...     Union(poly)
... )  # A more sensible approach.
```

Footnotes

[[1](#id4)]

*See* [OpenGIS Simple Feature Specification For SQL](https://portal.ogc.org/files/?artifact_id=829), at Ch. 2.1.13.2, p. 2-13 (The Dimensionally Extended Nine-Intersection Model).


[[2](#id5)]

*See* [SDO\_RELATE documentation](https://docs.oracle.com/en/database/oracle/oracle-database/18/spatl/spatial-operators-reference.md#GUID-97C17C18-F05E-49B4-BE11-E89B972E2A02), from the Oracle Spatial and Graph Developer’s Guide.


[3]
([1](#id2),[2](#id3))

For an explanation of this routine, read [Quirks of the “Contains” Spatial Predicate](https://lin-ear-th-inking.blogspot.com/2007/06/subtleties-of-ogc-covers-spatial.md) by Martin Davis (a PostGIS developer).

### [Table of Contents](../../../contents.md)

- [GIS QuerySet API Reference](#)
  - [Spatial Lookups](#spatial-lookups)
    - [Lookups with rasters](#lookups-with-rasters)
    - [`bbcontains`](#bbcontains)
    - [`bboverlaps`](#bboverlaps)
    - [`contained`](#contained)
    - [`contains`](#contains)
    - [`contains_properly`](#contains-properly)
    - [`coveredby`](#coveredby)
    - [`covers`](#covers)
    - [`crosses`](#crosses)
    - [`disjoint`](#disjoint)
    - [`equals`](#equals)
    - [`exact`, `same_as`](#exact-same-as)
    - [`intersects`](#intersects)
    - [`isempty`](#isempty)
    - [`isvalid`](#isvalid)
    - [`overlaps`](#overlaps)
    - [`relate`](#relate)
      - [MariaDB, PostGIS, and SpatiaLite](#mariadb-postgis-and-spatialite)
      - [Oracle](#oracle)
    - [`touches`](#touches)
    - [`within`](#within)
    - [`left`](#left)
    - [`right`](#right)
    - [`overlaps_left`](#overlaps-left)
    - [`overlaps_right`](#overlaps-right)
    - [`overlaps_above`](#overlaps-above)
    - [`overlaps_below`](#overlaps-below)
    - [`strictly_above`](#strictly-above)
    - [`strictly_below`](#strictly-below)
  - [Distance Lookups](#distance-lookups)
    - [`distance_gt`](#distance-gt)
    - [`distance_gte`](#distance-gte)
    - [`distance_lt`](#distance-lt)
    - [`distance_lte`](#distance-lte)
    - [`dwithin`](#dwithin)
    - [Aggregate Functions](#aggregate-functions)
      - [`Collect`](#collect)
      - [`Extent`](#extent)
      - [`Extent3D`](#extent3d)
      - [`MakeLine`](#makeline)
      - [`Union`](#union)

#### Previous topic

[GeoDjango Forms API](forms-api.md "previous chapter")

#### Next topic

[Geographic Database Functions](functions.md "next chapter")

### This Page

- [Show Source](../../../_sources/ref/contrib/gis/geoquerysets.txt)

### Quick search

### Last update:

Oct 12, 2025

« [previous](forms-api.md "GeoDjango Forms API")
|
[up](../../index.md "API Reference")
|
[next](functions.md "Geographic Database Functions") »
