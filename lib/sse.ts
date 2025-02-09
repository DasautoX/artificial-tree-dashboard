import { EventSourcePolyfill } from "event-source-polyfill"

export function createEventSource(url: string) {
  return new EventSourcePolyfill(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
}

