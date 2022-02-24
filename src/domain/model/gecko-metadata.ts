import type { GeckoRequest } from "./gecko-request";
import type { GeckoResponse } from "./gecko-response";

export interface GeckoMetadata {
    request: GeckoRequest
    response: GeckoResponse
}