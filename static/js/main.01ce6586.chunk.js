(this.webpackJsonpswatches=this.webpackJsonpswatches||[]).push([[0],{20:function(e,t,n){},22:function(e,t,n){},23:function(e,t,n){},24:function(e,t,n){},25:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(1),r=n(11),s=n.n(r),o=(n(20),n(2)),l=n(8),i=n.n(l),u=n(12);var b=n(9),j=n.n(b),h=n(13),v=n.n(h);var d=n(4),g=n(3),f=n(14),x=n.n(f),O=n(10),m=n.n(O);function p(e){return m()(e)}function C(e){return p(e).complement().toHexString()}var k=n.p+"static/media/clippy.89bd48cb.svg",y=(n(22),x()()),N=function(e,t){return parseInt(e,10)>t},w=function(e){return!RegExp("^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$").test(e)},D=function(e){return RegExp("^#([a-fA-F0-9]{0,2}|[a-fA-F0-9]{4,5})$|\n  ^([a-fA-F0-9]{1,2}|[a-fA-F0-9]{4,5})$").test(e)},S=function(e){return e.selectionEnd-e.selectionStart!==0},E=function(e){var t=e.pickerInstance,n=e.values,r=e.colorNameUtil,s=e.setEaselColor,o=Object(c.useState)(""),l=Object(g.a)(o,2),i=l[0],u=l[1],b=Object(c.useState)("Red"),j=Object(g.a)(b,2),h=j[0],v=j[1],f=Object(c.useState)(C(n.hex)),x=Object(g.a)(f,2),O=x[0],m=x[1],p=Object(c.useRef)(),E=Object(c.useCallback)((function(){var e=r.getColor(n.hex);e=void 0===e?r.getNearestColor(n.hex).name:e.name,v(e)}),[r,n]),P=Object(c.useCallback)((function(e){t.color.set(e),s(n.hex)}),[t.color,n.hex,n.hsl,s]),K=Object(c.useCallback)((function(e){t.color.set(e),s(n.hex)}),[t.color,n.hex,n.rgb,s]),L=Object(c.useCallback)((function(e){w(e)||(t.color.set(e),s(e))}),[t.color,n.rgb,n.hsl,s]),A=Object(c.useCallback)((function(e){var t=e.target.selectionStart;1===e.target.value.length&&("Backspace"===e.key&&1===t||"Delete"===e.key&&0===t)&&(e.target.value="")}),[]),B=Object(c.useCallback)((function(e){return function(t){var n=t.target.value;if(!S(t.target)||!/[0-9]/.test(t.key))if(/[0-9]/.test(t.key)&&"Enter"!==t.key){if(""!==n){var a=Object(d.a)(n),c=t.target.selectionStart;a.splice(c,0,t.key);var r=a.join("");if(function(e){return!RegExp("^[0-9]{1,3}$").test(e)||e.startsWith("0")&&e.length>1}(r)||2===n.length&&N(r,e))return void t.preventDefault();u(r)}}else t.preventDefault()}}),[]),F=Object(c.useCallback)((function(e){var t=e.target.value;if(S(e.target))window.getSelection().toString()===t&&(e.key=e.key.toUpperCase(),u(e.key));else if(/[a-zA-Z0-9!@#$%^&*)(+=._-\s]/.test(e.key)&&"Enter"!==e.key)if(""!==t){var n=Object(d.a)(t),a=e.target.selectionStart;n.splice(a,0,e.key);var c=n.join("");u(c)}else{0===e.target.selectionStart&&/[a-z]/.test(e.key)&&(e.key=e.key.toUpperCase()),u(e.key)}else e.preventDefault()}),[]),I=Object(c.useCallback)((function(e){var t=e.target.value,n=e.target.selectionStart;if(S(e.target)&&/[#a-fA-F0-9]/.test(e.key))"#"===e.key&&0!==n&&e.preventDefault();else if(""!==t){if(!/[#a-fA-F0-9]/.test(e.key)||"Enter"===e.key)return void e.preventDefault();var a=Object(d.a)(t);if("#"===e.key&&0!==n)return void e.preventDefault();a.splice(n,0,e.key);var c=a.join("");if(w(c)&&!D(c))return void e.preventDefault();u(c)}else"#"!==e.key&&e.preventDefault()}),[]),R=Object(c.useCallback)((function(e){return function(t){var n=t.clipboardData.getData("text");if(Number.isNaN(parseInt(n,10)))t.preventDefault();else{var a=t.target.value,c=t.target.selectionStart,r=t.target.selectionEnd-c,s=Object(d.a)(a);s.splice(c,r,n);var o=s.join("");N(o,e)?t.preventDefault():u(o)}}}),[]),$=Object(c.useCallback)((function(e){var t=e.clipboardData.getData("text");if(/[#a-fA-F0-9]+/.test(t)){var n=e.target.value,a=e.target.selectionStart,c=e.target.selectionEnd-a,r=Object(d.a)(n);r.splice(a,c,t);var s=r.join("");!w(s)||D(s)?u(s):e.preventDefault()}else e.preventDefault()}),[]),U=Object(c.useCallback)((function(e){return function(t){if(""===t.target.value){t.target.value="0";var a=y(n.rgb);a[e]=t.target.value,P(a),E()}}}),[n.rgb,P,E]),H=Object(c.useCallback)((function(e){return function(t){if(""===t.target.value){t.target.value="0";var a=y(n.hsl);a[e]=t.target.value,K(a),E()}}}),[n.hsl,K,E]),z=Object(c.useCallback)((function(){E()}),[E]),J=Object(c.useCallback)((function(e){return function(t){""!==i&&(t.target.value=i,u(""));var a=t.target.value,c=y(n.rgb);c[e]=a,""!==a&&(P(c),E())}}),[i,n.rgb,P,E]),W=Object(c.useCallback)((function(e){return function(t){""!==i&&(t.target.value=i,u(""));var a=t.target.value,c=y(n.hsl);c[e]=a,""!==a&&(K(c),E())}}),[i,n.hsl,K,E]),V=Object(c.useCallback)((function(e){""!==i&&(e.target.value=i,u(""));var t=""===e.target.value?"#000":e.target.value;L(t),E()}),[i,L,E]),Z=Object(c.useCallback)((function(e){var t=e.target.selectionStart;""!==i&&(e.target.value=i,u(""));var n=""===e.target.value?"Black":e.target.value,a=r.getHex(n),c=void 0===a?function(e){for(var t=0,n=0;n<e.length;n++)t=e.charCodeAt(n)+((t<<5)-t);for(var a="#",c=0;c<3;c++)a+="00".concat((t>>8*c&255).toString(16)).substr(-2);return a}(n):a.hex;L(c),v(n),e.target.selectionStart=t,e.target.selectionEnd=t}),[i,L,r]);return Object(c.useEffect)((function(){var e=function(){m(C(n.hex)),E(),s(n.hex)},t=!1,a=function(n){p.current.contains(n.target)&&(e(),t=!0)},c=function(){t&&e()},r=function(){t&&(t=!1)};return document.addEventListener("mousedown",a),document.addEventListener("mousemove",c),document.addEventListener("mouseup",r),function(){document.removeEventListener("mousedown",a),document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",r)}}),[E,n,s]),Object(a.jsxs)("div",{className:"picker",children:[Object(a.jsx)("div",{className:"colorPicker",ref:p}),Object(a.jsx)("div",{className:"colorValues",children:Object(a.jsxs)("div",{className:"color-container",children:[Object(a.jsxs)("div",{className:"info-container",style:{backgroundColor:"#fff"},children:[Object(a.jsx)("div",{className:"name-container",children:Object(a.jsxs)("div",{className:"name-label",children:["name:\xa0",Object(a.jsx)("input",{id:"name-input",type:"text",value:h,maxLength:"40",onKeyDown:A,onKeyPress:F,onBlur:z,onChange:Z}),Object(a.jsx)("button",{type:"button",className:"clip-name","data-clipboard-target":"#name-input",children:Object(a.jsx)("img",{width:"14",src:k,alt:"Copy"})})]})}),Object(a.jsx)("div",{className:"hex-container",children:Object(a.jsxs)("div",{className:"hex-label",children:["hex:\xa0",Object(a.jsx)("input",{id:"hex-input",type:"text",value:n.hex,maxLength:"7",onKeyDown:A,onKeyPress:I,onPaste:$,onChange:V}),Object(a.jsx)("button",{type:"button",className:"clip-hex","data-clipboard-target":"#hex-input",children:Object(a.jsx)("img",{width:"14",src:k,alt:"Copy"})})]})}),Object(a.jsxs)("div",{className:"rgb-container",children:[Object(a.jsx)("span",{children:"rgb(".concat(n.rgb.r,", ").concat(n.rgb.g,", ").concat(n.rgb.b,")")}),Object(a.jsxs)("div",{children:["r:\xa0",Object(a.jsx)("input",{type:"text",value:n.rgb.r,maxLength:"3",onKeyDown:A,onKeyPress:B(255),onPaste:R(255),onBlur:U("r"),onChange:J("r")})]}),Object(a.jsxs)("div",{children:["g:\xa0",Object(a.jsx)("input",{type:"text",value:n.rgb.g,maxLength:"3",onKeyDown:A,onKeyPress:B(255),onPaste:R(255),onBlur:U("g"),onChange:J("g")})]}),Object(a.jsxs)("div",{children:["b:\xa0",Object(a.jsx)("input",{type:"text",value:n.rgb.b,maxLength:"3",onKeyDown:A,onKeyPress:B(255),onPaste:R(255),onBlur:U("b"),onChange:J("b")})]})]}),Object(a.jsxs)("div",{className:"hsl-container",children:[Object(a.jsx)("span",{children:"hsl(".concat(n.hsl.h,", ").concat(n.hsl.s,"%, ").concat(n.hsl.l,"%)")}),Object(a.jsxs)("div",{children:["h:\xa0",Object(a.jsx)("input",{type:"text",value:n.hsl.h,maxLength:"3",onKeyDown:A,onKeyPress:B(360),onPaste:R(360),onBlur:H("h"),onChange:W("h")})]}),Object(a.jsxs)("div",{children:["s:\xa0",Object(a.jsx)("input",{type:"text",value:n.hsl.s,maxLength:"3",onKeyDown:A,onKeyPress:B(100),onPaste:R(100),onBlur:H("s"),onChange:W("s")})]}),Object(a.jsxs)("div",{children:["l:\xa0",Object(a.jsx)("input",{type:"text",value:n.hsl.l,maxLength:"3",onKeyDown:A,onKeyPress:B(100),onPaste:R(100),onBlur:H("l"),onChange:W("l")})]})]})]}),Object(a.jsxs)("div",{className:"preview",children:[Object(a.jsx)("div",{className:"current-color",style:{backgroundColor:n.hex},children:Object(a.jsx)("span",{children:n.hex})}),Object(a.jsx)("div",{className:"comp-color",style:{backgroundColor:O},children:Object(a.jsx)("span",{children:O})})]})]})})]})},P=(n(23),function(e){e.colorId;var t=e.color,n=e.removeColor,r=e.changeColor,s=Object(c.useState)(t),o=Object(g.a)(s,2),l=o[0],i=o[1],u=Object(c.useCallback)((function(){r(t,l)}),[t,l,r]),b=Object(c.useCallback)((function(e){r(t,e.target.value)}),[t,r]),j=Object(c.useCallback)((function(e){u(),i(e.target.value)}),[u]),h=Object(c.useCallback)((function(){u(),n(l)}),[u,l]);return Object(a.jsxs)("div",{className:"swatch",style:{backgroundColor:l},children:[Object(a.jsx)("button",{type:"button",onClick:function(){return h()},children:"Remove"}),Object(a.jsx)("input",{type:"text",value:l,maxLength:"7",onBlur:b,onChange:j})]})}),K=(n(24),({schemeId:e,remove:t,easelColor:n})=>{var r=Object(c.useState)([]),s=Object(o.a)(r,2),l=s[0],i=s[1],u=Object(c.useState)(e.split("-").join(" ")),b=Object(o.a)(u,2),j=b[0],h=b[1],v=Object(c.useCallback)((()=>{l.length>=8||l.includes(n)||i([...l,n])}),[l,n]),d=Object(c.useCallback)((e=>{i(l.filter((t=>t!==e)))}),[l]),g=Object(c.useCallback)(((e,t)=>{i(l.map((n=>n!==e?n:t)))}),[l]),f=Object(c.useCallback)((e=>{h(e.target.value)}),[]);return Object(a.jsxs)("div",{className:"scheme",children:[Object(a.jsx)("div",{className:"scheme-name",children:Object(a.jsx)("input",{value:j,onChange:f})}),Object(a.jsxs)("div",{className:"scheme-buttons",children:[Object(a.jsx)("button",{type:"button",onClick:()=>v(),children:"Add Current Color"}),Object(a.jsx)("button",{type:"button",onClick:()=>t(e),children:"Delete Scheme"})]}),Object(a.jsx)("div",{className:"swatch-container",children:l.map(((e,t)=>Object(a.jsx)(P,{colorId:t,color:e,removeColor:d,changeColor:g},"Color-".concat(e))))})]})}),L=(n(25),"colorPicker");new i.a(".clip-name"),new i.a(".clip-hex");var A=new class{constructor(){this.namedColors=j.a,this.nearestColors=v.a.from(j.a.reduce(((e,{name:t,hex:n})=>Object.assign(e,{[t]:n})),{}))}getAllColors(){return this.namedColors}getColor(e){return this.namedColors.find((t=>t.hex===e))}getHex(e){return this.namedColors.find((t=>t.name===e))}getNearestColor(e){return this.nearestColors(e)}},B=new class{constructor(e){this.pickerName=e}generate(){var e=new u.a.ColorPicker(".".concat(this.pickerName),{color:"rgb(255, 0, 0)",borderWidth:1,borderColor:"#fff"}),t={};return e.on(["color:init","color:change"],(e=>{t.hex=e.hexString,t.rgb=e.rgb,t.hsl=e.hsl})),[e,t]}}(L).generate(),F=Object(o.a)(B,2),I=F[0],R=F[1],$=1,U=()=>{var e=Object(c.useState)([]),t=Object(o.a)(e,2),n=t[0],r=t[1],s=Object(c.useState)(R.hex),l=Object(o.a)(s,2),i=l[0],u=l[1],b=e=>{r(n.filter((t=>t!==e)))};return Object(a.jsxs)("div",{className:"easel",children:[Object(a.jsx)(E,{pickerInstance:I,values:R,colorNameUtil:A,setEaselColor:u},L),Object(a.jsxs)("div",{className:"scheme-container",children:[Object(a.jsx)("button",{type:"button",onClick:()=>{r([...n,"Scheme-"+$++])},children:"New Scheme"}),n.map((e=>Object(a.jsx)(K,{schemeId:e,remove:b,easelColor:i},e)))]})]})},H=function(){return Object(a.jsx)("div",{className:"App",children:Object(a.jsx)(U,{})})};s.a.render(Object(a.jsx)(H,{}),document.getElementById("root"))}},[[26,1,2]]]);
//# sourceMappingURL=main.01ce6586.chunk.js.map