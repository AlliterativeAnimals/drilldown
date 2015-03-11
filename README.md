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
var user = { address: { street: "Regent Street" } };

var postcode = Drilldown(user, "address.postcode", "TE57 1NG");
// returns 'TE57 1NG'
var street = Drilldown(user, "address.street", "Test Street");
// returns 'Regent Street'

// or for calling plugins that may not be present:
var noop = function() {};
var plugins = {};
var pluginResponse = Drilldown(plugins, "FooPlugin.barAction", noop)();
// returns undefined, and does not crash
```
