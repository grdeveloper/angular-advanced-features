export class Store {
  private state: {[key: string]: any};
  private readonly reducers: {[key: string]: () => {[key: string]: any}};
  private subscribers: ((value: any) => any)[];

  constructor(reducersObject = {}, initialStateObject = {}) {
    this.state = this.reduce(initialStateObject, {});
    this.reducers = reducersObject;
    this.subscribers = [];
  }

  get value() {
    return this.state;
  }

  dispatch(action) {
    this.state = this.reduce(this.state, action);
    this.subscribers.forEach(fn => fn(this.value));
  }

  subscribe(fn) {
    this.subscribers = [...this.subscribers, fn];
    fn(this.value);
    return () => {this.subscribers.filter(sub => sub !== fn); };
  }

  private reduce(state, action) {
    const newState: {[key: string]: any} = {};

    for (const prop in this.reducers) {
      if (this.reducers.hasOwnProperty(prop)) {
        const fn: (state: {[key: string]: any}, action: {type: string; payload?: any}) => any
          = this.reducers[prop];
        newState[prop] = fn(state[prop], action);
      }
    }

    return newState;
  }
}
