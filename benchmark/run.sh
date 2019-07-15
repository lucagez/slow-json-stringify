#!/bin/bash  

TITLE="
# Benchmarks

Benchmarks performed on:
- native **JSON.stringify**
- **fast-json-stringify**
- **slow-json-stringify**

"

echo "$TITLE"

printf "## small-object \n\n"
node small-object.js

printf "## small-array \n\n"
node small-array.js

printf "## nested-props-short-text \n\n"
node nested-props-short-text.js

printf "## much-props-short-text \n\n"
node much-props-short-text.js

printf "## much-props-big-text \n\n"
node much-props-big-text.js

printf "## big-text \n\n"
node big-text.js

printf "## big-array-short-text \n\n"
node big-array-short-text.js

printf "## big-array-long-text \n\n"
node big-array-long-text.js

printf "## big-array-long-number \n\n"
node big-array-long-number.js

printf "## undefined properties \n\n"
node undef.js
