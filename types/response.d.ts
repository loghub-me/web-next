interface ResponseBody {
  status: number;
  timestamp: string;
}

interface MessageResponseBody extends ResponseBody {
  message: string;
}

interface MethodResponseBody extends ResponseBody {
  id: number;
  message: string;
}

interface RedirectResponseBody extends ResponseBody {
  pathname: string;
  message: string;
}

interface DataResponseBody<T> extends ResponseBody {
  data: T;
}
