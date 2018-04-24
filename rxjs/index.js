const Rx = require('rxjs/Rx');

/* At the core of rxjs are Observables. Observables are basically promises that
can return multiple values. */

/* Creating an observable with a function: */

const observable1 = Rx.Observable.create((observer) => {
  // This observable will send the integers from 1 to 100 to it's observer.
  // It will wait 100ms between numbers so will take 10 seconds to complete.
  let currentValue = 1;
  let interval;
  const sendValue = () => {
    observer.next(currentValue);
    if (currentValue < 100) {
      currentValue += 1;
    } else {
      observer.complete();
      clearInterval(interval);
    }
  };
  interval = setInterval(sendValue, 100);
});

/* Subscribing to an observable: */

observable1.subscribe({
  next: x => console.log(`Got value ${x} from observable1.`),
  error: err => console.error(`Something bad happened in observable1: ${err}`),
  complete: () => console.log('Yo, observable1 is done sending values')
});

