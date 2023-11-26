# 1. Stream Abstraction and Observer Pattern

## Stream Abstraction
The stream abstraction refers to a sequence of data elements made available over time. It allows the processing of data as a continuous flow rather than a one-time event. Streams are often used to represent and manipulate sequences of values or events.

## Relationship with Observer Pattern
The observer pattern involves a subject and multiple observers. Streams can be seen as a dynamic implementation of the observer pattern, where data is continuously emitted, and observers can react to these emissions.

## Usefulness in Rich Web Development
Streams are useful in modeling asynchronous events such as user interactions, data updates, or network responses. In Rich Web Development, they can be employed for real-time data synchronization, handling user input, and managing dynamic content updates without explicitly polling for changes.

# 2. Using RxJS for Handling Asynchronous Network Responses

## RxJS for Asynchronous Handling
RxJS provides an observable-based approach for handling asynchronous operations. To use RxJS with an API in a Rich Web App, you can create observables that represent asynchronous events, such as API requests.

## Benefits Over Promises
- **Declarative Syntax:** RxJS offers a more declarative syntax for handling asynchronous operations compared to the imperative nature of promises.
- **Composition:** Observables can be easily composed and transformed, allowing for powerful data manipulation pipelines.
- **Cancellation:** Observables can be canceled, providing more control over ongoing asynchronous operations.

## Downsides
- **Learning Curve:** RxJS has a steeper learning curve than promises, especially for beginners.
- **Overhead:** For simple scenarios, the additional functionality provided by RxJS may introduce unnecessary complexity.

# 3. Consequences of Sharing Global State among Asynchronous Tasks

## Issues with Shared Global State
- **Race Conditions:** Concurrent execution of tasks may lead to race conditions, where the outcome depends on the order of execution.
- **Unintended Side Effects:** Modifying global state can have unintended consequences on other asynchronous tasks.

## Good Practice to Alleviate Problems
- **Use Local State:** Encapsulate state within the scope of individual functions (local state) rather than relying on global variables.
- **Immutable State:** Consider using immutable data structures to prevent unintentional modifications to shared state.
- **Asynchronous Patterns:** Utilize asynchronous patterns like promises or async/await to manage the flow of asynchronous tasks and avoid race conditions.
