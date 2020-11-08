// src/services/requestUtil.service.ts

type CheckResult = {
  ok: boolean;
  extra: string[];
  miss: string[];
};

export default class RequestUtil {
  static checkFields(required: string[], reqBody: string[]): CheckResult {
    // Creating a table for missing or too many fields
    const miss: string[] = [];
    const extra: string[] = [];

    // Check that there are no fields missing
    required.forEach((prop) => {
      if (reqBody.indexOf(prop) === -1) {
        miss.push(prop);
      }
    });

    // Check if to many field
    reqBody.forEach((prop) => {
      if (required.indexOf(prop) === -1) {
        extra.push(prop);
      }
    });

    // Check field
    const ok = extra.length === 0 && miss.length === 0;

    return {
      ok,
      extra,
      miss,
    };
  }

  static apiSuccessResponse(
    message: string,
    data: Record<string, unknown> | null = null,
  ): Record<string, unknown> {
    if (data) {
      return {
        message,
        error: null,
        data,
      };
    }
    return {
      message,
      error: null,
    };
  }

  static apiErrorResponse(
    message: string,
    error = 'An error has occurred',
  ): Record<string, unknown> {
    return {
      message,
      error,
    };
  }

  static apiFieldsErrorReponse(miss: Array<string>, extra: Array<string>): Record<string, unknown> {
    return {
      ...RequestUtil.apiErrorResponse('Missing parameters'),
      miss,
      extra,
    };
  }
}
