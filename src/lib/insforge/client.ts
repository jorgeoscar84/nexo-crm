import { createClient } from "@insforge/sdk";

export const insforge = createClient({
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL || "https://ea432i2p.us-east.insforge.app",
    anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC0xMjM0LTU2NzgtOTBhYi1jZGVmMTIzNDU2NzgiLCJlbWFpbCI6ImFub25AaW5zZm9yZ2UuY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODc3Mzh9.S7yjvVRB6cWHKOJPFYGg8tJAtUbPHmntPthpnaQBTuQ"
});
