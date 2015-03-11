# drilldown
angular module to drill down through convoluted structures

```
Drilldown(subject, path[, default])
```
    
* subject - object to start drilling down from
* path - string representation of the path you want to take
* default - if the path does not exist, return this in stead
 
## Example usage:

```
var noop = function() {};

var postcode = Drilldown(user, "address.postcode", "TE57 1NG");
var pluginResponse = Drilldown(window, "plugins.FooPlugin.bar", noop)();
```
