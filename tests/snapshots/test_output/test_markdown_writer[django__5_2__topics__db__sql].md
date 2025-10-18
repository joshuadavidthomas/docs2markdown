---
id: 77f58af7e5191921
source_file_id: django__5_2__topics__db__sql.html
headings: ["Performing raw SQL queries"]
level: 1
order: 0
tokens: 327
char_count: 1712
code_languages: ["python"]
---
# Performing raw SQL queries

Django gives you two ways of performing raw SQL queries: you can use
[`Manager.raw()`](#django.db.models.Manager.raw) to [perform raw queries and return model instances](#performing-raw-queries), or
you can avoid the model layer entirely and [execute custom SQL directly](#executing-custom-sql-directly).

> **NOTE:**
>
> The Django ORM provides many tools to express queries without writing raw
> SQL. For example:
>
> - The [QuerySet API](../../ref/models/querysets.md) is extensive.
> - You can [`annotate`](../../ref/models/querysets.md#django.db.models.query.QuerySet.annotate) and [aggregate](aggregation.md) using many built-in [database functions](../../ref/models/database-functions.md). Beyond those, you can create
>   [custom query expressions](../../ref/models/expressions.md).
>
> Before using raw SQL, explore [the ORM](index.md). Ask on
> one of [the support channels](../../faq/help.md) to see if the ORM supports
> your use case.

> **WARNING:**
>
> You should be very careful whenever you write raw SQL. Every time you use
> it, you should properly escape any parameters that the user can control
> by using `params` in order to protect against SQL injection attacks.
> Please read more about [SQL injection protection](../security.md#sql-injection-protection).

## Performing raw queries

The `raw()` manager method can be used to perform raw SQL queries that
return model instances:

`Manager.raw(raw_query,params=(),translations=None)`

This method takes a raw SQL query, executes it, and returns a
`django.db.models.query.RawQuerySet` instance. This `RawQuerySet` instance
can be iterated over like a normal [`QuerySet`](../../ref/models/querysets.md#django.d
