var r=function(n,e){for(var t in n){if(t===e)return[t];if(n[t]&&"object"==typeof n[t]){var u=r(n[t],e);if(u)return u.unshift(t),u}}},n=function(r,n){return n.reduce(function(r,n){return r&&r[n]},r)},e=function(r,n){if("array-simple"===n)return JSON.stringify(r);for(var e="",t=0,u=r;t<u.length;t+=1)e+=n(u[t])+",";return"["+e.substr(0,e.length-1)+"]"},t=function(r){var n=r||new RegExp('\\n|\\r|\\t|\\"|\\\\',"gm");return function(r){return r.replace(n,function(r){return"\\"+r})}},u=function(t){var u=function(n){var e,t,u,a,i={},o=new Map,f="",c=JSON.stringify(n,function(e,t){var u=Array.isArray(t);return("object"!=typeof t||u)&&(u&&o.set(e,t[0]),function(r){var n=new Set(["number","string","boolean","undefined","array-simple","function"]);if(Array.isArray(r)){if(n.has(r[0])||n.has(typeof r[0]))return;throw new Error('Expected either "array-simple" or a function. received '+r)}if("function"!=typeof r&&!n.has(r))throw new Error('Expected one of: "number", "string", "boolean", "undefined". received '+r)}(t),i[e]=r(n,e),f+='"'+e+'"|'),t});return{map:i,arrais:o,props:f,str:c,queue:(e=n,t=["string","number","boolean","array"],u=[],a=new Set(t),function r(n,e){void 0===e&&(e=[]);var t=Array.isArray(n);if(!a.has(n)&&!t)return Object.keys(n).map(function(t){return r(n[t],e.concat([t]))});u.push({isArray:t,method:t&&n[0],path:[e].flat()})}(e),u)}}(t),a=u.queue,i=function(r,n){var e=[],t=r.replace(n,function(r){switch(r){case'"string"':case'"undefined"':return'"__par__"';case'"number"':case'"boolean"':case'["array-simple"]':case"[null]":return"__par__";default:var n=r.match(/(?<=\").+?(?=\")/)[0];return e.push(n),r}}).split("__par__");return{queue:e,chunks:t}}(u.str,new RegExp(u.props+'"(string|number|boolean|undef)"|\\[(.*?)\\]',"gm")).chunks,o=i[i.length-1],f=function(r){return function(n,e){if(void 0!==n)return n;var t=r[e];return 34===t.charCodeAt(t.length-1)?n:'"'+n+'"'}}(i),c=a.length;return function(r){for(var t="",u=0;u!==c;){var s=a[u],p=s.method,h=s.isArray,l=n(r,s.path),y=h?e(l,p):l;t+=i[u]+f(y,u),u+=1}return t+o}};export{u as sjs,t as escape};
//# sourceMappingURL=sjs.mjs.map
