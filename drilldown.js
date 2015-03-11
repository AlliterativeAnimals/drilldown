angular.module("aa.service.drilldown", [])
    .factory("Drilldown", function($rootScope, $timeout) {

        // Factory to assist with drilling down through possibly missing
        // structures, to avoid "x && x.y && x.y.z" tests.
        // Returns the default (or undefinded if not supplied) if the given
        // path does not exist.

        var log = function(message, level) { console[level](message); },
            Drilldown = function Drilldown(parent, path, defaults) {
                if (typeof path === "string") {
                    path = path.split(".");
                }
                var child = parent,
                    stringParent = parent,
                    hitArray = false,
                    realKey = null;

                path.forEach(function(key, index, path) {
                    if (!hitArray) {
                        if (key.substr(-2) === "[]") {
                            hitArray = true;
                            realKey = key.slice(0, -2);
                            nextChild = [];
                            if (Array.isArray(child[realKey])) {
                                child[realKey].forEach(function(subchild) {
                                    nextChild.push(
                                        Drilldown(subchild, path.slice(index + 1), defaults)
                                    );
                                });
                                child = nextChild;
                            } else {
                                child = undefined;
                            }
                        } else {
                            child = (
                                child && typeof child[key] !== "undefined" ?
                                    child[key] :
                                    undefined
                            );
                        }
                    }
                });

                if (typeof child === "undefined") {
                    try {
                        stringParent = JSON.stringify(parent);
                    } catch (e) {}
                    log("Could not drilldown to find '" + path.join(".") + "' in " + stringParent, "debug");
                    child = defaults;
                }

                return child;
            };

        return Drilldown;
    });
