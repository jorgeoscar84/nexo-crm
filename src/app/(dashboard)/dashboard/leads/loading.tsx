import { TableSkeleton } from "@/components/shared/Skeletons";

export default function LeadsLoading() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div className="h-7 w-24 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-56 animate-pulse rounded bg-muted" />
                </div>
                <div className="flex gap-2">
                    <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
                    <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
                    <div className="h-9 w-28 animate-pulse rounded-lg bg-muted" />
                </div>
            </div>
            <div className="h-14 w-full animate-pulse rounded-xl bg-muted" />
            <TableSkeleton rows={8} cols={6} />
        </div>
    );
}
