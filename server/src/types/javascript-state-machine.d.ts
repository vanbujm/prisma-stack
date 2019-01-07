declare module 'javascript-state-machine' {
  interface StateMachineData {}

  interface Transition {
    name: string;
    from: string | string[];
    to: string;
  }

  export interface Constructor {
    new (args: unknown): StateMachine;
  }

  interface StateMachineFactoryConfig {
    transitions: Transition[];
    methods: object;
    data(args: unknown): StateMachineData;
    data: StateMachineData;
    init: string;
  }

  interface StateMachine {
    constructor: Constructor;

    cannot(transition: string): boolean;
    state: string;
  }

  function factory(config: StateMachineFactoryConfig): Constructor;
}
