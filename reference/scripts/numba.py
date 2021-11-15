import functools


def njit(_func=None, **kwds):
    def decorator_njit(func):
        @functools.wraps(func)
        def wrapper_njit(*args, **kwargs):
            return func(*args, **kwargs)

        return wrapper_njit

    if _func is None:
        return decorator_njit
    else:
        return decorator_njit(_func)


prange = range
