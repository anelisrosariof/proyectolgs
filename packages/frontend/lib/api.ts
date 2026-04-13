const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type FetchApiOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function fetchApi<T>(
  path: string,
  options: FetchApiOptions = {},
): Promise<T> {
  const { body, headers, ...rest } = options;

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Network error";
    throw new ApiError(
      `No se pudo conectar al backend en ${API_BASE_URL}. ${reason}`,
      0,
      null,
    );
  }

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const payload: unknown = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      (isJson &&
        typeof payload === "object" &&
        payload !== null &&
        "message" in payload &&
        String((payload as { message: unknown }).message)) ||
      `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
}
