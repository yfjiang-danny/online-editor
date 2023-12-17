function debounce(func: Function, wait: number): Function {
  let timer: NodeJS.Timeout;

  return function (...args: any[]) {
    const context = this;

    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

function throttle(func: Function, wait: number): Function {
  let isThrottled = false;

  return function (...args: any[]) {
    const context = this;

    if (!isThrottled) {
      func.apply(context, args);
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, wait);
    }
  };
}
