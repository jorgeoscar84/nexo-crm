import { CalendarSkeleton } from "@/components/shared/Skeletons";

export default function CalendarLoading() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div className="h-7 w-32 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-56 animate-pulse rounded bg-muted" />
                </div>
                <div className="h-9 w-32 animate-pulse rounded-lg bg-muted" />
            </div>
            <CalendarSkeleton />
        </div>
    );
}
