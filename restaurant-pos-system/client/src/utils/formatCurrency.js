export default (v)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(v||0);
