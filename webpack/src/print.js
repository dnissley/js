export default function printMe() {
  // use some syntax that is not supported in all browsers
  // check how this file is transformed to make sure the syntax is replaced with polyfills
  const a = { prop1: 'abc', prop2: 'def' };
  const b = { ...a, prop1: 'overridden' };
  console.log('I get called from print.js');
  console.log("Here's an object that was created using the spread operator: " + JSON.stringify(b));
}

