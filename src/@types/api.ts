export type APIResponse<T> =
  | {
      opcode: 200;
      message: 'OK';
      data: T;
    }
  | {
      opcode: 400;
      message: 'Bad Request';
      details: string;
    }
  | {
      opcode: 401;
      message: 'You are unauthorized.';
    }
  | {
      opcode: 500;
      message: 'Internal Server Error';
    };
