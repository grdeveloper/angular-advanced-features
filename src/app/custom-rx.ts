function Observable(subscribe) {
  this.subscribe = subscribe;                               // =  PUBLIC PROPERTY  <==
}                                                           // =                     =
                                                            // =                     =
const one$ = new Observable(observer => {                   // =                     =
  observer.next(1);                                         // =                     =
  // observer.complete();                                   // =                     =
});                                                         // =                     =
                                                            // =                     =
one$.subscribe({                                            // =                     =
  next: value => console.log(value)                         // =                     =
});                                                         // =                     =
                                                            // =                     =
Observable.fromEvent = (element, name) => {                 // =  STATIC METHOD    <==
  return new Observable(observer => {                       // =                     =
    const callback = event => observer.next(event);         // =                     =
    element.addEventListener(name, callback, false);        // =                     =
    return () => element.removeEventListener(name, callback, false); //              =
  });                                                       // =                     =
};                                                          // =                     =
                                                            // =                     =
Observable.prototype.map = function(mapFn) {                // =  PROTOTYPE METHOD <==
  const input = this;
  return new Observable(observer => {
    return input.subscribe({
      next: value => observer.next(mapFn(value)),
      error: error => observer.error(error),
      complete: () => observer.complete()
    });
  });
};

const node = document.querySelector('input');
const p = document.querySelector('p');

const input$ = Observable
  .fromEvent(node, 'input')
  .map(event => event.target.value);

const unsubscribe = input$.subscribe({
  next: value => p.innerHTML = value
});

setTimeout(unsubscribe, 5000);


