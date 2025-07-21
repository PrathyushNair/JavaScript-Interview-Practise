class CircuitBreaker {
  maxAllowedFailure;
  recoveryTime;
  circuitState = "closed";
  failureCount = 0;
  halfOpenAttempt = 0;
  lastErrorTime = 0;
  constructor(maxAllowedFailure, recoveryTime, totalAttemptsOnHalfOpen) {
    this.maxAllowedFailure = maxAllowedFailure;
    this.recoveryTime = recoveryTime;
    this.totalAttemptsOnHalfOpen = totalAttemptsOnHalfOpen;
  }
  async callService(fn, args) {
    if (this.circuitState == "open") {
      let timeElasped = Date.now() - this.lastErrorTime;
      if (timeElasped > this.recoveryTime) {
        if (this.halfOpenAttempt >= this.totalAttemptsOnHalfOpen) {
          this.circuitState = "halfOpen";
          this.halfOpenAttempt = 0;
        }
      } else {
        return this.fallback();
      }
    }
    if (this.circuitState == "halfOpen") {
      if (this.halfOpenAttempt >= this.totalAttemptsOnHalfOpen) {
        this.open();
        return this.fallback();
      }
    }
    try {
      const result = await fn(...(args || []));
      this.onSuccess();
      return result;
    } catch (error) {
      this.handleFailure();
      return this.fallback();
    }
  }
  handleSuccess() {
    if (this.circuitState == "halfOpen") {
      this.halfOpenAttempt++;
      if (this.halfOpenAttempt >= this.totalAttemptsOnHalfOpen) {
        this.close();
      }
    } else {
      this.failureCount = 0;
    }
  }
  open() {
    this.circuitState = "open";
    this.lastErrorTime = Date.now();
    this.halfOpenAttempt = 0;
  }
  close() {
    this.circuitState = "closed";
    this.failureCount = 0;
    this.halfOpenAttempt = 0;
  }

  handleFailure() {
    if (this.circuitState == "halfOpen") {
      this.halfOpenAttempt++;
      if (this.halfOpenAttempt >= this.totalAttemptsOnHalfOpen) {
        this.open();
      }
      return;
    }
    this.failureCount++;
    if (this.failureCount >= this.maxAllowedFailure) {
      this.open();
    }
  }
  fallback() {
    console.log("fall back");
  }
}
