# d3-aggregate
Aggregation functions for d3 and csv datasets

When working with a CSV and d3 we found that we wanted to leverage the existing information to create some aggregated information. We needed averages based on the names within a row. We needed to count the occurences of a value. ETC! To do this we loaded up our data on a SQL server and entered a command to return the columns we desired. We exported to a CSV and then used that in our D3 project.

Wouldn't it be nice if this was able to be done within D3? pass a couple of columns, get back an array or list of values? That's what D3-aggregate aims to do. Bring some of these aggregate functions to D3.

Functions will include:
* SUM
* COUNT
* AVERAGE
* MIN/MAX
